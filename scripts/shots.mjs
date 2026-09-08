// Screenshot wall. `node scripts/shots.mjs <outdir> [baseUrl]`
// Captures every route at desktop and phone, full page, animations paused.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const out = process.argv[2] || ".review/wall";
const base = process.argv[3] || "http://localhost:3100";
const only = process.env.ONLY ? process.env.ONLY.split(",") : null;

const routes = [
  ["home", "/"],
  ["work", "/work"],
  ["tumbang", "/work/tumbang-preso"],
  ["egovmed", "/work/egovmed"],
  ["glyco", "/work/glycoswarm-ai"],
  ["chip8", "/work/chip-8-emulator"],
  ["mri", "/work/knee-mri-reader"],
  ["cardio", "/work/heart-disease-prediction"],
  ["achievements", "/achievements"],
  ["gearup", "/achievements/gear-up-ncr"],
  ["about", "/about"],
];

await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

const errors = [];
for (const [label, w, h] of [
  ["d", 1440, 900],
  ["m", 390, 844],
]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    isMobile: label === "m",
    hasTouch: label === "m",
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${label} ${e.message}`));
  for (const [name, route] of routes) {
    if (only && !only.includes(name)) continue;
    try {
      await page.goto(base + route, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
    } catch {
      await page.waitForTimeout(1500);
    }
    // settle scroll-driven reveals, then freeze everything
    await page.evaluate(async () => {
      const step = innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      // Wait for every image that the scroll pass just armed. Without this the
      // stitched full-page capture paints empty frames for anything that was
      // still decoding when the scroll finished.
      await Promise.race([
        Promise.all(
          [...document.images].map((i) =>
            i.complete
              ? null
              : new Promise((r) => {
                  i.addEventListener("load", r, { once: true });
                  i.addEventListener("error", r, { once: true });
                }),
          ),
        ),
        // An <img> that never gets a src never fires either event, so this can
        // hang forever without a ceiling on it.
        new Promise((r) => setTimeout(r, 6000)),
      ]);
      await new Promise((r) => setTimeout(r, 600));
      document.querySelectorAll("video").forEach((v) => {
        v.pause();
      });
      document.getAnimations().forEach((a) => {
        a.currentTime = a.effect?.getComputedTiming?.().activeDuration || 1000;
        a.pause();
      });
    });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `${out}/${name}-${label}.png`,
      fullPage: true,
    });
    process.stdout.write(`${name}-${label} `);
  }
  await ctx.close();
}
await browser.close();
console.log("\n" + (errors.length ? errors.join("\n") : "no page errors"));
