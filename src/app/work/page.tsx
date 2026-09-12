import type { Metadata } from "next";
import Nav from "@/components/chrome/Nav";
import GalleryProjects from "@/components/home/GalleryProjects";
import { technicalIndex } from "@/content/site";
export const metadata: Metadata = {
  title: "Work",
  description:
    "Games, civic software, AI systems and machine-learning tools. Explore what I built, my contribution and the results.",
};
export default function Work() {
  return (
    <>
      <Nav />
      <main id="main" className="gallery-work-page">
        <header className="gallery-section-title">
          <div>
            <p className="gallery-kicker">Projects / 2025—2026</p>
            <h1>THE WORK.</h1>
          </div>
          <p>
            Games, applied AI, civic technology and systems programming. Built
            with care from the first decision to the final demo.
          </p>
        </header>
        <GalleryProjects all />
        <section className="gallery-tech" aria-labelledby="tech-heading">
          <h2 id="tech-heading">The tools behind the work.</h2>
          <dl className="tech-index">
            {technicalIndex.map((item) => (
              <div key={item.name}>
                <dt>{item.name}</dt>
                <dd>{item.where}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </>
  );
}
