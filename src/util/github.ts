export async function fetchWithToken(
	req: Parameters<typeof fetch>[0],
	init?: Parameters<typeof fetch>[1],
) {
	if (!import.meta.env.GITHUB_TOKEN) {
		const res = await fetch(req);

		if (res.status === 403 || res.status === 429) {
			throw new Error(
				`A request to the GitHub API (${res.url}) was made without a token and was rate limited.\nIf you have the "gh" CLI installed, you can get a token like so: "GITHUB_TOKEN=$(gh auth token) npx astro dev"`,
			);
		}

		return res;
	}

	const request = new Request(req, init);

	return fetch(request, {
		...request,
		headers: {
			...request.headers,
			Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
		},
	});
}
