import { experimental_getWranglerCommands } from "wrangler";

export const commands = experimental_getWranglerCommands();

export function getCommand(path: string) {
	const segments = path.trim().split(/\s+/);

	const { registry } = commands;

	let node = registry.subtree;
	for (const segment of segments) {
		const next = node.get(segment);

		if (!next) break;

		if (next.subtree.size === 0 && next.definition?.type === "command") {
			return next.definition;
		}

		node = next.subtree;
	}

	throw new Error(`[wrangler.ts] Command "${path}" not found`);
}
