// One-off capture: `node scripts/shot-one.mjs <url> <outPrefix>`
// Captures a full page at desktop and phone widths, animations settled.
import { chromium } from "@playwright/test";

const url = process.argv[2];
const out = process.argv[3] || ".review/shot";

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

const errors = [];
for (const [label, w, h] of [
  ["d", 1600, 1000],
  ["m", 390, 844],
]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    isMobile: label === "m",
    hasTouch: label === "m",
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${label} ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`${label} console ${m.text()}`);
  });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  } catch {
    await page.waitForTimeout(2000);
  }
  await page.evaluate(async () => {
    const step = innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}-${label}.png`, fullPage: true });
  await ctx.close();
  process.stdout.write(`${label} `);
}
await browser.close();
console.log("\n" + (errors.length ? errors.join("\n") : "clean"));
