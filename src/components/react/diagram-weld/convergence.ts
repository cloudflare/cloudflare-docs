// N evenly-spaced docking fractions along an edge, inset by `margin` from
// each corner. Use the same result for the fan-in routes' destination fracs
// and the destination card's notches so notch and arrow tip coincide.
//
//   convergenceDocks(1)                   → [0.5]
//   convergenceDocks(3)                   → [0.2, 0.5, 0.8]
//   convergenceDocks(3, { margin: 0.25 }) → [0.25, 0.5, 0.75]
export function convergenceDocks(
	n: number,
	opts: { margin?: number } = {},
): number[] {
	const { margin = 0.2 } = opts;
	if (n <= 0) return [];
	if (n === 1) return [0.5];
	const span = 1 - 2 * margin;
	return Array.from({ length: n }, (_, i) => margin + (span * i) / (n - 1));
}
