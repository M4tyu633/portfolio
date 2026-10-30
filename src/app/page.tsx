import ProductVisual from "@/components/work/ProductVisual";
import { khanpanion } from "@/content/projects/khanpanion";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import GalleryProjects from "@/components/home/GalleryProjects";
import { contact } from "@/content/site";

const awards = [
  {
    project: "Khanpanion",
    href: "/work/khanpanion",
    meta: "2026 · Education",
    result: "Grand Champion",
    event: "Khan Academy Education Impact Challenge",
    logo: "/work/khanpanion/logo-reverse.svg",
    w: 329,
    h: 64,
    logoClass: "is-khan",
  },
  {
    project: "eGovMed",
    href: "/achievements/egov-hackathon",
    meta: "2026 · Civic technology",
    result: "Grand Champion",
    event: "eGov Hackathon PH · ₱100,000 prize",
    logo: "/work/egovmed/logo-wordmark.png",
    w: 859,
    h: 192,
    logoClass: "is-egov",
  },
  {
    project: "Tumbang Preso",
    href: "/achievements/gear-up-ncr",
    meta: "2026 · Game development",
    result: "1st Place",
    event: "Gear Up NCR Esports Game Dev Challenge",
    logo: "/work/tumbang/wordmark.webp",
    w: 900,
    h: 300,
    logoClass: "is-tump",
  },
];

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="studio-home">
        <section className="studio-hero" aria-labelledby="studio-title">
          <div className="studio-label">
            <span>MATTHEW EMMANUEL LABRADOR</span>
            <span>MANILA, PH / 2026</span>
          </div>
          <div className="studio-hero-grid">
            <div className="studio-hero-copy">
              <p className="studio-eyebrow">
                <i aria-hidden="true" /> FULL-STACK DEVELOPER · CS AT UP MANILA
              </p>
              <h1 id="studio-title">
                I BUILD
                <br />
                SOFTWARE
                <br />
                <span>THAT WINS.</span>
              </h1>
              <p className="studio-intro">
                I’m Matthew Labrador. I build web apps, APIs and game systems
                from the first commit to the deployed product. In 2026 that work
                took two Grand Champion titles and a first place.
              </p>
              <div className="studio-actions">
                <a className="studio-button" href="#selected-work">
                  See selected projects <span aria-hidden="true">↘</span>
                </a>
                <a
                  className="studio-link"
                  href={contact.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read my résumé ↗
                </a>
              </div>
              <p className="studio-hiring-note">
                Open to software engineering internships and technical
                collaborations.
              </p>
            </div>
            <Link
              href="/work/khanpanion"
              className="studio-feature"
              aria-label="Explore Khanpanion, Grand Champion at the Khan Academy Education Impact Challenge 2026"
            >
              <div className="studio-feature-image">
                <ProductVisual project={khanpanion} priority />
              </div>
              <div className="studio-feature-caption">
                <p className="studio-award-line">
                  <TrophyIcon />
                  <span>
                    <strong>Grand Champion</strong> · Khan Academy Education
                    Impact Challenge 2026
                  </span>
                </p>
                <div className="studio-feature-title">
                  <h2>Khanpanion</h2>
                  <span aria-hidden="true">↗</span>
                </div>
                <p>
                  A study platform that traces a missed question back to the
                  exact skill behind it. I led the team and built the learning
                  engine in TypeScript.
                </p>
              </div>
            </Link>
          </div>
          <dl className="studio-proof" aria-label="Highlights">
            <div>
              <dt>2× Grand Champion</dt>
              <dd>Khanpanion and eGovMed, 2026</dd>
            </div>
            <div>
              <dt>1st Place</dt>
              <dd>Gear Up NCR, as sole developer of Tumbang Preso</dd>
            </div>
            <div>
              <dt>Campus Ambassador</dt>
              <dd>NVIDIA Philippines, 2026–present</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>TypeScript · Next.js · Node · Python · C++ · Godot</dd>
            </div>
          </dl>
        </section>
        <section
          id="selected-work"
          className="studio-work"
          aria-labelledby="work-title"
        >
          <div className="studio-section-heading">
            <div>
              <p className="studio-eyebrow">01 / SELECTED WORK</p>
              <h2 id="work-title">
                SELECTED
                <br />
                <span>WORK.</span>
              </h2>
            </div>
            <p>
              Three products for three very different users: students, patients
              and players. Each was judged by an outside panel, and each one
              won.
            </p>
          </div>
          <GalleryProjects />
          <Link href="/work" className="studio-all-work">
            <span>
              Plus a C++ emulator, two medical ML models and a multi-agent AI
              prototype.
            </span>
            <strong>ALL SEVEN PROJECTS ↗</strong>
          </Link>
        </section>
        <section
          className="studio-recognition"
          aria-labelledby="recognition-title"
        >
          <div>
            <p className="studio-eyebrow">02 / RECOGNITION</p>
            <h2 id="recognition-title">
              THE
              <br />
              <span>RESULTS.</span>
            </h2>
            <Link href="/achievements" className="studio-link">
              The story behind each result ↗
            </Link>
          </div>
          <ol>
            {awards.map((award) => (
              <li key={award.project}>
                <Link href={award.href} className="studio-award-row">
                  <span className={`studio-award-logo ${award.logoClass}`}>
                    <Image
                      src={award.logo}
                      width={award.w}
                      height={award.h}
                      alt=""
                    />
                  </span>
                  <span className="studio-award-text">
                    <span className="studio-award-meta">{award.meta}</span>
                    <strong>{award.result}</strong>
                    <span className="studio-award-event">{award.event}</span>
                  </span>
                  <span className="studio-award-go">
                    {award.project} <span aria-hidden="true">↗</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <section className="studio-current" aria-labelledby="current-title">
          <div>
            <p className="studio-eyebrow">
              03 / RIGHT NOW
            </p>
            <h2 id="current-title">CURRENTLY.</h2>
            <p>
              Alongside computer science at UP Manila, I work on local AI
              applications with NVIDIA RTX 5090 GPUs and give talks and training
              on using and deploying models on personal hardware.
            </p>
            <Link href="/about" className="studio-link">
              More about me ↗
            </Link>
          </div>
          <div className="studio-roles">
            <article>
              <span className="studio-role-logo is-nvidia" aria-hidden="true">
                NVIDIA
              </span>
              <div>
                <span>2026 — PRESENT</span>
                <h3>NVIDIA Philippines</h3>
                <p>Campus Ambassador</p>
              </div>
            </article>
            <article>
              <span className="studio-role-logo is-pcx">
                <Image
                  src="/work/roles/pc-express.webp"
                  width={720}
                  height={190}
                  alt=""
                />
              </span>
              <div>
                <span>2026 — PRESENT</span>
                <h3>PC Express</h3>
                <p>Intern</p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
