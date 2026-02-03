/**
 * Fetches skills from the cloudflare/skills repository at build time.
 *
 * This script:
 * 1. Reads configuration from skills.config.json
 * 2. Validates the repo is in the cloudflare/* org
 * 3. Checks cache to avoid unnecessary fetches
 * 4. Uses Git Trees API to list all files (1 API call)
 * 5. Fetches file contents via gh-code proxy (no rate limits)
 * 6. Generates index.json with skill metadata
 * 7. Falls back to stale cache on fetch errors
 * 8. Fails open locally (skips skills if fetch fails)
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

interface GitCommit {
	sha: string;
}

interface GitTreeItem {
	path: string;
	type: "blob" | "tree";
	sha: string;
}

interface GitTreeResponse {
	sha: string;
	tree: GitTreeItem[];
	truncated: boolean;
}

const CACHE_DIR = ".tmp";
const CACHE_FILE = "skills-cache.json";
const GH_CODE_PROXY = "https://gh-code.developers.cloudflare.com";

function log(message: string): void {
	console.log(`[fetch-skills] ${message}`);
}

function warn(message: string): void {
	console.warn(`[fetch-skills] WARNING: ${message}`);
}

function error(message: string): void {
	console.error(`[fetch-skills] ERROR: ${message}`);
}

function isCI(): boolean {
	return process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";
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

async function fetchGitHubJson<T>(url: string): Promise<T> {
	const response = await fetch(url, {
		headers: {
			Accept: "application/vnd.github.v3+json",
			"User-Agent": "cloudflare-docs-skills-fetcher",
		},
	});

	if (!response.ok) {
		if (response.status === 403 || response.status === 429) {
			throw new Error("GitHub API rate limit exceeded.");
		}
		throw new Error(
			`GitHub API error: ${response.status} ${response.statusText}`,
		);
	}

	return response.json();
}

async function fetchFileContent(
	repo: string,
	commit: string,
	path: string,
): Promise<string> {
	const url = `${GH_CODE_PROXY}/${repo}/${commit}/${path}`;
	const response = await fetch(url, {
		headers: {
			"User-Agent": "cloudflare-docs-skills-fetcher",
		},
	});

	if (!response.ok) {
		throw new Error(
			`Failed to fetch ${path}: ${response.status} ${response.statusText}`,
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

async function getCommitSha(repo: string, branch: string): Promise<string> {
	const url = `https://api.github.com/repos/${repo}/commits/${encodeURIComponent(branch)}`;
	const commit = await fetchGitHubJson<GitCommit>(url);
	return commit.sha;
}

async function getFileTree(repo: string, sha: string): Promise<GitTreeItem[]> {
	const url = `https://api.github.com/repos/${repo}/git/trees/${sha}?recursive=1`;
	const tree = await fetchGitHubJson<GitTreeResponse>(url);

	if (tree.truncated) {
		warn("Git tree was truncated - some files may be missing");
	}

	return tree.tree;
}

async function fetchSkill(
	config: SkillsConfig,
	skillName: string,
	skillFiles: string[],
	commit: string,
	outputDir: string,
): Promise<SkillMetadata | null> {
	log(`Fetching skill: ${skillName}`);
	const skillPrefix = `${config.skills_path}/${skillName}/`;

	try {
		// Find SKILL.md
		const skillMdPath = skillFiles.find((f) => f.endsWith("SKILL.md"));
		if (!skillMdPath) {
			warn(`No SKILL.md found for ${skillName}, skipping`);
			return null;
		}

		// Fetch and parse SKILL.md for metadata
		const skillMdContent = await fetchFileContent(
			config.skills_repo,
			commit,
			skillMdPath,
		);
		const { name, description } = parseFrontmatter(skillMdContent);

		// Resolve the output directory for path traversal checks
		const resolvedOutputDir = resolve(outputDir);

		// Write all files to output directory
		const relativeFiles: string[] = [];
		for (const filePath of skillFiles) {
			const relativePath = filePath.replace(skillPrefix, "");

			const outputPath = join(outputDir, skillName, relativePath);
			const resolvedOutputPath = resolve(outputPath);

			// SECURITY: Validate output path is within output directory
			if (!resolvedOutputPath.startsWith(resolvedOutputDir + "/")) {
				warn(`Skipping file with path traversal attempt: ${filePath}`);
				continue;
			}

			relativeFiles.push(relativePath);
			await mkdir(dirname(outputPath), { recursive: true });

			try {
				const content = await fetchFileContent(
					config.skills_repo,
					commit,
					filePath,
				);
				await writeFile(outputPath, content);
			} catch (err) {
				warn(`Failed to fetch ${filePath}: ${err}`);
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
	log(`Fetching skills from ${config.skills_repo}`);

	// Step 1: Get commit SHA for branch (1 API call)
	log(`Resolving ${config.branch} to commit SHA...`);
	const commit = await getCommitSha(config.skills_repo, config.branch);
	log(`Resolved to ${commit.slice(0, 7)}`);

	// Step 2: Get full file tree (1 API call)
	log("Fetching file tree...");
	const tree = await getFileTree(config.skills_repo, commit);

	// Step 3: Filter to skills path and group by skill
	const skillsPrefix = `${config.skills_path}/`;
	const skillFiles = tree
		.filter(
			(item) => item.type === "blob" && item.path.startsWith(skillsPrefix),
		)
		.map((item) => item.path);

	// Group files by skill name
	const skillGroups = new Map<string, string[]>();
	for (const filePath of skillFiles) {
		const relativePath = filePath.slice(skillsPrefix.length);
		const skillName = relativePath.split("/")[0];
		if (!skillGroups.has(skillName)) {
			skillGroups.set(skillName, []);
		}
		skillGroups.get(skillName)!.push(filePath);
	}

	log(`Found ${skillGroups.size} skills to fetch`);

	// Step 4: Create temp directory
	const tempDir = `${config.output_dir}.tmp`;
	if (existsSync(tempDir)) {
		await rm(tempDir, { recursive: true });
	}
	await mkdir(tempDir, { recursive: true });

	// Step 5: Fetch each skill (file contents via proxy - no rate limit)
	const skills: SkillMetadata[] = [];
	for (const [skillName, files] of skillGroups) {
		const skill = await fetchSkill(config, skillName, files, commit, tempDir);
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
	await writeFile(indexPath, JSON.stringify(index));
	log(`Wrote index.json with ${index.skills.length} skills`);
}

async function atomicSwap(tempDir: string, finalDir: string): Promise<void> {
	if (existsSync(finalDir)) {
		await rm(finalDir, { recursive: true });
	}
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

		// Try to use stale cache
		const cache = await loadCache();
		if (cache && (await outputExists(config))) {
			warn(`Using stale cache from ${cache.fetched_at}`);
			return;
		}

		// No cache available
		if (!isCI()) {
			// Fail open locally - skip skills
			warn("No cache available. Skipping skills fetch (local dev).");
			return;
		}

		// CI with no cache - fail the build
		process.exit(1);
	}
}

main();
