import type { SearchResult } from "@cloudflare/ai-search-snippet";
import { useEffect, useState } from "react";
import { AI_SEARCH_ENDPOINT } from "~/util/ai-search";
import { setSearchParams } from "~/util/url";

function getInitialParams() {
	const params = new URLSearchParams(window.location.search);
	return {
		query: params.get("q") ?? params.get("query") ?? "",
		tags: params.get("tags") ?? "",
		contentType: params.get("contentType") ?? "",
	};
}

function buildSearchQuery(query: string, tags: string, contentType: string) {
	const filters = [tags, contentType].filter(Boolean).join(" ");

	return [query, filters].filter(Boolean).join(" ").trim();
}

function getResultDescription(result: SearchResult) {
	return result.description || "";
}

function SearchResultCard({ result }: { result: SearchResult }) {
	return (
		<a
			href={result.url || "#"}
			className="border-cl1-gray-8 hover:bg-cl1-gray-9 dark:border-cl1-gray-2 dark:bg-cl1-gray-0 dark:hover:bg-cl1-gray-1 flex flex-col rounded-sm border p-6 text-black! no-underline"
		>
			<strong>{result.title || "Untitled"}</strong>
			{getResultDescription(result) && (
				<p className="line-clamp-2">{getResultDescription(result)}</p>
			)}
			{result.url && (
				<span className="text-cl1-gray-4! dark:text-cl1-gray-7! mt-2 overflow-hidden text-sm text-ellipsis whitespace-nowrap">
					{result.url}
				</span>
			)}
		</a>
	);
}

export default function InstantSearchComponent() {
	const [query, setQuery] = useState("");
	const [tags, setTags] = useState("");
	const [contentType, setContentType] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const initial = getInitialParams();
		setQuery(initial.query);
		setTags(initial.tags);
		setContentType(initial.contentType);
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		const searchQuery = buildSearchQuery(query, tags, contentType);
		const params = new URLSearchParams(window.location.search);

		if (query) {
			params.set("q", query);
		} else {
			params.delete("q");
		}

		setSearchParams(params);

		if (!searchQuery) {
			setResults([]);
			setError("");
			return;
		}

		setIsLoading(true);
		setError("");

		void import("@cloudflare/ai-search-snippet")
			.then(({ AISearchClient }) => {
				const client = new AISearchClient(AI_SEARCH_ENDPOINT);

				return client.search(searchQuery, {
					maxResults: 25,
					signal: controller.signal,
				});
			})
			.then((nextResults) => {
				setResults(nextResults);
			})
			.catch((searchError: unknown) => {
				if ((searchError as Error).name === "AbortError") {
					return;
				}

				setError((searchError as Error).message || "Search failed.");
			})
			.finally(() => {
				if (!controller.signal.aborted) {
					setIsLoading(false);
				}
			});

		return () => {
			controller.abort();
		};
	}, [query, tags, contentType]);

	return (
		<div className="space-y-4">
			<div className="border-cl1-gray-8 dark:border-cl1-gray-2 flex items-center rounded-sm border p-2">
				<input
					type="search"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					className="w-full border-none bg-transparent p-0 text-sm outline-hidden"
					placeholder="Search..."
				/>
			</div>

			{(tags || contentType) && (
				<div className="not-content border-cl1-gray-8 dark:border-cl1-gray-2 rounded-sm border p-4 text-sm">
					<p className="m-0 font-medium">Applied search context</p>
					<p className="m-0 mt-2 text-[var(--sl-color-gray-3)]">
						AI Search does not expose the previous Algolia facets on this page,
						so these values are added to the search query.
					</p>
					<div className="mt-3 flex flex-wrap gap-2">
						{tags && (
							<span className="rounded-sm border px-2 py-1">Tags: {tags}</span>
						)}
						{contentType && (
							<span className="rounded-sm border px-2 py-1">
								Page type: {contentType}
							</span>
						)}
					</div>
				</div>
			)}

			{isLoading && <p>Searching...</p>}
			{error && <p className="text-red-600">{error}</p>}
			{!isLoading &&
				!error &&
				buildSearchQuery(query, tags, contentType) &&
				results.length === 0 && <p>No results found.</p>}
			<div className="space-y-4">
				{results.map((result, index) => (
					<SearchResultCard
						key={result.id || result.url || index}
						result={result}
					/>
				))}
			</div>
		</div>
	);
}
