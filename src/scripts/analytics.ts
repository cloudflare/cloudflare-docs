const links = document.querySelectorAll<HTMLAnchorElement>("a");

function $zarazLinkEvent(type: string, link: HTMLAnchorElement) {
	// @ts-expect-error TODO: type zaraz
	zaraz.track(type, { href: link.href, hostname: link.hostname });
}

addEventListener("DOMContentLoaded", () => {
	if (links.length > 0) {
		for (const link of links) {
			const linkURL = new URL(link.href);
			const cfSubdomainRegex = new RegExp(`^[^.]+?\\.cloudflare\\.com`);
			if (linkURL.hostname !== "developers.cloudflare.com") {
				if (
					linkURL.hostname === "workers.cloudflare.com" &&
					linkURL.pathname.startsWith("/playground#")
				) {
					link.addEventListener("click", () => {
						$zarazLinkEvent("playground link click", link);
					});
				} else if (cfSubdomainRegex.test(linkURL.hostname)) {
					link.addEventListener("click", () => {
						$zarazLinkEvent("Cross Domain Click", link);
					});
				} else {
					link.addEventListener("click", () => {
						$zarazLinkEvent("external link click", link);
					});
				}
			}
		}
	}
});
