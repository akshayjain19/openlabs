import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import path from "path";

const slugs = ["indore-nursery", "sg11-fantasy", "the-laundry-house", "tattvasri"];

async function convertDir(slug) {
  const dir = path.join("public/projects", slug);
  for (const name of ["hero", "screen-1", "screen-2", "screen-3"]) {
    const png = path.join(dir, `${name}.png`);
    try {
      await sharp(png)
        .webp({ quality: 82 })
        .toFile(path.join(dir, `${name}.webp`));
    } catch {
      /* skip */
    }
  }
}

async function viacationMock() {
  const dir = path.join("public/projects/viacation");
  await mkdir(dir, { recursive: true });
  const w = 1440;
  const h = 900;
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect fill="#0a0a0a" width="100%" height="100%"/>
  <rect x="80" y="72" width="1280" height="56" rx="4" fill="#141414" stroke="#2a2a2a"/>
  <rect x="120" y="92" width="120" height="16" rx="2" fill="#fafafa" opacity="0.9"/>
  <rect x="280" y="96" width="48" height="8" rx="2" fill="#555"/>
  <rect x="340" y="96" width="48" height="8" rx="2" fill="#555"/>
  <rect x="400" y="96" width="48" height="8" rx="2" fill="#555"/>
  <rect x="980" y="88" width="320" height="24" rx="12" fill="#1a1a1a" stroke="#333"/>
  <text x="120" y="220" fill="#fff" font-family="system-ui,sans-serif" font-size="56" font-weight="600" letter-spacing="-2">Discover your next trip</text>
  <text x="120" y="268" fill="#888" font-family="system-ui,sans-serif" font-size="22">Packages, destinations and search — travel marketplace product.</text>
  <rect x="120" y="310" width="520" height="44" rx="6" fill="#fff"/>
  <rect x="132" y="324" width="200" height="16" rx="3" fill="#ccc"/>
  <rect x="120" y="390" width="380" height="320" rx="8" fill="#121212" stroke="#252525"/>
  <rect x="520" y="390" width="380" height="320" rx="8" fill="#121212" stroke="#252525"/>
  <rect x="920" y="390" width="380" height="320" rx="8" fill="#121212" stroke="#252525"/>
  <rect x="140" y="420" width="340" height="180" rx="4" fill="#1e1e1e"/>
  <rect x="540" y="420" width="340" height="180" rx="4" fill="#1e1e1e"/>
  <rect x="940" y="420" width="340" height="180" rx="4" fill="#1e1e1e"/>
  <text x="120" y="780" fill="#666" font-family="system-ui,sans-serif" font-size="14" letter-spacing="4">VIACATION — PRODUCT COMPOSITION</text>
</svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(path.join(dir, "hero.webp"));
  await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(path.join(dir, "screen-1.webp"));
}

async function main() {
  for (const slug of slugs) await convertDir(slug);
  await viacationMock();
  console.log("done");
}

main();
