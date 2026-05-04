import {
	FloatingPortal,
	autoUpdate,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from "@floating-ui/react";
import { useEffect, useRef, useState } from "react";
import {
	PiCaretDownBold,
	PiDesktopBold,
	PiMoonBold,
	PiSunBold,
} from "react-icons/pi";

type Theme = "auto" | "dark" | "light";

const storageKey = "starlight-theme";

const themeOptions: {
	value: Theme;
	label: string;
	Icon: React.ComponentType<{ className?: string }>;
}[] = [
	{ value: "light", label: "Light", Icon: PiSunBold },
	{ value: "dark", label: "Dark", Icon: PiMoonBold },
	{ value: "auto", label: "Auto", Icon: PiDesktopBold },
];

function parseTheme(theme: unknown): Theme {
	return theme === "auto" || theme === "dark" || theme === "light"
		? theme
		: "auto";
}

function loadTheme(): Theme {
	return parseTheme(
		typeof localStorage !== "undefined" && localStorage.getItem(storageKey),
	);
}

function storeTheme(theme: Theme): void {
	if (typeof localStorage !== "undefined") {
		localStorage.setItem(
			storageKey,
			theme === "light" || theme === "dark" ? theme : "",
		);
	}
}

function getPreferredColorScheme(): "light" | "dark" {
	return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme): void {
	document.documentElement.dataset.theme =
		theme === "auto" ? getPreferredColorScheme() : theme;
	storeTheme(theme);
	// Keep any hidden <select> elements in sync so StarlightThemeProvider.updatePickers() works.
	if (typeof window !== "undefined" && (window as any).StarlightThemeProvider) {
		(window as any).StarlightThemeProvider.updatePickers(theme);
	}
}

export default function ThemeSelectDropdown() {
	// Start as null so the button renders empty (no label flash) until hydration reads localStorage.
	const [theme, setTheme] = useState<Theme | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	// Hidden select ref so StarlightThemeProvider.updatePickers() can find and update it.
	const selectRef = useRef<HTMLSelectElement>(null);

	// Initialize from localStorage on mount.
	useEffect(() => {
		setTheme(loadTheme());

		// React to system color scheme changes when set to auto.
		const mq = matchMedia("(prefers-color-scheme: light)");
		const handleChange = () => {
			if (loadTheme() === "auto") {
				document.documentElement.dataset.theme = getPreferredColorScheme();
			}
		};
		mq.addEventListener("change", handleChange);
		return () => mq.removeEventListener("change", handleChange);
	}, []);

	// Keep hidden select value in sync with React state.
	useEffect(() => {
		if (selectRef.current && theme) {
			selectRef.current.value = theme;
		}
	}, [theme]);

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

	function handleSelect(value: Theme) {
		setTheme(value);
		applyTheme(value);
		setIsOpen(false);
	}

	const current = theme ? themeOptions.find((o) => o.value === theme) : null;
	const CurrentIcon = current?.Icon;

	return (
		// Keep starlight-theme-select as the wrapper so StarlightThemeProvider.updatePickers()
		// can still query it and update the hidden <select>.
		<starlight-theme-select>
			{/* Hidden select preserves the StarlightThemeProvider contract */}
			<select
				ref={selectRef}
				defaultValue={theme ?? "auto"}
				aria-hidden="true"
				tabIndex={-1}
				style={{ display: "none" }}
				onChange={(e) => handleSelect(parseTheme(e.currentTarget.value))}
			>
				{themeOptions.map((o) => (
					<option key={o.value} value={o.value}>
						{o.label}
					</option>
				))}
			</select>

			{/* Fixed width prevents layout shift as the label changes between "Auto"/"Light"/"Dark" */}
			<button
				ref={refs.setReference}
				{...getReferenceProps()}
				aria-label={current ? `Theme: ${current.label}` : "Theme"}
				className="flex h-9 w-full cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-transparent px-3 text-sm font-medium text-[var(--color-header-text)] transition-colors duration-150 hover:bg-[var(--color-header-fill)] hover:text-[var(--color-header-hover-text)]"
			>
				<span className="flex flex-1 items-center gap-1.5">
					{CurrentIcon && (
						<CurrentIcon className="size-3.5 text-[var(--color-header-text-subtle)]" />
					)}
					{current?.label}
				</span>
				<span className="shrink-0">
					<PiCaretDownBold className="size-2.5 text-[var(--color-header-text-subtle)]" />
				</span>
			</button>

			{isOpen && (
				<FloatingPortal>
					<ul
						ref={refs.setFloating}
						style={floatingStyles}
						{...getFloatingProps()}
						className="z-50 max-w-64 min-w-44 list-none rounded-lg border border-[var(--color-header-overlay-line)] bg-[var(--color-header-overlay-bg)] p-1 shadow-[0_4px_16px_var(--color-header-overlay-shadow)]"
					>
						{themeOptions.map((option) => {
							const OptionIcon = option.Icon;
							return (
								<li key={option.value} className="list-none">
									<button
										onClick={() => handleSelect(option.value)}
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
			)}
		</starlight-theme-select>
	);
}
