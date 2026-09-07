import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { parse } from "codeowners-utils";

const CODEOWNERS_PATH = ".github/CODEOWNERS";
const PRODUCT_OWNERS = "@cloudflare/product-owners";
const PM_CHANGELOGS = "@cloudflare/pm-changelogs";

const apply = process.argv.includes("--apply");
const check = process.argv.includes("--check");

interface Location {
	type: string;
	match: RegExp;
	pattern: (product: string) => string;
	disk: (product: string) => string;
	changelog?: boolean;
}

const LOCATIONS: Location[] = [
	{
		type: "changelog-images",
		match: /^\/src\/assets\/images\/changelog\/([^/]+)(?:\/|$)/,
		pattern: (p) => `/src/assets/images/changelog/${p}/`,
		disk: (p) => `src/assets/images/changelog/${p}`,
		changelog: true,
	},
	{
		type: "images",
		match: /^\/src\/assets\/images\/([^/]+)(?:\/|$)/,
		pattern: (p) => `/src/assets/images/${p}/`,
		disk: (p) => `src/assets/images/${p}`,
	},
	{
		type: "changelog",
		match: /^\/src\/content\/changelog\/([^/]+)(?:\/|$)/,
		pattern: (p) => `/src/content/changelog/${p}/`,
		disk: (p) => `src/content/changelog/${p}`,
		changelog: true,
	},
	{
		type: "docs",
		match: /^\/src\/content\/docs\/([^/]+)(?:\/|$)/,
		pattern: (p) => `/src/content/docs/${p}/`,
		disk: (p) => `src/content/docs/${p}`,
	},
	{
		type: "partials",
		match: /^\/src\/content\/partials\/([^/]+)(?:\/|$)/,
		pattern: (p) => `/src/content/partials/${p}/`,
		disk: (p) => `src/content/partials/${p}`,
	},
	{
		type: "directory",
		match: /^\/src\/content\/directory\/([^/]+)\.yaml$/,
		pattern: (p) => `/src/content/directory/${p}.yaml`,
		disk: (p) => `src/content/directory/${p}.yaml`,
	},
	{
		type: "release-notes",
		match: /^\/src\/content\/release-notes\/([^/]+)\.yaml$/,
		pattern: (p) => `/src/content/release-notes/${p}.yaml`,
		disk: (p) => `src/content/release-notes/${p}.yaml`,
	},
	{
		type: "glossary",
		match: /^\/src\/content\/glossary\/([^/]+)\.yaml$/,
		pattern: (p) => `/src/content/glossary/${p}.yaml`,
		disk: (p) => `src/content/glossary/${p}.yaml`,
	},
	{
		type: "icon",
		match: /^\/src\/icons\/([^/]+)\.svg$/,
		pattern: (p) => `/src/icons/${p}.svg`,
		disk: (p) => `src/icons/${p}.svg`,
	},
	{
		type: "pub-icons",
		match: /^\/public\/icons\/([^/]+)(?:\/|$)/,
		pattern: (p) => `/public/icons/${p}`,
		disk: (p) => `public/icons/${p}`,
	},
	{
		type: "pub-images",
		match: /^\/public\/images\/([^/]+)(?:\/|$)/,
		pattern: (p) => `/public/images/${p}/`,
		disk: (p) => `public/images/${p}`,
	},
];

const topLevelDocsMatch = /^\/src\/content\/docs\/([^/]+)(?:\/)?$/;

const covered = new Set<string>();
const firstDocOwners = new Map<string, string[]>();
const topDocOwners = new Map<string, string[]>();

for (const entry of parse(readFileSync(CODEOWNERS_PATH, "utf8")).reverse()) {
	for (const loc of LOCATIONS) {
		const match = loc.match.exec(entry.pattern);
		if (match) {
			const product = match[1];
			covered.add(`${product}:${loc.type}`);
			if (loc.type === "docs") {
				if (!firstDocOwners.has(product)) {
					firstDocOwners.set(product, entry.owners);
				}
				if (
					topLevelDocsMatch.test(entry.pattern) &&
					!topDocOwners.has(product)
				) {
					topDocOwners.set(product, entry.owners);
				}
			}
			break;
		}
	}
}

const docOwners = new Map<string, string[]>();
for (const [product, owners] of topDocOwners) {
	docOwners.set(product, owners);
}
for (const [product, owners] of firstDocOwners) {
	if (!docOwners.has(product)) {
		docOwners.set(product, owners);
	}
}

const products = readdirSync("src/content/docs", { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
	.map((entry) => entry.name)
	.sort();

const SKIP = new Set([
	"cloudflare-for-platforms",
	"email-routing",
	"learning-paths",
	"migration-guides",
	"network-error-logging",
	"notifications",
	"registrar",
	"style-guide",
]);

function withChangelogOwners(owners: string[]): string[] {
	if (owners.includes(PM_CHANGELOGS)) {
		return owners;
	}
	const next = [...owners];
	const index = next.indexOf(PRODUCT_OWNERS);
	if (index >= 0) {
		next.splice(index, 0, PM_CHANGELOGS);
	} else {
		next.push(PM_CHANGELOGS);
	}
	return next;
}

const groups = new Map<string, string[]>();
const skipped = new Set<string>();
const unowned = new Set<string>();
let gapCount = 0;

for (const product of products) {
	const owners = docOwners.get(product);
	if (!owners) {
		unowned.add(product);
		continue;
	}
	if (SKIP.has(product) || owners.every((owner) => owner === PRODUCT_OWNERS)) {
		skipped.add(product);
		continue;
	}

	for (const loc of LOCATIONS) {
		if (loc.type === "docs") {
			continue;
		}
		if (!existsSync(loc.disk(product))) {
			continue;
		}
		if (covered.has(`${product}:${loc.type}`)) {
			continue;
		}
		const lineOwners = loc.changelog ? withChangelogOwners(owners) : owners;
		const line = `${loc.pattern(product)} ${lineOwners.join(" ")}`;
		const group = groups.get(product) ?? [];
		group.push(line);
		groups.set(product, group);
		gapCount += 1;
	}
}

function printReport(): void {
	console.log(
		`Eligible products with real team owners: ${products.length - skipped.size - unowned.size}`,
	);
	console.log(`Lines to add: ${gapCount}`);
	console.log(
		`Skipped (owned only by @cloudflare/product-owners): ${[...skipped].join(", ")}`,
	);
	console.log(
		`Unowned (no docs rule — assign owners manually): ${[...unowned].join(", ")}`,
	);
	console.log();
	for (const product of [...groups.keys()].sort()) {
		console.log(`# ${product}`);
		for (const line of groups.get(product) ?? []) {
			console.log(`  ${line}`);
		}
		console.log();
	}
}

function applyChanges(): void {
	const fileLines = readFileSync(CODEOWNERS_PATH, "utf8").split("\n");
	const isHeader = (line: string) => /^# /.test(line.trim());

	for (const [product, lines] of [...groups.entries()].sort(([a], [b]) =>
		a.localeCompare(b),
	)) {
		const header = `# ${product}`;
		const headerIndex = fileLines.findIndex((line) => line.trim() === header);

		if (headerIndex >= 0) {
			let nextHeaderIndex = -1;
			for (let i = headerIndex + 1; i < fileLines.length; i += 1) {
				if (isHeader(fileLines[i])) {
					nextHeaderIndex = i;
					break;
				}
			}
			const insertAt =
				nextHeaderIndex >= 0 ? nextHeaderIndex : fileLines.length;
			fileLines.splice(insertAt, 0, ...lines, "");
		} else {
			const insertAt = fileLines.findIndex((line) => {
				const trimmed = line.trim();
				return isHeader(line) && trimmed.slice(2).localeCompare(product) > 0;
			});
			const position = insertAt >= 0 ? insertAt : fileLines.length;
			const block = [header, "", ...lines, ""];
			fileLines.splice(position, 0, ...block);
		}
	}

	writeFileSync(CODEOWNERS_PATH, fileLines.join("\n"));
	console.log(`Applied ${gapCount} lines to ${CODEOWNERS_PATH}`);
}

if (check) {
	if (gapCount > 0) {
		console.error(
			`${gapCount} CODEOWNERS gaps remain (run without --check to list them).`,
		);
		process.exit(1);
	}
	console.log("No CODEOWNERS gaps for eligible products.");
} else if (apply) {
	applyChanges();
} else {
	printReport();
}
