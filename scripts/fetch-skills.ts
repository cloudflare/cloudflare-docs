/**
 * Fetches skills from the cloudflare/skills repository at build time.
 *
 * This script:
 * 1. Reads configuration from skills.config.json
 * 2. Validates the repo is in the cloudflare/* org
 * 3. Checks cache to avoid unnecessary fetches
 * 4. Fetches all skills and their reference files from GitHub
 * 5. Generates index.json with skill metadata
 * 6. Falls back to stale cache on fetch errors
 */

import { mkdir, readFile, writeFile, rm, rename } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { createHash } from "crypto";
import matter from "gray-matter";

interface SkillsConfig {
	skills_repo: string;
	skills_path: string;
	branch: string;
	cache_control: number;
	output_dir: string;
}

interface CacheMetadata {
	fetched_at: string;
	config_hash: string;
	skills: string[];
}

interface SkillMetadata {
	name: string;
	description: string;
	files: string[];
}

interface IndexJson {
	skills: SkillMetadata[];
}

interface GitHubContent {
	name: string;
	path: string;
	type: "file" | "dir";
	download_url: string | null;
}

const CACHE_DIR = ".tmp";
const CACHE_FILE = "skills-cache.json";

function log(message: string): void {
	console.log(`[fetch-skills] ${message}`);
}

function warn(message: string): void {
	console.warn(`[fetch-skills] WARNING: ${message}`);
}

function error(message: string): void {
	console.error(`[fetch-skills] ERROR: ${message}`);
}

async function loadConfig(): Promise<SkillsConfig> {
	const configPath = join(process.cwd(), "skills.config.json");
	const content = await readFile(configPath, "utf-8");
	const config: SkillsConfig = JSON.parse(content);

	// Validate repo is in cloudflare org with a valid repo name
	const repoMatch = config.skills_repo.match(/^cloudflare\/([a-zA-Z0-9_.-]+)$/);
	if (!repoMatch) {
		throw new Error(
			`Invalid skills_repo: ${config.skills_repo}. Must be cloudflare/<repo-name>.`,
		);
	}

	// Validate output_dir is within project root (prevent path traversal)
	const projectRoot = process.cwd();
	const resolvedOutput = resolve(projectRoot, config.output_dir);
	if (!resolvedOutput.startsWith(projectRoot + "/")) {
		throw new Error(
			`Invalid output_dir: ${config.output_dir}. Must be within project root.`,
		);
	}

	// Ensure minimum cache control of 1 hour
	if (config.cache_control < 3600) {
		warn(
			`cache_control ${config.cache_control}s is below minimum. Using 3600s.`,
		);
		config.cache_control = 3600;
	}

	return config;
}

function hashConfig(config: SkillsConfig): string {
	const str = JSON.stringify(config);
	return createHash("sha256").update(str).digest("hex").slice(0, 16);
}

async function loadCache(): Promise<CacheMetadata | null> {
	const cachePath = join(CACHE_DIR, CACHE_FILE);
	if (!existsSync(cachePath)) {
		return null;
	}

	try {
		const content = await readFile(cachePath, "utf-8");
		return JSON.parse(content);
	} catch {
		return null;
	}
}

async function saveCache(cache: CacheMetadata): Promise<void> {
	const cachePath = join(CACHE_DIR, CACHE_FILE);
	await mkdir(CACHE_DIR, { recursive: true });
	await writeFile(cachePath, JSON.stringify(cache, null, "\t"));
}

function isCacheValid(cache: CacheMetadata, config: SkillsConfig): boolean {
	const configHash = hashConfig(config);
	if (cache.config_hash !== configHash) {
		log("Cache invalidated: config changed");
		return false;
	}

	const fetchedAt = new Date(cache.fetched_at);
	const now = new Date();
	const ageSeconds = (now.getTime() - fetchedAt.getTime()) / 1000;

	if (ageSeconds > config.cache_control) {
		log(
			`Cache expired: ${Math.round(ageSeconds)}s old (max: ${config.cache_control}s)`,
		);
		return false;
	}

	return true;
}

async function outputExists(config: SkillsConfig): Promise<boolean> {
	const indexPath = join(config.output_dir, "index.json");
	return existsSync(indexPath);
}

function getGitHubHeaders(): Record<string, string> {
	const headers: Record<string, string> = {
		Accept: "application/vnd.github.v3+json",
		"User-Agent": "cloudflare-docs-skills-fetcher",
	};
	// Use GITHUB_TOKEN if available (5000 req/hour vs 60 unauthenticated)
	if (process.env.GITHUB_TOKEN) {
		headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
	}
	return headers;
}

async function fetchGitHubJson<T>(url: string): Promise<T> {
	const response = await fetch(url, { headers: getGitHubHeaders() });

	if (!response.ok) {
		if (response.status === 403 || response.status === 429) {
			const authHint = process.env.GITHUB_TOKEN
				? ""
				: " Set GITHUB_TOKEN for higher rate limits.";
			throw new Error(`GitHub API rate limit exceeded.${authHint}`);
		}
		throw new Error(
			`GitHub API error: ${response.status} ${response.statusText}`,
		);
	}

	return response.json();
}

function isValidDownloadUrl(url: string): boolean {
	try {
		const parsed = new URL(url);
		return (
			parsed.protocol === "https:" &&
			parsed.host === "raw.githubusercontent.com"
		);
	} catch {
		return false;
	}
}

async function fetchFileContent(url: string): Promise<string> {
	// Validate URL points to GitHub raw content (defense-in-depth)
	if (!isValidDownloadUrl(url)) {
		throw new Error(
			`Invalid download URL (must be raw.githubusercontent.com): ${url}`,
		);
	}

	const response = await fetch(url, {
		headers: {
			"User-Agent": "cloudflare-docs-skills-fetcher",
		},
	});

	if (!response.ok) {
		throw new Error(
			`Failed to fetch file: ${response.status} ${response.statusText}`,
		);
	}

	return response.text();
}

function parseFrontmatter(content: string): {
	name: string;
	description: string;
} {
	const { data } = matter(content);

	if (!data.name || !data.description) {
		throw new Error("Missing name or description in frontmatter");
	}

	// Normalize multi-line descriptions to single line
	const description =
		typeof data.description === "string"
			? data.description.replace(/\s+/g, " ").trim()
			: String(data.description);

	return {
		name: String(data.name).trim(),
		description,
	};
}

async function fetchDirectoryRecursive(
	config: SkillsConfig,
	path: string,
): Promise<Array<{ path: string; download_url: string }>> {
	const encodedPath = path.split("/").map(encodeURIComponent).join("/");
	const url = `https://api.github.com/repos/${config.skills_repo}/contents/${encodedPath}?ref=${encodeURIComponent(config.branch)}`;
	const contents = await fetchGitHubJson<GitHubContent[]>(url);
	const files: Array<{ path: string; download_url: string }> = [];

	for (const item of contents) {
		if (item.type === "file" && item.download_url) {
			files.push({ path: item.path, download_url: item.download_url });
		} else if (item.type === "dir") {
			const subFiles = await fetchDirectoryRecursive(config, item.path);
			files.push(...subFiles);
		}
	}

	return files;
}

async function fetchSkill(
	config: SkillsConfig,
	skillName: string,
): Promise<SkillMetadata | null> {
	const skillPath = `${config.skills_path}/${skillName}`;
	log(`Fetching skill: ${skillName}`);

	try {
		// Fetch all files in the skill directory
		const files = await fetchDirectoryRecursive(config, skillPath);

		// Find and parse SKILL.md for metadata
		const skillMdFile = files.find((f) => f.path.endsWith("SKILL.md"));
		if (!skillMdFile) {
			warn(`No SKILL.md found for ${skillName}, skipping`);
			return null;
		}

		const skillMdContent = await fetchFileContent(skillMdFile.download_url);
		const { name, description } = parseFrontmatter(skillMdContent);

		// Resolve the output directory for path traversal checks
		const resolvedOutputDir = resolve(config.output_dir);

		// Write all files to output directory
		const relativeFiles: string[] = [];
		for (const file of files) {
			const relativePath = file.path.replace(
				`${config.skills_path}/${skillName}/`,
				"",
			);

			const outputPath = join(config.output_dir, skillName, relativePath);
			const resolvedOutputPath = resolve(outputPath);

			// SECURITY: Validate output path is within output directory (prevent path traversal)
			if (!resolvedOutputPath.startsWith(resolvedOutputDir + "/")) {
				warn(`Skipping file with path traversal attempt: ${file.path}`);
				continue;
			}

			relativeFiles.push(relativePath);
			await mkdir(dirname(outputPath), { recursive: true });

			try {
				const content = await fetchFileContent(file.download_url);
				await writeFile(outputPath, content);
			} catch (err) {
				warn(`Failed to fetch ${file.path}: ${err}`);
			}
		}

		return {
			name,
			description,
			files: relativeFiles.sort(),
		};
	} catch (err) {
		warn(`Failed to fetch skill ${skillName}: ${err}`);
		return null;
	}
}

async function fetchAllSkills(config: SkillsConfig): Promise<IndexJson> {
	const encodedPath = config.skills_path
		.split("/")
		.map(encodeURIComponent)
		.join("/");
	const url = `https://api.github.com/repos/${config.skills_repo}/contents/${encodedPath}?ref=${encodeURIComponent(config.branch)}`;
	log(`Fetching skill list from ${config.skills_repo}`);

	const contents = await fetchGitHubJson<GitHubContent[]>(url);
	const skillDirs = contents.filter((item) => item.type === "dir" && item.name);

	log(`Found ${skillDirs.length} skills to fetch`);

	// Write to temp directory first, then swap on success (atomic update)
	const tempDir = `${config.output_dir}.tmp`;
	if (existsSync(tempDir)) {
		await rm(tempDir, { recursive: true });
	}
	await mkdir(tempDir, { recursive: true });

	// Temporarily override output_dir for fetchSkill calls
	const tempConfig = { ...config, output_dir: tempDir };

	const skills: SkillMetadata[] = [];
	for (const dir of skillDirs) {
		const skill = await fetchSkill(tempConfig, dir.name);
		if (skill) {
			skills.push(skill);
		}
	}

	// Sort skills alphabetically by name
	skills.sort((a, b) => a.name.localeCompare(b.name));

	return { skills };
}

async function writeIndex(outputDir: string, index: IndexJson): Promise<void> {
	const indexPath = join(outputDir, "index.json");
	await writeFile(indexPath, JSON.stringify(index, null, "\t") + "\n");
	log(`Wrote index.json with ${index.skills.length} skills`);
}

async function atomicSwap(tempDir: string, finalDir: string): Promise<void> {
	// Remove existing output directory if it exists
	if (existsSync(finalDir)) {
		await rm(finalDir, { recursive: true });
	}
	// Move temp to final (atomic on same filesystem)
	await rename(tempDir, finalDir);
}

async function main(): Promise<void> {
	const forceRefresh = process.env.SKILLS_FORCE_REFRESH === "true";

	// Load config first - if this fails, we can't proceed at all
	let config: SkillsConfig;
	try {
		config = await loadConfig();
	} catch (err) {
		error(`Config load failed: ${err}`);
		process.exit(1);
	}

	log(`Config loaded: repo=${config.skills_repo}, branch=${config.branch}`);

	try {
		// Check cache unless force refresh
		if (!forceRefresh) {
			const cache = await loadCache();
			if (
				cache &&
				isCacheValid(cache, config) &&
				(await outputExists(config))
			) {
				log(
					`Using cached skills (${cache.skills.length} skills, fetched ${cache.fetched_at})`,
				);
				return;
			}
		} else {
			log("Force refresh enabled, skipping cache");
		}

		// Fetch all skills to temp directory
		const index = await fetchAllSkills(config);
		const tempDir = `${config.output_dir}.tmp`;
		await writeIndex(tempDir, index);

		// Atomically swap temp to final output directory
		await atomicSwap(tempDir, config.output_dir);

		// Save cache metadata
		const cache: CacheMetadata = {
			fetched_at: new Date().toISOString(),
			config_hash: hashConfig(config),
			skills: index.skills.map((s) => s.name),
		};
		await saveCache(cache);

		log(`Successfully fetched ${index.skills.length} skills`);
	} catch (err) {
		error(`Fetch failed: ${err}`);

		// Try to use stale cache (config already loaded successfully)
		const cache = await loadCache();
		if (cache && (await outputExists(config))) {
			warn(`Using stale cache from ${cache.fetched_at}`);
			return;
		}

		// No cache available, fail the build
		process.exit(1);
	}
}

main();
