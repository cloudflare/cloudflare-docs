import {
	PiCopyDuotone,
	PiArrowSquareOutLight,
	PiSparkleDuotone,
	PiCheckCircleLight,
} from "react-icons/pi";
import { useState, useRef, useEffect } from "react";
import tippy from "tippy.js";
import ClaudeIcon from "./icons/ClaudeIcon";
import ChatGPTIcon from "./icons/ChatGPTIcon";
import DocsForAgentsIcon from "./icons/DocsForAgentsIcon";
import { track } from "~/util/zaraz";

type CopyFeedback = { key: string; state: "success" } | null;

interface ListOption {
	key: string;
	label: string;
	tooltip: string;
	icon: React.ComponentType<{ className?: string }>;
	onClick: () => void;
}

interface IconOption {
	key: string;
	tooltip: string;
	icon: React.ComponentType<{ className?: string }>;
	onClick: () => void;
}

function useTippy(content: string) {
	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const instance = tippy(ref.current, {
			content,
			placement: "top",
			arrow: false,
			appendTo: () => document.body,
		});
		return () => instance.destroy();
	}, [content]);

	return ref;
}

function ListItem({
	tooltip,
	onClick,
	justCopied,
	icon: Icon,
	label,
}: {
	tooltip: string;
	onClick: () => void;
	justCopied: boolean;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}) {
	const ref = useTippy(tooltip);

	return (
		<li className="m-0 p-0">
			<button
				ref={ref}
				onClick={onClick}
				className="flex w-full cursor-pointer items-center gap-2.5 rounded-none border-0 bg-transparent px-0 py-1.5 text-[13px] leading-snug text-[var(--sidebar-text)] shadow-none transition-colors duration-150 ease-out hover:text-[var(--sidebar-text-strong)] focus-visible:ring-2 focus-visible:ring-[var(--sl-color-text-accent)] focus-visible:outline-none"
			>
				{justCopied ? (
					<PiCheckCircleLight className="h-3.5 w-3.5 shrink-0 text-green-500" />
				) : (
					<Icon className="h-3.5 w-3.5 shrink-0" />
				)}
				<span>{justCopied ? "Copied!" : label}</span>
			</button>
		</li>
	);
}

function IconButton({
	tooltip,
	onClick,
	icon: Icon,
}: {
	tooltip: string;
	onClick: () => void;
	icon: React.ComponentType<{ className?: string }>;
}) {
	const ref = useTippy(tooltip);

	return (
		<button
			ref={ref}
			onClick={onClick}
			aria-label={tooltip}
			className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-[var(--sl-color-gray-2)] shadow-none transition-colors duration-150 ease-out hover:bg-[var(--color-cl1-gray-9)] hover:text-[var(--sl-color-white)] focus-visible:ring-2 focus-visible:ring-[var(--sl-color-text-accent)] focus-visible:outline-none dark:hover:bg-[var(--color-cl1-gray-2)]"
		>
			<Icon className="h-4 w-4" aria-hidden="true" />
		</button>
	);
}

export default function AgentsToolkit() {
	const [copyFeedback, setCopyFeedback] = useState<CopyFeedback>(null);

	const showFeedback = (key: string) => {
		setCopyFeedback({ key, state: "success" });
		setTimeout(() => setCopyFeedback(null), 1500);
	};

	const handleCopyMarkdown = async () => {
		const markdownUrl = new URL("index.md", window.location.href).toString();
		try {
			const clipboardItem = new ClipboardItem({
				["text/plain"]: fetch(markdownUrl)
					.then((r) => r.text())
					.then((t) => new Blob([t], { type: "text/plain" }))
					.catch((e) => {
						throw new Error(`Received ${e.message} for ${markdownUrl}`);
					}),
			});
			await navigator.clipboard.write([clipboardItem]);
			track("agents toolkit clicked", { value: "copy markdown" });
			showFeedback("copy-md");
		} catch (error) {
			console.error("Failed to copy Markdown:", error);
		}
	};

	const handleViewMarkdown = () => {
		const markdownUrl = new URL("index.md", window.location.href).toString();
		track("agents toolkit clicked", { value: "view markdown" });
		window.open(markdownUrl, "_blank");
	};

	const handleExternalAI = (url: string, vendor: string) => {
		const indexMdUrl = new URL("index.md", window.location.href).toString();
		const prompt = `Read this page from the Cloudflare docs: ${encodeURIComponent(indexMdUrl)} and answer questions about the content.`;
		track("agents toolkit clicked", { value: `${vendor} ai` });
		window.open(`${url}${prompt}`, "_blank");
	};

	const handleViewAIOptions = () => {
		track("agents toolkit clicked", { value: "view ai options" });
		window.open("/agent-setup/", "_blank");
	};

	const handleViewDocsForAgents = () => {
		track("agents toolkit clicked", { value: "docs for agents" });
		window.open("/docs-for-agents/", "_blank");
	};

	const listOptions: ListOption[] = [
		{
			key: "ai-options",
			label: "Agent setup",
			tooltip:
				"Setup your agent with the necessary tools to build on Cloudflare",
			icon: PiSparkleDuotone,
			onClick: handleViewAIOptions,
		},
		{
			key: "docs-for-agents",
			label: "Docs for agents",
			tooltip: "Connect AI agents and LLMs to Cloudflare docs",
			icon: DocsForAgentsIcon,
			onClick: handleViewDocsForAgents,
		},
		{
			key: "copy-md",
			label: "Copy as Markdown",
			tooltip: "Copy this page's Markdown source to clipboard",
			icon: PiCopyDuotone,
			onClick: handleCopyMarkdown,
		},
	];

	const iconOptions: IconOption[] = [
		{
			key: "view-md",
			tooltip: "Open the Markdown file in a new tab",
			icon: PiArrowSquareOutLight,
			onClick: handleViewMarkdown,
		},
		{
			key: "claude",
			tooltip: "Ask Claude about this page",
			icon: ClaudeIcon,
			onClick: () => handleExternalAI("https://claude.ai/new?q=", "claude"),
		},
		{
			key: "chatgpt",
			tooltip: "Ask ChatGPT about this page",
			icon: ChatGPTIcon,
			onClick: () =>
				handleExternalAI("https://chat.openai.com/?prompt=", "chatgpt"),
		},
	];

	return (
		<div>
			<h3 className="mt-0 mb-3 text-[11px] font-semibold tracking-widest text-[var(--sl-color-text-accent)] uppercase">
				Agents toolkit
			</h3>
			<ul className="m-0 flex list-none flex-col gap-0 p-0">
				{listOptions.map(({ key, label, tooltip, icon: Icon, onClick }) => {
					const justCopied =
						copyFeedback?.key === key && copyFeedback.state === "success";

					return (
						<ListItem
							key={key}
							tooltip={tooltip}
							onClick={onClick}
							justCopied={justCopied}
							icon={Icon}
							label={label}
						/>
					);
				})}
			</ul>

			<div className="mt-2 flex items-center gap-1">
				{iconOptions.map(({ key, tooltip, icon: Icon, onClick }) => (
					<IconButton
						key={key}
						tooltip={tooltip}
						onClick={onClick}
						icon={Icon}
					/>
				))}
			</div>
		</div>
	);
}
