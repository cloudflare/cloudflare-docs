import { readFile } from "fs/promises";

async function main() {
	const redirects = await readFile("public/__redirects", { encoding: "utf-8" });

	let numInfiniteRedirects = 0;
	let numUrlsWithFragment = 0;
	let numDuplicateRedirects = 0;
	let numNonSlashedRedirects = 0;
	let seenDynamicRedirects = false;
	let numStaticRedirectsAfterDynamicRedirect = 0;

	const validEndings = ["/", "*", ".xml", ".md", ".json", ".html", ".pdf"];

	const redirectSourceUrls: string[] = [];

	for (const line of redirects.split("\n")) {
		if (line.startsWith("#") || line.trim() === "") continue;

		const [from, to] = line.split(" ");

		if (from.includes("*")) {
			seenDynamicRedirects = true;
		}

		if (seenDynamicRedirects && !from.includes("*")) {
			console.log(
				`✘ Found static redirect after dynamic redirect:\n    ${from}`,
			);
			numStaticRedirectsAfterDynamicRedirect++;
		}

		if (from === to) {
			console.log(`✘ Found infinite redirect:\n    ${from} -> ${to}`);
			numInfiniteRedirects++;
		}

		if (from.includes("#")) {
			console.log(`✘ Found source URL with fragment:\n    ${from}`);
			numUrlsWithFragment++;
		}

		if (
			// CED-76 - flag unslashed redirects b/c these don't behave as expected due to our routing / preference for slashed endpoints
			!validEndings.some((ending) => from.endsWith(ending)) &&
			// CED-99 - known exception for /api where this isn't natively handled by our app
			from != "/api"
		) {
			console.log(`✘ Found unslashed source URLs:\n    ${from}`);
			numNonSlashedRedirects++;
		}

		if (redirectSourceUrls.includes(from)) {
			console.log(`✘ Found repeated source URL:\n    ${from}`);
			numDuplicateRedirects++;
		} else {
			redirectSourceUrls.push(from);
		}
	}

	if (
		numInfiniteRedirects ||
		numUrlsWithFragment ||
		numDuplicateRedirects ||
		numNonSlashedRedirects ||
		numStaticRedirectsAfterDynamicRedirect
	) {
		console.log("\nDetected errors:");

		if (numInfiniteRedirects > 0) {
			console.log(`- ${numInfiniteRedirects} infinite redirect(s)`);
		}

		if (numUrlsWithFragment > 0) {
			console.log(`- ${numUrlsWithFragment} source URL(s) with a fragment`);
		}

		if (numDuplicateRedirects > 0) {
			console.log(`- ${numDuplicateRedirects} repeated source URL(s)`);
		}

		if (numNonSlashedRedirects > 0) {
			console.log(
				`- ${numNonSlashedRedirects} need slashes at the end of the source URL`,
			);
		}

		if (numStaticRedirectsAfterDynamicRedirect > 0) {
			console.log(
				`- ${numStaticRedirectsAfterDynamicRedirect} static redirect(s) after dynamic redirect(s)`,
			);
		}

		console.log("\nPlease fix the errors above before merging :)");
		process.exit(1);
	} else {
		console.log("\nDone!");
	}
}

main();
