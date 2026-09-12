import Link from "next/link";
import { contact, gmailCompose } from "@/content/site";
export default function Footer() {
  return (
    <footer className="gallery-footer" id="contact" data-world="index">
      <div className="footer-aperture" aria-hidden="true" />
      <div className="gallery-footer-top">
        <p className="gallery-kicker">
          The next thing starts with a conversation.
        </p>
        <span>MANILA, PH / UTC+8</span>
      </div>
      <div className="gallery-footer-main">
        <h2>
          LET’S
          <br />
          <span>TALK.</span>
        </h2>
        <div>
          <p>
            I’m open to software internships, research, and collaborations with
            people who care about what they’re building.
          </p>
          <a
            href={gmailCompose}
            className="gallery-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get in touch <span aria-hidden="true">↗</span>
          </a>
          <a
            className="gallery-footer-email"
            href={gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.email}
          </a>
        </div>
      </div>
      <div className="gallery-footer-bottom">
        <Link href="/">MATTHEW LABRADOR © {new Date().getFullYear()}</Link>
        <div>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={contact.resume} target="_blank" rel="noopener noreferrer">
            Résumé ↗
          </a>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
