import Link from "next/link";
import { contact, emailHref, gmailCompose } from "@/content/site";
import CopyEmail from "./CopyEmail";
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
            I’m open to software development internships, research and technical
            collaborations. Tell me what you’re building and where I can help.
          </p>
          <div className="contact-actions">
            <a href={emailHref} className="studio-button">
              Email Matthew <span aria-hidden="true">↗</span>
            </a>
            <CopyEmail />
          </div>
          <a className="studio-footer-email" href={emailHref}>
            {contact.email}
          </a>
          <a
            className="contact-gmail"
            href={gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prefer Gmail? Open compose ↗
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
