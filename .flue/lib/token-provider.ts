import { env } from "cloudflare:workers";
import { getInstallationToken } from "./github";

export type TokenProvider = () => Promise<string>;

/** Credentials stay in bindings, never in durable agent initialData or output. */
export const getGitHubToken: TokenProvider = () => getInstallationToken(env);
