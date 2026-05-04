import {
	FloatingPortal,
	autoUpdate,
	offset,
	shift,
	useFloating,
} from "@floating-ui/react";
import { PiDesktopBold, PiMoonBold, PiSunBold } from "react-icons/pi";

export type Theme = "auto" | "dark" | "light";

const themeOptions: {
	value: Theme;
	label: string;
	Icon: React.ComponentType<{ className?: string }>;
}[] = [
	{ value: "light", label: "Light", Icon: PiSunBold },
	{ value: "dark", label: "Dark", Icon: PiMoonBold },
	{ value: "auto", label: "Auto", Icon: PiDesktopBold },
];

interface Props {
	anchor: HTMLElement;
	onSelect: (theme: Theme) => void;
}

export default function ThemeSelectMenu({ anchor, onSelect }: Props) {
	const { refs, floatingStyles } = useFloating({
		open: true,
		elements: { reference: anchor },
		middleware: [shift(), offset(8)],
		whileElementsMounted: autoUpdate,
	});

	return (
		<FloatingPortal>
			<ul
				ref={refs.setFloating}
				style={floatingStyles}
				className="z-50 max-w-64 min-w-44 list-none rounded-lg border border-[var(--color-header-overlay-line)] bg-[var(--color-header-overlay-bg)] p-1 shadow-[0_4px_16px_var(--color-header-overlay-shadow)]"
				onMouseDown={(e) => e.stopPropagation()}
			>
				{themeOptions.map((option) => {
					const OptionIcon = option.Icon;
					return (
						<li key={option.value} className="list-none">
							<button
								onClick={() => onSelect(option.value)}
								className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 text-left text-sm text-[var(--color-header-text)] transition-colors duration-150 hover:bg-[var(--color-header-fill)] hover:text-[var(--color-header-hover-text)]"
							>
								<OptionIcon className="size-3.5 shrink-0 text-[var(--color-header-text-subtle)]" />
								{option.label}
							</button>
						</li>
					);
				})}
			</ul>
		</FloatingPortal>
	);
}
