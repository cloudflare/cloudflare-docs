import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { parseArgs } from "./args";
import {
	diffManifests,
	fullReindexEvents,
	payloadFor,
	readManifest,
	summarize,
} from "./diff";
import { buildManifest } from "./manifest";
import { sendPayload } from "./send";

async function writeFileWithDir(path: string, contents: string) {
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, contents);
}

function writeJson(path: string, data: unknown) {
	return writeFileWithDir(path, `${JSON.stringify(data, null, "\t")}\n`);
}

export async function run() {
	const args = parseArgs();
	// A forced run upserts every current page while still using a previous
	// manifest, when available, to delete pages/sections that disappeared.
	// Otherwise diff normally; with no previous manifest, baseline (send nothing).
	const previous = await readManifest(args.previous);
	const current = await buildManifest(args);
	const baseline = previous === null;
	const events = args.forceFullReindex
		? fullReindexEvents(previous, current)
		: previous
			? diffManifests(previous, current)
			: [];
	const payload = payloadFor(current, events);
	const summary = summarize(current, events, baseline);

	await writeFileWithDir(
		args.events,
		events.map((event) => JSON.stringify(event)).join("\n"),
	);

	const sent = args.sendUrl
		? events.length === 0 || (await sendPayload(args, payload))
		: false;
	if (args.sendUrl && !sent) {
		throw new Error(
			"Reindex payload delivery failed; manifest was not advanced",
		);
	}

	// Do not advance either manifest until every requested batch has been
	// accepted. This prevents a transient enqueue failure from permanently
	// hiding unchanged pages from the next diff.
	await writeJson(args.manifest, current);
	let committed = false;

	if (args.commit) {
		await writeJson(args.previous, current);
		committed = true;
	}

	console.log(
		JSON.stringify(
			{
				...summary,
				sent,
				committed,
				previous: args.previous,
				manifest: args.manifest,
				events: args.events,
			},
			null,
			2,
		),
	);
}
