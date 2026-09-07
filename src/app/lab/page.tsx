import type { Metadata } from "next";
import Nav from "@/components/chrome/Nav";
import Bench from "@/components/lab/Bench";
export const metadata: Metadata = {
  title: "Lab",
  description: "An emulator, a throwing range and systems you can take apart.",
};
export default function LabPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <header className="lab-heading">
          <p>Small experiments. Real moving parts.</p>
          <h1>
            Go on.
            <br />
            <em>Touch something.</em>
          </h1>
        </header>
        <Bench />
      </main>
    </>
  );
}
