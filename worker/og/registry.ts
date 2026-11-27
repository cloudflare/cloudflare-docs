import { changelog } from "./cards/changelog";
import { docs } from "./cards/docs";
import type { CardType } from "./types";

/**
 * Changelog posts use their legacy page reader; every other page is a docs
 * card if the build emitted one for it.
 */
export const cardTypeFor = (pathname: string): CardType =>
	pathname.startsWith("/changelog/post/") ? changelog : docs;
