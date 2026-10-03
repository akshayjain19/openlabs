import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const targets = [
  { slug: "viacation", url: "https://viacation.com/" },
  { slug: "indore-nursery", url: "https://indorenursery.com/" },
  { slug: "sg11-fantasy", url: "https://sg11fantasyindia.com/" },
  { slug: "the-laundry-house", url: "https://thelaundryhouseindia.com/" },
  { slug: "tattvasri", url: "https://tattvasri.com/" },
];

const root = path.join(process.cwd(), "public/projects");

async function capture(page, outPath, opts = {}) {
  await page.screenshot({ path: outPath, type: "png", fullPage: false, ...opts });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  for (const { slug, url } of targets) {
    const dir = path.join(root, slug);
    await mkdir(dir, { recursive: true });
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
      await page.waitForTimeout(2500);
      await capture(page, path.join(dir, "hero.png"));
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.85));
      await page.waitForTimeout(1200);
      await capture(page, path.join(dir, "screen-1.png"));
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.85));
      await page.waitForTimeout(1200);
      await capture(page, path.join(dir, "screen-2.png"));
      console.log("ok", slug);
    } catch (e) {
      console.error("fail", slug, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
}

main();
