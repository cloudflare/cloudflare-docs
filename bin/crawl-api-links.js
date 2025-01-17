import puppeteer from "puppeteer";
import core from "@actions/core";

const navigationTimeout = 120000; // Set the navigation timeout to 120 seconds (120,000 milliseconds)

function arrayToHTMLList(array) {
	let html = "<ul>";

	for (let i = 0; i < array.length; i++) {
		html += "<li>" + array[i] + "</li>";
	}

	html += "</ul>";

	return html;
}

async function checkLinks() {
	const browser = await puppeteer.launch({
		headless: "new",
	});
	const page = await browser.newPage();

	// skip image requests
	await page.setRequestInterception(true);
	page.on("request", (request) => {
		if (request.resourceType() === "image") request.abort();
		else request.continue();
	});

	const sitemapUrl = "https://developers.cloudflare.com/sitemap-index.xml";
	await page.goto(sitemapUrl, { timeout: navigationTimeout });

	const sitemapLinks = await page.$$eval("url loc", (elements) =>
		elements.map((el) => el.textContent),
	);

	const visitedLinks = [];
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
			elements.map((el) => el.href),
		);

		for (const pageLink of pageLinks) {
			if (!pageLink || visitedLinks.includes(pageLink)) {
				continue; // Skip if the pageLink is empty or has already been visited
			}

			if (
				pageLink.includes("developers.cloudflare.com/api/resources/") ||
				pageLink.startsWith("/api/resources/")
			) {
				console.log(`Evaluating link: ${pageLink}`);
				const response = await page.goto(pageLink, {
					waitUntil: "networkidle0",
					timeout: navigationTimeout,
				});
				visitedLinks.push(pageLink);

				if (response) {
					if (response.status() === 404) {
						brokenLinks.push(pageLink);
					}
				} else {
					console.log("WARNING: Didn't receive a response... skipping.");
				}
			}
		}
	}

	await browser.close();
	console.log("Broken links:");
	console.log(brokenLinks);
	if (brokenLinks.length > 0) {
		core.setOutput("brokenLinks", arrayToHTMLList(brokenLinks));
	}
	process.exit(0);
}

checkLinks().catch((error) => {
	console.error(error);
	process.exit(1);
});
