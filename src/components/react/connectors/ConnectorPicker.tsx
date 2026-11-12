"use client";

// Interactive decision guide on the "Choose a connector" page. The reader
// picks what they are connecting, answers a few yes/no refinements, and
// gets one recommended connector with an animated traffic path, the reasons
// it fits, what to watch for, and where to start. The decision logic mirrors
// the rules table on the page, so the text equivalent stays true.
import { Fragment, useMemo, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { DiagramStage } from "@/components/react/diagram";
import type { DiagramFallbackProps } from "../container/DiagramFallback";

type Need = "app" | "network" | "code" | "site";

type ResultId =
	| "tunnel"
	| "mesh"
	| "vpc-network"
	| "vpc-service"
	| "appliance"
	| "wan-tunnels"
	| "cni";

interface Question {
	id: string;
	text: string;
	hint?: string;
}

interface NeedDef {
	id: Need;
	title: string;
	blurb: string;
	glyph: keyof typeof GLYPHS;
	questions: Question[];
}

interface ResultDef {
	name: string;
	badge?: string;
	verdict: string;
	facts: { k: string; v: string }[];
	flow: string[];
	bidirectional: boolean;
	why: string[];
	watch: string;
	links: { label: string; href: string }[];
}

const NEEDS: NeedDef[] = [
	{
		id: "network",
		title: "A private network, server, or device",
		blurb: "Subnets, VMs, containers, or laptops. The default connector for Cloudflare One.",
		glyph: "network",
		questions: [
			{
				id: "agents",
				text: "AI agents need to reach it",
				hint: "Coding agents, cloud agents, or private MCP servers.",
			},
			{
				id: "wholeSite",
				text: "It is an entire office LAN, or needs 1 Gbps or more",
			},
			{
				id: "managedBox",
				text: "You want a managed box, not software on a host",
			},
		],
	},
	{
		id: "app",
		title: "An application",
		blurb: "A website, API, or service. Tunnel publishes it on a public hostname. Mesh keeps it private.",
		glyph: "app",
		questions: [
			{
				id: "private",
				text: "It should stay private, not on a public hostname",
				hint: "Users reach it from the Cloudflare One Client. This is the Cloudflare One default.",
			},
			{
				id: "udp",
				text: "It uses UDP",
				hint: "For example, DNS, VoIP or SIP, video, or game traffic.",
			},
			{
				id: "serverInitiated",
				text: "The server also needs to start connections to clients",
				hint: "For example, VoIP callbacks, or Active Directory and SCCM pushes.",
			},
			{
				id: "platform",
				text: "You run a platform that needs one tunnel per customer or device",
				hint: "For example, a SaaS, IoT, AI, or developer tools platform.",
			},
		],
	},
	{
		id: "code",
		title: "Code on Cloudflare",
		blurb: "A Worker or agent that calls private APIs, databases, or MCP servers.",
		glyph: "code",
		questions: [
			{
				id: "singleTarget",
				text: "The Worker only ever calls one fixed host and port",
				hint: "Otherwise, one network binding reaches any private address.",
			},
		],
	},
	{
		id: "site",
		title: "A whole site",
		blurb: "A branch office or data center with many users, phones, and devices.",
		glyph: "site",
		questions: [
			{
				id: "existingRouter",
				text: "You already run a router or firewall that speaks IPsec or GRE",
			},
			{
				id: "noInternet",
				text: "Traffic must not cross the public Internet",
			},
		],
	},
];

const RESULTS: Record<ResultId, ResultDef> = {
	tunnel: {
		name: "Cloudflare Tunnel",
		verdict: "Publish the HTTP application on the public Internet, with or without Access in front.",
		facts: [
			{ k: "Direction", v: "Client to application" },
			{ k: "Layer", v: "L7: HTTP and HTTPS on public hostnames" },
			{ k: "Runs as", v: "cloudflared on Linux, macOS, Windows, or Kubernetes" },
		],
		flow: ["People", "Cloudflare", "cloudflared", "Your app"],
		bidirectional: false,
		why: [
			"No public IP or inbound port. cloudflared connects out to Cloudflare.",
			"The full edge stack applies: DDoS protection, WAF, bot and API rules, and Access.",
			"Put Access in front to require sign-in, or leave the hostname open. One tunnel can publish many hostnames.",
		],
		watch:
			"Tunnel is built for HTTP. For UDP, private-only access, or server-initiated traffic, use Cloudflare Mesh.",
		links: [
			{ label: "Publish an application", href: "/tunnel/get-started/" },
			{
				label: "Protect it with Access",
				href: "/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/",
			},
		],
	},
	mesh: {
		name: "Cloudflare Mesh",
		badge: "Beta",
		verdict: "The default connector for Cloudflare One and private networks.",
		facts: [
			{ k: "Direction", v: "Bidirectional: any side can start" },
			{ k: "Layer", v: "L3: TCP, UDP, and ICMP" },
			{ k: "Runs as", v: "Mesh node on Linux or in a container, plus the Cloudflare One Client" },
		],
		flow: ["Device", "Cloudflare", "Mesh node", "Private subnet"],
		bidirectional: true,
		why: [
			"Any protocol: TCP, UDP, and ICMP are forwarded packet by packet, so DNS, VoIP, and video work.",
			"Any participant can start the conversation, and the source IP is preserved.",
			"CIDR and hostname routes reach private apps, subnets, and services behind a node.",
			"Replicas fail over automatically, and source NAT means no return routes to add.",
		],
		watch:
			"Keep 100.96.0.0/12 inside the tunnel. A split tunnel rule that excludes it breaks Mesh.",
		links: [
			{ label: "Set up Cloudflare Mesh", href: "/mesh/get-started/" },
			{ label: "How Mesh works", href: "/mesh/concepts/" },
		],
	},
	"vpc-network": {
		name: "Workers VPC: VPC Network",
		badge: "Beta",
		verdict: "Bind your Worker to your whole private network with one binding.",
		facts: [
			{ k: "Direction", v: "Worker to private services" },
			{ k: "Layer", v: "HTTP with fetch(), raw TCP with connect()" },
			{ k: "Runs as", v: 'A vpc_networks binding with network_id "cf1:network"' },
		],
		flow: ["Worker", "Cloudflare", "Tunnel · Mesh · WAN", "Private service"],
		bidirectional: false,
		why: [
			"The address you pass at runtime picks the destination.",
			"Reaches services behind Tunnel, Mesh nodes and their routes, and Cloudflare WAN on-ramps.",
			"Public egress goes through Gateway, so your policies and logs apply to your code.",
		],
		watch:
			"Set remote: true, because local development cannot reach a private network. cf1:network reaches everything Mesh and WAN reach, so keep routes narrow.",
		links: [
			{ label: "Configure VPC Networks", href: "/workers-vpc/configuration/vpc-networks/" },
			{ label: "Connect Workers to Mesh", href: "/workers-vpc/examples/connect-to-cloudflare-mesh/" },
		],
	},
	"vpc-service": {
		name: "Workers VPC: VPC Service",
		badge: "Beta",
		verdict: "Bind your Worker to one private host and port.",
		facts: [
			{ k: "Direction", v: "Worker to one private service" },
			{ k: "Layer", v: "HTTP, or TCP databases through Hyperdrive" },
			{ k: "Runs as", v: "A vpc_services binding, reached through Cloudflare Tunnel" },
		],
		flow: ["Worker", "Cloudflare", "cloudflared", "Private API"],
		bidirectional: false,
		why: [
			"The narrowest scope: the binding can only reach the target you registered.",
			"Works with the cloudflared connector you may already run.",
			"Pairs with Hyperdrive for pooled PostgreSQL and MySQL connections.",
		],
		watch:
			"Each new target needs its own VPC Service. To reach many hosts, use a VPC Network binding.",
		links: [
			{ label: "Set up Workers VPC", href: "/workers-vpc/get-started/" },
			{ label: "Configure VPC Services", href: "/workers-vpc/configuration/vpc-services/" },
		],
	},
	appliance: {
		name: "Cloudflare One Appliance",
		verdict: "Ship a managed box or VM that brings the whole site onto Cloudflare.",
		facts: [
			{ k: "Direction", v: "Bidirectional" },
			{ k: "Layer", v: "L3: any IP traffic over resilient IPsec" },
			{ k: "Runs as", v: "Hardware appliance or virtual machine" },
		],
		flow: ["Site LAN", "Appliance", "Cloudflare", "Your network"],
		bidirectional: true,
		why: [
			"Zero touch: ship it, plug it in, and connectivity and configuration come down automatically.",
			"Traffic steering and shaping for busy sites at 1 Gbps or more.",
			"Health, policy, and updates for every site in one dashboard.",
		],
		watch:
			"Requires a Cloudflare WAN subscription, and a dedicated device or VM that runs nothing else.",
		links: [
			{
				label: "Cloudflare One Appliance",
				href: "/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/",
			},
			{ label: "Cloudflare WAN overview", href: "/cloudflare-one/networks/connectors/cloudflare-wan/" },
		],
	},
	"wan-tunnels": {
		name: "Cloudflare WAN: IPsec or GRE",
		verdict: "Point the router or firewall you already run at Cloudflare.",
		facts: [
			{ k: "Direction", v: "Bidirectional" },
			{ k: "Layer", v: "L3: any IP traffic" },
			{ k: "Runs as", v: "Your existing router or firewall" },
		],
		flow: ["Site LAN", "Your router", "Cloudflare", "Your network"],
		bidirectional: true,
		why: [
			"Familiar routing, with static routes or BGP.",
			"Guides for Cisco, Palo Alto Networks, Fortinet, and many other vendors.",
			"Network Firewall policies apply to every site, in one place.",
		],
		watch:
			"GRE is not encrypted, so use IPsec over the public Internet. Plan for MTU and clamp MSS on your edge devices.",
		links: [
			{
				label: "Configure a third-party device",
				href: "/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/",
			},
			{ label: "Cloudflare WAN overview", href: "/cloudflare-one/networks/connectors/cloudflare-wan/" },
		],
	},
	cni: {
		name: "Cloudflare Network Interconnect",
		verdict: "Connect to Cloudflare over a private, dedicated link.",
		facts: [
			{ k: "Direction", v: "Bidirectional" },
			{ k: "Layer", v: "L3: any IP traffic" },
			{ k: "Runs as", v: "A physical, partner, or cloud cross-connect" },
		],
		flow: ["Data center", "Interconnect", "Cloudflare", "Your network"],
		bidirectional: true,
		why: [
			"Traffic never crosses the public Internet.",
			"Predictable latency and consistent throughput.",
			"Use IPsec tunnels over the Internet as a backup path.",
		],
		watch:
			"Requires an Enterprise plan, and is available only where Cloudflare has interconnect facilities.",
		links: [
			{ label: "Network Interconnect", href: "/network-interconnect/" },
			{
				label: "CNI with Cloudflare WAN",
				href: "/cloudflare-one/networks/connectors/cloudflare-wan/network-interconnect/",
			},
		],
	},
};

type Answers = Record<string, boolean>;

function resolve(need: Need, a: Answers): { id: ResultId; notes: string[] } {
	if (need === "app") {
		const why: string[] = [];
		if (a.private) why.push("Mesh is the default connector for private access in Cloudflare One. Give the app a hostname route, and users reach it from the Cloudflare One Client.");
		if (a.udp) why.push("Tunnel proxies UDP flow by flow, which does not suit heavy or long-lived UDP. Mesh forwards every packet.");
		if (a.serverInitiated) why.push("Tunnel only carries connections that clients start. With Mesh, either side can start.");
		if (why.length) return { id: "mesh", notes: why };
		return {
			id: "tunnel",
			notes: a.platform
				? [
						"Every account includes 1,000 tunnels. Tunnels for Platforms adds more, so tunnel count can grow with customer count.",
					]
				: ["Keeping it private instead? Use Cloudflare Mesh, the default connector for Cloudflare One."],
		};
	}
	if (need === "network") {
		if (a.wholeSite || a.managedBox) {
			return {
				id: "appliance",
				notes: [
					"Already run a router or firewall that speaks IPsec or GRE? Point it at Cloudflare WAN instead.",
				],
			};
		}
		return {
			id: "mesh",
			notes: a.agents
				? [
						"Put a Mesh node beside the private resource, then let the agent dial its Mesh IP or hostname. Node traffic is logged with a service identity, separate from your people.",
					]
				: [],
		};
	}
	if (need === "code") {
		return { id: a.singleTarget ? "vpc-service" : "vpc-network", notes: [] };
	}
	if (a.noInternet) return { id: "cni", notes: [] };
	return { id: a.existingRouter ? "wan-tunnels" : "appliance", notes: [] };
}

const FLOW_CSS = `
.cp-flow { display: flex; align-items: center; gap: 0; }
.cp-node {
  flex: 0 1 auto; min-width: 0; padding: 6px 8px; border-radius: 6px;
  font-size: 11px; line-height: 1.25; font-weight: 500; text-align: center;
  border: 1px solid var(--nb-border); background: var(--nb-background);
}
.cp-node-cf { border-color: color-mix(in oklch, var(--color-brand) 55%, var(--nb-border)); color: var(--color-brand); }
.cp-link { position: relative; flex: 1 1 18px; min-width: 14px; height: 2px; background: var(--nb-border); }
.cp-dot {
  position: absolute; top: 50%; left: 0; width: 7px; height: 7px; margin-top: -3.5px;
  border-radius: 9999px; background: var(--color-brand); opacity: 0;
  box-shadow: 0 0 0 4px color-mix(in oklch, var(--color-brand) 18%, transparent);
  animation: cp-travel 2.6s linear infinite; animation-delay: var(--cp-delay, 0s);
}
.cp-dot-back { animation-name: cp-travel-back; animation-delay: calc(var(--cp-delay, 0s) + 1.3s); }
@keyframes cp-travel { 0% { left: 0; opacity: 0; } 8% { opacity: 1; } 42% { left: calc(100% - 7px); opacity: 1; } 50%, 100% { left: calc(100% - 7px); opacity: 0; } }
@keyframes cp-travel-back { 0% { left: calc(100% - 7px); opacity: 0; } 8% { opacity: 1; } 42% { left: 0; opacity: 1; } 50%, 100% { left: 0; opacity: 0; } }
@keyframes cp-enter { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.cp-enter { animation: cp-enter 260ms cubic-bezier(0.23, 1, 0.32, 1); }
@media (prefers-reduced-motion: reduce) {
  .cp-dot { display: none; }
  .cp-enter { animation: none; }
}
`;

export default function ConnectorPicker(_props: DiagramFallbackProps) {
	const [need, setNeed] = useState<Need | null>(null);
	const [answers, setAnswers] = useState<Answers>({});

	const needDef = NEEDS.find((n) => n.id === need) ?? null;
	const outcome = useMemo(
		() => (need ? resolve(need, answers) : null),
		[need, answers],
	);
	const result = outcome ? RESULTS[outcome.id] : null;

	const pick = (id: Need) => {
		setNeed(id);
		setAnswers({});
	};
	const toggle = (id: string) =>
		setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));

	return (
		<DiagramStage accent="var(--color-brand)" className="not-content mt-4">
			<style>{FLOW_CSS}</style>
			<div className="flex flex-col gap-5 p-4 sm:p-6">
				<StepLabel n={1}>What are you connecting?</StepLabel>
				<div
					role="group"
					aria-label="What are you connecting?"
					className="grid grid-cols-1 gap-2 sm:grid-cols-2"
				>
					{NEEDS.map((n) => {
						const active = need === n.id;
						return (
							<button
								key={n.id}
								type="button"
								aria-pressed={active}
								onClick={() => pick(n.id)}
								className={cn(
									"group flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-left",
									"transition-[border-color,background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.99]",
									"focus-visible:ring-brand focus:outline-none focus-visible:ring-2",
									active
										? "border-brand ring-brand bg-white shadow-sm ring-1 dark:bg-neutral-900"
										: "border-neutral-200 bg-white/80 hover:border-neutral-300 hover:bg-white dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-neutral-700 dark:hover:bg-neutral-900",
								)}
							>
								<span
									aria-hidden="true"
									className={cn(
										"flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors duration-150",
										active
											? "text-brand bg-brand/10"
											: "bg-neutral-100 text-neutral-500 group-hover:text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200",
									)}
								>
									{GLYPHS[n.glyph]}
								</span>
								<span className="flex min-w-0 flex-col gap-0.5">
									<span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
										{n.title}
									</span>
									<span className="text-xs leading-snug text-neutral-500 dark:text-neutral-400">
										{n.blurb}
									</span>
								</span>
							</button>
						);
					})}
				</div>

				{needDef && (
					<div key={`q-${needDef.id}`} className="cp-enter flex flex-col gap-2">
						<StepLabel n={2}>Does any of this apply?</StepLabel>
						<div className="flex flex-col gap-1.5">
							{needDef.questions.map((q) => {
								const on = Boolean(answers[q.id]);
								return (
									<button
										key={q.id}
										type="button"
										role="switch"
										aria-checked={on}
										onClick={() => toggle(q.id)}
										className={cn(
											"flex cursor-pointer items-start gap-3 rounded-md border px-3 py-2 text-left",
											"transition-[border-color,background-color] duration-150 ease-out",
											"focus-visible:ring-brand focus:outline-none focus-visible:ring-2",
											on
												? "border-brand/60 bg-brand/[0.06]"
												: "border-neutral-200 bg-white/70 hover:bg-white dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:bg-neutral-900",
										)}
									>
										<span
											aria-hidden="true"
											className={cn(
												"relative mt-0.5 inline-flex h-4 w-7 shrink-0 rounded-full transition-colors duration-150",
												on ? "bg-brand" : "bg-neutral-300 dark:bg-neutral-700",
											)}
										>
											<span
												className={cn(
													"absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-150",
													on ? "translate-x-3.5" : "translate-x-0.5",
												)}
											/>
										</span>
										<span className="flex min-w-0 flex-col">
											<span className="text-[13px] leading-snug text-neutral-800 dark:text-neutral-200">
												{q.text}
											</span>
											{q.hint && (
												<span className="text-xs leading-snug text-neutral-500 dark:text-neutral-400">
													{q.hint}
												</span>
											)}
										</span>
									</button>
								);
							})}
						</div>
					</div>
				)}

				{result && outcome && (
					<div
						key={`r-${outcome.id}`}
						className="cp-enter flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
					>
						<div className="flex flex-wrap items-center gap-2">
							<span className="font-mono text-[10px] font-medium tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
								Use
							</span>
							<span className="text-brand text-lg leading-tight font-semibold">
								{result.name}
							</span>
							{result.badge && (
								<span className="rounded-sm border border-neutral-200 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-neutral-500 uppercase dark:border-neutral-700 dark:text-neutral-400">
									{result.badge}
								</span>
							)}
						</div>
						<p className="m-0 text-sm text-neutral-700 dark:text-neutral-300">
							{result.verdict}
						</p>

						<Flow nodes={result.flow} bidirectional={result.bidirectional} />
						<p className="m-0 -mt-1 text-center font-mono text-[10px] tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
							{result.bidirectional
								? "Either side can start the connection"
								: "Connections start on the left"}
						</p>

						<dl className="m-0 grid grid-cols-1 gap-2 sm:grid-cols-3">
							{result.facts.map((f) => (
								<div
									key={f.k}
									className="rounded-md border border-neutral-200 px-2.5 py-2 dark:border-neutral-800"
								>
									<dt className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
										{f.k}
									</dt>
									<dd className="m-0 text-xs leading-snug text-neutral-800 dark:text-neutral-200">
										{f.v}
									</dd>
								</div>
							))}
						</dl>

						<ul className="m-0 flex list-none flex-col gap-1.5 p-0">
							{[...outcome.notes, ...result.why].map((w, i) => (
								<li
									key={w}
									className="flex gap-2 text-[13px] leading-snug text-neutral-700 dark:text-neutral-300"
								>
									<span
										aria-hidden="true"
										className={cn(
											"mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full",
											i < outcome.notes.length ? "bg-brand" : "bg-neutral-400 dark:bg-neutral-500",
										)}
									/>
									<span className={i < outcome.notes.length ? "font-medium" : undefined}>
										{w}
									</span>
								</li>
							))}
						</ul>

						<div className="rounded-md border border-amber-300/60 bg-amber-50/70 px-3 py-2 text-xs leading-snug text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
							<span className="font-semibold">Watch for: </span>
							{result.watch}
						</div>

						<div className="flex flex-wrap gap-2">
							{result.links.map((l, i) => (
								<a
									key={l.href}
									href={l.href}
									className={cn(
										"inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium no-underline transition-colors duration-150",
										i === 0
											? "bg-brand text-white hover:opacity-90"
											: "border border-neutral-200 text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800",
									)}
								>
									{l.label}
									<span aria-hidden="true">→</span>
								</a>
							))}
						</div>
					</div>
				)}

				{!need && (
					<p className="m-0 text-center text-xs text-neutral-500 dark:text-neutral-400">
						Pick one to see the recommended connector.
					</p>
				)}
				{need && (
					<p className="m-0 text-center text-xs text-neutral-500 dark:text-neutral-400">
						Most deployments use two or three connectors together.{" "}
						<a href="#combine-connectors" className="text-brand">
							See common combinations
						</a>
						.
					</p>
				)}
			</div>
			<div className="sr-only" role="status" aria-live="polite">
				{result ? `Recommended connector: ${result.name}. ${result.verdict}` : ""}
			</div>
		</DiagramStage>
	);
}

function StepLabel({ n, children }: { n: number; children: string }) {
	return (
		<div className="flex items-center gap-2">
			<span className="bg-brand flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] font-semibold text-white">
				{n}
			</span>
			<span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
				{children}
			</span>
		</div>
	);
}

function Flow({
	nodes,
	bidirectional,
}: {
	nodes: string[];
	bidirectional: boolean;
}) {
	return (
		<div className="cp-flow" aria-hidden="true">
			{nodes.map((n, i) => (
				<Fragment key={`${n}-${i}`}>
					{i > 0 && (
						<span
							className="cp-link"
							style={{ "--cp-delay": `${(i - 1) * 0.36}s` } as CSSProperties}
						>
							<span className="cp-dot" />
							{bidirectional && <span className="cp-dot cp-dot-back" />}
						</span>
					)}
					<span className={cn("cp-node", n === "Cloudflare" && "cp-node-cf")}>
						{n}
					</span>
				</Fragment>
			))}
		</div>
	);
}

const ICON = {
	width: 18,
	height: 18,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.7,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
};

const GLYPHS = {
	app: (
		<svg {...ICON}>
			<rect x="3" y="4" width="18" height="16" rx="2.5" />
			<path d="M3 9h18" />
			<circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" />
			<circle cx="9" cy="6.5" r="0.6" fill="currentColor" />
		</svg>
	),
	network: (
		<svg {...ICON}>
			<circle cx="12" cy="5" r="2.2" />
			<circle cx="5" cy="18" r="2.2" />
			<circle cx="19" cy="18" r="2.2" />
			<path d="M10.9 6.9 6.1 16M13.1 6.9l4.8 9.1M7.2 18h9.6" />
		</svg>
	),
	code: (
		<svg {...ICON}>
			<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
		</svg>
	),
	site: (
		<svg {...ICON}>
			<path d="M4 20V7l8-3 8 3v13" />
			<path d="M2.5 20h19M9 20v-4h6v4M8 10h2M14 10h2M8 13h2M14 13h2" />
		</svg>
	),
};
