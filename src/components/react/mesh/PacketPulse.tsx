import { useLayoutEffect, useRef } from "react";

// SMIL animations are timed against the SVG's document clock, so an
// <animate> inserted after the SVG has been on screen for a while would
// already be "finished" on mount. Start them explicitly instead.
export function PacketPulse({ path, ms }: { path: string; ms: number }) {
	const ref = useRef<SVGGElement>(null);
	const duration = `${Math.max(0.5, (ms / 1000) * 0.82)}s`;

	useLayoutEffect(() => {
		ref.current
			?.querySelectorAll<SVGAnimationElement>("animate, animateMotion")
			.forEach((animation) => animation.beginElement());
	}, [path, duration]);

	return (
		<g ref={ref}>
			<circle r={9} className="fill-brand" opacity={0}>
				<animateMotion
					begin="indefinite"
					dur={duration}
					path={path}
					calcMode="linear"
					fill="freeze"
				/>
				<animate
					begin="indefinite"
					attributeName="opacity"
					values="0;0.18;0.18;0"
					keyTimes="0;0.1;0.86;1"
					dur={duration}
					fill="freeze"
				/>
			</circle>
			<circle r={4} className="fill-brand" opacity={0}>
				<animateMotion
					begin="indefinite"
					dur={duration}
					path={path}
					calcMode="linear"
					fill="freeze"
				/>
				<animate
					begin="indefinite"
					attributeName="opacity"
					values="0;1;1;0"
					keyTimes="0;0.06;0.92;1"
					dur={duration}
					fill="freeze"
				/>
			</circle>
		</g>
	);
}
