/**
 * Monotonic id generator for decorative SVG `<pattern>`/`<mask>` defs.
 *
 * Assigns ids in render order (`nb-dots-0`, `nb-dots-1`, …) so output is
 * deterministic per build — unlike `Math.random()` — while still guaranteeing
 * uniqueness when multiple instances render on one page. Module state is a
 * singleton within a build/worker isolate; renders are synchronous, so ids
 * within a single document never collide.
 */
let counter = 0;

export function nextDecorId(prefix: string): string {
	return `${prefix}-${(counter++).toString(36)}`;
}
