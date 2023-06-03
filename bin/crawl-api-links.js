import puppeteer from "puppeteer";

const navigationTimeout = 120000; // Set the navigation timeout to 60 seconds (60000 milliseconds)

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
        await page.goto(pageLink, {
          waitUntil: "networkidle0",
          timeout: navigationTimeout,
        });

        visitedLinks.add(pageLink); // Add the pageLink to the visited set

        const statusCode = await page.evaluate(() => {
          return {
            status: document.querySelector("body") ? 200 : 404,
            url: window.location.href,
          };
        });
        if (statusCode.url === "https://developers.cloudflare.com/api/") {
          brokenLinks.push(pageLink);
        }
      }
    }
  }

  await browser.close();
  console.log("Broken links:");
  console.log(brokenLinks);
  process.exit(1);
}

checkLinks().catch((error) => {
  console.error(error);
  process.exit(1);
});
