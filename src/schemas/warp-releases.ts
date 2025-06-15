import { z } from "astro:schema";

export const warpReleasesSchema = z
	.object({
		version: z.string(),
		releaseDate: z.coerce.date(),
		releaseNotes: z.string(),
		packageSize: z.number().optional(),
		packageURL: z.string(),
		platformName: z.enum(["Windows", "macOS", "Linux"]),
	})
	.refine(
		(val) => {
			if (val.platformName !== "Linux" && !val.packageSize) return false;

			return true;
		},
		{
			message: "Non-Linux platforms require the 'packageSize' property.",
		},
	);
