import fs from "fs";

fetch("https://ai.cloudflare.com/api/models")
	.then((res) => res.json())
	.then((data) => {
		data.models.map((model) => {
			const fileName = model.name.split("/")[2];
			fs.writeFileSync(
				`./src/content/workers-ai-models/${fileName}.json`,
				JSON.stringify(model, null, 4),
				"utf-8",
			);
		});
	});
