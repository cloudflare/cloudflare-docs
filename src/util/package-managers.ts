export type Manager = "npm" | "yarn" | "pnpm" | "bun";
export type CommandType =
	| "add"
	| "create"
	| "dlx"
	| "exec"
	| "install"
	| "remove"
	| "run";

export interface CommandOptions {
	args?: string;
	dev?: boolean;
	comment?: string;
	prefix?: string;
}

const commands: Record<
	Manager,
	Partial<Record<CommandType, string>> & { dev: string }
> = {
	npm: {
		add: "npm i",
		create: "npm create",
		dlx: "npx",
		exec: "npx",
		install: "npm install",
		run: "npm run",
		remove: "npm uninstall",
		dev: "-D",
	},
	yarn: {
		add: "yarn add",
		create: "yarn create",
		dlx: "yarn dlx",
		exec: "yarn",
		install: "yarn install",
		run: "yarn run",
		remove: "yarn remove",
		dev: "-D",
	},
	pnpm: {
		add: "pnpm add",
		create: "pnpm create",
		dlx: "pnpx",
		exec: "pnpm",
		install: "pnpm install",
		run: "pnpm run",
		remove: "pnpm remove",
		dev: "-D",
	},
	bun: {
		add: "bun add",
		install: "bun install",
		remove: "bun remove",
		dev: "-d",
	},
};

export const MANAGERS: Manager[] = ["npm", "yarn", "pnpm", "bun"];

export function getCommand(
	mgr: Manager,
	type: CommandType,
	pkg?: string,
	{ args, dev = false, comment, prefix }: CommandOptions = {},
): string | undefined {
	let cmd = commands[mgr][type];
	if (cmd === undefined) return undefined;
	if (prefix) cmd = `${prefix} ${cmd}`;
	if (comment) cmd = `# ${comment.replaceAll("{PKG}", mgr)}\n${cmd}`;
	if (dev && type === "add") cmd += ` ${commands[mgr].dev}`;
	if (pkg) {
		// For `yarn create`, strip only a trailing @version tag (e.g. `pkg@latest` → `pkg`).
		// For yarn create, strip only trailing version tags (e.g., @latest).
		// This regex strips @ that is NOT followed by / (not a scope prefix) at the end.
		// like `@cloudflare/workers` (first @ is the scope, not a version).
		// The corrected regex only strips an @ that is NOT immediately followed by a `/`
		// (i.e. not a scope prefix) and only at the end of the package name.
		const processedPkg =
			type === "create" && mgr === "yarn"
				? pkg.replace(/@(?![^@]*\/)[^\s]*$/, "")
				: pkg;
		cmd += ` ${processedPkg}`;
	}
	if (args)
		cmd += `${mgr === "npm" && !["dlx", "exec", "run"].includes(type) ? " --" : ""} ${args}`;
	return cmd;
}

export function getTabs(
	type: CommandType,
	pkg?: string,
	options: CommandOptions = {},
) {
	return MANAGERS.filter((mgr) => commands[mgr][type] !== undefined).map(
		(mgr) => ({ mgr, cmd: getCommand(mgr, type, pkg, options)! }),
	);
}
