import {
	useFloating,
	useInteractions,
	useClick,
	useDismiss,
	shift,
	offset,
	autoUpdate,
	FloatingPortal,
} from "@floating-ui/react";
import { useState } from "react";
import {
	PiTriangleFill,
	PiCopyDuotone,
	PiArrowSquareOutLight,
	PiCheckCircleLight,
	PiXCircleLight,
	PiChatCircleLight,
	PiLinkLight,
	PiPlugsConnectedLight,
} from "react-icons/pi";
import ClaudeIcon from "./icons/ClaudeIcon";
import ChatGPTIcon from "./icons/ChatGPTIcon";
import { track } from "~/util/zaraz";

type CopyState = "idle" | "success" | "error";

export default function CopyPageButton() {
	const [isOpen, setIsOpen] = useState(false);
	const [copyState, setCopyState] = useState<CopyState>("idle");

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [shift(), offset(5)],
		whileElementsMounted: autoUpdate,
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
	]);

	const handleViewMarkdown = () => {
		const markdownUrl = new URL("index.md", window.location.href).toString();
		track("clicked copy page button", {
			value: "view markdown",
		});
		window.open(markdownUrl, "_blank");
	};

	const handleDocsAI = () => {
		const docsAIUrl = "https://developers.cloudflare.com/support/ai/";
		track("clicked copy page button", {
			value: "docs ai",
		});
		window.open(docsAIUrl, "_blank");
	};

	const handleViewAIOptions = () => {
		const aiOptionsUrl = "/style-guide/ai-tooling/";
		track("clicked copy page button", {
			value: "view ai options",
		});
		window.open(aiOptionsUrl, "_blank");
	};

	const handleExternalAI = (url: string, vendor: string) => {
		const externalAIURL = url;
		const indexMdUrl = new URL("index.md", window.location.href).toString();
		const prompt = `Read this page from the Cloudflare docs: ${encodeURIComponent(indexMdUrl)} and answer questions about the content.`;
		track("clicked copy page button", {
			value: `${vendor} ai`,
		});
		window.open(`${externalAIURL}${prompt}`, "_blank");
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
			track("clicked copy page button", {
				value: "copy markdown",
			});

			setCopyState("success");
			setTimeout(() => {
				setCopyState("idle");
			}, 1500);
		} catch (error) {
			console.error("Failed to copy Markdown:", error);

			setCopyState("error");
			setTimeout(() => {
				setCopyState("idle");
			}, 1500);
		}
	};

	const handleCopyPageLink = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			track("clicked copy page button", {
				value: "copy page link",
			});

			setCopyState("success");
			setTimeout(() => {
				setCopyState("idle");
			}, 1500);
		} catch (error) {
			console.error("Failed to copy page link:", error);

			setCopyState("error");
			setTimeout(() => {
				setCopyState("idle");
			}, 1500);
		}
	};

	const options = [
		{
			label: "Copy page link",
			description: "Copy the current page URL to clipboard",
			icon: PiLinkLight,
			onClick: handleCopyPageLink,
		},
		{
			label: "View Page as Markdown",
			description: "Open the Markdown file in a new tab",
			icon: PiArrowSquareOutLight,
			onClick: handleViewMarkdown,
		},
		{
			label: "Open in Claude",
			description: "Ask Claude about this page",
			icon: ClaudeIcon,
			onClick: () => handleExternalAI("https://claude.ai/new?q=", "claude"),
		},
		{
			label: "Open in ChatGPT",
			description: "Ask ChatGPT about this page",
			icon: ChatGPTIcon,
			onClick: () =>
				handleExternalAI("https://chat.openai.com/?prompt=", "chatgpt"),
		},
		{
			label: "View other AI options",
			description: "Explore more AI tooling options",
			icon: PiPlugsConnectedLight,
			onClick: handleViewAIOptions,
		},
		{
			label: "Ask Docs AI",
			description: "Open our Docs AI assistant in a new tab",
			icon: PiChatCircleLight,
			onClick: handleDocsAI,
		},
	];

	const getButtonContent = () => {
		if (copyState === "success") {
			return (
				<>
					<span>Copied!</span>
					<PiCheckCircleLight className="text-green-600" />
				</>
			);
		}

		if (copyState === "error") {
			return (
				<>
					<span>Failed</span>
					<PiXCircleLight className="text-red-600" />
				</>
			);
		}

		return (
			<>
				<PiCopyDuotone />
				<span>Copy page</span>
			</>
		);
	};

	return (
		<>
			<div className="flex justify-end">
				<button
					onClick={handleCopyMarkdown}
					className="inline-flex min-h-8 min-w-32 cursor-pointer items-center justify-center gap-2 rounded-l-sm border border-(--sl-color-hairline) bg-transparent px-3 text-sm text-black transition-colors duration-300 hover:bg-[var(--color-cl1-gray-9)] dark:hover:bg-[var(--color-cl1-gray-2)]"
				>
					{getButtonContent()}
				</button>
				<button
					ref={refs.setReference}
					{...getReferenceProps()}
					className="inline-flex min-h-8 w-8 cursor-pointer items-center justify-center rounded-r-sm border-t border-r border-b border-(--sl-color-hairline) bg-transparent text-sm text-black transition-colors duration-300 hover:bg-[var(--color-cl1-gray-9)] dark:hover:bg-[var(--color-cl1-gray-2)]"
				>
					<PiTriangleFill className="rotate-180 text-xs" />
				</button>
			</div>
			{isOpen && (
				<FloatingPortal>
					<ul
						ref={refs.setFloating}
						style={floatingStyles}
						{...getFloatingProps()}
						className="list-none rounded-sm border border-(--sl-color-hairline) bg-(--sl-color-bg) pl-0 shadow-md"
					>
						{options.map(({ label, description, icon: Icon, onClick }) => (
							<li key={label}>
								<button
									onClick={onClick}
									className="relative block w-full cursor-pointer bg-transparent px-3 py-2 text-left text-black no-underline hover:bg-[var(--color-cl1-gray-9)] dark:hover:bg-[var(--color-cl1-gray-2)]"
								>
									<div className="flex items-center gap-2 text-sm">
										<Icon />
										{label}
									</div>
									<div className="mt-0.5 ml-6 text-xs text-(--sl-color-gray-3)">
										{description}
									</div>
								</button>
							</li>
						))}
					</ul>
				</FloatingPortal>
			)}
		</>
	);
}
