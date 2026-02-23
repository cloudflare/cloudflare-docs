import Select, { type Props } from "react-select";
import type { ActionMeta, StylesConfig } from "react-select";
import { setSearchParams } from "~/util/url";

export type Option = {
	label: string;
	value: string;
};

export default function ReactSelect(props: Props & { urlParam?: string }) {
	const selectStyles: StylesConfig = {
		control: (base, state) => ({
			...base,
			backgroundColor: "var(--sl-color-gray-6)",
			borderColor: state.isFocused
				? "var(--sl-color-gray-3)"
				: "var(--sl-color-gray-4)",
			"&:hover": {
				borderColor: "var(--sl-color-gray-3)",
			},
			boxShadow: state.isFocused ? "0 0 0 1px var(--sl-color-gray-3)" : "none",
		}),
		menu: (base) => ({
			...base,
			backgroundColor: "var(--sl-color-gray-6)",
			borderColor: "var(--sl-color-gray-4)",
		}),
		option: (base, state) => ({
			...base,
			backgroundColor: state.isFocused
				? "var(--sl-color-gray-5)"
				: "var(--sl-color-gray-6)",
			color: "var(--sl-color-gray-1)",
			"&:active": {
				backgroundColor: "var(--sl-color-gray-4)",
			},
		}),
		singleValue: (base) => ({
			...base,
			color: "var(--sl-color-gray-1)",
		}),
		input: (base) => ({
			...base,
			color: "var(--sl-color-gray-1)",
		}),
		groupHeading: (base) => ({
			...base,
			color: "var(--sl-color-gray-3)",
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
