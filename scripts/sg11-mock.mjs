import sharp from "sharp";
import path from "path";

async function sg11Mock() {
  const dir = path.join("public/projects/sg11-fantasy");
  const w = 1440;
  const h = 900;
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect fill="#0b0b0b" width="100%" height="100%"/>
  <rect x="0" y="0" width="1440" height="64" fill="#111"/>
  <rect x="48" y="22" width="96" height="20" rx="3" fill="#f5f5f5" opacity="0.92"/>
  <rect x="180" y="28" width="56" height="8" rx="2" fill="#555"/>
  <rect x="250" y="28" width="56" height="8" rx="2" fill="#555"/>
  <rect x="1180" y="18" width="200" height="28" rx="14" fill="#1c1c1c" stroke="#333"/>
  <text x="48" y="140" fill="#fff" font-family="system-ui,sans-serif" font-size="48" font-weight="600">Pick your fantasy XI</text>
  <text x="48" y="182" fill="#888" font-family="system-ui,sans-serif" font-size="20">Live contests, squads and match-day flows.</text>
  <rect x="48" y="220" width="420" height="520" rx="10" fill="#121212" stroke="#262626"/>
  <rect x="500" y="220" width="420" height="520" rx="10" fill="#121212" stroke="#262626"/>
  <rect x="952" y="220" width="440" height="250" rx="10" fill="#161616" stroke="#262626"/>
  <rect x="952" y="490" width="440" height="250" rx="10" fill="#161616" stroke="#262626"/>
  <rect x="72" y="260" width="372" height="120" rx="6" fill="#1a1a1a"/>
  <rect x="72" y="400" width="372" height="120" rx="6" fill="#1a1a1a"/>
  <rect x="72" y="540" width="372" height="120" rx="6" fill="#1a1a1a"/>
  <text x="48" y="820" fill="#555" font-family="system-ui,sans-serif" font-size="13" letter-spacing="4">SG11 FANTASY — PRODUCT COMPOSITION</text>
</svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(path.join(dir, "hero.webp"));
  await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(path.join(dir, "screen-1.webp"));
}

sg11Mock().then(() => console.log("sg11 mock ok"));
