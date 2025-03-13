import { liteClient as algoliasearch } from "algoliasearch/lite";
import { useEffect } from "react";
import {
	InstantSearch,
	Highlight,
	Configure,
	useSearchBox,
	type UseSearchBoxProps,
	useInfiniteHits,
	type UseInfiniteHitsProps,
} from "react-instantsearch";

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
			<Configure facetFilters={["type:content"]} />
			<SearchBox />
			<InfiniteHits />
		</InstantSearch>
	);
}
