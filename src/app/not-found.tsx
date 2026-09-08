import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32">
          <p className="u-meta text-ink-3">404</p>
          <h1 className="u-display mt-6 max-w-[14ch] text-[clamp(2.2rem,7vw,5rem)]">
            Nothing is catalogued here.
          </h1>
          <ul className="border-rule mt-12 max-w-[34rem] border-t">
            {nav.map((item) => (
              <li key={item.href} className="border-rule border-b">
                <Link
                  href={item.href}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className="text-lg">{item.label}</span>
                  <span
                    aria-hidden
                    className="text-ink-3 ml-auto transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
