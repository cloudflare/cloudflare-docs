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
	{ label: "Docs Directory", href: "/directory/" },
	{
		label: "APIs",
		href: "https://developers.cloudflare.com/api/",
	},
	{ label: "SDKs", href: "/fundamentals/api/reference/sdks/" },
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
		middleware: [shift(), offset(5)],
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
				className="hover:bg-cl1-white dark:hover:bg-cl1-gray-0 flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-transparent p-2 font-medium hover:shadow-md"
			>
				{label}
				<PiCaretDownBold />
			</button>
			{isOpen && (
				<ul
					ref={refs.setFloating}
					style={floatingStyles}
					{...getFloatingProps()}
					className="border-cl1-gray-8 bg-cl1-white dark:border-cl1-gray-1 dark:bg-cl1-gray-0 max-w-80 min-w-60 list-none rounded-sm border pl-0 shadow-md"
				>
					{pages.map((page) => (
						<li key={page.href}>
							<a
								href={page.href}
								className="8 hover:bg-cl1-gray-9 dark:hover:bg-cl1-gray-1 block p-3 text-black no-underline"
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
		<div className="flex gap-2 leading-6 text-nowrap">
			{links.map(({ label, href }) => (
				<a
					key={href}
					href={href}
					className="hover:bg-cl1-white dark:hover:bg-cl1-gray-0 flex items-center justify-center rounded-sm p-2 font-medium text-black no-underline hover:shadow-md"
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
