export function PacketPulse({ path, ms }: { path: string; ms: number }) {
	const duration = `${Math.max(0.5, (ms / 1000) * 0.82)}s`;

	return (
		<g>
			<circle r={9} className="fill-brand" opacity={0}>
				<animateMotion
					dur={duration}
					path={path}
					calcMode="linear"
					fill="freeze"
				/>
				<animate
					attributeName="opacity"
					values="0;0.18;0.18;0"
					keyTimes="0;0.1;0.86;1"
					dur={duration}
					fill="freeze"
				/>
			</circle>
			<circle r={4} className="fill-brand" opacity={0}>
				<animateMotion
					dur={duration}
					path={path}
					calcMode="linear"
					fill="freeze"
				/>
				<animate
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
