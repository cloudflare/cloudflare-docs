import { writeFile } from "node:fs/promises";

const CONTRIBUTORS_URL =
	"https://middlecache.ced.cloudflare.com/v1/cloudflare-docs-github-contributors/contributors.json";
const MANIFEST_URL =
	"https://middlecache.ced.cloudflare.com/v1/cloudflare-docs-github-contributors/manifest.json";

type AvatarUrls = Record<string, string>;

type Contributor = {
	name: string;
	profile_url: string;
	contributions: number;
	contributions_url: string;
	avatar_urls: AvatarUrls;
};

type Manifest = {
	fetched_at: string;
	contributor_count: number;
	total_contributors_all: number;
	total_contributions: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
	return typeof value === "string";
}

function isNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

function normalizeAvatarUrls(value: unknown): AvatarUrls {
	if (!isRecord(value)) return {};
	const out: AvatarUrls = {};
	for (const [k, v] of Object.entries(value)) {
		if (isString(k) && isString(v)) out[k] = v;
	}
	return out;
}

function normalizeContributor(value: unknown): Contributor | null {
	if (!isRecord(value)) return null;

	const name = value.name;
	const profile_url = value.profile_url;
	const contributions = value.contributions;
	const contributions_url = value.contributions_url;
	const avatar_urls = normalizeAvatarUrls(value.avatar_urls);

	if (!isString(name)) return null;
	if (!isString(profile_url)) return null;
	if (!isNumber(contributions)) return null;
	if (!isString(contributions_url)) return null;

	return { name, profile_url, contributions, contributions_url, avatar_urls };
}

const manifestRes = await fetch(MANIFEST_URL, {
	headers: { Accept: "application/json" },
});

if (!manifestRes.ok) {
	throw new Error(
		`Failed to fetch contributors manifest: ${manifestRes.status} ${manifestRes.statusText}`,
	);
}

const manifestRaw = (await manifestRes.json()) as unknown;
if (!isRecord(manifestRaw)) {
	throw new Error("Expected manifest payload to be a JSON object");
}

const manifest: Manifest = {
	fetched_at: isString(manifestRaw.fetched_at) ? manifestRaw.fetched_at : "",
	contributor_count: isNumber(manifestRaw.contributor_count)
		? manifestRaw.contributor_count
		: 0,
	total_contributors_all: isNumber(manifestRaw.total_contributors_all)
		? manifestRaw.total_contributors_all
		: 0,
	total_contributions: isNumber(manifestRaw.total_contributions)
		? manifestRaw.total_contributions
		: 0,
};

const res = await fetch(CONTRIBUTORS_URL, {
	headers: { Accept: "application/json" },
});

if (!res.ok) {
	throw new Error(
		`Failed to fetch contributors: ${res.status} ${res.statusText}`,
	);
}

const raw = (await res.json()) as unknown;
if (!Array.isArray(raw)) {
	throw new Error("Expected contributors payload to be a JSON array");
}

const contributors: Contributor[] = [];
for (const item of raw) {
	const normalized = normalizeContributor(item);
	if (!normalized) continue;
	contributors.push(normalized);
}

contributors.sort((a, b) => {
	if (b.contributions !== a.contributions)
		return b.contributions - a.contributions;
	return a.name.localeCompare(b.name);
});

const outUrl = new URL("../src/data/github-contributors.json", import.meta.url);
const out = {
	fetchedAt: manifest.fetched_at,
	contributorCount: manifest.contributor_count,
	totalContributorsAll: manifest.total_contributors_all,
	totalContributions: manifest.total_contributions,
	contributors,
};

await writeFile(outUrl, `${JSON.stringify(out, null, 2)}\n`, "utf8");

// eslint-disable-next-line no-console
console.log(
	`Wrote ${contributors.length} contributors to ${outUrl.pathname} (manifest count: ${manifest.contributor_count})`,
);
