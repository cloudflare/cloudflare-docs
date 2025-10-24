export function setSearchParams(params: URLSearchParams) {
	if (params.size === 0) {
		history.pushState(null, "", window.location.pathname);
		return;
	}

	history.pushState(
		null,
		"",
		`${window.location.pathname}?${params.toString()}`,
	);
}
