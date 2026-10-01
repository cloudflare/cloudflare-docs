import { useInstruction } from "@flue/runtime";
import roleMarkdown from "../../roles/cloudflare-docs-bot.md";

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;

export function stripFrontmatter(markdown: string): string {
	return markdown.replace(FRONTMATTER, "").trim();
}

export function useInstructions(...markdown: string[]): void {
	for (const value of markdown) {
		const instruction = stripFrontmatter(value);
		if (instruction) useInstruction(instruction);
	}
}

export const BOT_ROLE_INSTRUCTION = stripFrontmatter(roleMarkdown);

export function useBotRole(): void {
	useInstructions(BOT_ROLE_INSTRUCTION);
}
