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

const reasoningEffortLabels = new Map([
	["none", "Off"],
	["minimal", "Minimal"],
	["low", "Low"],
	["medium", "Medium"],
	["high", "High"],
	["xhigh", "Extra high"],
	["max", "Max"],
]);

const reasoningEffortOrder = new Map(
	[...reasoningEffortLabels.keys()].map((effort, index) => [effort, index]),
);

export function formatCompactTokens(value: unknown): string | null {
	const count = Number(value);
	return Number.isFinite(count) && count > 0
		? `${compactNumber.format(count)} tokens`
		: null;
}

export function formatModelReasoning(
	reasoningEffort: unknown,
	reasoning: unknown,
): string | null {
	if (
		typeof reasoningEffort === "object" &&
		reasoningEffort !== null &&
		!Array.isArray(reasoningEffort)
	) {
		const metadata = reasoningEffort as Record<string, unknown>;
		const defaultEffort =
			typeof metadata.default_effort === "string"
				? metadata.default_effort.toLowerCase()
				: null;
		const supportedEfforts = Array.isArray(metadata.supported_efforts)
			? [
					...new Set(
						metadata.supported_efforts
							.filter((effort): effort is string => typeof effort === "string")
							.map((effort) => effort.toLowerCase()),
					),
				].sort(
					(a, b) =>
						(reasoningEffortOrder.get(a) ?? Number.MAX_SAFE_INTEGER) -
						(reasoningEffortOrder.get(b) ?? Number.MAX_SAFE_INTEGER),
				)
			: [];

		if (supportedEfforts.length > 0) {
			return supportedEfforts
				.map((effort) => {
					const label =
						reasoningEffortLabels.get(effort) ??
						effort.charAt(0).toUpperCase() + effort.slice(1);
					return effort === defaultEffort ? `${label} (default)` : label;
				})
				.join(", ");
		}

		if (defaultEffort) {
			const label =
				reasoningEffortLabels.get(defaultEffort) ??
				defaultEffort.charAt(0).toUpperCase() + defaultEffort.slice(1);
			return `${label} (default)`;
		}

		if (metadata.mandatory === true) {
			return "Always on";
		}
		if (typeof metadata.default_enabled === "boolean") {
			return metadata.default_enabled ? "On by default" : "Off by default";
		}
	}

	if (typeof reasoning === "boolean") {
		return reasoning ? "Yes" : "No";
	}
	if (typeof reasoning === "string") {
		const normalized = reasoning.trim().toLowerCase();
		if (["true", "yes", "1"].includes(normalized)) return "Yes";
		if (["false", "no", "0"].includes(normalized)) return "No";
	}

	return null;
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
