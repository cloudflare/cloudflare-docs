export async function GET() {
	const catalog = {
		linkset: [
			{
				anchor: "https://developers.cloudflare.com/api/",
				"service-desc": [
					{
						href: "https://developers.cloudflare.com/openapi.json",
						type: "application/json",
					},
				],
				"service-doc": [
					{
						href: "https://developers.cloudflare.com/api/",
						type: "text/html",
					},
					{
						href: "https://developers.cloudflare.com/api/",
						type: "text/markdown",
					},
				],
				status: [
					{
						href: "https://www.cloudflarestatus.com/api/v2/status.json",
						type: "application/json",
					},
				],
			},
		],
	};

	return new Response(JSON.stringify(catalog), {
		headers: {
			"Content-Type":
				'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
		},
	});
}
