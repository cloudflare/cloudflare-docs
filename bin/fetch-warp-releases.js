import fs from "fs";
import YAML from "yaml";
import { markdownToMdast } from "satteri";

const BASE_URL = "https://downloads.cloudflareclient.com/v1";

const platforms = await fetch(`${BASE_URL}/platforms`)
	.then((res) => res.json())
	.then((data) => data.result);

const PLATFORMS_PATH = "./src/util/warp-platforms.json";

let existingPlatforms = [];
if (fs.existsSync(PLATFORMS_PATH)) {
	try {
		const parsed = JSON.parse(fs.readFileSync(PLATFORMS_PATH, "utf-8"));
		if (Array.isArray(parsed)) {
			existingPlatforms = parsed;
		} else {
			console.warn(
				`${PLATFORMS_PATH} did not contain an array; ignoring existing content.`,
			);
		}
	} catch {
		console.warn(
			`Failed to parse ${PLATFORMS_PATH}; ignoring existing content.`,
		);
	}
}

const platformsById = Object.fromEntries(
	existingPlatforms.map((p) => [p.platform, p]),
);
for (const p of platforms) {
	platformsById[p.platform] = p;
}

fs.writeFileSync(
	PLATFORMS_PATH,
	JSON.stringify(Object.values(platformsById), null, "\t"),
	"utf-8",
);

const linuxDistributions = ["Ubuntu", "Debian", "CentOS", "Fedora", "Alma"];

const linesToRemove = [
	"For related Cloudflare for Teams documentation please see: https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp",
	"For Zero Trust documentation please see: <https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp>",
	"For Zero Trust documentation please see: <https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/>",
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

					// Demote headings to bold text (they render inside a collapsible
					// <Details> block, where real headings would pollute the outline).
					// Recursively collects headings so ones nested in containers are
					// demoted too, while `#` lines inside code fences survive. The
					// heading text is sliced from the first child's offset, which
					// skips ATX markers and setext underlines alike.
					const tree = markdownToMdast(markdown);
					const headings = [];
					const collectHeadings = (node) => {
						if (node.type === "heading") headings.push(node);
						for (const child of node.children ?? []) collectHeadings(child);
					};
					collectHeadings(tree);

					let releaseNotes = "";
					let cursor = 0;
					for (const node of headings) {
						const nodeStart = node.position?.start?.offset;
						const textStart = node.children?.[0]?.position?.start?.offset;
						const end = node.position?.end?.offset;
						if (
							typeof nodeStart !== "number" ||
							typeof textStart !== "number" ||
							typeof end !== "number"
						) {
							continue;
						}

						releaseNotes += markdown.slice(cursor, nodeStart);
						const text = markdown
							.slice(textStart, end)
							.split("\n")[0]
							.replace(/[ \t]+#+[ \t]*$/, "")
							.trim();
						releaseNotes += `**${text}**\n`;
						// Headings end at a line break; consume it so it is not
						// duplicated by the following between-heading text.
						cursor = markdown[end] === "\n" ? end + 1 : end;
					}
					releaseNotes += markdown.slice(cursor);
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
