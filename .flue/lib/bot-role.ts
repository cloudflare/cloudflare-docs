import { useInstruction } from "@flue/runtime";
import roleMarkdown from "../roles/cloudflare-docs-bot.md";

export const BOT_ROLE_INSTRUCTION = roleMarkdown
	.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
	.trim();

export function useBotRole(): void {
	useInstruction(BOT_ROLE_INSTRUCTION);
}
