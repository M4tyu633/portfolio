import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import GalleryProjects from "@/components/home/GalleryProjects";
import { contact } from "@/content/site";

const awards = [
  {
    project: "Khanpanion",
    href: "/work/khanpanion",
    meta: "Khanpanion · ₱200,000 prize",
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
    meta: "eGovMed · patient app on 8 government services",
    result: "Grand Champion",
    event: "eGov Hackathon PH",
    logo: "/work/egovmed/logo-wordmark.png",
    w: 859,
    h: 192,
    logoClass: "is-egov",
  },
  {
    project: "Tumbang Preso",
    href: "/achievements/gear-up-ncr",
    meta: "Tumbang Preso · four-player online game",
    result: "Grand Champion",
    event: "Gear Up NCR Game Dev Challenge",
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
          <div className="hero2-grid">
            <div>
              <p className="studio-eyebrow hero2-eyebrow">
                <i aria-hidden="true" /> FULL-STACK DEVELOPER · CS AT UP MANILA
              </p>
              <h1 id="studio-title" className="hero2-title">
                I BUILD
                <br />
                SOFTWARE
                <br />
                <span>THAT WINS.</span>
              </h1>
            </div>
            <div className="hero2-side">
              <p className="hero2-intro">
                I’m Matthew Labrador. I build web apps, APIs and game systems
                from the first commit to the deployed product.
              </p>
              <div className="studio-actions">
                <a className="studio-button" href="#selected-work">
                  See my work <span aria-hidden="true">↘</span>
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
          </div>
          <div className="hero2-wins">
            <p className="hero2-wins-label">
              <TrophyIcon /> 3× Grand Champion in 2026
            </p>
            <ul>
              {awards.map((award) => (
                <li key={award.project}>
                  <Link href={award.href} className="hero2-win">
                    <span className={`hero2-logo ${award.logoClass}`}>
                      <Image
                        src={award.logo}
                        width={award.w}
                        height={award.h}
                        alt={award.project}
                        priority
                      />
                    </span>
                    <strong>{award.event}</strong>
                    <span>{award.meta}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
        <section className="studio-current" aria-labelledby="current-title">
          <div>
            <p className="studio-eyebrow">02 / RIGHT NOW</p>
            <h2 id="current-title">CURRENTLY.</h2>
            <p>
              Alongside computer science at UP Manila, I build local AI
              applications on NVIDIA RTX 5090 GPUs and run talks and training on
              deploying models on your own hardware. In November I start at PC
              Express, automating workflows and building local AI tools on
              their hardware.
            </p>
            <Link href="/about" className="studio-link">
              More about me ↗
            </Link>
          </div>
          <div className="studio-roles">
            <article>
              <span className="studio-role-logo">
                <Image
                  src="/work/roles/nvidia.svg"
                  width={656}
                  height={120}
                  alt=""
                />
              </span>
              <div>
                <span>OCT 2026 — PRESENT</span>
                <h3>NVIDIA Philippines</h3>
                <p>Campus Ambassador</p>
                <small>
                  Local AI apps on RTX 5090 GPUs; talks and training on running
                  models locally.
                </small>
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
                <span>STARTS NOV 2026</span>
                <h3>PC Express</h3>
                <p>Incoming Intern</p>
                <small>
                  Automation and local AI applications on PC Express hardware.
                </small>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
