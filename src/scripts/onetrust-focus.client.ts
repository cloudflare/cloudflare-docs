declare global {
	interface Window {
		__nbOneTrustFocusRegistered?: boolean;
	}
}

if (!window.__nbOneTrustFocusRegistered) {
	window.__nbOneTrustFocusRegistered = true;

	document.addEventListener(
		"click",
		(event) => {
			const target = event.target;
			if (
				!(target instanceof Element) ||
				!target.closest(
					"#onetrust-pc-btn-handler, #ot-sdk-btn.ot-sdk-show-settings, #ot-sdk-btn.optanon-show-settings",
				)
			)
				return;

			requestAnimationFrame(() => {
				document
					.querySelector<HTMLButtonElement>("#close-pc-btn-handler")
					?.focus();
			});
		},
		true,
	);
}

export {};
