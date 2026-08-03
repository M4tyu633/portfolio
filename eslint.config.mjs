import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Emscripten's generated glue for the CHIP-8 build. It's a build artefact
    // copied in from the chip8 repo, minified onto one line, and nothing here
    // is going to fix it.
    "public/chip8/index.js",
  ]),
]);

export default eslintConfig;
