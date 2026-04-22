export async function GET() {
	const response = await fetch(
		"https://middlecache.ced.cloudflare.com/v1/cloudflare-api-schemas/openapi.json",
	);

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control":
				response.headers.get("Cache-Control") ?? "public, max-age=3600",
		},
	});
}
