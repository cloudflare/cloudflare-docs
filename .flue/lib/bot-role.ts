import { useInstruction } from "@flue/runtime";
import roleMarkdown from "../roles/cloudflare-docs-bot.md";

/**
 * The bot's identity and operating guidelines.
 *
 * In Flue 0.11 this content lived in `roles/cloudflare-docs-bot.md` and was
 * auto-discovered by the `flue()` mount, then injected into every agent's
 * system prompt. Flue 2.0 has NO role auto-discovery — a plain `.md` import
 * simply loads the file verbatim as a string (frontmatter included) and it is
 * up to the agent to use it. To preserve 0.11 behavior we re-home the same
 * content explicitly: strip the (now-unused) YAML frontmatter and expose a
 * custom hook that appends the guidelines as an always-on instruction.
 */
const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;

export const BOT_ROLE_INSTRUCTION = roleMarkdown
	.replace(FRONTMATTER, "")
	.trim();

/**
 * Append the bot's identity + operating guidelines to the current render.
 *
 * Call once, unconditionally, in every agent that produces public-facing
 * model output — the same global scope the 0.11 role auto-discovery had.
 * `useInstruction` text lands after the agent's returned instruction, so this
 * reads as standing system context regardless of call position; keep the call
 * at a fixed position so the hook order stays stable across renders.
 */
export function useBotRole(): void {
	useInstruction(BOT_ROLE_INSTRUCTION);
}
