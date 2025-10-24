import type { CollectionEntry } from "astro:content";
import ReactSelect, { type Option } from "../ReactSelect";
import { useEffect, useState } from "react";

interface Props {
	products: CollectionEntry<"products">[];
	groups: string[];
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

		const search = document.querySelector<HTMLAnchorElement>(
			"#changelog-search-button",
		);

		if (search) {
			if (
				options
					.find((opt) => opt.label === "Products")
					?.options?.includes(option)
			) {
				search.href = `/search/?contentType=Changelog+entry&product=${encodeURIComponent(option.label)}`;
			} else {
				search.href = `/search/?contentType=Changelog+entry`;
			}
		}
	};

	return (
		<ReactSelect
			id="changelogs-next-filter"
			className="mt-2"
			options={options}
			value={selectedOption}
			onChange={(e) => handleChange(e as Option | null)}
			urlParam="product"
		/>
	);
}
