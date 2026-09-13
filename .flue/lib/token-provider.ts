/**
 * Module-scoped memoized GitHub installation token for agent DO isolates.
 *
 * Agents mint the token from the Worker's GitHub App secrets (available in
 * every DO isolate via `cloudflare:workers` env) instead of receiving it
 * through `initialData`. This keeps the short-lived credential out of the
 * durable conversation stream — Flue records `initialData` permanently in the
 * DO's SQLite, so seeding a token there would persist it for the DO's lifetime.
 *
 * The token is cached with a soft TTL under GitHub's 1-hour installation token
 * lifetime so repeated tool calls within one agent run don't re-mint.
 */
import { getInstallationToken } from "./github";

let cachedToken: string | null = null;
let cachedAt = 0;
const TOKEN_TTL_MS = 45 * 60_000;

export type TokenProvider = () => Promise<string>;

export async function getGitHubToken(): Promise<string> {
	const now = Date.now();
	if (cachedToken && now - cachedAt < TOKEN_TTL_MS) {
		return cachedToken;
	}
	const { env } = await import("cloudflare:workers");
	cachedToken = await getInstallationToken(
		env as unknown as Record<string, string>,
	);
	cachedAt = now;
	return cachedToken;
}
