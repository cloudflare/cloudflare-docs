const compactNumber = new Intl.NumberFormat("en-US", {
	notation: "compact",
	maximumFractionDigits: 1,
});

export const modelCurrencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 10,
});

const implicitTokenPriceLabels = new Map([
	["output_audio_tokens", "Output audio"],
	["output_text_tokens", "Output text"],
	["output_video_tokens", "Output video"],
]);

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
	const implicitTokenPrice = implicitTokenPriceLabels.get(
		label.trim().toLowerCase(),
	);
	if (implicitTokenPrice) {
		return `${implicitTokenPrice} (per 1M tokens)`;
	}

	const normalized = label.replaceAll("_", " ").replace(/\s+/g, " ").trim();
	const tokenPrice =
		/^per (?:1)?m (.+?) tokens$/i.exec(normalized) ??
		/^(.+?) tokens \(per (?:1)?m\)$/i.exec(normalized);
	if (tokenPrice) {
		const descriptor = tokenPrice[1];
		const displayDescriptor =
			descriptor.charAt(0).toUpperCase() + descriptor.slice(1);
		return `${displayDescriptor} (per 1M tokens)`;
	}
	return normalized;
}
