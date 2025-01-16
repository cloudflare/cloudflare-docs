import { z } from "astro:schema";

export const warpReleasesSchema = z.object({
	version: z.string(),
	releaseDate: z.coerce.date(),
	releaseNotes: z.string(),
	packageSize: z.number(),
	packageURL: z.string(),
	platformName: z.enum(["Windows", "macOS", "Linux"]),
});
