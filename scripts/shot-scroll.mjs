// Viewport sweep: `node scripts/shot-scroll.mjs <outdir> <route> [width] [height] [base]`
// Walks a route one viewport at a time so long pages stay readable at 1:1.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const out = process.argv[2] || ".review/sweep";
const route = process.argv[3] || "/";
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 900);
const base = process.argv[6] || "http://localhost:3100";

await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const ctx = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 1,
  isMobile: width < 768,
  hasTouch: width < 768,
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console ${m.text()}`);
});
await page.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(1500);

const total = await page.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += height) {
  await page.evaluate((py) => window.scrollTo(0, py), y);
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    document.querySelectorAll("video").forEach((v) => v.pause());
  });
  await page.screenshot({ path: `${out}/${String(i++).padStart(2, "0")}.png` });
  process.stdout.write(".");
}
await browser.close();
console.log(`\n${i} frames -> ${out}`);
if (errors.length) console.log(errors.slice(0, 10).join("\n"));
