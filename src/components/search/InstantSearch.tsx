import { liteClient as algoliasearch } from "algoliasearch/lite";
import { useEffect, useState } from "react";
import {
	InstantSearch,
	Highlight,
	Configure,
	useSearchBox,
	type UseSearchBoxProps,
	useInfiniteHits,
	type UseInfiniteHitsProps,
	useRefinementList,
} from "react-instantsearch";
import {
	useFloating,
	useInteractions,
	useClick,
	useDismiss,
	shift,
	offset,
	autoUpdate,
	FloatingPortal,
} from "@floating-ui/react";
import { PiCaretDownBold } from "react-icons/pi";

function SearchBox(props: UseSearchBoxProps) {
	const { query, refine } = useSearchBox(props);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const query = params.get("q") ?? params.get("query");

		if (query) {
			refine(query);
		}
	}, []);

	return (
		<div className="flex items-center rounded border border-cl1-gray-8 p-2 dark:border-cl1-gray-2">
			<input
				type="text"
				value={query}
				onChange={(event) => refine(event.target.value)}
				className="w-full border-none bg-transparent p-0 text-sm outline-none"
				placeholder="Search..."
			/>
		</div>
	);
}

function InfiniteHits(props: UseInfiniteHitsProps) {
	const { items, isLastPage, showMore } = useInfiniteHits(props);

	return (
		<div className="space-y-4">
			{items.map((item) => {
				const hierarchy = Object.entries(item.hierarchy)
					.filter(([, value]) => value !== null)
					.sort((a, b) => a[0].localeCompare(b[0]))
					.map(([, value]) => value);

				const title = hierarchy ? hierarchy.join(" > ") : "Documentation";

				return (
					<a
						key={item.objectID}
						href={item.url}
						className="flex flex-col rounded border border-cl1-gray-8 p-6 !text-black no-underline hover:bg-cl1-gray-9 dark:border-cl1-gray-2 dark:bg-cl1-gray-0 dark:hover:bg-cl1-gray-1"
					>
						<strong>{title}</strong>
						<p className="line-clamp-2">
							<Highlight attribute="content" hit={item} />
						</p>
					</a>
				);
			})}
			{items.length !== 0 && !isLastPage && (
				<div className="flex items-center justify-center">
					<button
						onClick={showMore}
						className="h-12 cursor-pointer rounded bg-cl1-brand-orange px-6 font-medium text-cl1-black"
					>
						Load more
					</button>
				</div>
			)}
		</div>
	);
}

function FilterDropdown({
	attribute,
	label,
}: {
	attribute: string;
	label: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const { items, refine } = useRefinementList({ attribute });

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const values = params.get(attribute)?.split(",");

		if (values && values.length !== 0) {
			for (const value of values) {
				refine(value);
			}
		}
	}, []);

	useEffect(() => {
		const refined = items
			.filter((item) => item.isRefined)
			.map((item) => item.value);
		if (refined.length === 0) return;

		history.pushState(
			null,
			"",
			`${window.location.pathname}?${attribute}=${refined.join(",")}`,
		);
	}, [items]);

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

	const selectedItems = items.filter((item) => item.isRefined);

	return (
		<>
			<button
				ref={refs.setReference}
				{...getReferenceProps()}
				className="flex cursor-pointer items-center justify-center gap-2 rounded border border-cl1-gray-8 bg-transparent p-2 dark:border-cl1-gray-2"
			>
				<span>
					{label}
					{selectedItems.length > 0 && ` (${selectedItems.length})`}
				</span>
				<PiCaretDownBold />
			</button>
			{isOpen && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						style={floatingStyles}
						{...getFloatingProps()}
						className="rounded border border-cl1-gray-8 bg-cl1-white p-4 shadow-md dark:border-cl1-gray-1 dark:bg-cl1-gray-0"
					>
						<div className="max-h-60 space-y-2 overflow-y-auto">
							{items.map((item) => (
								<label
									key={item.value}
									className="flex items-center gap-2 text-sm"
								>
									<input
										type="checkbox"
										checked={item.isRefined}
										onChange={() => refine(item.value)}
									/>
									<span>
										{item.label} ({item.count})
									</span>
								</label>
							))}
						</div>
					</div>
				</FloatingPortal>
			)}
		</>
	);
}

export default function InstantSearchComponent() {
	return (
		<InstantSearch
			searchClient={algoliasearch(
				"D32WIYFTUF",
				"5cec275adc19dd3bc17617f7d9cf312a",
			)}
			indexName="prod_devdocs"
			future={{
				preserveSharedStateOnUnmount: true,
			}}
		>
			<Configure filters="type:content" />
			<div className="space-y-4">
				<SearchBox />
				<div className="flex gap-2">
					<FilterDropdown attribute="product" label="Products" />
				</div>
				<InfiniteHits />
			</div>
		</InstantSearch>
	);
}
