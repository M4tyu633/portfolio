import Reveal from "./Reveal";

/** The label + big title that opens each section. */
export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : ""}>
      <p className="text-accent mb-3 text-xs font-medium tracking-[0.2em] uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {sub && (
        <p
          className={`text-muted mt-4 max-w-2xl text-base leading-relaxed ${
            centered ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
