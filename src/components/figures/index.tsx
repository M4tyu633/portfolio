import dynamic from "next/dynamic";
import type { FigureId } from "@/content/types";

/* ===========================================================================
 * THE FIGURE REGISTRY.
 *
 * Every interactive figure on the site is behind a dynamic import, so a case
 * study only ships the JavaScript for the figures it actually contains. The
 * archive, the achievements pages and /about ship none of it at all.
 *
 * The map is typed against `FigureId`, so a block referencing a figure that
 * does not exist is a build error rather than an empty div.
 * ======================================================================== */

const ThrowFigure = dynamic(() => import("./ThrowFigure"));
const ContactFigure = dynamic(() => import("./ContactFigure"));
const NetworkFigure = dynamic(() => import("./NetworkFigure"));
const RouteFigure = dynamic(() => import("./RouteFigure"));
const LedgerFigure = dynamic(() => import("./LedgerFigure"));
const GraphFigure = dynamic(() => import("./GraphFigure"));
const MachineFigure = dynamic(() => import("./MachineFigure"));

const REGISTRY: Record<FigureId, React.ComponentType> = {
  "tp-throw": ThrowFigure,
  "tp-contact": ContactFigure,
  "tp-network": NetworkFigure,
  "eg-route": RouteFigure,
  "eg-ledger": LedgerFigure,
  "gs-graph": GraphFigure,
  "c8-machine": MachineFigure,
};

export default function InteractiveFigure({ id }: { id: FigureId }) {
  const Component = REGISTRY[id];
  return <Component />;
}
