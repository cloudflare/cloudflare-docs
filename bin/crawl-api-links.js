import puppeteer from 'puppeteer';

const navigationTimeout = 120000; // Set the navigation timeout to 60 seconds (60000 milliseconds)

async function checkLinks() {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();

  const sitemapUrl = 'http://developers.cloudflare/sitemap.xml';
  await page.goto(sitemapUrl, { timeout: navigationTimeout });

  const sitemapLinks = await page.$$eval('url loc', (elements) =>
    elements.map((el) => el.textContent)
  );

  const visitedLinks = new Set(); // Set to store visited links
  const brokenLinks = [];

  for (const link of sitemapLinks) {
    if (!link) {
      continue; // Skip if the link is empty
    }

    console.log(`Processing link: ${link}`);
    await page.goto(link, { waitUntil: 'networkidle0', timeout: navigationTimeout });
    visitedLinks.add(link); // Add the link to the visited set

    const pageLinks = await page.$$eval('a', (elements) =>
      elements.map((el) => el.href)
    );

    for (const pageLink of pageLinks) {
      if (!pageLink || visitedLinks.has(pageLink)) {
        continue; // Skip if the pageLink is empty or has already been visited
      } else if (!pageLink.includes("https://developers.cloudflare.com/api/operations")) {
        continue; // Skip if the pageLink isn't from the api docs
      }

      await page.goto(pageLink, { waitUntil: 'networkidle0', timeout: navigationTimeout });
      visitedLinks.add(pageLink); // Add the pageLink to the visited set

      const statusCode = await page.evaluate(() => {
        return {
          status: document.querySelector('body') ? 200 : 404,
          url: window.location.href,
        };
      });

      if (statusCode.status !== 200) {
        brokenLinks.push(statusCode.url);
      }
    }
  }

  await browser.close();

  if (brokenLinks.length > 0) {
    console.log('Broken links found:');
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