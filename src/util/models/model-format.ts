const compactNumber = new Intl.NumberFormat("en-US", {
	notation: "compact",
	maximumFractionDigits: 1,
});

export const modelCurrencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 10,
});

export function formatCompactTokens(value: unknown): string | null {
	const count = Number(value);
	return Number.isFinite(count) && count > 0
		? `${compactNumber.format(count)} tokens`
		: null;
}

export function formatModelPricing(
	pricing: Record<string, unknown> | undefined,
): string[] {
	return Object.entries(pricing ?? {}).flatMap(([label, value]) => {
		const displayLabel = formatPricingLabel(label);
		if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
			return [`${displayLabel}: ${modelCurrencyFormatter.format(value)}`];
		}
		if (typeof value === "string" && value.trim()) {
			return [`${displayLabel}: ${value.trim()}`];
		}
		return [];
	});
}

function formatPricingLabel(label: string): string {
	const normalized = label.replaceAll("_", " ").replace(/\s+/g, " ").trim();
	const lower = normalized.toLowerCase();
	const tokenPrice =
		/^per (?:1)?m (cached )?(input|output) tokens$/.exec(lower) ??
		/^(cached )?(input|output) tokens \(per (?:1)?m\)$/.exec(lower);
	if (tokenPrice) {
		const direction = tokenPrice[2] === "input" ? "Input" : "Output";
		const displayDirection = tokenPrice[1]
			? `Cached ${direction.toLowerCase()}`
			: direction;
		return `${displayDirection} (per 1M tokens)`;
	}
	return normalized;
}
