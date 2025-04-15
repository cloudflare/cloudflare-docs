import type { CollectionEntry } from "astro:content";
import type { StylesConfig } from "react-select";
import Select from "react-select";
import { useEffect, useState } from "react";

interface Props {
	products: CollectionEntry<"products">[];
	groups: string[];
}

interface Option {
	label?: string;
	value: string;
}

export default function ProductSelect({ products, groups }: Props) {
	const [selectedOption, setSelectedOption] = useState<Option>();

	const productOptions = products
		.sort((a, b) => a.id.localeCompare(b.id))
		.map((product) => ({
			value: product.id,
			label: product.data.product.title,
		}));

	const groupOptions = groups.map((group) => {
		return {
			value: group.replaceAll(" ", "-").toLowerCase(),
			label: group,
		};
	});

	const options = [
		{ value: "all", label: "All products" },
		{
			label: "Product groups",
			options: groupOptions,
		},
		{
			label: "Products",
			options: productOptions,
		},
	];

	const selectStyles: StylesConfig<Option, false> = {
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

	useEffect(() => {
		const url = new URL(window.location.href);
		const param = url.searchParams.get("product");

		if (param) {
			const opt =
				productOptions.find((opt) => opt.value === param) ||
				groupOptions.find((opt) => opt.value === param);

			if (opt) {
				setSelectedOption(opt);
			}
		}
	}, []);

	const handleChange = (option: Option | null) => {
		if (!option) return;
		setSelectedOption(option);

		const event = new Event("change");
		const select = document.getElementById(
			"changelogs-next-filter",
		) as HTMLSelectElement;

		if (select) {
			select.value = option.value;
			select.dispatchEvent(event);
		}
	};

	return (
		<Select
			id="changelogs-next-filter"
			className="mt-2"
			options={options}
			value={selectedOption}
			onChange={handleChange}
			styles={selectStyles}
		/>
	);
}
