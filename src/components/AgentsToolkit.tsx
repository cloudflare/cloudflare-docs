import {
	PiCopyDuotone,
	PiArrowSquareOutLight,
	PiLinkLight,
	PiPlugsConnectedLight,
	PiCheckCircleLight,
} from "react-icons/pi";
import { useState } from "react";
import ClaudeIcon from "./icons/ClaudeIcon";
import ChatGPTIcon from "./icons/ChatGPTIcon";
import { track } from "~/util/zaraz";

type CopyFeedback = { key: string; state: "success" } | null;

export default function AgentsToolkit() {
	const [copyFeedback, setCopyFeedback] = useState<CopyFeedback>(null);

	const showFeedback = (key: string) => {
		setCopyFeedback({ key, state: "success" });
		setTimeout(() => setCopyFeedback(null), 1500);
	};

	const handleCopyPageLink = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			track("agents toolkit clicked", { value: "copy page link" });
			showFeedback("copy-link");
		} catch (error) {
			console.error("Failed to copy page link:", error);
		}
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
		window.open("/style-guide/ai-tooling/", "_blank");
	};

	const options = [
		{
			key: "ai-options",
			label: "Setup your agent",
			icon: PiPlugsConnectedLight,
			onClick: handleViewAIOptions,
		},
		{
			key: "copy-link",
			label: "Copy page link",
			icon: PiLinkLight,
			onClick: handleCopyPageLink,
		},
		{
			key: "copy-md",
			label: "Copy as Markdown",
			icon: PiCopyDuotone,
			onClick: handleCopyMarkdown,
		},
		{
			key: "view-md",
			label: "View as Markdown",
			icon: PiArrowSquareOutLight,
			onClick: handleViewMarkdown,
		},
		{
			key: "claude",
			label: "Open in Claude",
			icon: ClaudeIcon,
			onClick: () => handleExternalAI("https://claude.ai/new?q=", "claude"),
		},
		{
			key: "chatgpt",
			label: "Open in ChatGPT",
			icon: ChatGPTIcon,
			onClick: () =>
				handleExternalAI("https://chat.openai.com/?prompt=", "chatgpt"),
		},
	];

	return (
		<div>
			<h3 className="mb-3 mt-0 text-[11px] font-semibold tracking-widest text-[var(--sl-color-text-accent)] uppercase">
				Agents toolkit
			</h3>
			<ul className="m-0 flex list-none flex-col gap-0 p-0">
				{options.map(({ key, label, icon: Icon, onClick }) => {
					const justCopied =
						copyFeedback?.key === key &&
						copyFeedback.state === "success";

					return (
						<li key={key} className="m-0 p-0">
							<button
								onClick={onClick}
								className="group flex w-full cursor-pointer items-center gap-2.5 rounded-sm border-0 bg-transparent px-0 py-1 text-[13px] text-[var(--sl-color-gray-2)] shadow-none transition-colors duration-150 ease-out hover:text-[var(--sl-color-white)] focus-visible:ring-2 focus-visible:ring-[var(--sl-color-text-accent)] focus-visible:outline-none"
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
				})}
			</ul>
		</div>
	);
}
