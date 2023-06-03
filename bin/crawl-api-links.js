import puppeteer from "puppeteer";

const navigationTimeout = 120000; // Set the navigation timeout to 60 seconds (60000 milliseconds)
let counter = 10;

async function checkLinks() {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  const sitemapUrl = "https://developers.cloudflare.com/sitemap.xml";
  await page.goto(sitemapUrl, { timeout: navigationTimeout });

  const sitemapLinks = await page.$$eval("url loc", (elements) =>
    elements.map((el) => el.textContent)
  );

  const visitedLinks = new Set(); // Set to store visited links
  const brokenLinks = [];

  for (const link of sitemapLinks) {
    if (!link) {
      continue; // Skip if the link is empty
    }

    await page.goto(link, {
      waitUntil: "networkidle0",
      timeout: navigationTimeout,
    });

    const pageLinks = await page.$$eval("a", (elements) =>
      elements.map((el) => el.href)
    );

    for (const pageLink of pageLinks) {
      if (!pageLink || visitedLinks.has(pageLink)) {
        continue; // Skip if the pageLink is empty or has already been visited
      }

      if (pageLink.includes("/api/operations/")) {
        console.log(`Evaluating link: ${pageLink}`);
        await page.goto(pageLink, {
          waitUntil: "networkidle0",
          timeout: navigationTimeout,
        });
        visitedLinks.add(pageLink); // Add the pageLink to the visited set
        counter++;
        if (counter > 10) {
          return;
        }
        const statusCode = await page.evaluate(() => {
          return {
            status: document.querySelector("body") ? 200 : 404,
            url: window.location.href,
          };
        });
        console.log(statusCode)
        if (statusCode.status !== 200) {
          brokenLinks.push(statusCode.url);
        }
      }
    }
  }

  await browser.close();
  console.log("Evaluated links:");
  console.log(visitedLinks);
  console.log("Broken links:");
  console.log(brokenLinks);
  if (brokenLinks.length > 0) {
    console.log("Broken links found:");
    for (const link of brokenLinks) {
      console.log(link);
    }
    process.exit(1);
  }
}

checkLinks().catch((error) => {
  console.error(error);
  process.exit(1);
});
