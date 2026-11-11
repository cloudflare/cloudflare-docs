"use client";

// Figure 2 on the Tunnel concepts page: one tunnel identity above, two
// interchangeable connectors below, both inside the network boundary. Each
// request pours down to whichever connector serves this turn. Stopping
// connector B reroutes every request to connector A; the tunnel ID never
// changes.
import { useEffect, useRef, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import { LabelCard, makeRect } from "../diagram-weld";
import { WeldCanvas } from "../container/WeldCanvas";
import { LabeledButton, Toolbar } from "../container/Transport";
import type { DiagramFallbackProps } from "../container/DiagramFallback";
import { NetBoundary, Port, Pour, ortho } from "./TunnelKit";

// Layout, in SVG user units. Both connectors hang off one vertical spine.
const VIEW_W = 340;
const VIEW_H = 290;
const CX = 170; // shared centre spine
const JY = 108; // junction row: stem in from above, two branches out
const TUN = makeRect(115, 26, 110, 40); // tunnel nameplate
const FIELD = makeRect(38, 152, 264, 116); // "Your network" boundary
const CARDS = [makeRect(57, 200, 104, 36), makeRect(179, 200, 104, 36)];
const XS = [109, 231]; // branch x-coordinate for connector A / B

// Animation timing.
const ARRIVE_MS = 820; // a pour reaches the connector
const TURN_MS = 1450; // the next request begins
const POUR_DUR = 0.8;
const POUR_FADE = 1.25;

// Path a request follows from the tunnel port down to the given connector.
function wavePath(lane: 0 | 1): string {
	return ortho([
		[CX, TUN.b - 6],
		[CX, JY],
		[XS[lane]!, JY],
		[XS[lane]!, CARDS[lane]!.t],
	]);
}

export function TunnelIdentity(_props: DiagramFallbackProps) {
	return (
		<Diagram label="Two connectors inside your network serve one stable tunnel identity. Requests alternate between them; stopping connector B sends every request through connector A while the tunnel ID never changes. Operate it with the Stop connector B control.">
			<IdentityBody />
		</Diagram>
	);
}

function IdentityBody() {
	const ctx = useDiagramOrDefault("TunnelIdentity");
	const reduced = ctx.reducedMotion;
	const [bStopped, setBStopped] = useState(false);
	const [tick, setTick] = useState(0);
	const [arrived, setArrived] = useState(false);
	const [lane, setLane] = useState<0 | 1>(0);

	// Sample the stop control only at a turn boundary, never mid-pour, so an
	// in-flight request always finishes and only the following one reroutes.
	const bStoppedRef = useRef(bStopped);
	bStoppedRef.current = bStopped;

	useEffect(() => {
		if (reduced || !ctx.playing) {
			setArrived(true);
			setLane(0);
			return;
		}
		setLane(bStoppedRef.current ? 0 : ((tick % 2) as 0 | 1));
		setArrived(false);
		const arrive = setTimeout(() => setArrived(true), ARRIVE_MS);
		const advance = setTimeout(() => setTick((t) => t + 1), TURN_MS);
		return () => {
			clearTimeout(arrive);
			clearTimeout(advance);
		};
	}, [tick, reduced, ctx.playing]);

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={
				bStopped
					? "Connector B is stopped; every request is served by connector A. The tunnel identity is unchanged."
					: "Requests alternate between connector A and connector B under one tunnel identity."
			}
			controls={
				<Toolbar
					status={bStopped ? "Connector B stopped" : "Both connectors live"}
				>
					<LabeledButton
						ariaLabel={bStopped ? "Start connector B" : "Stop connector B"}
						onClick={() => setBStopped((v) => !v)}
						highlight={!bStopped}
					>
						{bStopped ? "Start connector B" : "Stop connector B"}
					</LabeledButton>
				</Toolbar>
			}
		>
			<NetBoundary rect={FIELD} label="Your network" labelAnchor="middle" />

			{/* Stem from the tunnel down to the junction. */}
			<path
				d={`M ${CX} ${TUN.b + 5} L ${CX} ${JY - 4}`}
				fill="none"
				strokeWidth={1.25}
				className="stroke-neutral-300 dark:stroke-neutral-700"
			/>

			{/* The two branches leaving the junction; B dims when stopped. */}
			{CARDS.map((c, i) => (
				<path
					key={i}
					d={ortho([
						[CX, JY],
						[XS[i]!, JY],
						[XS[i]!, c.t - 1],
					])}
					fill="none"
					strokeWidth={1.25}
					className="stroke-neutral-300 dark:stroke-neutral-700"
					opacity={bStopped && i === 1 ? 0.3 : 1}
					style={{ transition: "opacity 250ms" }}
				/>
			))}

			{/* The request: a pour down the live branch. Remounting on a new key
			    each turn restarts the CSS draw animation. */}
			{!reduced && ctx.playing && (
				<Pour
					key={`${tick}-${lane}`}
					d={wavePath(lane)}
					dur={POUR_DUR}
					fade={POUR_FADE}
				/>
			)}

			{/* Junction node. */}
			<rect
				x={CX - 4}
				y={JY - 4}
				width={8}
				height={8}
				rx={1.5}
				strokeWidth={1.25}
				fill="var(--nb-background, white)"
				className="stroke-neutral-300 dark:stroke-neutral-700"
			/>

			{/* The tunnel: a fixed identity and its port — the one thing that
			    never changes. */}
			<LabelCard rect={TUN} label="Tunnel #123" fontSize={11} active />
			<Port cx={CX} cy={TUN.b} taken />

			{/* The connectors. Whichever receives this turn lights up; connector
			    B ghosts and frees its port while stopped. */}
			{CARDS.map((c, i) => {
				const receiving = arrived && lane === i && !(bStopped && i === 1);
				return (
					<LabelCard
						key={i}
						rect={c}
						label={i === 0 ? "Connector A" : "Connector B"}
						fontSize={11}
						active={receiving && !reduced}
						ghost={bStopped && i === 1}
						notches={{ top: true }}
					/>
				);
			})}
			<Port cx={XS[0]!} cy={CARDS[0]!.t} taken />
			<Port cx={XS[1]!} cy={CARDS[1]!.t} taken={!bStopped} />
		</WeldCanvas>
	);
}

export default TunnelIdentity;
