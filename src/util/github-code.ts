export async function fetchGitHubFile(
	repo: string,
	commit: string,
	file: string,
) {
	const workerUrl = `https://gh-code.developers.cloudflare.com/${repo}/${commit}/${file}`;
	let response: Response | undefined;

	try {
		response = await fetch(workerUrl);
	} catch {
		// Fall back to GitHub if the code proxy is unavailable.
	}

	if (response?.ok) return response;

	const githubUrl = `https://raw.githubusercontent.com/${repo}/${commit}/${file}`;
	response = await fetch(githubUrl);

	if (!response.ok) {
		throw new Error(`[GitHubFile] Received ${response.status} from GitHub.`);
	}

	return response;
}
