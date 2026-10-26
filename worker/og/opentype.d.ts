// opentype.js 2.x ships no types; this covers the surface worker/ uses.
declare module "opentype.js" {
	export interface Glyph {
		advanceWidth: number;
	}
	export interface Font {
		unitsPerEm: number;
		charToGlyph(char: string): Glyph;
		getKerningValue(left: Glyph, right: Glyph): number;
	}
	export function parse(buffer: ArrayBuffer): Font;
}
