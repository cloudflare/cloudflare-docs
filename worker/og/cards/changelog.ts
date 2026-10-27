// Changelog entry card: the entry title, its MM.DD date on the dimension
// line, and the product pill.

import {
	changelogOgVersion,
	type ChangelogCard,
} from "../../../src/util/og/changelog";
import type { Measure } from "../fonts";
import {
	canvas,
	dimensionLine,
	layoutTitle,
	pillRow,
	titleBand,
	type TitleScale,
} from "../layout";
import { readPage } from "../page";
import type { CardType } from "../types";

export const CHANGELOG_TITLE_SCALE: TitleScale = {
	steps: [45, 60],
	tiers: [
		{ fontSize: 76, lineHeight: 1.08, maxLines: 2 },
		{ fontSize: 66, lineHeight: 1.12, maxLines: 2 },
		{ fontSize: 56, lineHeight: 1.16, maxLines: 3 },
	],
};

export async function readChangelogCard(
	page: Response,
): Promise<ChangelogCard | null> {
	const { title, date, product } = await readPage(page, {
		title: { selector: 'meta[property="og:title"]', attribute: "content" },
		date: { selector: "time[datetime]", attribute: "datetime" },
		product: {
			selector: 'meta[name="pcx_product"]',
			attribute: "content",
			last: true,
		},
	});
	return title && date ? { title, date, product: product ?? "" } : null;
}

export function changelogCard(
	{ title, date, product }: ChangelogCard,
	measure: Measure,
) {
	const [, month, day] = date.split("-");
	return canvas([
		titleBand(layoutTitle(title, measure, CHANGELOG_TITLE_SCALE)),
		dimensionLine(415, `${month}.${day}`),
		...(product ? [pillRow([product])] : []),
	]);
}

export const changelog: CardType = {
	id: "changelog",
	async resolve(page) {
		const card = await readChangelogCard(page);
		if (!card) throw new Error("changelog card metadata not found");
		return {
			version: await changelogOgVersion(card),
			element: (measure) => changelogCard(card, measure),
		};
	},
};
