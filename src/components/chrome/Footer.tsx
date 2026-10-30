import Link from "next/link";
import { contact, emailHref } from "@/content/site";
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
            collaborations. Email is the fastest way to reach me.
          </p>
          <ul className="contact-list">
            <li>
              <span className="contact-kind">Email</span>
              <a className="contact-value" href={emailHref}>
                {contact.email}
              </a>
              <CopyEmail />
            </li>
            <li>
              <span className="contact-kind">LinkedIn</span>
              <a
                className="contact-value"
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/m4tyuuu1
              </a>
              <span className="contact-go" aria-hidden="true">
                ↗
              </span>
            </li>
            <li>
              <span className="contact-kind">Résumé</span>
              <a
                className="contact-value"
                href={contact.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                One-page PDF
              </a>
              <span className="contact-go" aria-hidden="true">
                ↗
              </span>
            </li>
          </ul>
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
