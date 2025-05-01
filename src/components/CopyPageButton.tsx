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
	PiMarkdownLogo,
	PiClipboardTextLight,
	PiArrowSquareOutLight,
	PiCheckCircleLight,
	PiXCircleLight,
} from "react-icons/pi";
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

	const handleCopyMarkdown = async () => {
		const markdownUrl = new URL("index.md", window.location.href).toString();
		try {
			const response = await fetch(markdownUrl);

			if (!response.ok) {
				throw new Error(`Received ${response.status} on ${response.url}`);
			}

			const markdown = await response.text();
			await navigator.clipboard.writeText(markdown);
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

	const options = [
		{
			label: "Copy Page as Markdown",
			description: "Copy the raw Markdown content to clipboard",
			icon: PiClipboardTextLight,
			onClick: handleCopyMarkdown,
		},
		{
			label: "View Page as Markdown",
			description: "Open the Markdown file in a new tab",
			icon: PiArrowSquareOutLight,
			onClick: handleViewMarkdown,
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
				<span>Copy Page</span>
				<PiMarkdownLogo />
			</>
		);
	};

	return (
		<>
			<button
				ref={refs.setReference}
				{...getReferenceProps()}
				className="inline-flex h-8 min-w-32 cursor-pointer items-center justify-center gap-2 rounded border border-[--sl-color-hairline] bg-transparent px-3 text-sm text-black hover:bg-[--sl-color-bg-nav]"
			>
				{getButtonContent()}
			</button>
			{isOpen && (
				<FloatingPortal>
					<ul
						ref={refs.setFloating}
						style={floatingStyles}
						{...getFloatingProps()}
						className="list-none rounded border border-[--sl-color-hairline] bg-[--sl-color-bg] pl-0 shadow-md"
					>
						{options.map(({ label, description, icon: Icon, onClick }) => (
							<li key={label}>
								<button
									onClick={onClick}
									className="relative block w-full cursor-pointer bg-transparent px-3 py-2 text-left text-black no-underline hover:bg-[--sl-color-bg-nav]"
								>
									<div className="flex items-center gap-2 text-sm">
										<Icon />
										{label}
									</div>
									<div className="ml-6 mt-0.5 text-xs text-[--sl-color-gray-3]">
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
