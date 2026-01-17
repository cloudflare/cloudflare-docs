import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

interface Skill {
	name: string;
	description: string;
}

export async function GET() {
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
				});
			}
		} catch (error) {
			// Skip if file doesn't exist; warn on other errors
			if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
				console.warn(`Failed to parse skill ${dir.name}:`, error);
			}
		}
	}

	// Sort alphabetically by name
	skills.sort((a, b) => a.name.localeCompare(b.name));

	return Response.json({ skills });
}
