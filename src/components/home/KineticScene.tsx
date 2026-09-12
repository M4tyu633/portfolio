"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/lib/sound";

/** Original parametric sculpture. No downloaded models or project imagery. */
export default function KineticScene() {
  const { getLevel } = useSound();
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const control = useRef({
    paused: false,
    expanded: false,
    x: 0,
    y: 0,
    drag: false,
  });
  useEffect(() => {
    control.current.paused = paused;
    control.current.expanded = expanded;
  }, [paused, expanded]);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let teardown = () => {};
    Promise.all([
      import("three"),
      import("three/addons/environments/RoomEnvironment.js"),
    ])
      .then(([THREE, { RoomEnvironment }]) => {
        if (disposed) return;
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.6;
        container.append(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 40);
        camera.position.set(0, 0, 8.1);
        const environment = new RoomEnvironment();
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envTarget = pmrem.fromScene(environment, 0.03);
        scene.environment = envTarget.texture;
        environment.dispose();
        pmrem.dispose();
        const sculpture = new THREE.Group();
        scene.add(sculpture);
        const materials: import("three").Material[] = [];
        const geometries: import("three").BufferGeometry[] = [];
        const bladeShape = new THREE.Shape();
        bladeShape.moveTo(0.74, -0.22);
        bladeShape.bezierCurveTo(1.16, -0.5, 1.88, -0.13, 1.8, 0.36);
        bladeShape.lineTo(1.22, 0.82);
        bladeShape.bezierCurveTo(0.93, 0.54, 0.69, 0.12, 0.74, -0.22);
        const bladeGeometry = new THREE.ExtrudeGeometry(bladeShape, {
          depth: 0.11,
          bevelEnabled: true,
          bevelThickness: 0.045,
          bevelSize: 0.035,
          bevelSegments: 3,
          curveSegments: 24,
        });
        geometries.push(bladeGeometry);
        const blades: import("three").Mesh[] = [];
        for (let index = 0; index < 18; index++) {
          const material = new THREE.MeshStandardMaterial({
            color: index % 6 === 0 ? "#c1c8e4" : "#8399c4",
            metalness: 0.98,
            roughness: 0.23,
            envMapIntensity: 1.2,
          });
          materials.push(material);
          const blade = new THREE.Mesh(bladeGeometry, material);
          blade.rotation.z = (index / 18) * Math.PI * 2;
          blade.position.z = index * 0.017;
          sculpture.add(blade);
          blades.push(blade);
        }
        const sphereGeometry = new THREE.SphereGeometry(0.49, 48, 32);
        const sphereMaterial = new THREE.MeshPhysicalMaterial({
          color: "#fc724b",
          metalness: 0.5,
          roughness: 0.16,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
        });
        geometries.push(sphereGeometry);
        materials.push(sphereMaterial);
        const core = new THREE.Mesh(sphereGeometry, sphereMaterial);
        core.position.z = 0.16;
        sculpture.add(core);
        const ringGeometry = new THREE.TorusGeometry(2.15, 0.009, 8, 180);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: "#647899",
          transparent: true,
          opacity: 0.5,
        });
        geometries.push(ringGeometry);
        materials.push(ringMaterial);
        const orbit = new THREE.Mesh(ringGeometry, ringMaterial);
        orbit.rotation.set(0.55, -0.3, 0);
        sculpture.add(orbit);
        const key = new THREE.DirectionalLight("#c0d9ff", 4);
        key.position.set(2, 3, 5);
        scene.add(key);
        const warm = new THREE.PointLight("#ff7043", 32, 20);
        warm.position.set(-3, -0.5, 3);
        scene.add(warm);
        const blue = new THREE.PointLight("#365dff", 45, 20);
        blue.position.set(2, 1, -2);
        scene.add(blue);
        const resize = () => {
          const { width, height } = container.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.position.z = width < 450 ? 8.8 : 8.1;
          camera.updateProjectionMatrix();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(container);
        resize();
        let visible = true;
        const visibility = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        visibility.observe(container);
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let time = 0,
          last = 0,
          openness = 0,
          energy = 0;
        let lastX = -100,
          lastY = -100,
          lastOpen = -1;
        renderer.setAnimationLoop((stamp) => {
          const elapsed = Math.min((stamp - last) / 1000, 0.05);
          last = stamp;
          if (!visible || document.hidden) return;
          const input = control.current;
          const still = input.paused || motion.matches;
          energy += ((still ? 0 : getLevel()) - energy) * 0.09;
          if (!still) time += elapsed;
          const targetOpen = (input.expanded ? 1 : 0) + energy * 0.2;
          openness += (targetOpen - openness) * (motion.matches ? 1 : 0.075);
          const targetX = 0.16 + input.y * 0.35;
          const targetY = -0.42 + input.x * 0.55;
          sculpture.rotation.x += (targetX - sculpture.rotation.x) * 0.065;
          sculpture.rotation.y += (targetY - sculpture.rotation.y) * 0.065;
          sculpture.rotation.z = -0.16 + time * 0.055;
          core.rotation.y = -time * 0.3;
          core.position.z = 0.2 + openness * 0.38;
          core.scale.setScalar(1 + energy * 0.09);
          warm.intensity = 32 + energy * 24;
          blades.forEach((blade, index) => {
            const angle = (index / 18) * Math.PI * 2;
            blade.position.x = Math.cos(angle) * openness * 0.38;
            blade.position.y = Math.sin(angle) * openness * 0.38;
            blade.rotation.z = angle + openness * 0.24;
            blade.rotation.x =
              Math.sin(time * 0.3 + angle) * (still ? 0 : 0.025);
          });
          if (
            still &&
            Math.abs(sculpture.rotation.x - lastX) < 0.0001 &&
            Math.abs(sculpture.rotation.y - lastY) < 0.0001 &&
            Math.abs(openness - lastOpen) < 0.0001
          )
            return;
          lastX = sculpture.rotation.x;
          lastY = sculpture.rotation.y;
          lastOpen = openness;
          renderer.render(scene, camera);
        });
        const lost = (event: Event) => {
          event.preventDefault();
          setReady(false);
        };
        renderer.domElement.addEventListener("webglcontextlost", lost);
        teardown = () => {
          observer.disconnect();
          visibility.disconnect();
          renderer.setAnimationLoop(null);
          renderer.domElement.removeEventListener("webglcontextlost", lost);
          geometries.forEach((geometry) => geometry.dispose());
          materials.forEach((material) => material.dispose());
          envTarget.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
        setReady(true);
      })
      .catch(() => {
        /* The static sculpture remains available without WebGL. */
      });
    return () => {
      disposed = true;
      teardown();
    };
  }, [getLevel]);

  return (
    <div className="kinetic-art" data-ready={ready}>
      <div className="kinetic-static" aria-hidden="true">
        <div />
        <i />
      </div>
      <div
        className="kinetic-canvas"
        ref={host}
        role="img"
        aria-label="An original interactive sculpture: eighteen metallic blades surrounding an orange core."
        tabIndex={0}
        onPointerMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect();
          control.current.x = (event.clientX - box.left) / box.width - 0.5;
          control.current.y = (event.clientY - box.top) / box.height - 0.5;
        }}
        onPointerLeave={() => {
          control.current.x = 0;
          control.current.y = 0;
        }}
        onKeyDown={(event) => {
          if (
            [
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "Home",
            ].includes(event.key)
          ) {
            event.preventDefault();
            if (event.key === "Home") {
              control.current.x = 0;
              control.current.y = 0;
            } else if (event.key === "ArrowLeft") control.current.x -= 0.15;
            else if (event.key === "ArrowRight") control.current.x += 0.15;
            else if (event.key === "ArrowUp") control.current.y -= 0.15;
            else control.current.y += 0.15;
          }
        }}
      />
      <div className="kinetic-caption">
        <span>FORM STUDY / 001</span>
        <div>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-pressed={expanded}
          >
            {expanded ? "Contract" : "Expand"} <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
          >
            {paused ? "Resume motion" : "Pause motion"}
          </button>
        </div>
      </div>
    </div>
  );
}
