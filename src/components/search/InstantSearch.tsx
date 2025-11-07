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
import { subDays } from "date-fns";
import { setSearchParams } from "~/util/url";
import he from "he";

function SearchBox(props: UseSearchBoxProps) {
	const { query, refine } = useSearchBox(props);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const query = params.get("q") ?? params.get("query");

		if (query) {
			refine(query);
		}
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		if (query) {
			params.set("q", query);
		} else {
			params.delete("q");
		}

		setSearchParams(params);
	}, [query]);

	return (
		<div className="border-cl1-gray-8 dark:border-cl1-gray-2 flex items-center rounded-sm border p-2">
			<input
				type="text"
				value={query}
				onChange={(event) => refine(event.target.value)}
				className="w-full border-none bg-transparent p-0 text-sm outline-hidden"
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
				const today = new Date();
				const futureDate = subDays(today, item.lastModified);
				const options: Intl.DateTimeFormatOptions = {
					year: "numeric",
					month: "long",
					day: "numeric",
				};

				return (
					<a
						key={item.objectID}
						href={item.url}
						className="border-cl1-gray-8 hover:bg-cl1-gray-9 dark:border-cl1-gray-2 dark:bg-cl1-gray-0 dark:hover:bg-cl1-gray-1 flex flex-col rounded-sm border p-6 text-black! no-underline"
					>
						<strong>{he.decode(title)}</strong>
						<p className="line-clamp-2">
							<Highlight attribute="content" hit={item} />
						</p>
						{item.lastModified && (
							<span className="text-cl1-gray-4! dark:text-cl1-gray-7! mt-2 text-sm">
								{futureDate.toLocaleDateString("en-US", options)}
							</span>
						)}
					</a>
				);
			})}
			{items.length !== 0 && !isLastPage && (
				<div className="flex items-center justify-center">
					<button
						onClick={showMore}
						className="bg-cl1-brand-orange text-cl1-black h-12 cursor-pointer rounded-sm px-6 font-medium"
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
	limit = 1000,
}: {
	attribute: string;
	label: string;
	limit?: number;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const { items, refine } = useRefinementList({
		attribute,
		limit,
		sortBy: ["count:desc"],
	});

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

		const params = new URLSearchParams(window.location.search);

		if (refined.length === 0) {
			params.delete(attribute);
		} else {
			params.set(attribute, refined.join(","));
		}

		setSearchParams(params);
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
				className="border-cl1-gray-8 dark:border-cl1-gray-2 flex cursor-pointer items-center justify-center gap-2 rounded-sm border bg-transparent p-2"
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
						className="border-cl1-gray-8 bg-cl1-white dark:border-cl1-gray-1 dark:bg-cl1-gray-0 rounded-sm border p-4 shadow-md"
					>
						<div className="max-h-60 space-y-2 overflow-y-auto">
							{items
								.sort((a, b) => {
									if (a.isRefined && !b.isRefined) return -1;
									if (!a.isRefined && b.isRefined) return 1;
									return b.count - a.count;
								})
								.map((item) => (
									<label
										key={item.value}
										className="flex items-center gap-2 text-sm"
									>
										<input
											type="checkbox"
											className="bg-transparent"
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
			<Configure filters="type:content" facetingAfterDistinct={true} />
			<div className="space-y-4">
				<SearchBox />
				<div className="not-content flex gap-2">
					<FilterDropdown attribute="product" label="Products" />
					<FilterDropdown attribute="tags" label="Tags" />
					<FilterDropdown attribute="contentType" label="Page type" />
				</div>
				<InfiniteHits />
			</div>
		</InstantSearch>
	);
}
