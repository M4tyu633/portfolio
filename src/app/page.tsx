import ProductVisual from "@/components/work/ProductVisual";
import { khanpanion } from "@/content/projects/khanpanion";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import GalleryProjects from "@/components/home/GalleryProjects";
import { contact } from "@/content/site";

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
                <i aria-hidden="true" /> SOFTWARE DEVELOPER & CS STUDENT
              </p>
              <h1 id="studio-title">
                A LITTLE
                <br />
                OBSESSED
                <br />
                <span>WITH BUILDING.</span>
              </h1>
              <p className="studio-intro">
                I’m Matthew, a computer science student at UP Manila. I build
                interactive web applications, multiplayer games and
                machine-learning tools — from the interface to the engine
                underneath.
              </p>
              <div className="studio-actions">
                <a className="studio-button" href="#selected-work">
                  Explore my work <span aria-hidden="true">↘</span>
                </a>
                <a
                  className="studio-link"
                  href={contact.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The résumé ↗
                </a>
              </div>
            </div>
            <Link
              href="/work/khanpanion"
              className="studio-feature"
              aria-label="Explore Khanpanion, Grand Champion at KEIC 2026"
            >
              <div className="studio-feature-top">
                <span>THE LATEST CHAPTER</span>
                <span aria-hidden="true">↗</span>
              </div>
              <div className="studio-feature-image">
                <ProductVisual project={khanpanion} priority />
              </div>
              <div className="studio-feature-caption">
                <span className="studio-award-stamp">
                  GRAND
                  <br />
                  CHAMPION
                </span>
                <div>
                  <h2>Khanpanion</h2>
                  <p>
                    Khan Academy Education
                    <br />
                    Impact Challenge 2026
                  </p>
                </div>
              </div>
              <span className="studio-feature-note">
                Typed learning routes. Device-local progress. Real software.
              </span>
            </Link>
          </div>
          <div className="studio-label studio-hero-bottom">
            <span>GAMES / EDUCATION / HEALTHCARE / AI</span>
            <span>SCROLL TO THE GOOD STUFF ↓</span>
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
                MADE TO
                <br />
                <span>BE USED.</span>
              </h2>
            </div>
            <p>
              Different problems. Working products.
              <br />
              Here’s what I built and what happened next.
            </p>
          </div>
          <GalleryProjects />
          <Link href="/work" className="studio-all-work">
            <span>There’s more under the hood.</span>
            <strong>ALL SEVEN PROJECTS ↗</strong>
          </Link>
        </section>
        <section
          className="studio-recognition"
          aria-labelledby="recognition-title"
        >
          <div>
            <p className="studio-eyebrow">02 / OUT IN THE WORLD</p>
            <h2 id="recognition-title">
              THE
              <br />
              <span>RESULTS.</span>
            </h2>
            <Link href="/achievements" className="studio-link">
              The results & the stories ↗
            </Link>
          </div>
          <ol>
            <li>
              <span>2026 / EDUCATION</span>
              <strong>GRAND CHAMPION</strong>
              <p>Khan Academy Education Impact Challenge</p>
              <Link href="/work/khanpanion">Khanpanion ↗</Link>
            </li>
            <li>
              <span>2026 / CIVIC TECHNOLOGY</span>
              <strong>GRAND CHAMPION</strong>
              <p>eGov Hackathon PH</p>
              <Link href="/achievements/egov-hackathon">eGovMed ↗</Link>
            </li>
            <li>
              <span>2026 / GAME DEVELOPMENT</span>
              <strong>1ST PLACE</strong>
              <p>Gear Up NCR Esports Game Dev Challenge</p>
              <Link href="/achievements/gear-up-ncr">Tumbang Preso ↗</Link>
            </li>
          </ol>
        </section>
        <section className="studio-current" aria-labelledby="current-title">
          <div>
            <p className="studio-eyebrow">
              03 / STILL LEARNING. ALWAYS BUILDING.
            </p>
            <h2 id="current-title">CURRENTLY.</h2>
            <p>
              Computer science at UP Manila.
              <br />A DOST scholar with a habit of taking on the whole problem.
            </p>
            <Link href="/about" className="studio-link">
              Meet the person behind the work ↗
            </Link>
          </div>
          <div className="studio-roles">
            <article>
              <span>2026 — PRESENT</span>
              <h3>
                NVIDIA
                <br />
                PHILIPPINES
              </h3>
              <p>Campus Ambassador</p>
            </article>
            <article>
              <span>2026 — PRESENT</span>
              <h3>PC EXPRESS</h3>
              <p>Intern</p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
