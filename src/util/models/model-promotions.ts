/**
 * Time-limited promotional prices for Workers AI models.
 *
 * A promotion shows on the model card (a "Promo pricing" badge) and on the
 * model page (the Unit Pricing row shows the promotional price, the standard
 * price struck through, and the end date). Each promotion stops showing on the
 * first docs build after `endsAt`, so an expired entry is harmless; remove it
 * in the next cleanup.
 *
 * Only list a model here when its promotional price is lower than its standard
 * price. Prices are USD.
 */
export interface ModelPromotion {
	/** Promotional price, in USD per `unit`. */
	promoPrice: number;
	/** Standard price once the promotion ends, in USD per `unit`. */
	standardPrice: number;
	/** Pricing unit, matching the model's `price` property (for example "per M input tokens"). */
	unit: string;
	/** When the promotion ends (exclusive), as an ISO 8601 UTC timestamp. */
	endsAt: string;
}

export const modelPromotions: Record<string, ModelPromotion> = {
	"@cf/cloudflare/clairic": {
		promoPrice: 0.1,
		standardPrice: 0.24,
		unit: "per M input tokens",
		endsAt: "2026-12-01T00:00:00Z",
	},
};

/** The model's promotion if it is still running at `now`, else `null`. */
export function activeModelPromotion(
	modelName: string,
	now: Date = new Date(),
): ModelPromotion | null {
	const promotion = modelPromotions[modelName];
	if (!promotion) return null;
	return now.getTime() < new Date(promotion.endsAt).getTime()
		? promotion
		: null;
}

/** "December 1, 2026" for a promotion's `endsAt`. */
export function formatPromotionEnd(promotion: ModelPromotion): string {
	return new Intl.DateTimeFormat("en-US", {
		dateStyle: "long",
		timeZone: "UTC",
	}).format(new Date(promotion.endsAt));
}
