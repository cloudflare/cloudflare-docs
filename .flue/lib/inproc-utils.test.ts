import { describe, expect, it, vi } from "vitest";
import { withConcurrency } from "./inproc-utils";

describe("withConcurrency", () => {
	it("returns empty array for no tasks", async () => {
		expect(await withConcurrency([], 5)).toEqual([]);
	});

	it("runs a single task and returns its result", async () => {
		const result = await withConcurrency([async () => 42], 1);
		expect(result).toEqual([42]);
	});

	it("preserves input order regardless of completion order", async () => {
		// Task 0 resolves last, task 2 resolves first
		const delays = [30, 20, 10];
		const tasks = delays.map(
			(delay, i) => () =>
				new Promise<number>((resolve) => setTimeout(() => resolve(i), delay)),
		);
		const result = await withConcurrency(tasks, 3);
		expect(result).toEqual([0, 1, 2]);
	});

	it("runs all tasks with limit >= task count", async () => {
		const called: number[] = [];
		const tasks = Array.from({ length: 5 }, (_, i) => async () => {
			called.push(i);
			return i;
		});
		await withConcurrency(tasks, 10);
		expect(called).toHaveLength(5);
	});

	it("respects the concurrency limit", async () => {
		let active = 0;
		let maxActive = 0;
		const tasks = Array.from({ length: 10 }, () => async () => {
			active++;
			maxActive = Math.max(maxActive, active);
			await new Promise((r) => setTimeout(r, 5));
			active--;
		});
		await withConcurrency(tasks, 3);
		expect(maxActive).toBeLessThanOrEqual(3);
	});

	it("clamps non-positive limit to 1", async () => {
		let maxActive = 0;
		let active = 0;
		const tasks = Array.from({ length: 4 }, () => async () => {
			active++;
			maxActive = Math.max(maxActive, active);
			await new Promise((r) => setTimeout(r, 5));
			active--;
		});
		await withConcurrency(tasks, 0);
		expect(maxActive).toBe(1);
	});

	it("clamps NaN limit to 1", async () => {
		let maxActive = 0;
		let active = 0;
		const tasks = Array.from({ length: 4 }, () => async () => {
			active++;
			maxActive = Math.max(maxActive, active);
			await new Promise((r) => setTimeout(r, 5));
			active--;
		});
		await withConcurrency(tasks, NaN);
		expect(maxActive).toBe(1);
	});

	it("returns correct results for limit of 1 (serial execution)", async () => {
		const order: number[] = [];
		const tasks = [3, 1, 2].map((v) => async () => {
			order.push(v);
			return v;
		});
		const result = await withConcurrency(tasks, 1);
		expect(result).toEqual([3, 1, 2]);
		expect(order).toEqual([3, 1, 2]);
	});
});
