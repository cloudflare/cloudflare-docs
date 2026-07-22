import { track } from "~/util/zaraz";

/**
 * Link-click analytics. Mirrors root `src/scripts/analytics/links.ts` event
 * names, payload shapes, and hostname classification (incl. the internal-skip
 * list) exactly. Ported to a single delegated `document` listener so it keeps
 * working across Astro view transitions and for links added after load; the
 * per-element registration in root is otherwise equivalent.
 */
function classify(link: HTMLAnchorElement): void {
	if (link.dataset.tagSerpLink) {
		track("click docs tag", { value: link.innerText });
		return;
	}

	const { hostname, pathname } = new URL(link.href);

	// Internal links are not tracked (parity: identical skip list to root —
	// note this is `developers.cloudflare.com`/`localhost`, NOT the workers.dev
	// preview host, so run parity checks on localhost).
	if (hostname === "developers.cloudflare.com" || hostname === "localhost") {
		return;
	}

	if (hostname === "deploy.workers.cloudflare.com") {
		track("deploy button click", { href: link.href, hostname: link.hostname });
		return;
	}

	if (
		hostname === "workers.cloudflare.com" &&
		pathname.startsWith("/playground#")
	) {
		track("playground link click", {
			href: link.href,
			hostname: link.hostname,
		});
		return;
	}

	if (hostname.endsWith(".cloudflare.com")) {
		track("Cross Domain Click", { href: link.href, hostname: link.hostname });
		return;
	}

	track("external link click", { href: link.href, hostname: link.hostname });
}

export function registerLinks(): void {
	document.addEventListener("click", (event) => {
		const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
			"a[href]",
		);
		if (link) classify(link);
	});
}
