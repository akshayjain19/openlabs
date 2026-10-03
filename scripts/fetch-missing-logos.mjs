import { chromium } from "playwright";
import { writeFile } from "fs/promises";
import path from "path";

async function fetchLogo(url, outSvg, selector) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2000);
    const src = await page.evaluate((sel) => {
      const img = document.querySelector(sel);
      return img?.getAttribute("src") || img?.getAttribute("href") || null;
    }, selector);
    if (src) {
      const absolute = new URL(src, url).href;
      const resp = await page.request.get(absolute);
      const buf = await resp.body();
      const ext = absolute.includes(".svg") ? "svg" : "png";
      const out = outSvg.replace(/\.svg$/, ext === "svg" ? ".svg" : ".png");
      await writeFile(out, buf);
      console.log("saved", out);
    } else {
      console.log("no logo", url);
    }
  } finally {
    await browser.close();
  }
}

await fetchLogo("https://www.probo.in/", path.join("public/logos/probo.svg"), 'img[alt*="Probo" i], img[src*="logo" i], header img, .logo img');
await fetchLogo("https://zuperior.com/", path.join("public/logos/zuperior.svg"), 'img[alt*="Zuperior" i], img[src*="logo" i], header img, .logo img');
