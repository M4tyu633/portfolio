import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import KineticScene from "@/components/home/KineticScene";
import GalleryProjects from "@/components/home/GalleryProjects";
import { contact } from "@/content/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="gallery-home">
        <section className="gallery-hero" aria-labelledby="gallery-name">
          <div className="gallery-coordinate" aria-hidden="true">
            <span>INDEPENDENT MIND</span>
            <span>MANILA, PH</span>
          </div>
          <div className="gallery-hero-copy">
            <p className="gallery-kicker">
              Software developer · Computer science at UP Manila
            </p>
            <h1 id="gallery-name">
              <span>MATTHEW</span>
              <span>
                LABRADOR<span className="gallery-stop">.</span>
              </span>
            </h1>
            <div className="gallery-hero-intro">
              <span className="gallery-cross" aria-hidden="true">
                ↗
              </span>
              <p>
                I turn complex ideas into things you can use, play with, and
                understand.
              </p>
            </div>
            <div className="gallery-actions">
              <a className="gallery-button" href="#selected-work">
                Enter the work <span aria-hidden="true">↓</span>
              </a>
              <a
                className="gallery-link"
                href={contact.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                View résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <KineticScene />
          <div className="gallery-hero-foot">
            <span>Games. AI. Civic software. A habit of building.</span>
            <span>
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </span>
          </div>
        </section>
        <div className="gallery-proof">
          <Link href="/achievements/gear-up-ncr">
            <span>01</span>
            <strong>1ST PLACE</strong>
            <p>
              Gear Up NCR
              <br />
              Game development challenge
            </p>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/achievements/egov-hackathon">
            <span>02</span>
            <strong>HACKATHON WINNER</strong>
            <p>
              eGov Hackathon PH
              <br />
              One of ten winning teams
            </p>
            <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/about">
            <span>03</span>
            <strong>UP MANILA</strong>
            <p>
              BS Computer Science
              <br />
              DOST Undergraduate Scholar
            </p>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <section
          className="gallery-work"
          id="selected-work"
          aria-labelledby="gallery-work-heading"
        >
          <header className="gallery-section-title">
            <div>
              <p className="gallery-kicker">
                A selection of things I’ve built / 2025—2026
              </p>
              <h2 id="gallery-work-heading">
                WORK,
                <br />
                <span>IN MOTION.</span>
              </h2>
            </div>
            <p>
              A multiplayer street game. A connected hospital visit. A computer
              small enough to understand completely.
              <br />
              <br />
              Different problems, taken all the way through.
            </p>
          </header>
          <GalleryProjects />
        </section>
        <section
          className="gallery-recognition"
          aria-labelledby="gallery-results-heading"
        >
          <div className="recognition-index">
            <p className="gallery-kicker">Beyond the screen</p>
            <h2 id="gallery-results-heading">
              MADE.
              <br />
              SHOWN.
              <br />
              <span>RECOGNIZED.</span>
            </h2>
            <p>
              Building is part of the job. Explaining it, demonstrating it, and
              taking feedback are part of it too.
            </p>
            <Link href="/achievements" className="gallery-link">
              The results and the stories <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <figure>
            <Image
              src="/work/tumbang/event-playing.webp"
              alt="Visitors playing Tumbang Preso at the PC Express showcase."
              width={1100}
              height={850}
              sizes="(max-width:800px) 90vw, 55vw"
            />
            <figcaption>
              <span>Tumbang Preso, out in the world.</span>
              <span>PC Express · Intel Gamer Days</span>
            </figcaption>
          </figure>
        </section>
        <section
          className="gallery-person"
          aria-labelledby="gallery-person-heading"
        >
          <p className="gallery-kicker">The person behind the work</p>
          <div>
            <h2 id="gallery-person-heading">
              CURIOUS ENOUGH TO START.
              <br />
              <span>COMMITTED ENOUGH TO FINISH.</span>
            </h2>
            <p>
              I’m a computer science student and former competitive debater. I
              like working across boundaries: from the interface to the model,
              from the game to its networking, and from a technical idea to a
              clear explanation.
            </p>
            <div className="gallery-actions">
              <Link href="/about" className="gallery-link">
                A little more about me <span aria-hidden="true">↗</span>
              </Link>
              <a
                href={contact.linkedin}
                className="gallery-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
