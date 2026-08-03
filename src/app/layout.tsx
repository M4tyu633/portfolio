import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { about, contact, hero, site } from "@/content/data";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Makes the generated OG image and sitemap resolve to absolute URLs.
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    "Matthew Labrador",
    "UP Manila",
    "Computer Science",
    "Multi-Agent Systems",
    "LangGraph",
    "AI Engineer",
    "Philippines",
  ],
  authors: [{ name: hero.name, url: site.url }],
  creator: hero.name,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: hero.name,
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

/* Structured data, so Google can show this as a person rather than a page. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: hero.name,
  url: site.url,
  email: `mailto:${contact.email}`,
  jobTitle: "Computer Science Student",
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: contact.location },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of the Philippines Manila",
  },
  knowsAbout: about.paragraphs.length
    ? ["Multi-Agent Systems", "Machine Learning", "Game Development", "LLMs"]
    : undefined,
  sameAs: [contact.github, contact.linkedin].filter(Boolean),
};

/**
 * Runs synchronously while the browser parses the HTML, so the saved theme is
 * applied before the first paint — no flash of the wrong theme on reload.
 * Dark is the default when nothing has been saved.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} dark h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        {/* Page views only, no cookies and no cross-site identifier. Inert
            outside a Vercel deployment, so local dev sends nothing. */}
        <Analytics />
      </body>
    </html>
  );
}
