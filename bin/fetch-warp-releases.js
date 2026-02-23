import fs from "fs";
import YAML from "yaml";
import { marked } from "marked";

const BASE_URL = "https://downloads.cloudflareclient.com/v1";

const platforms = await fetch(`${BASE_URL}/platforms`)
	.then((res) => res.json())
	.then((data) => data.result);

fs.writeFileSync(
	"./src/util/warp-platforms.json",
	JSON.stringify(platforms, null, "\t"),
	"utf-8",
);

const linuxDistributions = ["Ubuntu", "Debian", "CentOS", "Fedora"];

const linesToRemove = [
	"For related Cloudflare for Teams documentation please see: https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp",
	"For Zero Trust documentation please see: <https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp>",
	"For related Consumer documentation please see: https://developers.cloudflare.com/warp-client/",
	"For Consumer documentation please see: <https://developers.cloudflare.com/warp-client/>",
	"For Consumer documentation please see: <https://developers.cloudflare.com/warp-client>",
];

for (const { platform, display_name } of platforms) {
	const isLinux = linuxDistributions.some((dist) =>
		display_name.includes(dist),
	);

	for (const track of ["ga", "beta"]) {
		fetch(`${BASE_URL}/update/json/${platform}/${track}`)
			.then((res) => res.json())
			.then((data) => {
				if (!data.items) {
					console.warn(
						`${track} has no releases: ${JSON.stringify(data, null, 2)}`,
					);

					return;
				}

				data.items.forEach((item) => {
					let folder = `./src/content/warp-releases/`;

					if (isLinux) {
						folder += `linux/${track}`;
					} else {
						folder += `${platform}/${track}`;
					}

					const path = `${folder}/${item.version}.yaml`;

					if (!fs.existsSync(folder)) {
						fs.mkdirSync(folder, { recursive: true });
					}

					if (fs.existsSync(path)) {
						if (isLinux) {
							const existingFile = YAML.parse(fs.readFileSync(path, "utf-8"));

							existingFile.linuxPlatforms ??= {};

							if (!existingFile.linuxPlatforms[platform]) {
								console.log(
									`Adding ${platform} to Linux ${track} ${item.version}.`,
								);

								existingFile.linuxPlatforms[platform] = item.packageSize;
							} else {
								console.log(
									`${platform} already exists in Linux ${track} ${item.version}.`,
								);
							}

							fs.writeFileSync(
								path,
								YAML.stringify(existingFile, { blockQuote: "literal" }),
								"utf-8",
							);
						} else {
							console.log(
								`${platform} ${track} ${item.version} already exists.`,
							);
						}

						return;
					}

					console.log(`Saving ${platform} ${track} ${item.version}.`);

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
					const platformName = isLinux ? "Linux" : data.platformName;

					fs.writeFileSync(
						path,
						YAML.stringify(
							{
								...item,
								releaseNotes,
								platformName,
								linuxPlatforms: isLinux
									? { [platform]: item.packageSize }
									: undefined,
							},
							{ blockQuote: "literal" },
						),
						"utf-8",
					);
				});
			});
	}
}
