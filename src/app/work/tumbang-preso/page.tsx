import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { daruma } from "@/app/fonts";
import Nav from "@/components/chrome/Nav";
import WorldSync from "@/components/chrome/WorldSync";
import ContactEvidence from "@/components/figures/ContactEvidence";

import NetworkFigure from "@/components/figures/NetworkFigure";

import GameClip from "@/components/media/GameClip";
import PhotoStrip from "@/components/media/PhotoStrip";
import { tumbangPreso as p } from "@/content/projects/tumbang-preso";
import { site } from "@/content/site";

/* ===========================================================================
 * 01 · TUMBANG PRESO — its own route, its own composition.
 *
 * ⚠⚠ THIS PAGE DELIBERATELY DOES NOT USE `ProjectHero`, `Blocks` OR THE SHARED
 * SECTION SHELL. A flagship project that gets its own world cannot be laid out
 * by the same component that lays out every other project, or the "world" is a
 * colour swap and nothing else. `/work/[slug]` still serves the projects that
 * do not have a bespoke route; this static segment simply wins for this slug.
 *
 * ⚠⚠ AND EVERY IMAGE AND CLIP ON IT IS THE REAL GAME, from the GODOT build that
 * won Gear Up NCR. The menu backdrop, the wordmark and the pennants are his own
 * files out of `DOST-GameDev/assets`; the clips and stills are frames of the
 * actual demo capture; the photographs are his own, from the venue and from the
 * PC Express showcase. `scripts/build-tumbang-media.sh` records every source.
 *
 * The one abstract thing on the page is the collision lab in movement 05, and
 * it is labelled as a diagram in as many words, because it is the only part
 * that is not the game.
 * ======================================================================== */

export const metadata: Metadata = {
  title: "Tumbang Preso",
  description: p.oneLiner,
  alternates: { canonical: `${site.url}/work/tumbang-preso` },
  openGraph: {
    title: `Tumbang Preso · ${site.name}`,
    description: p.oneLiner,
    url: `${site.url}/work/tumbang-preso`,
    type: "article",
  },
};

const M = "/work/tumbang";

const SHOWCASE = [
  {
    src: `${M}/event-playing.webp`,
    alt: "Students playing Tumbang Preso on gaming PCs at a mall booth.",
    caption: "Strangers, on the booth machines.",
  },
  {
    src: `${M}/event-wall.webp`,
    alt: "The game running on a large LED wall with a crowd watching.",
    caption: "The game on the LED wall.",
  },
  {
    src: `${M}/event-stage.webp`,
    alt: "The BH Studios team on stage with the Tumbang Preso menu behind them.",
    caption: "The menu, four metres wide.",
  },
  {
    src: `${M}/event-crowd.webp`,
    alt: "A seated audience watching a presentation about the game.",
    caption: "PC Express, Intel Gamer Days.",
  },
  {
    src: `${M}/event-hands.webp`,
    alt: "A player at a laptop with the game on screen.",
    caption: "Somebody's first round.",
  },
];

export default function TumbangPage() {
  return (
    <div
      data-world="tumbang"
      data-display="daruma"
      className={`${daruma.variable} bg-ground text-ink`}
    >
      <WorldSync world="tumbang" />
      <Nav tick={{ n: p.n, title: p.title }} overlay />

      <main id="main" className="flex-1">
        {/* =================================================================
         * HERO — the game's own key art, full bleed, and nothing else on it
         * but the title and one line.
         * ============================================================== */}
        <header
          data-surface="stage"
          /* -mt-[4.25rem] pulls the hero up under the transparent bar, so the
             key art starts at the very top of the window rather than below a
             strip of cream. pt- puts the safe area back for the content. */
          className="relative -mt-[4.25rem] flex min-h-dvh flex-col justify-end overflow-hidden pt-[4.25rem]"
        >
          <Image
            src={`${M}/backdrop.webp`}
            alt="A rusted tin can and a slipper on asphalt inside a chalk circle, on a street of brick and blue buildings."
            fill
            priority
            sizes="100vw"
            /* ⚠ object-position, not the default centre. The key art is a wide
               shot and the lata and the tsinelas sit low and right of centre in
               it; at phone width a centred cover crop shows a wall. */
            className="object-cover object-[68%_62%] sm:object-center"
          />
          {/* Two gradients, and both are load-bearing. The bottom one gives the
              type somewhere to sit without dimming the art it sits on. The top
              one is only 120px tall and exists because the navigation is drawn
              in cream over this photograph, and the sky behind it is bright:
              without it "Matthew Labrador" disappears into a building. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(20,14,8,.88) 0%, rgba(20,14,8,.55) 26%, rgba(20,14,8,0) 58%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-32"
            style={{
              background:
                "linear-gradient(to bottom, rgba(20,14,8,.55) 0%, rgba(20,14,8,0) 100%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-[92rem] px-5 pb-12 sm:px-8 sm:pb-16">
            <Image
              src={`${M}/wordmark.webp`}
              alt="TÜMP"
              width={1100}
              height={316}
              priority
              className="h-auto w-[min(44vw,20rem)] drop-shadow-[0_3px_0_rgba(0,0,0,.35)]"
            />
            <h1 className="u-display mt-5 max-w-[16ch] text-[clamp(2.4rem,7vw,6rem)] text-[#feebd4]">
              Five days. Four players. One tin can.
            </h1>
            <p className="u-meta mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[#fcd39f]">
              <span
                className="border px-2.5 py-1.5"
                style={{ borderColor: "#f5b521", color: "#f5b521" }}
              >
                1st Place
              </span>
              <span className="hidden sm:inline">
                Gear Up NCR Esports Game Dev Challenge
              </span>
              <span className="sm:hidden">Gear Up NCR</span>
              <span aria-hidden>/</span>
              <span>2026</span>
            </p>
          </div>

          <a
            href="#m01"
            className="u-meta relative mx-auto w-full max-w-[92rem] px-5 pb-8 text-[#fcd39f] sm:px-8"
          >
            Enter the build ↓
          </a>
        </header>

        {/* =================================================================
         * 01 — what the game actually is. Short. The numbers are set in the
         * game's own face at poster scale rather than dropped into a six-cell
         * dossier.
         * ============================================================== */}
        <section
          id="m01"
          aria-labelledby="m01h"
          className="scroll-mt-[4.25rem]"
        >
          <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24">
            <h2 id="m01h" className="u-display text-[clamp(2rem,5vw,3.75rem)]">
              This is a party game about hitting a can with a slipper.
            </h2>
            <p className="u-prose mt-6 text-[1.25rem]">
              Tumbang Preso is the street game every Filipino kid knows. One
              player is the <strong>taya</strong>, stuck inside a chalk box
              guarding the <strong>lata</strong>. Everybody else throws a{" "}
              <strong>tsinelas</strong> at it from outside.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
              {[
                ["4", "rounds", "one per player, so everyone is taya once"],
                ["90", "seconds", "a round"],
                ["1", "taya", "against three attackers"],
                ["+100", "points", "for a knockdown, to whoever threw"],
              ].map(([n, unit, note]) => (
                <div key={unit}>
                  <dd className="u-display text-accent text-[clamp(3rem,7vw,5.5rem)] leading-[0.8]">
                    {n}
                    <span className="text-ink-2 ml-2 text-[0.3em] tracking-normal">
                      {unit}
                    </span>
                  </dd>
                  <dt className="text-ink-2 mt-4 text-[0.9375rem] leading-snug">
                    {note}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* The retrieval rule, over a full-bleed round in progress. */}
          <div data-surface="stage" className="bg-ground">
            <GameClip
              src={`${M}/match.mp4`}
              poster={`${M}/match-poster.webp`}
              alt="A round of Tumbang Preso in first person: the scoreboard, the timer, the lata standing in the road."
              ratio="16 / 9"
              className="max-h-[76vh] w-full"
            />
            <div className="mx-auto max-w-[92rem] px-5 py-8 sm:px-8">
              <p className="u-prose text-ink text-[1.125rem]">
                The interesting part is not the throw. Throwing is free. Your
                slipper lands <em>inside</em> the taya&rsquo;s box, and walking
                in to pick it up is exactly what puts you in range of being
                tagged.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================================
         * 02 — two more clips, and the one line about ownership.
         * ============================================================== */}
        <section aria-labelledby="m02h" className="border-rule border-t">
          <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24">
            <h2
              id="m02h"
              className="u-display text-[clamp(2rem,5.5vw,4.25rem)]"
            >
              The team built the entry. I built the game.
            </h2>
            <p className="u-prose mt-6 text-[1.1875rem]">
              Every 3D model and character, the map, the interface, the sound
              design, the bots, the physics, the netcode, and the codebase under
              all of it. Then the marketing, the deck, the pitch, and the
              Q&amp;A in front of the judges.
            </p>
            <p className="u-prose mt-5">
              Five days is why a lot of what follows looks blunt. I did not have
              time for the clever version of any of these problems. I had time
              for the version I could measure, confirm, and then stop thinking
              about.
            </p>

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              <figure className="m-0">
                <GameClip
                  src={`${M}/taya.mp4`}
                  poster={`${M}/taya-poster.webp`}
                  alt="The taya defending the lata in the plaza while an attacker closes in."
                  className="border-rule border"
                />
                <figcaption className="u-meta text-ink-3 mt-3 tracking-[0.04em] normal-case">
                  Bayan Plaza. The taya has to hold the box and the can at once.
                </figcaption>
              </figure>
              <figure className="m-0">
                <GameClip
                  src={`${M}/plaza.mp4`}
                  poster={`${M}/plaza-poster.webp`}
                  alt="A wide view of the Eskinita street map during a match."
                  className="border-rule border"
                />
                <figcaption className="u-meta text-ink-3 mt-3 tracking-[0.04em] normal-case">
                  Eskinita. Every building, prop and character in it is ours.
                </figcaption>
              </figure>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Plate
                src={`${M}/menu.webp`}
                alt="The Tumbang Preso main menu, with hand-lettered pennant buttons over the street."
                caption="The menu. The pennants are drawn, not generated."
              />
              <Plate
                src={`${M}/select.webp`}
                alt="The character select screen showing a player, their name and three stat meters."
                caption="Pick a person, a lata and a tsinelas. All three reach gameplay."
              />
            </div>
          </div>
        </section>

        {/* =================================================================
         * 03 — the picks, and the honesty rule under them.
         * ============================================================== */}
        <section aria-labelledby="m03h" className="border-rule border-t">
          <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <h2
                id="m03h"
                className="u-display text-[clamp(1.8rem,4vw,3.25rem)]"
              >
                The picks change how you play, but only a little.
              </h2>
              <div>
                <p className="u-prose">
                  Each of the three carries three meters, named per tab after
                  what they actually do, because a can does not walk and a
                  slipper does not get stunned. The lata&rsquo;s three are three
                  answers to the same question: STANCE refuses the knockdown,
                  RESET shortens the recovery, REBOUND punishes you for trying.
                </p>
                <p className="u-prose mt-5">
                  I kept the spread deliberately narrow. A pick that is 40%
                  better than the others is not a personality, it is just the
                  right answer, and then nobody picks anything else.
                </p>
              </div>
            </div>

            <div className="border-rule mt-12 grid gap-px border sm:grid-cols-2">
              <Stat
                value="±10–14%"
                label="Spread across the full range of picks"
              />
              <Stat
                value="32%"
                label="Collider radius difference between the four cans, which is why the scoring window is derived from the STANCE meter instead"
                marker
              />
            </div>
            <p className="u-prose mt-6">
              Any competitive difference between cosmetic picks has to be
              declared. Otherwise the best-looking can is quietly the hardest to
              hit and nothing on screen tells you.
            </p>
          </div>
        </section>

        {/* =================================================================
         * 04 — THE COLLISION LAB. The one abstract movement, and it says so.
         * ============================================================== */}
        <section
          id="s03"
          aria-labelledby="m04h"
          data-surface="stage"
          className="bg-ground scroll-mt-[4.25rem]"
        >
          <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24">
            <p className="u-meta text-accent">
              Engineering visualisation · not the game
            </p>
            <h2
              id="m04h"
              className="u-display mt-4 max-w-[20ch] text-[clamp(2rem,5.5vw,4.25rem)]"
            >
              I stopped trusting the engine&rsquo;s collision callbacks.
            </h2>
            <p className="u-prose mt-6 text-[1.125rem]">
              Tags, slipper contact and the reset ring are all decided by
              measuring distance on the host. Not by Godot&rsquo;s area-overlap
              callbacks, which is what I built first and what any tutorial would
              tell you to use. I only caught it because I wrote a probe that ran
              every contact case and counted what actually fired.
            </p>

            <ContactEvidence />
            <p className="u-prose mt-5">
              Deciding on the host also means every peer agrees. A tag that
              lands on my screen cannot be a miss on yours. That is the whole
              reason authority sits with the host and not with whoever threw.
            </p>
          </div>
        </section>

        {/* =================================================================
         * 05 — networking.
         * ============================================================== */}
        <section
          id="s05"
          aria-labelledby="m05h"
          className="scroll-mt-[4.25rem]"
        >
          <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24">
            <h2
              id="m05h"
              className="u-display max-w-[22ch] text-[clamp(1.8rem,4.6vw,3.5rem)]"
            >
              A host cannot reliably know its own address.
            </h2>
            <p className="u-prose mt-6">
              Hosts broadcast a UDP packet and the browse screen lists whatever
              it hears. I learned the trap on my own machine: ask it for its
              address and it offers a LAN card, a Hamachi 25.x, a Radmin 26.x
              and a few link-local 169.254s, in no promised order. Pick wrong
              and you send everyone to an address that only exists on the host.
            </p>
            <NetworkFigure />
            <p className="u-prose">
              LAN was never going to be enough for a game whose entire pitch is
              the friends who moved away. Online runs on dedicated lobbies on a
              VPS in Singapore, found with join codes over a small UDP status
              protocol that sits separately from the game ports.
            </p>
          </div>
        </section>

        {/* =================================================================
         * 06 — it left the room. Real photographs of real people playing it.
         * ============================================================== */}
        <section aria-labelledby="m06h" className="border-rule border-t">
          <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24">
            <h2
              id="m06h"
              className="u-display text-[clamp(1.8rem,4.6vw,3.5rem)]"
            >
              Then strangers played it in a mall.
            </h2>
            <p className="u-prose mt-5 mb-10">
              PC Express and Intel Gamer Days. Four booth machines, an LED wall,
              and a queue of people who had never heard of it working out the
              controls without anybody handing them a rulebook. That was the
              part the contextual controls were designed for.
            </p>
            <PhotoStrip photos={SHOWCASE} label="The PC Express showcase" />
          </div>
        </section>

        {/* =================================================================
         * 07 — THE FLOOD. The rhythm break. Almost nothing on screen.
         * ============================================================== */}
        <section
          aria-labelledby="m07h"
          data-surface="stage"
          className="bg-ground border-rule border-t"
        >
          <div className="mx-auto max-w-[42rem] px-5 py-28 text-center sm:px-8 sm:py-40">
            <p className="u-meta text-ink-3">6 to 8 August 2026</p>
            <h2
              id="m07h"
              className="u-display mt-8 text-[clamp(2rem,6vw,4rem)]"
            >
              The competition happened in the middle of a typhoon.
            </h2>
            <p className="u-prose mx-auto mt-10 text-center">
              We waded in through knee-deep floodwater every morning, shoes
              soaked, laptops held up over the water. Nobody on the team ever
              raised missing a day as an option, which is not nothing when the
              water is at your knees at 7am.
            </p>
            <p className="u-prose mx-auto mt-5 text-center">
              I built the game alone. I did not get through those three days
              alone. BH Studios is Paul Andrei Recio, Clarence Pagaduan, Harry
              Gomez and Hans Xavier Lao, and they carried everything that was
              not the codebase.
            </p>
          </div>

          <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
            <Image
              src={`${M}/team-stage.webp`}
              alt="BH Studios on stage at the Gear Up NCR awarding, holding their certificates."
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* =================================================================
         * 08 — the result, with the actual trophy on the table.
         * ============================================================== */}
        <section aria-labelledby="m08h">
          <div className="mx-auto max-w-[92rem] px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
              <div>
                <p className="u-display text-accent text-[clamp(3.5rem,11vw,8rem)] leading-[0.82]">
                  1st Place
                </p>
                <h2
                  id="m08h"
                  className="u-meta text-ink-2 mt-6 tracking-[0.05em] normal-case"
                >
                  Gear Up NCR Esports Game Development Challenge 2026
                </h2>
                <p className="u-prose mt-6">
                  The competition is not over. As NCR&rsquo;s representative the
                  game goes to the national finals in General Santos City. DOST
                  and several partner companies are backing the entry from here.
                </p>
                <p className="u-prose text-ink mt-4">
                  The build I show there will not be the build that won the
                  region.
                </p>
                <Link
                  href="/achievements/gear-up-ncr"
                  className="u-meta border-accent text-accent hover:bg-accent hover:text-accent-ink mt-8 inline-block border px-4 py-2.5 transition-colors"
                >
                  What happened at the venue →
                </Link>
              </div>
              <figure className="m-0">
                <div className="border-rule relative aspect-[4/3] border">
                  <Image
                    src={`${M}/trophies.webp`}
                    alt="The Gear Up NCR first place trophy beside the team's certificates of recognition."
                    fill
                    sizes="(min-width: 1024px) 44rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="u-meta text-ink-3 mt-3 tracking-[0.04em] normal-case">
                  The regional trophy, and seven certificates.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* =================================================================
         * Links and colophon.
         * ============================================================== */}
        <section
          aria-labelledby="links"
          className="border-rule bg-ground-2 border-t"
        >
          <div className="mx-auto max-w-[92rem] px-5 py-14 sm:px-8">
            <h2 id="links" className="u-meta text-ink-3">
              Go and look
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Ext href={p.links!.gameplay!}>Gameplay footage</Ext>
              <Ext href={p.links!.trailer!}>Trailer</Ext>
              <Ext href={p.links!.download!}>Download the build</Ext>
            </div>
            <dl className="border-rule mt-12 grid gap-x-10 gap-y-4 border-t pt-6 sm:grid-cols-2 lg:grid-cols-3">
              {p.facts.map((f) => (
                <div key={f.label} className="flex gap-4">
                  <dt className="u-meta text-ink-3 w-24 shrink-0">{f.label}</dt>
                  <dd className="text-[0.9375rem] leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="u-meta text-ink-3 mt-8 tracking-[0.04em] normal-case">
              Built with {p.built.join(" · ")}
            </p>
          </div>
        </section>

        <nav
          aria-label="Next project"
          className="border-rule mx-auto max-w-[92rem] border-t px-5 py-12 sm:px-8"
        >
          <Link href="/work/egovmed" className="group block">
            <span className="u-meta text-ink-3">Next in the archive</span>
            <span className="mt-3 flex items-baseline gap-5">
              <span className="u-meta text-ink-3 tabular-nums">02</span>
              <span className="u-display text-[clamp(1.9rem,5vw,3.5rem)] transition-opacity group-hover:opacity-70">
                eGovMed
              </span>
              <span
                aria-hidden
                className="text-ink-3 ml-auto transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </nav>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function Plate({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="m-0">
      <div className="border-rule bg-ground-2 relative aspect-[16/9] border">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 640px) 46vw, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="u-meta text-ink-3 mt-3 tracking-[0.04em] normal-case">
        {caption}
      </figcaption>
    </figure>
  );
}

function Stat({
  value,
  label,
  marker,
}: {
  value: string;
  label: string;
  marker?: boolean;
}) {
  return (
    <div className="bg-ground px-5 py-6">
      <p
        className="font-mono text-[clamp(1.75rem,4vw,2.75rem)] leading-none tracking-[-0.03em]"
        style={marker ? { color: "var(--tp-persimmon)" } : undefined}
      >
        {value}
      </p>
      <p className="text-ink-2 mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed">
        {label}
      </p>
    </div>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="u-meta border-ink hover:bg-ink hover:text-ground border px-4 py-2.5 transition-colors"
    >
      {children} ↗
    </a>
  );
}
