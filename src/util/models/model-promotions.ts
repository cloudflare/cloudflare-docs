import type { ModelBanner } from "./model-types";

/**
 * Time-limited promotional prices for models.
 *
 * While a promotion runs, it shows in three places:
 * - the model page banner (the same slot as a CMS banner, such as GPT-5.6 Sol's
 *   "50% off" banner; a CMS banner wins),
 * - the model page Unit Pricing row (promo price, standard price struck
 *   through, end date),
 * - the catalog card ("58% off until Dec 1" badge, shown first).
 *
 * Each promotion stops showing on the first docs build after `endsAt`, so an
 * expired entry is harmless; remove it in the next cleanup.
 *
 * Only list a model whose promotional price is lower than its standard price.
 * Prices are USD.
 */
export interface ModelPromotion {
	/** Name used in the banner, for example "Clairic". */
	displayName: string;
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
		displayName: "Clairic",
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

/** Whole-percent discount off the standard price, for example 58. */
export function promotionDiscountPercent(promotion: ModelPromotion): number {
	return Math.floor(
		((promotion.standardPrice - promotion.promoPrice) /
			promotion.standardPrice) *
			100,
	);
}

/** "December 1, 2026" (or "Dec 1" with `short`) for a promotion's `endsAt`. */
export function formatPromotionEnd(
	promotion: ModelPromotion,
	{ short = false }: { short?: boolean } = {},
): string {
	return new Intl.DateTimeFormat(
		"en-US",
		short
			? { month: "short", day: "numeric", timeZone: "UTC" }
			: { dateStyle: "long", timeZone: "UTC" },
	).format(new Date(promotion.endsAt));
}

const usd = (value: number): string =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);

/** The model page banner for a running promotion, else `null`. */
export function promotionBanner(
	modelName: string,
	now: Date = new Date(),
): ModelBanner | null {
	const promotion = activeModelPromotion(modelName, now);
	if (!promotion) return null;
	return {
		severity: "info",
		title: "Launch promo",
		text: `${promotion.displayName} is ${promotionDiscountPercent(promotion)}% off at ${usd(promotion.promoPrice)} ${promotion.unit} until ${formatPromotionEnd(promotion)}. The standard price of ${usd(promotion.standardPrice)} ${promotion.unit} applies from then on.`,
		link: null,
	};
}
