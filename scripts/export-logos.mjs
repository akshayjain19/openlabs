import { writeFile, mkdir } from "fs/promises";
import path from "path";
import * as icons from "simple-icons";

const map = {
  amazon: "siAmazon",
  flipkart: "siFlipkart",
  expedia: "siExpedia",
  zeta: "siZeta",
};

function svgFromIcon(icon, filename) {
  return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>${icon.title}</title><path d="${icon.path}" fill="#FFFFFF"/></svg>`;
}

async function main() {
  const dir = path.join("public/logos");
  await mkdir(dir, { recursive: true });
  for (const [file, key] of Object.entries(map)) {
    const icon = icons[key];
    if (!icon) {
      console.warn("missing", key);
      continue;
    }
    await writeFile(path.join(dir, `${file}.svg`), svgFromIcon(icon));
  }
}

main();
