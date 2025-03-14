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

const dropdowns = Object.entries({
	"API & SDKs": [
		{
			label: "API documentation",
			href: "https://developers.cloudflare.com/api/",
		},
		{ label: "SDKs", href: "/fundamentals/api/reference/sdks/" },
	],
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
				className="flex cursor-pointer items-center justify-center gap-2 rounded bg-transparent p-2 font-medium hover:bg-cl1-white hover:shadow-md dark:hover:bg-cl1-gray-0"
			>
				{label}
				<PiCaretDownBold />
			</button>
			{isOpen && (
				<ul
					ref={refs.setFloating}
					style={floatingStyles}
					{...getFloatingProps()}
					className="min-w-60 max-w-80 list-none rounded border border-cl1-gray-8 bg-cl1-white pl-0 shadow-md dark:border-cl1-gray-1 dark:bg-cl1-gray-0"
				>
					{pages.map((page) => (
						<li key={page.href}>
							<a
								href={page.href}
								className="8 block p-3 text-black no-underline hover:bg-cl1-gray-9 dark:hover:bg-cl1-gray-1"
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
		<div className="flex gap-2 text-nowrap leading-6">
			<a
				href="/products/"
				className="flex items-center justify-center rounded p-2 font-medium text-black no-underline hover:bg-cl1-white hover:shadow-md dark:hover:bg-cl1-gray-0"
			>
				Docs Directory
			</a>
			{dropdowns.map((dropdown) => (
				<Dropdown key={dropdown[0]} dropdown={dropdown} />
			))}
		</div>
	);
}
