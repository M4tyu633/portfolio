import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.REVIEW_URL || "http://localhost:3100";
const out = process.env.REVIEW_OUT || ".review/final";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const routes = [
  "/",
  "/work",
  "/work/tumbang-preso",
  "/work/egovmed",
  "/work/glycoswarm-ai",
  "/work/chip-8-emulator",
  "/work/knee-mri-reader",
  "/work/heart-disease-prediction",
  "/achievements",
  "/achievements/gear-up-ncr",
  "/achievements/egov-hackathon",
  "/about",
];
const failures = [];
const captures = [];
const errors = [];
const page = await browser.newPage();
page.on("pageerror", (e) => errors.push(e.message));
for (const width of [1440, 1920, 1366, 768, 390, 360]) {
  await page.setViewportSize({
    width,
    height:
      width === 390
        ? 844
        : width === 360
          ? 800
          : width === 1920
            ? 1080
            : width === 1366
              ? 768
              : 900,
  });
  for (const route of routes) {
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    if (response.status() !== 200)
      failures.push(`${route} returned ${response.status()}`);
    await page.locator("h1").waitFor();
    const check = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      broken: [...document.images]
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.src),
      text: document.body.innerText,
    }));
    if (check.overflow) failures.push(`${width} ${route} horizontal overflow`);
    if (check.broken.length)
      failures.push(`${width} ${route} broken images: ${check.broken}`);
    if (
      /[\u00c2\u00c3\u00e2][\u0080-\u00bf\u2013\u2014\u20ac]/u.test(check.text)
    )
      failures.push(`${route} encoding artifacts`);
    if (width === 1440 || width === 390 || route === "/") {
      const name = `${width}-${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}.png`;
      await page.screenshot({ path: `${out}/${name}`, fullPage: false });
      captures.push(name);
    }
  }
}
await writeFile(
  `${out}/layout-results.json`,
  JSON.stringify({ failures, errors, captures }, null, 2),
);
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(base, { waitUntil: "networkidle" });
for (const title of [
  "02 eGovMed",
  "03 GlycoSwarm AI",
  "04 CHIP-8",
  "01 Tumbang Preso",
]) {
  await page.getByRole("button", { name: title, exact: true }).click();
}
await page.getByRole("button", { name: /Boot the machine/ }).click();
await page
  .frameLocator('iframe[title="CHIP-8 emulator and debugger"]')
  .locator("canvas")
  .waitFor();
await page.screenshot({ path: `${out}/home-machine-running.png` });
captures.push("home-machine-running.png");
for (const id of ["w01", "w02", "w03"]) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  const name = `home-${id}.png`;
  await page.screenshot({ path: `${out}/${name}` });
  captures.push(name);
}
await page.goto(base + "/work/egovmed", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Look underneath the visit ↗" }).click();
await page.getByRole("button", { name: "3 Verify", exact: true }).click();
await page.getByRole("button", { name: /Test: Replay/ }).click();
if (
  !(await page
    .getByText("One claim succeeds. The second request is rejected.")
    .isVisible())
)
  failures.push("Replay scenario not visible");
await page.goto(base + "/work/glycoswarm-ai", { waitUntil: "networkidle" });
await page.locator(".swarm-agents button").nth(1).click();
if (!(await page.getByText("systolic_bp", { exact: true }).isVisible()))
  failures.push("Retinal input not updated");
await page
  .getByRole("button", { name: "What if neither provider responds?" })
  .click();
if (!(await page.getByText("Unavailable is an output.").isVisible()))
  failures.push("Offline contract not shown");
await page.goto(base + "/");
await page.getByRole("link", { name: "Work", exact: true }).first().click();
await page.waitForURL("**/work");
await page.goBack();
await page.waitForURL(base + "/");
await page.goForward();
await page.waitForURL("**/work");
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(base, { waitUntil: "networkidle" });
const reduced = await page.evaluate(() => ({
  animations: document.getAnimations().filter((a) => a.playState === "running")
    .length,
  playing: [...document.querySelectorAll("video")].filter((v) => !v.paused)
    .length,
}));
if (reduced.playing) failures.push("Reduced motion autoplays video");
await writeFile(
  `${out}/results.json`,
  JSON.stringify(
    {
      base,
      routes: routes.length,
      widths: 6,
      failures,
      errors,
      reduced,
      captures,
    },
    null,
    2,
  ),
);
await writeFile(
  `${out}/wall.html`,
  `<!doctype html><title>Portfolio visual review</title><style>body{background:#141414;color:white;font:14px system-ui;padding:24px}main{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}img{width:100%}figure{margin:0}figcaption{padding:8px}</style><h1>Portfolio visual review</h1><main>${captures.map((n) => `<figure><img src="${n}" loading="lazy"><figcaption>${n}</figcaption></figure>`).join("")}</main>`,
);
await browser.close();
console.log(
  JSON.stringify({ failures, errors, reduced, captures: captures.length }),
);
if (failures.length || errors.length) process.exitCode = 1;
