import type { Measure } from "./fonts";
import type { CardNode } from "./layout";

/** A card read from its built page, ready to render. */
export interface ResolvedCard {
	/** Content version; also the R2 key and the expected `v` query value. */
	version: string;
	element(measure: Measure): CardNode;
}

export interface CardType {
	/** R2 namespace: images are stored at `og/<id>/<version>.png`. */
	id: string;
	/**
	 * `null` when the page has no card (404). Throws when the page should have
	 * one but its metadata is unusable (static fallback).
	 */
	resolve(page: Response): Promise<ResolvedCard | null>;
}
