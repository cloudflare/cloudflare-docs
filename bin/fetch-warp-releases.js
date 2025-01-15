import fs from "fs";
import YAML from "yaml";

const tracks = ["windows/ga", "windows/beta", "macos/ga", "macos/beta"];

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

				const platformName = data.platformName;
				const releaseNotes = item.releaseNotes.replace(/\r\n/g, "\n");

				fs.writeFileSync(
					`./src/content/warp-releases/${track}/${item.version}.yaml`,
					YAML.stringify({
						...item,
						releaseNotes,
						platformName,
					}),
					"utf-8",
				);
			});
		});
}
