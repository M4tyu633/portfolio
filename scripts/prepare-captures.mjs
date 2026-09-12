import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Inputs are native browser captures of the real, locally running applications.
const captures = [
  "egovmed/demo-home",
  "egovmed/demo-booking",
  "egovmed/demo-payment",
  "glycoswarm/workspace",
  "heart/instrument",
  "heart/contributions",
  "knee-mri/reading-room",
  "chip8/arcade",
  "chip8/inspection",
];
for (const item of captures) {
  const input = path.resolve("public/work", `${item}.png`);
  try {
    await fs.access(input);
  } catch {
    continue;
  }
  const output = path.resolve("public/work", `${item}.webp`);
  let image = sharp(input);
  if (item === "chip8/arcade")
    image = image.extract({ left: 165, top: 261, width: 1400, height: 967 });
  if (item === "chip8/inspection")
    image = image.extract({ left: 172, top: 261, width: 1400, height: 1159 });
  await image.webp({ quality: 91, effort: 6 }).toFile(output);
  const metadata = await sharp(output).metadata();
  console.log(
    `${item}: ${metadata.width} × ${metadata.height}, ${(await fs.stat(output)).size} bytes`,
  );
}
