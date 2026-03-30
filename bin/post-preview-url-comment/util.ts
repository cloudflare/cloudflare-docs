import { slug } from "github-slugger";
import { CONTENT_BASE_PATH } from "./constants";

export const filenameToPath = (filename: string) => {
	const segments = filename
		.replace(CONTENT_BASE_PATH, "")
		.replace(".mdx", "")
		.split("/")
		.filter(Boolean);

	const changelogIdx = segments.findIndex((s) => s === "changelog");

	if (changelogIdx !== -1) {
		segments.splice(changelogIdx + 1, 1);
	}

	return segments
		.flatMap((segment) => {
			if (segment === "docs") {
				return [];
			}

			const slugified = slug(segment);

			if (slugified === "1111") {
				return "1.1.1.1";
			}

			return slugified;
		})
		.join("/")
		.replace(/\/index$/, "")
		.concat("/");
};
