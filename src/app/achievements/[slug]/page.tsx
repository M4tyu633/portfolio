import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/chrome/Nav";
import Image from "next/image";
import { achievementBySlug, achievementPages } from "@/content/achievements";
import { site } from "@/content/site";

export function generateStaticParams() {
  return achievementPages.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = achievementBySlug(slug);
  if (!a) return {};
  return {
    title: `${a.title}: ${a.result}`,
    description: a.summary,
    alternates: { canonical: `${site.url}/achievements/${a.slug}` },
  };
}

export default async function AchievementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = achievementBySlug(slug);
  if (!a || a.tier !== "A") notFound();
  const gear = slug === "gear-up-ncr";
  return (
    <>
      <Nav />
      <main
        id="main"
        className={`event-story ${gear ? "event-gear" : "event-egov"}`}
      >
        <header className="event-heading">
          <Link href="/achievements">← Achievements</Link>
          <p>
            {a.title} · {a.year}
          </p>
          <h1>
            {gear ? (
              <>
                We made it.
                <br />
                <em>So did the game.</em>
              </>
            ) : (
              <>
                A whole system.
                <br />
                <em>One live demo.</em>
              </>
            )}
          </h1>
          <p>
            {gear
              ? "BH Studios / 6–8 August 2026 / Gear Up NCR"
              : "BH Studios / UP Manila / eGov Hackathon PH 2026"}
          </p>
        </header>
        {gear ? (
          <figure className="event-cover">
            <Image
              src="/work/tumbang/team-stage.webp"
              alt="BH Studios together at Gear Up NCR"
              width={1600}
              height={1067}
              sizes="100vw"
            />
            <figcaption>
              The team at Gear Up NCR. First place, and a place at the national
              finals.
            </figcaption>
          </figure>
        ) : (
          <div className="event-result">
            <span>1 of 10</span>
            <div>
              <h2>Winning teams.</h2>
              <p>₱100,000 prize</p>
              <p>
                eGovMed put assessment before the queue. I delivered the pitch
                and live product demo to the judging panel.
              </p>
            </div>
          </div>
        )}
        <section className="event-account">
          <p className="event-pull">
            {gear
              ? "I built the game alone. I did not get through those three days alone."
              : "The pitch had to make the system understandable to people who hadn’t built it."}
          </p>
          <div>
            <h2>
              {gear ? "Getting into the room" : "What I brought into the room"}
            </h2>
            <p>
              {gear
                ? "The competition ran in the middle of a typhoon. We waded through knee-deep floodwater every morning, laptops held above the water. Paul Andrei Recio, Clarence Pagaduan, Harry Gomez, Hans Xavier Lao and I entered as BH Studios."
                : "I worked full-stack on eGovMed and owned all eight government integrations. The demo followed one patient from sign-in through triage, identity verification, booking, a queue number and payment."}
            </p>
            <p>
              {gear
                ? "Five days of building became three days of showing, pitching and answering questions. I handled the game and its presentation; the team got through the competition together."
                : "Mock and live adapters gave us a way to demonstrate the flow when a sandbox was unavailable. The presentation was about the patient route; the engineering decisions were there when the questions got specific."}
            </p>
          </div>
        </section>
        {gear && (
          <figure className="event-trophy">
            <Image
              src="/work/tumbang/trophies.webp"
              alt="The trophies from Gear Up NCR"
              width={1600}
              height={1200}
              sizes="(min-width: 768px) 60vw, 100vw"
            />
            <figcaption>1st Place · Gear Up NCR</figcaption>
          </figure>
        )}
        <section className="event-account">
          <h2>
            {gear ? "Next stop: General Santos." : "A result, and a next step."}
          </h2>
          <div>
            <p>
              {gear
                ? "Tumbang Preso became NCR’s entry for the national finals. The regional competition build is the Godot version. The later Unity rewrite is the next generation, not the build that won."
                : "eGovMed was selected as one of ten winning teams, with a ₱100,000 prize. Philippine General Hospital is the pilot target. That is an ambition for the product, not a claimed hospital deployment."}
            </p>
            <Link
              className="scene-link"
              href={gear ? "/work/tumbang-preso" : "/work/egovmed"}
            >
              How the project was built ↗
            </Link>
            <Link
              className="scene-link"
              href={
                gear
                  ? "/achievements/egov-hackathon"
                  : "/achievements/gear-up-ncr"
              }
            >
              Another day in the room →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
