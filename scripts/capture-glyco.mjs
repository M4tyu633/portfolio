import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1100 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await mkdir("C:/Users/matth/glycoswarm-demo/.review", { recursive: true });
await page.goto("http://localhost:3200", { waitUntil: "networkidle" });
await page.screenshot({
  path: "C:/Users/matth/glycoswarm-demo/.review/desktop.png",
  fullPage: true,
});
for (const width of [390, 768]) {
  await page.setViewportSize({ width, height: 900 });
  await page.screenshot({
    path: `C:/Users/matth/glycoswarm-demo/.review/${width}.png`,
    fullPage: true,
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) errors.push(`${width}: overflow`);
}
await page.setViewportSize({ width: 1440, height: 1100 });
await page.getByRole("button", { name: /04 Cardiovascular/ }).click();
await page
  .getByRole("button", { name: "Simulate specialist unavailable" })
  .click();
if (!(await page.getByText("Missing stays missing.").isVisible()))
  errors.push("missing state not propagated");
await page.getByRole("button", { name: "Contract", exact: true }).click();
if (
  !(await page
    .locator("pre")
    .innerText()
    .then((t) => t.includes('"risk_score": null')))
)
  errors.push("missing score not null");
await page.screenshot({
  path: "C:/Users/matth/glycoswarm-demo/.review/unavailable.png",
  fullPage: true,
});
await page.getByRole("button", { name: /A different distribution/ }).click();
if (!(await page.getByText("P93759", { exact: false }).isVisible()))
  errors.push("sample switch");
await writeFile(
  "C:/Users/matth/glycoswarm-demo/.review/checks.json",
  JSON.stringify({ errors }),
);
await browser.close();
console.log(JSON.stringify({ errors }));
