export const EASE_OUT_POINTS = [0.23, 1, 0.32, 1] as const;

export const EASE_OUT = `cubic-bezier(${EASE_OUT_POINTS[0]}, ${EASE_OUT_POINTS[1]}, ${EASE_OUT_POINTS[2]}, ${EASE_OUT_POINTS[3]})`;

export const MOTION = {
	transition: 200,
} as const;
