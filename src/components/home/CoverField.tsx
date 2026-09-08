"use client";

import { useEffect, useRef } from "react";

/* ===========================================================================
 * THE COVER FIELD — the site reconstructing its own work, in WebGL.
 *
 * ⚠ WHY THIS EXISTS, AND WHY IT IS NOT A PARTICLE EFFECT.
 *
 * Every project in this archive turns data into a picture. A renderer draws a
 * street out of geometry. An MRI reader draws twelve findings out of a DICOM
 * volume. Four agents draw a decision out of one blood panel. A CHIP-8
 * interpreter draws Brix out of 4096 bytes. The cover does the same thing to
 * the archive itself: it does not SHOW the selected project, it DECODES it,
 * out of a cloud of forty thousand points that carry nothing but a colour and
 * a position they are trying to reach.
 *
 * That is also why there is no separate loading screen any more. The old one
 * held a manifest on top of the page for 1.6 seconds, which is long enough to
 * be in the way and too short to read. The resolve below IS the boot: the page
 * arrives as noise and becomes the work, once, and then it is the cover.
 *
 * ⚠ NO THREE.JS. This is raw WebGL2, about a hundred lines of GLSL, and it
 * ships nothing to the bundle but this file. A 600kB 3D library to draw a grid
 * of points would cost more than the thing it is drawing.
 *
 * ⚠ IT MUST DEGRADE TO THE PHOTOGRAPH. If WebGL2 is unavailable, if the
 * context is lost, or if the reader has asked for reduced motion, the caller
 * keeps rendering the ordinary <Image> underneath and this simply never paints
 * over it. Nothing about the cover's meaning lives only in here.
 *
 * HOW IT WORKS
 *   Every point owns a cell of the source image. It reads that cell's colour
 *   once, in the vertex shader, and then spends its life somewhere between two
 *   positions: the cell it belongs to, and a scattered position derived from a
 *   hash of its own index. `u_resolve` slides between them.
 *
 *     u_resolve = 0   a cloud, no image
 *     u_resolve = 1   the photograph, made of points
 *
 *   On first load it runs 0 -> 1 once. Changing project runs it back to 0 and
 *   forward again, so a project change is the archive re-deriving the picture
 *   rather than a crossfade. The pointer pushes a soft well into the field,
 *   and a slow flow keeps it from ever being completely still.
 *
 * ⚠ THE COST IS BOUNDED ON PURPOSE. The grid is capped, the device pixel ratio
 * is capped at 2, and the loop stops entirely when the cover leaves the
 * viewport. A cover that keeps a GPU busy while somebody reads the receipts is
 * a bug, not a flourish.
 * ======================================================================== */

const VERT = `#version 300 es
precision highp float;

in vec2 a_cell;          // integer grid position, 0..grid-1

uniform sampler2D u_src;
uniform vec2  u_grid;     // columns, rows
uniform vec2  u_viewport; // css pixels
uniform vec2  u_cover;    // how the image is fitted into the viewport
uniform float u_resolve;  // 0 cloud, 1 picture
uniform float u_time;
uniform vec2  u_pointer;  // clip space, -1..1
uniform float u_pointerOn;
uniform float u_size;
uniform float u_contain;  // 0 cover, 1 contain
uniform float u_bias;     // horizontal offset, source-uv units

out vec4 v_colour;

/* A cheap deterministic hash. The same point always scatters the same way, so
   the cloud is stable across resizes and re-runs instead of reshuffling. */
vec3 hash31(float n) {
  vec3 p = fract(vec3(n * 0.1031, n * 0.1030, n * 0.0973));
  p += dot(p, p.yzx + 33.33);
  return fract((p.xxy + p.yzz) * p.zyx);
}

void main() {
  vec2 uv = (a_cell + 0.5) / u_grid;

  /* The image is sampled once per point. Everything after this is geometry.
     ⚠ NOT CLAMPED WHEN CONTAINED. A contained image does not fill the frame,
     so the cells outside it have nothing to draw; clamping made them smear the
     edge pixel across the margin in a long streak. They are dropped instead. */
  /* ⚠ A CONTAINED IMAGE IS PUSHED RIGHT, NOT CENTRED. The left of this frame
     is where the sentence lives and is held under a near-solid scrim, so a
     centred interface spent its first third invisible. Sampling further left
     for a given screen cell moves the picture right. */
  vec2 suv = (uv - 0.5) * u_cover + 0.5 - vec2(u_bias, 0.0);
  float inside =
    step(0.0, suv.x) * step(suv.x, 1.0) * step(0.0, suv.y) * step(suv.y, 1.0);
  suv = clamp(suv, 0.0, 1.0);
  vec4 src = texture(u_src, vec2(suv.x, 1.0 - suv.y));
  /* ⚠ HALF THIS ARCHIVE IS A DARK INTERFACE. The reading station and the risk
     instrument are near-black screenshots; sampled straight, their points were
     black points on a black ground and the cover was a dead rectangle. A
     gamma lift opens the shadows without touching the highlights, so a dark UI
     reconstructs as legibly as a daylight street does. */
  vec3 tint = pow(max(src.rgb, 0.0), vec3(0.72)) * 1.06;
  src.rgb = clamp(tint, 0.0, 1.0);
  float lum = dot(src.rgb, vec3(0.299, 0.587, 0.114));

  /* Where the point belongs: its cell, in clip space. */
  vec2 home = uv * 2.0 - 1.0;

  /* Where it comes from: a hashed direction, pushed out and given depth. */
  float id = a_cell.x + a_cell.y * u_grid.x;
  vec3 h = hash31(id);
  float ang = h.x * 6.2831853;
  float rad = 0.35 + h.y * 1.15;
  vec2 away = home + vec2(cos(ang), sin(ang)) * rad;

  /* Brighter points arrive first. The picture resolves out of its own light,
     which is what makes the reveal read as developing rather than as fading. */
  float lead = mix(0.55, 1.0, lum);
  float t = clamp((u_resolve - (1.0 - lead) * 0.45) / max(lead, 0.001), 0.0, 1.0);
  t = t * t * (3.0 - 2.0 * t);

  vec2 pos = mix(away, home, t);

  /* A slow flow, so the resolved picture still breathes. */
  float drift = (1.0 - t) * 0.06 + 0.0035;
  pos.x += sin(u_time * 0.21 + h.z * 6.28 + home.y * 2.0) * drift;
  pos.y += cos(u_time * 0.17 + h.x * 6.28 + home.x * 2.0) * drift;

  /* The pointer pushes a soft well through the field. Aspect-corrected, or it
     is an ellipse on every screen that is not square. */
  vec2 aspect = vec2(u_viewport.x / u_viewport.y, 1.0);
  vec2 d = (pos - u_pointer) * aspect;
  float dist = length(d);
  float well = exp(-dist * dist * 7.0) * u_pointerOn;
  pos += normalize(d + 1e-5) * well * 0.16;

  gl_Position = vec4(pos, 0.0, 1.0);

  /* Size carries the depth: scattered points are small and dim, so the cloud
     reads as distance rather than as a flat sheet of confetti. */
  float px = u_size * (0.5 + 0.5 * t) * (0.86 + 0.28 * lum);
  gl_PointSize = px * (1.0 + well * 1.6) * mix(1.0, inside, u_contain);

  /* ⚠ THE FLOOR MATTERS MORE THAN THE CEILING. Alpha scaled straight off
     luminance left every shadow in the picture at a third of its opacity, so
     the resolved image read as a holey screen rather than as the photograph.
     Dark points still have to be OPAQUE; what luminance is allowed to change
     is how much brighter than opaque a highlight gets. */
  float alpha = mix(0.16, 1.0, t) * (0.72 + 0.28 * lum);
  /* Held just under full strength. The field is the ground the cover's type
     stands on, not the thing competing with it. */
  v_colour = vec4(src.rgb * 0.92, alpha * 0.95 * mix(1.0, inside, u_contain));
}
`;

const FRAG = `#version 300 es
precision highp float;
in vec4 v_colour;
out vec4 outColour;
void main() {
  /* Round points. A square point at this size reads as a dead pixel. */
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c);
  if (d > 0.25) discard;
  float edge = smoothstep(0.25, 0.06, d);
  outColour = vec4(v_colour.rgb, v_colour.a * edge);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, source);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function CoverField({
  src,
  /** Bumped by the caller on every project change; re-runs the resolve. */
  token,
  /** ⚠ `contain` for an interface screenshot. A UI cropped to fill a landscape
   *  frame shows a random corner of itself and identifies nothing, which is
   *  what made three of these covers unreadable. */
  fit = "cover",
}: {
  src: string;
  token: string;
  fit?: "cover" | "contain";
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* ⚠ Everything the loop touches lives in refs, not state. A cover that
   * re-rendered React on pointer move would be a worse version of the thing it
   * is trying to impress you with. */
  const srcRef = useRef(src);
  const tokenRef = useRef(token);
  const fitRef = useRef(fit);
  srcRef.current = src;
  fitRef.current = fit;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* ⚠ THE STAGE HAS TO BE TOLD WHEN THIS FAILS. The CSS that hides the
     * photograph behind the reconstruction keys off the presence of the canvas
     * element, and the element exists before the context is asked for. Without
     * this flag a machine with no WebGL2 got a black cover instead of a
     * photograph, which is the worst possible way to fail. */
    const stageEl = canvas.parentElement;
    const giveUp = () => {
      stageEl?.setAttribute("data-field", "off");
    };

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return giveUp();

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return giveUp();
    const prog = gl.createProgram();
    if (!prog) return giveUp();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return giveUp();
    gl.useProgram(prog);

    /* --- the grid ---------------------------------------------------------
     * Sized off the viewport so a phone does not pay for a desktop's density,
     * and hard-capped so a 4K monitor does not either. */
    const wide = window.innerWidth;
    /* ⚠ FINER THAN IT LOOKS LIKE IT NEEDS TO BE. At one point per seven CSS
     * pixels the resolved field read as a coarse halftone rather than as the
     * photograph, which is the single thing people said about it. Four and a
     * half is dense enough that the picture is legible while it is still made
     * of points, and it is still only about fifty thousand of them. */
    const cols = Math.round(Math.max(120, Math.min(340, wide / 4.5)));
    /* ⚠ ROWS COME FROM THE CANVAS'S OWN ASPECT, NOT FROM A CONSTANT. A fixed
     * 0.62 gave a grid whose cells were 3.1px wide and 4.0px tall inside a
     * 1.25 frame, so a point big enough to close the horizontal gaps still
     * left a row of holes vertically and the resolved picture read as
     * stippling rather than as the photograph. Square cells, square points. */
    const boxW = canvas.clientWidth || wide;
    const boxH = canvas.clientHeight || Math.round(wide * 0.6);
    const rows = Math.max(40, Math.round((cols * boxH) / boxW));
    const count = cols * rows;

    const cells = new Float32Array(count * 2);
    for (let y = 0, i = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++, i += 2) {
        cells[i] = x;
        cells[i + 1] = y;
      }
    }
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, cells, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_cell");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      src: gl.getUniformLocation(prog, "u_src"),
      grid: gl.getUniformLocation(prog, "u_grid"),
      viewport: gl.getUniformLocation(prog, "u_viewport"),
      cover: gl.getUniformLocation(prog, "u_cover"),
      resolve: gl.getUniformLocation(prog, "u_resolve"),
      time: gl.getUniformLocation(prog, "u_time"),
      pointer: gl.getUniformLocation(prog, "u_pointer"),
      pointerOn: gl.getUniformLocation(prog, "u_pointerOn"),
      size: gl.getUniformLocation(prog, "u_size"),
      contain: gl.getUniformLocation(prog, "u_contain"),
      bias: gl.getUniformLocation(prog, "u_bias"),
    };

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    /* One opaque pixel until the first image lands, so the very first frame is
       a cloud rather than a black rectangle or a WebGL warning. */
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([120, 120, 124, 255]),
    );
    gl.uniform1i(u.src, 0);
    gl.uniform2f(u.grid, cols, rows);
    gl.uniform2f(u.cover, 1, 1);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.viewport, w, h);
      /* Sized off the LARGER of the two cell dimensions, so the field closes
         on both axes at every aspect the frame can take. */
      const cell = Math.max(w / cols, h / rows);
      gl.uniform1f(u.size, Math.max(1.6, cell * dpr * 1.32));
      fitCover();
    };

    /* The source is a photograph with its own aspect; the field is the cover's.
       This is `object-fit: cover`, done in UV space. */
    let imgAspect = 1.6;
    const fitCover = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      const boxAspect = w / h;
      const contain = fitRef.current === "contain";
      gl.uniform1f(u.contain, contain ? 1 : 0);
      /* `u_cover` is the span of the source sampled across the frame. Under a
         unit it crops; over a unit it leaves margin, which is what contain is. */
      let coverX: number;
      if (contain === boxAspect > imgAspect) {
        coverX = boxAspect / imgAspect;
        gl.uniform2f(u.cover, coverX, 1);
      } else {
        coverX = 1;
        gl.uniform2f(u.cover, 1, imgAspect / boxAspect);
      }
      gl.uniform1f(u.bias, contain ? 0.17 * coverX : 0);
    };

    /* --- the source image ------------------------------------------------- */
    let disposed = false;
    let pending = "";
    const loadImage = (url: string) => {
      if (url === pending) return;
      pending = url;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.onload = () => {
        if (disposed || pending !== url) return;
        imgAspect = img.naturalWidth / Math.max(1, img.naturalHeight);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          img,
        );
        fitCover();
      };
      img.src = url;
    };

    /* --- the pointer ------------------------------------------------------ */
    let px = 0;
    let py = 0;
    let pOn = 0;
    let pTarget = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = -(((e.clientY - r.top) / r.height) * 2 - 1);
      pTarget = 1;
    };
    const onLeave = () => {
      pTarget = 0;
    };

    /* --- the resolve ------------------------------------------------------
     * ⚠ THE VALUE IS PUBLISHED TO CSS, AND THAT IS WHAT MAKES THE ENDING WORK.
     * The field alone never becomes the photograph; it becomes a stipple of
     * it, which is a lovely thing to watch arrive and a poor thing to look at
     * afterwards. The parent reads `--resolve` and brings the real image up
     * underneath as the points land, so the sequence is cloud, then points,
     * then the work itself, with the field still breathing over the top.
     * ------------------------------------------------------------------- */
    let resolve = 0;
    let holding = 0;
    let current = "";
    const stage = canvas.parentElement;
    let published = -1;
    let readoutAt = -1;
    const readout = document.createElement("p");
    readout.className = "cover-readout";
    readout.setAttribute("aria-hidden", "true");
    stage?.appendChild(readout);
    const nf = new Intl.NumberFormat("en-US");

    /* --- the loop --------------------------------------------------------- */
    let raf = 0;
    let running = true;
    let last = performance.now();
    const start = last;

    const frame = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const wanted = srcRef.current;
      if (wanted !== current) {
        /* Scatter, swap at the bottom of the dip, then resolve again. */
        if (resolve > 0.02 && holding === 0) {
          resolve = Math.max(0, resolve - dt * 3.2);
          if (resolve <= 0.02) {
            current = wanted;
            loadImage(wanted);
            holding = 1;
          }
        } else {
          current = wanted;
          loadImage(wanted);
          holding = 1;
        }
      } else if (resolve < 1) {
        /* Slower on the way in than on the way out: the reveal is the event. */
        /* ⚠ Slow on purpose. This is the only thing on the cover worth
           watching arrive, and at the old rate it was over before anyone had
           finished reading the first line of the sentence. */
        resolve = Math.min(1, resolve + dt * (holding ? 0.6 : 0.42));
        if (resolve >= 1) holding = 0;
      }

      pOn += (pTarget - pOn) * Math.min(1, dt * 6);

      /* Two hundredths is under one frame of visible change; publishing every
         frame would thrash style recalculation for nothing. */
      const shown = reduced ? 1 : resolve;
      if (Math.abs(shown - published) > 0.02 || shown === 1 || shown === 0) {
        published = shown;
        stage?.style.setProperty("--resolve", shown.toFixed(3));
      }

      /* ⚠ THE READOUT EXISTS BECAUSE THE EFFECT DID NOT EXPLAIN ITSELF. It
         looked expensive and meant nothing: people watched it and asked what it
         was doing. It now says so, in the site's own metadata voice, and the
         number it lands on is the real one. */
      const pct = Math.round(shown * 100);
      if (pct !== readoutAt) {
        readoutAt = pct;
        readout.textContent =
          pct >= 100
            ? `${nf.format(count)} points · ${tokenRef.current}`
            : `Reconstructing ${tokenRef.current} · ${String(pct).padStart(2, "0")}%`;
      }

      gl.uniform1f(u.resolve, reduced ? 1 : resolve);
      gl.uniform1f(u.time, reduced ? 0 : (now - start) / 1000);
      gl.uniform2f(u.pointer, px, py);
      gl.uniform1f(u.pointerOn, reduced ? 0 : pOn);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, count);

      if (running) raf = requestAnimationFrame(frame);
    };

    resize();
    loadImage(srcRef.current);
    current = srcRef.current;
    raf = requestAnimationFrame(frame);

    /* Stop dead when the cover is off screen. */
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !running) {
          running = true;
          last = performance.now();
          raf = requestAnimationFrame(frame);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    /* A lost context is the same failure as never having had one. */
    const onLost = (e: Event) => {
      e.preventDefault();
      giveUp();
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      gl.deleteTexture(tex);
      readout.remove();
    };
    /* ⚠ EMPTY DEPS ON PURPOSE. The loop reads `srcRef.current`, so a project
     * change is picked up inside the frame instead of by re-running this
     * effect. Adding `src` here would tear down and rebuild the entire WebGL
     * context, its shaders, its buffer and its texture six times as somebody
     * moves a pointer across the index. */
  }, []);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  /* ⚠ THE CANVAS IS ALWAYS RENDERED, AND IT IS NOT GATED ON A HYDRATION FLAG.
   * The first version returned `null` until a `useHydrated` effect had run,
   * which meant the effect above fired once with `canvasRef.current === null`,
   * bailed, and never ran again: the canvas mounted at its default 300x150 and
   * nothing was ever drawn into it. An empty <canvas> is identical on the
   * server and the client, so there is nothing to hydrate around. */
  return <canvas ref={canvasRef} className="cover-field" aria-hidden />;
}
