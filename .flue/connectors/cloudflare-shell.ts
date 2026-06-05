import {
	STATE_TYPES,
	Workspace,
	WorkspaceFileSystem,
	type FsStat as CfFsStat,
} from "@cloudflare/shell";
import { stateTools } from "@cloudflare/shell/workers";
import {
	DynamicWorkerExecutor,
	resolveProvider,
	type DynamicWorkerExecutorOptions,
	type ResolvedProvider,
} from "@cloudflare/codemode";
import {
	Type,
	type FileStat,
	type SandboxFactory,
	type SessionEnv,
	type SessionToolFactory,
	type ShellResult,
} from "@flue/runtime";
import { getCloudflareContext } from "@flue/runtime/cloudflare";

export interface GetShellSandboxOptions {
	workspace: Workspace;
	loader: WorkerLoader;
	executor?: Pick<
		DynamicWorkerExecutorOptions,
		"timeout" | "globalOutbound" | "modules"
	>;
}

export interface HydrateFromBucketOptions {
	prefix?: string;
}

export async function hydrateFromBucket(
	workspace: Workspace,
	bucket: R2Bucket,
	options?: HydrateFromBucketOptions,
): Promise<void> {
	const prefix = options?.prefix;
	let cursor: string | undefined;

	while (true) {
		const listing = await bucket.list({ prefix, cursor });
		for (const obj of listing.objects) {
			const relativeKey = stripPrefix(obj.key, prefix);
			if (relativeKey === "" || relativeKey.endsWith("/")) continue;
			const body = await bucket.get(obj.key);
			if (!body) continue;
			await workspace.writeFileBytes(
				absolutize(relativeKey),
				new Uint8Array(await body.arrayBuffer()),
			);
		}

		if (!listing.truncated) break;
		if (!listing.cursor) {
			throw new Error(
				"[flue] R2 listing was truncated but did not include a cursor.",
			);
		}
		cursor = listing.cursor;
	}
}

function stripPrefix(key: string, prefix: string | undefined): string {
	if (!prefix) return key;
	return key.startsWith(prefix) ? key.slice(prefix.length) : key;
}

function absolutize(key: string): string {
	return key.startsWith("/") ? key : `/${key}`;
}

export function getShellSandbox(
	options: GetShellSandboxOptions,
): SandboxFactory {
	if (!options?.workspace) {
		throw new Error(
			"[flue] getShellSandbox requires a workspace. Pass `getDefaultWorkspace()` for the common case, " +
				"or construct your own with `new Workspace({ sql: ctx.storage.sql, ... })`.",
		);
	}
	if (!options.loader) {
		throw new Error(
			"[flue] getShellSandbox requires a WorkerLoader binding. Add this to your wrangler.jsonc:\n" +
				'  { "worker_loaders": [{ "binding": "LOADER" }] }\n' +
				"Then pass `loader: env.LOADER` to getShellSandbox(). Worker Loader is currently in beta — " +
				"see https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/.",
		);
	}

	const { workspace, loader, executor: executorOptions } = options;
	const fs = new WorkspaceFileSystem(workspace);
	const executor = new DynamicWorkerExecutor({
		loader,
		...executorOptions,
	});
	const stateProvider = resolveProvider(stateTools(workspace));
	const toolFactory: SessionToolFactory = () => [
		createCodeTool(executor, stateProvider),
	];

	return {
		async createSessionEnv() {
			return createWorkspaceSessionEnv(workspace, fs, "/");
		},
		tools: toolFactory,
	};
}

function normalizePath(p: string): string {
	const parts = p.split("/");
	const result: string[] = [];
	for (const part of parts) {
		if (part === "." || part === "") continue;
		if (part === "..") result.pop();
		else result.push(part);
	}
	return `/${result.join("/")}`;
}

function createWorkspaceSessionEnv(
	workspace: Workspace,
	fs: WorkspaceFileSystem,
	cwd: string,
): SessionEnv {
	const normalizedCwd = normalizePath(cwd);
	const resolvePath = (p: string): string => {
		if (p.startsWith("/")) return normalizePath(p);
		if (normalizedCwd === "/") return normalizePath(`/${p}`);
		return normalizePath(`${normalizedCwd}/${p}`);
	};
	const exec = (): Promise<ShellResult> => {
		throw new Error(EXEC_NOT_SUPPORTED_MESSAGE);
	};

	return {
		exec,
		async readFile(path: string): Promise<string> {
			return fs.readFile(resolvePath(path));
		},
		async readFileBuffer(path: string): Promise<Uint8Array> {
			return fs.readFileBytes(resolvePath(path));
		},
		async writeFile(path: string, content: string | Uint8Array): Promise<void> {
			const resolved = resolvePath(path);
			if (typeof content === "string")
				await workspace.writeFile(resolved, content);
			else await workspace.writeFileBytes(resolved, content);
		},
		async stat(path: string): Promise<FileStat> {
			return adaptStat(await fs.stat(resolvePath(path)));
		},
		async readdir(path: string): Promise<string[]> {
			return fs.readdir(resolvePath(path));
		},
		async exists(path: string): Promise<boolean> {
			return fs.exists(resolvePath(path));
		},
		async mkdir(path: string, opts?: { recursive?: boolean }): Promise<void> {
			await fs.mkdir(resolvePath(path), opts);
		},
		async rm(
			path: string,
			opts?: { recursive?: boolean; force?: boolean },
		): Promise<void> {
			await fs.rm(resolvePath(path), opts);
		},
		cwd: normalizedCwd,
		resolvePath,
	};
}

const EXEC_NOT_SUPPORTED_MESSAGE =
	"[flue] The cf-shell sandbox does not support exec(). The agent's `code` tool runs JavaScript " +
	"in an isolated Worker against the workspace; from your own code, use `session.fs` / `harness.fs` " +
	"(readFile, writeFile, stat, readdir, etc.) — they route through the same Workspace. If you " +
	"specifically need bash/grep/find or a real Linux environment, use `@cloudflare/sandbox` " +
	"(Containers + mountBucket) instead.";

function adaptStat(s: CfFsStat): FileStat {
	return {
		isFile: s.type === "file",
		isDirectory: s.type === "directory",
		isSymbolicLink: s.type === "symlink",
		size: s.size,
		mtime: s.mtime,
	};
}

const CodeParams = Type.Object({
	code: Type.String({
		description:
			"A single async arrow function with the signature `async () => { ... return result; }`. " +
			"Inside the body, call `state.*` to operate on the workspace (see the type declarations " +
			"below). The function executes in an isolated Worker — no network, no DOM, no imports. " +
			"Return whatever JSON-serializable value you want back; it is returned as the tool result.",
	}),
});

function createCodeTool(
	executor: DynamicWorkerExecutor,
	stateProvider: ResolvedProvider,
) {
	return {
		name: "code",
		label: "Run Code",
		description: buildCodeToolDescription(),
		parameters: CodeParams,
		async execute(_toolCallId: string, params: unknown) {
			const code = (params as { code: string }).code;
			const { result, error, logs } = await executor.execute(code, [
				stateProvider,
			]);
			if (error) {
				const logsTail = logs?.length ? `\n\nlogs:\n${logs.join("\n")}` : "";
				throw new Error(`code tool failed: ${error}${logsTail}`);
			}
			const resultText = formatResult(result);
			const logsText = logs?.length
				? `\n\n--- logs ---\n${logs.join("\n")}`
				: "";
			return {
				content: [{ type: "text" as const, text: resultText + logsText }],
				details: logs?.length ? { logs } : {},
			};
		},
	};
}

function formatResult(result: unknown): string {
	if (result === undefined) return "(no result)";
	if (typeof result === "string") return result;
	try {
		return JSON.stringify(result, null, 2);
	} catch {
		return String(result);
	}
}

function buildCodeToolDescription(): string {
	return [
		"Run a snippet of JavaScript inside an isolated Worker against a durable",
		"workspace filesystem. The snippet must be a single async arrow function:",
		"",
		"  async () => {",
		'    const text = await state.readFile("/notes.md");',
		'    await state.writeFile("/notes.md", text.toUpperCase());',
		"    return { bytes: text.length };",
		"  }",
		"",
		"Rules:",
		"- Write JavaScript, not TypeScript — no type annotations.",
		"- Do not use `import` statements. Everything you need is on `state`.",
		"- Always `return` the value you want back.",
		"- For multi-file refactors, prefer `state.planEdits()` + `state.applyEditPlan()` over many writes.",
		"- For tree-wide search/replace, use `state.replaceInFiles()` (transactional by default).",
		"- Network access (`fetch`, `connect`) is disabled. Do not attempt outbound HTTP.",
		"",
		"The `state` API (TypeScript declaration; the runtime is JavaScript):",
		"",
		"```typescript",
		STATE_TYPES,
		"```",
	].join("\n");
}

export function getDefaultWorkspace(): Workspace {
	const { storage } = getCloudflareContext();
	return new Workspace({ sql: storage.sql });
}
