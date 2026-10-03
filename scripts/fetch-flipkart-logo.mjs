import { chromium } from "playwright";
import { writeFile } from "fs/promises";

async function save(url, out) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2500);
    const src = await page.evaluate(() => {
      const img =
        document.querySelector('img[src*="flipkart" i]') ||
        document.querySelector('header img') ||
        document.querySelector('img[alt*="Flipkart" i]');
      return img?.getAttribute("src") || null;
    });
    if (!src) {
      console.log("no src", url);
      return;
    }
    const absolute = new URL(src, url).href;
    const resp = await page.request.get(absolute);
    await writeFile(out, await resp.body());
    console.log("saved", out);
  } finally {
    await browser.close();
  }
}

await save("https://www.flipkart.com/", "public/logos/flipkart.png");
