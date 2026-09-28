// Docs page card (tutorials included): the page title and its pills, per the
// tiny-tools Docs/Tutorial design (aafeb41).

import {
	OG_CARD_META,
	docsOgVersion,
	parseDocsCard,
	type DocsCard,
} from "../../../src/util/og/docs";
import type { Measure } from "../fonts";
import {
	canvas,
	dimensionLine,
	fitPills,
	layoutTitle,
	pillRow,
	titleBand,
	type TitleScale,
} from "../layout";
import { readPage } from "../page";
import type { CardType } from "../types";

export const DOCS_TITLE_SCALE: TitleScale = {
	steps: [45, 85],
	tiers: [
		{ fontSize: 76, lineHeight: 1.1, maxLines: 2 },
		{ fontSize: 60, lineHeight: 1.16, maxLines: 2 },
		{ fontSize: 54, lineHeight: 1.18, maxLines: 3 },
	],
	truncateLongWords: true,
	breakAfterColon: true,
};

export function docsCard({ title, pills }: DocsCard, measure: Measure) {
	const fitted = fitPills(pills, measure);
	return canvas([
		titleBand(layoutTitle(title, measure, DOCS_TITLE_SCALE)),
		dimensionLine(415),
		...(fitted.length ? [pillRow(fitted, { gap: 12 })] : []),
	]);
}

/** `null` means no tag (not eligible); a malformed tag throws (fallback). */
export async function readDocsCard(page: Response) {
	const { card } = await readPage(page, {
		card: { selector: `meta[name="${OG_CARD_META}"]`, attribute: "content" },
	});
	if (card === null) return null;
	const parsed = parseDocsCard(card);
	if (!parsed) throw new Error(`Invalid ${OG_CARD_META} tag`);
	return parsed;
}

export const docs: CardType = {
	id: "docs",
	async resolve(page) {
		const card = await readDocsCard(page);
		return (
			card && {
				version: await docsOgVersion(card),
				element: (measure) => docsCard(card, measure),
			}
		);
	},
};
