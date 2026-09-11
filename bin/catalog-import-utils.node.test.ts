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

	it("stops dispatching and drains active work after a failure", async () => {
		const started: number[] = [];
		const finished: number[] = [];
		let releaseActive!: () => void;
		const active = new Promise<void>((resolve) => {
			releaseActive = resolve;
		});
		const operation = mapConcurrentOrdered([0, 1, 2], 2, async (_, index) => {
			started.push(index);
			if (index === 0) throw new Error("failed");
			await active;
			finished.push(index);
			return index;
		});
		let settled = false;
		void operation.then(
			() => (settled = true),
			() => (settled = true),
		);

		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(started).toEqual([0, 1]);
		expect(settled).toBe(false);
		releaseActive();
		await expect(operation).rejects.toThrow("failed");
		expect(started).toEqual([0, 1]);
		expect(finished).toEqual([1]);
	});
});
