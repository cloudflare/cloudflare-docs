import React from "react";
import type { CollectionEntry } from "astro:content";
import Select, { type OptionProps, components } from "react-select";
import type { StylesConfig } from "react-select";

interface OptionType {
	label: string;
	value: string;
	href: string;
}

interface Props {
	products: CollectionEntry<"directory">[];
	groups: string[];
	currentPath: string;
}

const selectStyles: StylesConfig<OptionType> = {
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
		padding: 0,
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

function LinkOption(props: OptionProps<OptionType>) {
	const { data, innerProps } = props;
	// Omit onClick — the <a> tag handles navigation natively
	// innerProps is typed for <div>; omit ref/onClick and cast for <a>
	const { onClick, ref, ...restInnerProps } = innerProps;
	const anchorProps =
		restInnerProps as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>;
	return (
		<components.Option {...props}>
			<a
				href={data.href}
				{...anchorProps}
				style={{
					display: "block",
					padding: "8px 12px",
					textDecoration: "none",
					color: "inherit",
				}}
			>
				{data.label}
			</a>
		</components.Option>
	);
}

export default function ProductSelect({
	products,
	groups,
	currentPath,
}: Props) {
	const path = currentPath.replace(/\/$/, "");

	const groupOptions: OptionType[] = groups.map((group) => {
		const slug = group.replaceAll(" ", "-").toLowerCase();
		return {
			value: slug,
			label: group,
			href: `/changelog/product-group/${slug}/`,
		};
	});

	const productOptions: OptionType[] = products
		.sort((a, b) => a.id.localeCompare(b.id))
		.map((product) => ({
			value: product.id,
			label: product.data.entry.title,
			href: `/changelog/product/${product.id}/`,
		}));

	const allOption: OptionType = {
		value: "all",
		label: "All products",
		href: "/changelog/",
	};

	const options = [
		allOption,
		{ label: "Product groups", options: groupOptions },
		{ label: "Products", options: productOptions },
	];

	// Determine the selected option from the current path — no useEffect needed
	const selected =
		productOptions.find(
			(o) =>
				path === `/changelog/product/${o.value}` ||
				path.startsWith(`/changelog/product/${o.value}/`),
		) ??
		groupOptions.find(
			(o) =>
				path === `/changelog/product-group/${o.value}` ||
				path.startsWith(`/changelog/product-group/${o.value}/`),
		) ??
		allOption;

	return (
		<Select
			id="changelogs-next-filter"
			instanceId="changelogs-next-filter"
			className="mt-2"
			options={options}
			value={selected}
			styles={selectStyles}
			components={{ Option: LinkOption }}
			onChange={() => {}} // Navigation handled by <a> in LinkOption; no-op prevents react-select warnings
		/>
	);
}
