import Image from "next/image";

/* ===========================================================================
 * THE ROOM PLATE — a world's ground, made of the project's own material.
 *
 * ⚠ WHY THIS EXISTS AND `Ambience` IS NOT ENOUGH. The fixed ambience layer sits
 * at `z-index: 0` behind everything, and every room on the homepage paints an
 * opaque `bg-ground`. So on the homepage the ambience is only ever visible
 * where nothing opaque is drawn: the opening, the seams, and the routes. Inside
 * a room it is completely covered. The fix is not to make the rooms
 * transparent, because two rooms are on screen during a handoff and the body
 * only carries one world's colour at a time. It is to give each room its own
 * ground, inside itself.
 *
 * ⚠ AND THE GROUND IS A REAL PHOTOGRAPH, NOT A GRADIENT. Every world here has
 * exactly one piece of true material checked into `public/work/`: the game's
 * key art, the signed-in product, the instrument, the debugger, the reading
 * station, the strip chart. A generated blob recoloured six times is the thing
 * this site is explicitly not allowed to be.
 *
 * The veil is per world and lives in CSS, because it has to be tuned against
 * that world's ink. See `rooms.css`. Nothing here animates on its own: the slow
 * drift is a CSS animation so it costs nothing on the main thread and turns
 * itself off under `prefers-reduced-motion`.
 * ======================================================================== */

export default function RoomPlate({ src }: { src: string }) {
  return (
    <div aria-hidden className="room-plate">
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
    </div>
  );
}
