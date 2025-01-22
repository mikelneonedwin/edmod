// @ts-check

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("node:path");

/** @param {string[]} filenames */
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

/** @type {import("lint-staged").Config} */
module.exports = {
  "*.{js,jsx,ts,tsx}": [
    () => "tsc -p tsconfig.json --noEmit",
    "eslint --fix",
    buildEslintCommand,
  ],
};