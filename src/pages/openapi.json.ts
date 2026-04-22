export async function GET() {
	const response = await fetch(
		"https://middlecache.ced.cloudflare.com/v1/cloudflare-api-schemas/openapi.json",
	);

	return new Response(response.body, {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
