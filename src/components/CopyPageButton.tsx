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
} from "react-icons/pi";

export default function CopyPageButton() {
	const [isOpen, setIsOpen] = useState(false);

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
		window.open(markdownUrl, "_blank");
	};

	const handleCopyMarkdown = async () => {
		const markdownUrl = new URL("index.md", window.location.href).toString();
		try {
			const response = await fetch(markdownUrl);
			const markdown = await response.text();
			await navigator.clipboard.writeText(markdown);
		} catch (error) {
			console.error("Failed to copy Markdown:", error);
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

	return (
		<>
			<button
				ref={refs.setReference}
				{...getReferenceProps()}
				className="inline-flex h-8 items-center justify-center gap-2 rounded border border-[--sl-color-hairline] bg-transparent px-3 text-sm text-black"
			>
				Copy Page
				<PiMarkdownLogo />
			</button>
			{isOpen && (
				<FloatingPortal>
					<ul
						ref={refs.setFloating}
						style={floatingStyles}
						{...getFloatingProps()}
						className="min-w-[240px] list-none rounded border border-[--sl-color-hairline] bg-[--sl-color-bg] pl-0 shadow-md"
					>
						{options.map(({ label, description, icon: Icon, onClick }) => (
							<li key={label}>
								<button
									onClick={onClick}
									className="block w-full bg-transparent px-3 py-2 text-left text-black no-underline hover:bg-[--sl-color-bg-nav]"
								>
									<div className="flex items-center gap-2 text-sm">
										<Icon className="h-4 w-4" />
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
