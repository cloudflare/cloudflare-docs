import { createSigner, signingHeaders } from "./signer.mjs";

// Use with a context created with serviceWorkers: "block".
export async function installWebBotAuth(context, options) {
	const signer = createSigner(options);
	await context.route("**/*", async (route) => {
		let response;
		try {
			const request = route.request();
			const headers = await request.allHeaders();
			for (const name of signingHeaders) delete headers[name];
			Object.assign(
				headers,
				signer.headers(request.url(), request.method(), headers.host),
			);
			// Browser routing only intercepts the first URL in a redirect chain.
			// Fetch one hop and stop redirects instead of reusing headers.
			response = await route.fetch({ headers, maxRedirects: 0, maxRetries: 0 });
			if ([301, 302, 303, 307, 308].includes(response.status())) {
				await route.abort("blockedbyclient");
				return;
			}
			await route.fulfill({ response });
		} catch (error) {
			await route.abort("failed");
			options.onError?.(error);
		} finally {
			await response?.dispose();
		}
	});
}
