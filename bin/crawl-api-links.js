import puppeteer from 'puppeteer';

async function checkLinks() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const sitemapUrl = 'https://developers.cloudflare.com/sitemap.xml'; // Replace with your sitemap URL
  await page.goto(sitemapUrl);

  const sitemapLinks = await page.$$eval('url loc', (elements) =>
    elements.map((el) => el.textContent)
  );

  const brokenLinks = [];

  for (const link of sitemapLinks) {
    await page.goto(link, { waitUntil: 'networkidle0' });

    const pageLinks = await page.$$eval('a', (elements) =>
      elements.map((el) => el.href)
    );

    for (const pageLink of pageLinks) {
      if (pageLink.includes("https://developers.cloudflare.com/api/operations")) {
      await page.goto(pageLink, { waitUntil: 'networkidle0' });

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