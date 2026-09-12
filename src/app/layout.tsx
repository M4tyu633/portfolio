import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { galleryDisplay, newsreader, plexMono, plexSans } from "./fonts";
import Choreograph from "@/components/chrome/Choreograph";
import Footer from "@/components/chrome/Footer";
import { SoundProvider } from "@/lib/sound";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: site.titleTemplate },
  description: site.description,
  keywords: [
    "Matthew Labrador",
    "UP Manila",
    "Computer Science",
    "Multi-Agent Systems",
    "LangGraph",
    "Godot",
    "Game Development",
    "Civic Technology",
    "Philippines",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // The building's ground. A world overrides it live through WorldSync, so the
  // browser chrome on a phone follows the room you are standing in.
  themeColor: "#10131a",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${contact.email}`,
  jobTitle: "Computer Science Student",
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: contact.location },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of the Philippines Manila",
  },
  knowsAbout: [
    "Multi-Agent Systems",
    "Machine Learning",
    "Game Development",
    "Networked Multiplayer",
    "Civic Technology",
  ],
  sameAs: [contact.linkedin, contact.facebook].filter(Boolean),
};

/* Shared chrome uses the gallery identity; each case study owns its palette. */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${newsreader.variable} ${galleryDisplay.variable}`}
      // Next needs this to know it should suppress its own scroll restoration
      // fighting the smooth scroll in globals.css during a route change.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body data-world="index" className="flex min-h-dvh flex-col">
        <a className="u-skip u-meta" href="#main">
          Skip to content
        </a>
        {/* The whole tree is inside the provider so a link anywhere can ask for
            the current world's voice. It constructs no AudioContext and fetches
            no audio until the toggle in the header is pressed. */}
        <SoundProvider>
          {/* One IntersectionObserver for every [data-seq] on the document. */}
          <Choreograph />
          {children}
          <Footer />
        </SoundProvider>
        {/* Page views only, no cookies and no cross-site identifier. */}
        <Analytics />
      </body>
    </html>
  );
}
