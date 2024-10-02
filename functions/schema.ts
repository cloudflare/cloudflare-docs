interface Environment {
	API_DOCS_KV: KVNamespace;
}

export const onRequestGet: PagesFunction<Environment> = async (context) => {
	const cachedSchema = await context.env.API_DOCS_KV?.get("schema", "json");
	if (cachedSchema) {
		return new Response(JSON.stringify(cachedSchema), {
			headers: { "Content-type": "application/json" },
		});
	}

	const schemaUrl =
		"https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.json";

	const req = new Request(schemaUrl);

	const cache = caches.default;
	let response = await cache.match(req);

	try {
		if (!response) {
			response = await fetch(req);
			const schema = await response.json<any>();

			const pathsByTag: Record<string, any> = {};

			Object.keys(schema.paths).forEach((key) => {
				const path = schema.paths[key];
				const tag = Object.values(path).find((endpoint: any) => {
					const tags = endpoint.tags;
					return tags && tags.length && tags[0];
				}) as string;
				if (tag) {
					if (!pathsByTag[tag]) pathsByTag[tag] = [];
					pathsByTag[tag].push({ path, key });
				}
			});

			let sortedPaths = {};
			const sortedTags = Object.keys(pathsByTag).sort();
			sortedTags.forEach((tag) => {
				const tagArray = pathsByTag[tag];
				tagArray.forEach(({ key, path }) => {
					if (sortedPaths[key]) console.log("key already exists");
					sortedPaths[key] = path;
				});
			});

			// sort sortedPaths by tag
			sortedPaths = Object.entries(sortedPaths)
				.sort((a, b) => {
					const aVal = a[1];
					const bVal = b[1];
					const firstAVal = Object.values(aVal).find((endpoint) => {
						const tags = endpoint.tags;
						return tags && tags.length && tags[0];
					});
					const aTag = (firstAVal && firstAVal.tags[0]) || "";
					const firstBVal = Object.values(bVal).find((endpoint) => {
						const tags = endpoint.tags;
						return tags && tags.length && tags[0];
					});
					const bTag = (firstBVal && firstBVal.tags[0]) || "";
					if (aTag < bTag) return -1;
					if (aTag > bTag) return 1;
					return 0;
				})
				.reduce((obj, [key, val]) => {
					obj[key] = val;
					return obj;
				}, {});

			const sortedSchema = Object.assign({}, schema, { paths: sortedPaths });

			response = new Response(JSON.stringify(sortedSchema), {
				headers: { "Content-type": "application/json" },
			});

			const expirationTtl = 60 * 60;
			context.waitUntil(
				context.env.API_DOCS_KV.put("schema", JSON.stringify(sortedSchema), {
					expirationTtl,
				}),
			);
		}

		return response;
	} catch (err) {
		console.log(err);
		return fetch(req);
	}
};
