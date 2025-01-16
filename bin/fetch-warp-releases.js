import fs from "fs";
import YAML from "yaml";
import { marked } from "marked";

const tracks = ["windows/ga", "windows/beta", "macos/ga", "macos/beta"];

const linesToRemove = [
	"For related Cloudflare for Teams documentation please see: https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp",
	"For Zero Trust documentation please see: https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp",
	"For related Consumer documentation please see: https://developers.cloudflare.com/warp-client/",
	"For Consumer documentation please see: https://developers.cloudflare.com/warp-client/",
];

for (const track of tracks) {
	fetch(`https://downloads.cloudflareclient.com/v1/update/json/${track}`)
		.then((res) => res.json())
		.then((data) => {
			data.items.forEach((item) => {
				const path = `./src/content/warp-releases/${track}/${item.version}.yaml`;

				if (fs.existsSync(path)) {
					console.log(`${track} ${item.version} already exists.`);
					return;
				}

				console.log(`Saving ${track} ${item.version}.`);

				let markdown = item.releaseNotes;

				markdown.replace(/\r\n/g, "\n");

				for (const line of linesToRemove) {
					markdown = markdown.replace(line, "");
				}

				markdown = markdown.trim();

				const tokens = marked.lexer(markdown);

				marked.walkTokens(tokens, (token) => {
					if (token.type === "heading") {
						token.type = "strong";
						token.raw = `**${token.text}**\n`;

						delete token.depth;
					}
				});

				const releaseNotes = tokens.reduce((s, t) => s + t.raw, "");

				fs.writeFileSync(
					`./src/content/warp-releases/${track}/${item.version}.yaml`,
					YAML.stringify({
						...item,
						releaseNotes,
						platformName: data.platformName,
					}),
					"utf-8",
				);
			});
		});
}
