import Select, { type Props } from "react-select";
import type { ActionMeta, StylesConfig } from "react-select";
import { setSearchParams } from "~/util/url";

export type Option = {
	label: string;
	value: string;
};

export default function ReactSelect(props: Props & { urlParam?: string }) {
	// CF source: cloudflare-docs/src/components/ReactSelect.tsx (faithful port).
	// The Starlight `--sl-color-gray-1..6` scale is undefined in cf-nimbus, so
	// the styles are remapped onto cf-nimbus's Tailwind theme tokens (emitted
	// as `--color-*` CSS vars from globals.css `@theme`):
	//   gray-6 (panel bg)         → --color-card
	//   gray-5 (focused option)   → --color-muted
	//   gray-4 (border/active)    → --color-border
	//   gray-3 (focus border)     → --color-border-strong
	//   gray-3 (group heading)    → --color-muted-foreground
	//   gray-1 (text)             → --color-foreground
	const selectStyles: StylesConfig = {
		control: (base, state) => ({
			...base,
			backgroundColor: "var(--color-card)",
			borderColor: state.isFocused
				? "var(--color-border-strong)"
				: "var(--color-border)",
			"&:hover": {
				borderColor: "var(--color-border-strong)",
			},
			boxShadow: state.isFocused
				? "0 0 0 1px var(--color-border-strong)"
				: "none",
		}),
		menu: (base) => ({
			...base,
			backgroundColor: "var(--color-card)",
			borderColor: "var(--color-border)",
		}),
		option: (base, state) => ({
			...base,
			backgroundColor: state.isFocused
				? "var(--color-muted)"
				: "var(--color-card)",
			color: "var(--color-foreground)",
			"&:active": {
				backgroundColor: "var(--color-border)",
			},
		}),
		singleValue: (base) => ({
			...base,
			color: "var(--color-foreground)",
		}),
		input: (base) => ({
			...base,
			color: "var(--color-foreground)",
		}),
		groupHeading: (base) => ({
			...base,
			color: "var(--color-muted-foreground)",
		}),
	};

	const onChangeHandler = (
		option: Option | null,
		actionMeta: ActionMeta<Option>,
	) => {
		props.onChange?.(option, actionMeta);

		const params = new URLSearchParams(window.location.search);

		if (option) {
			params.set(props.urlParam || "filters", option.value);
		} else {
			params.delete(props.urlParam || "filters");
		}

		setSearchParams(params);
	};

	return (
		<Select
			{...props}
			styles={selectStyles}
			onChange={(val: unknown, meta: ActionMeta<unknown>) =>
				onChangeHandler(val as Option | null, meta as ActionMeta<Option>)
			}
		/>
	);
}
