export type CliPreference = "wrangler" | "cf";

export function getCliPreferenceDefault(pathname: string): CliPreference {
	return pathname === "/cf" || pathname.startsWith("/cf/") ? "cf" : "wrangler";
}
