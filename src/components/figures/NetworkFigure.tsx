"use client";

import { useState } from "react";

/* ===========================================================================
 * A HOST CANNOT RELIABLY KNOW ITS OWN ADDRESS.
 *
 * Four candidate interfaces, offered in no promised order, and only one of them
 * is the answer. Select one to see what shipping it in the beacon payload would
 * have done.
 *
 * Addresses are written as prefixes rather than as invented full addresses. The
 * prefix is the fact (25.x is Hamachi, 169.254.x is a self-assigned failure);
 * the host part would be made up. `100.64.0.1` is the exception and is written
 * in full because it is the measured second hop on his own connection, and it
 * is the whole reason there is a machine in Singapore.
 * ======================================================================== */

const INTERFACES = [
  {
    prefix: "192.168.1.x",
    name: "LAN card",
    verdict:
      "Correct on this network and nowhere else. Anyone joining from another subnet is handed an address that does not resolve for them.",
    ok: false,
  },
  {
    prefix: "25.x.x.x",
    name: "Hamachi overlay",
    verdict:
      "Only reachable by peers already on that overlay, which is nobody who has just downloaded the game.",
    ok: false,
  },
  {
    prefix: "26.x.x.x",
    name: "Radmin adapter",
    verdict:
      "Installed and inert. It reads like a real interface in the list and routes to nothing.",
    ok: false,
  },
  {
    prefix: "169.254.x.x",
    name: "Link-local",
    verdict:
      "Self-assigned, which means the machine failed to get an address at all. It is offered in the same list, in the same shape, as the ones that work.",
    ok: false,
  },
];

export default function NetworkFigure() {
  const [selected, setSelected] = useState(0);
  const chosen = INTERFACES[selected];

  return (
    <figure className="border-rule bg-ground-2 my-12 border">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* -------- the candidates -------- */}
        <div className="border-rule border-b p-4 sm:p-5 lg:border-r lg:border-b-0">
          <h3 className="u-meta text-ink-3">
            Ask the host for its address
          </h3>
          <p className="text-ink-3 mt-2 text-[0.8125rem] leading-relaxed">
            It offers all four, in no promised order.
          </p>

          <ul className="mt-4 space-y-px" role="listbox" aria-label="Candidate interfaces">
            {INTERFACES.map((iface, i) => (
              <li key={iface.prefix}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected === i}
                  onClick={() => setSelected(i)}
                  className={`flex w-full items-baseline gap-3 border px-3 py-2.5 text-left transition-colors ${
                    selected === i
                      ? "border-focus bg-ground"
                      : "border-transparent hover:bg-ground"
                  }`}
                >
                  <span
                    aria-hidden
                    className="font-mono text-xs"
                    style={{
                      color:
                        selected === i ? "var(--w-focus)" : "var(--w-ink-3)",
                    }}
                  >
                    {selected === i ? "▸" : "·"}
                  </span>
                  <span className="font-mono text-sm">{iface.prefix}</span>
                  <span className="u-meta text-ink-3 ml-auto normal-case tracking-[0.04em]">
                    {iface.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <p
            aria-live="polite"
            className="border-rule text-ink-2 mt-4 border-t pt-4 text-[0.875rem] leading-relaxed"
          >
            <span className="u-meta text-focus mr-2">If the beacon carried it</span>
            {chosen.verdict}
          </p>
        </div>

        {/* -------- what the beacon actually carries -------- */}
        <div className="p-4 sm:p-5">
          <h3 className="u-meta text-ink-3">So the beacon carries neither</h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="border-accent bg-ground border px-3 py-2.5 font-mono text-sm">
              {"{ port: 8910 }"}
            </div>
            <p className="text-ink-2 text-[0.875rem] leading-relaxed">
              The receiver has no such problem, so the payload carries only the
              port and the listener takes the host half from the datagram&rsquo;s own
              source address.
            </p>
          </div>

          <p className="text-ink-3 mt-4 text-[0.8125rem] leading-relaxed">
            If anyone later helpfully puts an address back in the payload, the
            bug is back.
          </p>

          <hr className="u-rule my-5" />

          <h3 className="u-meta text-ink-3">And then LAN is not enough</h3>
          <pre className="text-ink-2 mt-3 overflow-x-auto font-mono text-xs leading-[1.7]">
            {`traceroute
  1   192.168.1.1     the router
  2   100.64.0.1      carrier-grade NAT
  3   ...`}
          </pre>
          <p className="text-ink-2 mt-3 text-[0.875rem] leading-relaxed">
            A second hop in <code className="font-mono">100.64.0.0/10</code> means
            the address the internet sees is not yours, and no port-forwarding
            rule on your own router is reachable from outside. Options: an
            overlay network, a tunnel, or a machine with a public address.
          </p>

          <div className="border-rule bg-ground mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 border px-3 py-2.5">
            <span className="u-meta text-accent">Singapore VPS</span>
            <span className="text-ink-2 text-[0.875rem]">
              Dedicated lobbies, join codes over a small UDP status protocol
              that sits separately from the game ports.
            </span>
          </div>
        </div>
      </div>

      <figcaption className="border-rule text-ink-3 border-t px-4 py-3 text-[0.8125rem] leading-relaxed">
        Prefixes rather than full addresses: the prefix is the fact, the host
        part would be invented. The second hop is written in full because it was
        measured.
      </figcaption>
    </figure>
  );
}
