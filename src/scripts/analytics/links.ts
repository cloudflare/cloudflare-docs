import { track } from "~/util/zaraz";

function registerLink(type: string, link: HTMLAnchorElement) {
	link.addEventListener("click", () => {
		track(type, { href: link.href, hostname: link.hostname });
	});
}

export function registerLinks() {
	const elements = document.querySelectorAll<HTMLAnchorElement>("a[href]");

	if (!elements || elements.length === 0) {
		return;
	}

	for (const el of elements) {
		const { hostname, pathname } = new URL(el.href);

		if (el.dataset.tagSerpLink) {
			el.addEventListener("click", () => {
				track("click docs tag", { value: el.innerText });
			});

			continue;
		}

		if (hostname === "developers.cloudflare.com" || hostname === "localhost") {
			continue;
		}

		if (hostname === "deploy.workers.cloudflare.com") {
			registerLink("deploy button click", el);
			continue;
		}

		if (
			hostname === "workers.cloudflare.com" &&
			pathname.startsWith("/playground#")
		) {
			registerLink("playground link click", el);
			continue;
		}

		if (hostname.endsWith(".cloudflare.com")) {
			registerLink("Cross Domain Click", el);
			continue;
		}

		registerLink("external link click", el);
	}
}
