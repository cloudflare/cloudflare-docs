import { slug } from "github-slugger";

import { CONTENT_BASE_PATH } from "./constants";

export const filenameToPath = (filename: string) => {
	return filename
		.replace(CONTENT_BASE_PATH, "")
		.replace(".mdx", "")
		.split("/")
		.filter(Boolean)
		.flatMap((segment) => {
			if (segment === "docs") {
				return [];
			}

			if (segment === "changelogs-next") {
				segment = "changelog";
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
