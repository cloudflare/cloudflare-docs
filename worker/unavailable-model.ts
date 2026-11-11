// Shared model-catalog 404 recovery for the production and preview workers.
//
// Model pages are generated from the live catalog, so a model that is retired
// upstream takes its page with it and every existing link to it starts 404ing.
// Rather than maintain a redirect per retired model in public/__redirects,
// catch the 404 and send the reader to the catalog with the requested model id
// in the query string, so the catalog can explain why the page is gone.
const MODEL_PATH = /^\/(workers-ai|ai)\/models\/(?!$)(.+?)\/?$/;

/**
 * A redirect to the relevant model catalog, or undefined when the path is not
 * a model page. Schema endpoints are left alone so JSON clients still get a
 * real 404 instead of an HTML page.
 *
 * `/ai/models/` slugs are namespaced model ids (`@cf/meta/…`, `openai/…`), and
 * the `@` arrives percent-encoded because the asset layer normalizes it. The
 * id is decoded before being re-encoded into the query string to avoid
 * double-encoding it.
 */
export function unavailableModelRedirect(
	pathname: string,
): Response | undefined {
	const match = pathname.match(MODEL_PATH);
	if (!match) return;

	const [, section, rawModel] = match;
	if (/\.(json|md|txt|png|xml)$/i.test(rawModel)) return;

	let model: string;
	try {
		model = decodeURIComponent(rawModel);
	} catch {
		return;
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: `/${section}/models/?unavailable=${encodeURIComponent(model)}`,
		},
	});
}
