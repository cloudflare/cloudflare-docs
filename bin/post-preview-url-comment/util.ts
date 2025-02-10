import { slug } from "github-slugger";
import { execSync } from "node:child_process";
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

export const branchToSubdomain = (branch: string) => {
	return execSync(
		`echo "${branch}" | iconv -c -t ascii//TRANSLIT | sed -E 's/[~^]+//g' | sed -E 's/[^a-zA-Z0-9]+/-/g' | sed -E 's/^-+|-+$//g' | tr A-Z a-z`,
		{ encoding: "utf-8" },
	).trim();
};
