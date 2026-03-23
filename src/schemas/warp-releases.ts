import { z } from "astro:schema";

export const warpReleasesSchema = z
	.object({
		version: z.string(),
		releaseDate: z.coerce.date(),
		releaseNotes: z.string(),
		packageSize: z.number().optional(),
		packageURL: z.string(),
		platformName: z.enum(["Windows", "macOS", "Linux"]),
		linuxPlatforms: z.record(z.string(), z.number()).optional(),
	})
	.refine(
		(val) => {
			if (val.platformName === "Linux") {
				if (!val.linuxPlatforms) {
					console.log(val.version);
				}
			}

			if (val.platformName !== "Linux" && !val.packageSize) return false;
			if (val.platformName === "Linux" && !val.linuxPlatforms) return false;

			return true;
		},
		{
			message:
				"Non-Linux platforms require the 'packageSize' property. Linux platforms require the 'linuxPlatforms' property.",
		},
	);
