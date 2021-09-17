const puppeteer = require("puppeteer");
const urls = require("./urls.json");

async function parseUrls() {
  // post the heading
  console.log('|URL|Version|');
  // start the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // for all urls
  for (const url of urls.list) {
    // load the url
    try {
      await page.goto('https://' + url);
      // take a screenshot
      // await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1, });
      // await page.screenshot({ path: 'example.png' });
      // parse the jquery version
      const version = await page.evaluate(() => {
        return (typeof jQuery !== 'undefined') ? jQuery.fn.jquery : 'N/A';
      });
      console.log(`|${url}|${version}|`);
    } catch(e) {
      console.log(`|${url}|TIMEOUT|`);
    }
  }
  // close the browser
  await browser.close();
};

parseUrls();