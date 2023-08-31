import pa11y from "pa11y";
import puppeteer from "puppeteer";
import core from "@actions/core";

const navigationTimeout = 120000; // Set the navigation timeout to 120 seconds (120,000 milliseconds)
let resultsArray = [];
let printArray = [];

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

  for (const link of sitemapLinks) {
    if (!link) {
      continue; // Skip if the link is empty
    } else if (link.includes("/support/other-languages/")) {
      continue; // Skip if the link is in a certain section
    }

    const testPage = await browser.newPage();
    let result = await pa11y(link, {
      browser,
      page: testPage,
      runners: ["axe", "htmlcs"],
    });
    
    for (const issue of result.issues) {
        if (!resultsArray.contains(issue)) {
          resultsArray.push(issue);
        }
      } 

    await testPage.close();
  }
  await page.close();
  await browser.close();
  console.log(resultsArray)
}

checkLinks();
