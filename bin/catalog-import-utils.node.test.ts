import { describe, expect, it } from "vitest";
import {
	hasMoreCatalogModels,
	mapConcurrentOrdered,
} from "./catalog-import-utils";

describe("catalog import utilities", () => {
	it("stops pagination after all API rows are consumed", () => {
		expect(hasMoreCatalogModels(100, 101, 100)).toBe(true);
		expect(hasMoreCatalogModels(101, 101, 1)).toBe(false);
		expect(hasMoreCatalogModels(100, 101, 0)).toBe(false);
	});

	it("keeps workers busy and returns results in input order", async () => {
		let active = 0;
		let maxActive = 0;
		const completed: number[] = [];
		const results = await mapConcurrentOrdered(
			[30, 5, 10, 1],
			2,
			async (delay, index) => {
				active++;
				maxActive = Math.max(maxActive, active);
				await new Promise((resolve) => setTimeout(resolve, delay));
				active--;
				return index;
			},
			(count) => completed.push(count),
		);

		expect(results).toEqual([0, 1, 2, 3]);
		expect(maxActive).toBe(2);
		expect(completed).toEqual([1, 2, 3, 4]);
	});
});
