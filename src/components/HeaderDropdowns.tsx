import {
	useFloating,
	useInteractions,
	useClick,
	useDismiss,
	shift,
	offset,
	autoUpdate,
} from "@floating-ui/react";
import { useState } from "react";
import { PiCaretDownBold } from "react-icons/pi";

const links = [
	{ label: "Directory", href: "/directory/" },
	{
		label: "API",
		href: "/api/",
	},
	{ label: "SDKs", href: "/fundamentals/api/reference/sdks/" },
	{ label: "Changelog", href: "/changelog/" },
];

const dropdowns = Object.entries({
	Help: [
		{ label: "Help center", href: "https://support.cloudflare.com/" },
		{ label: "Cloudflare status", href: "https://www.cloudflarestatus.com/" },
		{ label: "Community", href: "https://community.cloudflare.com/" },
	],
});

function Dropdown({ dropdown }: { dropdown: (typeof dropdowns)[number] }) {
	const [label, pages] = dropdown;
	const [isOpen, setIsOpen] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [shift(), offset(8)],
		whileElementsMounted: autoUpdate,
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
	]);

	return (
		<>
			<button
				ref={refs.setReference}
				{...getReferenceProps()}
				className="flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-transparent px-3 text-sm font-medium text-[var(--color-header-text)] transition-colors duration-150 hover:bg-[var(--color-header-fill)] hover:text-[var(--color-header-hover-text)]"
			>
				{label}
				<PiCaretDownBold className="size-2.5 text-[var(--color-header-text-subtle)]" />
			</button>
			{isOpen && (
				<ul
					ref={refs.setFloating}
					style={floatingStyles}
					{...getFloatingProps()}
					className="max-w-64 min-w-44 list-none rounded-lg border border-[var(--color-header-overlay-line)] bg-[var(--color-header-overlay-bg)] p-1 shadow-[0_4px_16px_var(--color-header-overlay-shadow)]"
				>
					{pages.map((page) => (
						<li key={page.href} className="list-none">
							<a
								href={page.href}
								className="block rounded-md px-2.5 py-1.5 text-sm text-[var(--color-header-text)] no-underline transition-colors duration-150 hover:bg-[var(--color-header-fill)] hover:text-[var(--color-header-hover-text)]"
								target={page.href.startsWith("https") ? "_blank" : undefined}
							>
								{page.label}
							</a>
						</li>
					))}
				</ul>
			)}
		</>
	);
}

export default function HeaderDropdownsComponent() {
	return (
		<div className="flex items-center gap-0.5 text-nowrap">
			{links.map(({ label, href }) => (
				<a
					key={href}
					href={href}
					className="flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-[var(--color-header-text)] no-underline transition-colors duration-150 hover:bg-[var(--color-header-fill)] hover:text-[var(--color-header-hover-text)]"
				>
					{label}
				</a>
			))}
			{dropdowns.map((dropdown) => (
				<Dropdown key={dropdown[0]} dropdown={dropdown} />
			))}
		</div>
	);
}
