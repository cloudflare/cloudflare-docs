import { parse } from "node-html-parser";
import { describe, expect, it } from "vitest";
import { transformContent } from "./content-transformers";

describe("AI Search content transformers", () => {
	it("extracts the Nimbus home page from rendered HTML", async () => {
		const sections = await transformContent({
			path: "/",
			title: "Cloudflare developer documentation",
			root: parse(`
				<html>
					<body>
						<main data-pagefind-body>
							<h1 id="build-on-cloudflare">Build on Cloudflare</h1>
							<p>Nimbus home page content.</p>
						</main>
					</body>
				</html>
			`),
		});

		expect(sections).toHaveLength(1);
		expect(sections[0]).toMatchObject({
			anchor: "build-on-cloudflare",
			heading: "Build on Cloudflare",
		});
		expect(sections[0].text).toContain("Nimbus home page content.");
	});

	it("extracts agent metadata from the Nimbus catalog", async () => {
		const sections = await transformContent({
			path: "/agent-setup/",
			title: "Agent setup",
			root: parse("<main></main>"),
		});

		expect(sections[0].text).toContain("Claude Code by Anthropic");
	});
});
