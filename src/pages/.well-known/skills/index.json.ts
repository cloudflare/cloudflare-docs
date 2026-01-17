import type { APIRoute } from "astro";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

interface Skill {
	name: string;
	description: string;
	path: string;
}

interface SkillsIndex {
	skills: Skill[];
}

export const GET: APIRoute = async () => {
	const skillsDir = join(process.cwd(), "public/.well-known/skills");

	const entries = await readdir(skillsDir, { withFileTypes: true });
	const skillDirs = entries.filter((e) => e.isDirectory());

	const skills: Skill[] = [];

	for (const dir of skillDirs) {
		const skillPath = join(skillsDir, dir.name, "SKILL.md");

		try {
			const content = await readFile(skillPath, "utf-8");
			const { data } = matter(content);

			if (data.name && data.description) {
				skills.push({
					name: data.name,
					description: data.description,
					path: `/${dir.name}/`,
				});
			}
		} catch {
			// Skip directories without SKILL.md
		}
	}

	// Sort alphabetically by name
	skills.sort((a, b) => a.name.localeCompare(b.name));

	const index: SkillsIndex = { skills };

	return new Response(JSON.stringify(index, null, 2), {
		headers: {
			"content-type": "application/json",
		},
	});
};
