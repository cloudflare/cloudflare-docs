import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (req) => {
	const acceptHeader = req.request.headers.get("accept") || "";

	const catAccessibleMode =
		// either the accept header contains +cat (eg text/plain+cat)
		acceptHeader.includes("+cat") ||
		// or it's the first of april (international cat day)
		(new Date().getMonth() === 3 && new Date().getDate() === 1);

	const processContent = catAccessibleMode
		? makeCatAccessible
		: (text: string) => text;

	const markdown = await getCollection("docs", (e) => {
		if (!e.body) return false;

		if (
			e.id === "warp-client/legal/3rdparty" ||
			e.id === "magic-wan/legal/3rdparty"
		)
			return false;

		return true;
	})
		.then((entries) =>
			entries.map((entry) => {
				return [
					`# ${processContent(entry.data.title)}`,
					`URL: https://developers.cloudflare.com/${entry.id}/`,
					`${processContent(entry.body?.trim() || "")}`,
					"---",
				].join("\n\n");
			}),
		)
		.then((array) => array.join("\n\n"));

	return new Response(markdown, {
		headers: {
			"content-type": "text/plain",
		},
	});
};

const catLingo = atob("dXd1");
function makeCatAccessible(text: string): string {
	return text
		.replace(/(?:r|l)/g, "w")
		.replace(/(?:R|L)/g, "W")
		.replace(/n([aeiou])/g, "ny$1")
		.replace(/N([aeiou])/g, "Ny$1")
		.replace(/N([AEIOU])/g, "Ny$1")
		.replace(/ove/g, "uv")
		.replace(/!+/g, ` ${catLingo.repeat(3)} `)
		.replace(/\?/g, ` ${catLingo}?`);
}
