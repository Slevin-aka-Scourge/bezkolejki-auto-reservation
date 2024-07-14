const { executablePath } = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
async function browser(src, head) {
  let brows;
  try {
    brows = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--mute-audio",
        "--no-zygote",
        "--no-xshm",
        "--window-size=1620,1080",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--enable-webgl",
        "--ignore-certificate-errors",
        "--lang=en-US,en;q=0.9",
        "--password-store=basic",
        "--disable-gpu-sandbox",
        "--disable-software-rasterizer",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-infobars",
        "--disable-breakpad",
        "--disable-canvas-aa",
        "--disable-2d-canvas-clip-aa",
        "--disable-gl-drawing-for-tests",
        "--enable-low-end-device-mode",
        "--disable-site-isolation-trials",
      ],
      headless: head,
      executablePath: executablePath(),
      // devtools:true
    });
    const [page] = await brows.pages();
    await page.goto(src);
    await page.waitForTimeout(5000);
    await page.screenshot({ fullPage: true, path: "./test.png" });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    if (brows && brows.isConnected()) {
      await brows.close();
    }
  }
}
module.exports.browser = browser;
