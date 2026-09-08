/* ===========================================================================
 * THE SEAM — the handoff between two project worlds.
 *
 * ⚠ THIS REPLACED A FULL 100svh NEUTRAL SCREEN BETWEEN EVERY ROOM, and the
 * reason matters, because the obvious fix is to put the screen back.
 *
 * A viewport-tall blank passage does isolate two environments, but it costs a
 * whole screen of scrolling per boundary — five of them turned a six-project
 * homepage into fifteen screens, of which five said nothing. And it still
 * failed at the edges: a room whose content is shorter than the viewport can
 * share the frame with the room after it at some zoom levels, because the
 * passage only separates what is directly adjacent to it in FLOW.
 *
 * What is here instead separates in PAINT rather than in flow. The seam is a
 * short band — about 16svh of scrolling — that carries negative block margins
 * equal to its own fade, so it physically OVERLAPS the bottom of the room above
 * it and the top of the room below it, and its background is
 *
 *     transparent → solid → solid → transparent
 *
 * so those overlapped edges are drawn as darkness rather than as a hard cut.
 * The dark zone that results is roughly 44svh wide while only costing 16svh of
 * page, so at every zoom level a boundary reads as one room dissolving before
 * the next arrives — and it reads identically scrolling back up, because a
 * gradient has no direction.
 *
 * Everything here is native scroll. No wheel listener, no snap, no pin, no
 * one-way animation. See `rooms.css` for the geometry, which is where the two
 * numbers that matter (`--seam-fade` and the band height) live.
 * ======================================================================== */

export default function WorldPassage({
  n,
  title,
}: {
  n: string;
  title: string;
}) {
  return (
    <div className="seam" data-world="seam" data-world-panel>
      <p className="seam-line">
        <span className="seam-n tabular-nums">{n}</span>
        <span aria-hidden className="seam-rule" />
        <span className="seam-title">{title}</span>
        <span aria-hidden className="seam-arrow">
          ↓
        </span>
      </p>
    </div>
  );
}
