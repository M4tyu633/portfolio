import Link from "next/link";
import { contact, gmailCompose } from "@/content/site";
export default function Footer() {
  return (
    <footer className="studio-footer" id="contact" data-world="index">
      <div className="studio-label">
        <span>GOOD WORK STARTS WITH A CONVERSATION.</span>
        <span>MANILA, PH / UTC+8</span>
      </div>
      <div className="studio-footer-main">
        <h2>
          LET’S
          <br />
          <span>BUILD.</span>
        </h2>
        <div>
          <p>
            Software, research or your next ambitious idea. I’m interested in
            people who care about what they’re making.
          </p>
          <a
            href={gmailCompose}
            className="studio-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Say hello <span aria-hidden="true">↗</span>
          </a>
          <a
            className="studio-footer-email"
            href={gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.email}
          </a>
        </div>
      </div>
      <div className="studio-footer-bottom">
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
