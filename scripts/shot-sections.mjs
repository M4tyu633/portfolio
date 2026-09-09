// Section capture: `node scripts/shot-sections.mjs <outdir> <route> <selector> [width] [base]`
// Screenshots every element matching the selector on a route, animations settled.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const out = process.argv[2] || ".review/sections";
const route = process.argv[3] || "/";
const selector = process.argv[4] || "section";
const width = Number(process.argv[5] || 1440);
const base = process.argv[6] || "http://localhost:3100";

await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const ctx = await browser.newContext({
  viewport: { width, height: 900 },
  deviceScaleFactor: 1,
  isMobile: width < 768,
  hasTouch: width < 768,
});
const page = await ctx.newPage();
await page.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
await page.evaluate(async () => {
  const step = innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 1200));
});
const nodes = await page.$$(selector);
let i = 0;
for (const node of nodes) {
  const name = String(i++).padStart(2, "0");
  try {
    await node.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.evaluate(() => {
      document.querySelectorAll("video").forEach((v) => v.pause());
    });
    await node.screenshot({ path: `${out}/${name}.png` });
    process.stdout.write(`${name} `);
  } catch (e) {
    process.stdout.write(`${name}:FAIL(${e.message.slice(0, 40)}) `);
  }
}
await browser.close();
console.log(`\n${i} shots -> ${out}`);
