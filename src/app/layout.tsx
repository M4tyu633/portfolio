import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { newsreader, plexMono, plexSans } from "./fonts";
import Ambience from "@/components/chrome/Ambience";
import Choreograph from "@/components/chrome/Choreograph";
import Footer from "@/components/chrome/Footer";
import RouteCurtain from "@/components/chrome/RouteCurtain";
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
  themeColor: "#171b38",
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
  sameAs: [contact.github, contact.linkedin, contact.facebook].filter(Boolean),
};

/* There is no theme toggle any more, and that is a design decision rather than
 * a regression. The site's whole structure is a monochrome building holding
 * rooms with their own palettes; a user-flipped dark mode would have to
 * override those palettes, which is the same as deleting them. */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${newsreader.variable}`}
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
            the current world's voice. It constructs nothing until the toggle in
            the header is pressed. */}
        <SoundProvider>
          {/* The room behind every page: a different material and a different
              weather per world, drifting slowly enough that you only see it if
              you look for it. Client-only and aria-hidden. See the component. */}
          <Ambience />
          {/* One observer for the whole document; every surface decides for
              itself what arriving means. See the component. */}
          <Choreograph />
          {children}
          <Footer />
          {/* A curtain in the destination world's colour, over a link that is
              already working. See the component: it never blocks navigation. */}
          <RouteCurtain />
        </SoundProvider>
        {/* Page views only, no cookies and no cross-site identifier. */}
        <Analytics />
      </body>
    </html>
  );
}
