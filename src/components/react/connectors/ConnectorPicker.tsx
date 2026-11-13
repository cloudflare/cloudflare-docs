"use client";

// Interactive decision guide on the Connector selection page. The reader
// picks what they connect, answers a few yes or no refinements, and gets one
// recommended connector with an animated traffic path, the reasons it fits,
// what to watch for, and where to start. The logic mirrors the rules table on
// the page, so the text equivalent stays true.
import { Fragment, useState, type CSSProperties } from "react";
import { DiagramStage } from "@/components/react/diagram";
import type { DiagramFallbackProps } from "../container/DiagramFallback";

type Need = "network" | "app" | "code" | "site";

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

interface Fact {
	k: string;
	v: string;
}

interface ResultLink {
	label: string;
	href: string;
}

interface ResultDef {
	name: string;
	badge?: string;
	verdict: string;
	facts: Fact[];
	flow: string[];
	bidirectional: boolean;
	why: string[];
	watch: string;
	links: ResultLink[];
}

interface Outcome {
	id: ResultId;
	notes: string[];
}

type Answers = Record<string, boolean>;

const NEEDS: NeedDef[] = [
	{
		id: "network",
		title: "A private network, server, or device",
		blurb:
			"Subnets, VMs, containers, or laptops. The default for Cloudflare One.",
		glyph: "network",
		questions: [
			{
				id: "agents",
				text: "AI agents need to reach it",
				hint: "Coding agents, cloud agents, or private MCP servers.",
			},
			{
				id: "wholeSite",
				text: "It is an entire office network, or needs 1 Gbps or more",
			},
			{
				id: "managedBox",
				text: "You want a managed appliance, not software on a host",
			},
		],
	},
	{
		id: "app",
		title: "An application",
		blurb:
			"A website, API, or service. Tunnel publishes it, and Mesh keeps it private.",
		glyph: "app",
		questions: [
			{
				id: "private",
				text: "It should stay private, not on a public hostname",
				hint: "Users reach it from the Cloudflare One Client.",
			},
			{
				id: "udp",
				text: "It uses UDP",
				hint: "For example, DNS, VoIP, video, or game traffic.",
			},
			{
				id: "serverInitiated",
				text: "The server also needs to start connections to clients",
				hint: "For example, VoIP callbacks or Active Directory traffic.",
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
		blurb:
			"A Worker or agent that calls private APIs, databases, or MCP servers.",
		glyph: "code",
		questions: [
			{
				id: "singleTarget",
				text: "The Worker only calls one fixed host and port",
				hint: "Otherwise, one network binding reaches any private address.",
			},
		],
	},
	{
		id: "site",
		title: "A whole site",
		blurb:
			"A branch office or data center with many users, phones, and devices.",
		glyph: "site",
		questions: [
			{
				id: "existingRouter",
				text: "Your router or firewall already supports IPsec or GRE",
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
		verdict:
			"Publish the HTTP application on the public Internet, with or without Access in front.",
		facts: [
			{ k: "Direction", v: "Client to application" },
			{ k: "Layer", v: "L7: HTTP and HTTPS on public hostnames" },
			{
				k: "Runs as",
				v: "cloudflared on Linux, macOS, Windows, or Kubernetes",
			},
			{ k: "Throughput", v: "About 750 Mbps for each replica" },
		],
		flow: ["People", "Cloudflare", "cloudflared", "Your app"],
		bidirectional: false,
		why: [
			"No public IP or inbound port, because cloudflared connects out to Cloudflare.",
			"DDoS protection, the WAF, and bot and API protections apply to every request.",
			"Put Access in front to require sign-in, or leave the hostname open to the public.",
		],
		watch:
			"Tunnel is built for HTTP. For UDP, private access, or server-initiated traffic, use Cloudflare Mesh.",
		links: [
			{
				label: "Publish an application",
				href: "/tunnel/get-started/",
			},
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
			{ k: "Direction", v: "Both directions" },
			{ k: "Layer", v: "L3: TCP, UDP, and ICMP" },
			{ k: "Runs as", v: "A Mesh node on Linux or in a container" },
			{ k: "Throughput", v: "350 to 750 Mbps for each node" },
		],
		flow: ["Device", "Cloudflare", "Mesh node", "Private subnet"],
		bidirectional: true,
		why: [
			"Mesh forwards every packet, so DNS, VoIP, video, and other UDP traffic work.",
			"Any participant can start a connection, and Mesh preserves the source IP.",
			"CIDR and hostname routes reach private apps, subnets, and services behind a node.",
		],
		watch:
			"Keep 100.96.0.0/12 inside the tunnel. A split tunnel rule that excludes it breaks Mesh.",
		links: [
			{
				label: "Set up Cloudflare Mesh",
				href: "/mesh/get-started/",
			},
			{
				label: "How Mesh works",
				href: "/mesh/concepts/",
			},
		],
	},
	"vpc-network": {
		name: "Workers VPC: VPC Network",
		badge: "Beta",
		verdict: "Bind your Worker to your whole private network with one binding.",
		facts: [
			{ k: "Direction", v: "Worker to private services" },
			{ k: "Layer", v: "HTTP with fetch(), raw TCP with connect()" },
			{ k: "Runs as", v: "A VPC Network binding to cf1:network" },
		],
		flow: ["Worker", "Cloudflare", "Mesh · Tunnel · WAN", "Private service"],
		bidirectional: false,
		why: [
			"The address you pass at runtime selects the destination.",
			"Reaches services behind Mesh, Tunnel, and Cloudflare WAN.",
			"Public egress goes through Gateway, so your policies and logs apply to your code.",
		],
		watch:
			"Set remote: true, because local development cannot reach a private network.",
		links: [
			{
				label: "Configure VPC Networks",
				href: "/workers-vpc/configuration/vpc-networks/",
			},
			{
				label: "Connect Workers to Mesh",
				href: "/workers-vpc/examples/connect-to-cloudflare-mesh/",
			},
		],
	},
	"vpc-service": {
		name: "Workers VPC: VPC Service",
		badge: "Beta",
		verdict: "Bind your Worker to one private host and port.",
		facts: [
			{ k: "Direction", v: "Worker to one private service" },
			{ k: "Layer", v: "HTTP, or TCP databases through Hyperdrive" },
			{ k: "Runs as", v: "A VPC Service binding through Cloudflare Tunnel" },
		],
		flow: ["Worker", "Cloudflare", "cloudflared", "Private API"],
		bidirectional: false,
		why: [
			"The binding can only reach the target you registered.",
			"Works with the cloudflared connector you may already run.",
			"Pairs with Hyperdrive for pooled PostgreSQL and MySQL connections.",
		],
		watch:
			"Each new target needs its own VPC Service. To reach many hosts, use a VPC Network binding.",
		links: [
			{
				label: "Set up Workers VPC",
				href: "/workers-vpc/get-started/",
			},
			{
				label: "Configure VPC Services",
				href: "/workers-vpc/configuration/vpc-services/",
			},
		],
	},
	appliance: {
		name: "Cloudflare One Appliance",
		verdict:
			"Install a managed appliance that brings the whole site onto Cloudflare.",
		facts: [
			{ k: "Direction", v: "Both directions" },
			{ k: "Layer", v: "L3: any IP traffic over IPsec" },
			{ k: "Runs as", v: "A hardware appliance or a virtual machine" },
			{ k: "Throughput", v: "1 to 2 Gbps or more over IPsec" },
		],
		flow: ["Site LAN", "Appliance", "Cloudflare", "Your network"],
		bidirectional: true,
		why: [
			"Zero-touch setup: connect it, and its configuration downloads automatically.",
			"Traffic steering and shaping handle busy sites.",
			"Health, policy, and updates for every site appear in one dashboard.",
		],
		watch:
			"Requires Cloudflare WAN, and a dedicated device or virtual machine.",
		links: [
			{
				label: "Cloudflare One Appliance",
				href: "/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/",
			},
			{
				label: "Cloudflare WAN overview",
				href: "/cloudflare-one/networks/connectors/cloudflare-wan/",
			},
		],
	},
	"wan-tunnels": {
		name: "Cloudflare WAN: IPsec or GRE",
		verdict: "Connect the router or firewall you already run to Cloudflare.",
		facts: [
			{ k: "Direction", v: "Both directions" },
			{ k: "Layer", v: "L3: any IP traffic" },
			{ k: "Runs as", v: "Your existing router or firewall" },
			{ k: "Throughput", v: "1 to 2 Gbps or more for each IPsec tunnel" },
		],
		flow: ["Site LAN", "Your router", "Cloudflare", "Your network"],
		bidirectional: true,
		why: [
			"Familiar routing, with static routes or BGP.",
			"Guides cover Cisco, Palo Alto Networks, Fortinet, and other vendors.",
			"Network Firewall policies apply to every site in one place.",
		],
		watch:
			"GRE is not encrypted, so use IPsec over the public Internet. Plan for MTU on your edge devices.",
		links: [
			{
				label: "Configure a third-party device",
				href: "/cloudflare-one/networks/connectors/cloudflare-wan/configuration/third-party/",
			},
			{
				label: "Cloudflare WAN overview",
				href: "/cloudflare-one/networks/connectors/cloudflare-wan/",
			},
		],
	},
	cni: {
		name: "Cloudflare Network Interconnect",
		verdict: "Connect to Cloudflare over a private, dedicated link.",
		facts: [
			{ k: "Direction", v: "Both directions" },
			{ k: "Layer", v: "L3: any IP traffic" },
			{ k: "Runs as", v: "A physical, partner, or cloud cross-connect" },
		],
		flow: ["Data center", "Interconnect", "Cloudflare", "Your network"],
		bidirectional: true,
		why: [
			"Traffic never crosses the public Internet.",
			"Latency and throughput stay predictable.",
			"IPsec tunnels over the Internet can act as a backup path.",
		],
		watch:
			"Requires an Enterprise plan, and is available only where Cloudflare has interconnect facilities.",
		links: [
			{
				label: "Network Interconnect",
				href: "/network-interconnect/",
			},
			{
				label: "CNI with Cloudflare WAN",
				href: "/cloudflare-one/networks/connectors/cloudflare-wan/network-interconnect/",
			},
		],
	},
};

const NOTE_AGENTS =
	"Run a Mesh node beside the resource, and let the agent connect to its Mesh IP or hostname.";
const NOTE_ROUTER =
	"If your router or firewall supports IPsec or GRE, connect it to Cloudflare WAN instead.";
const NOTE_PRIVATE =
	"Mesh is the default for private access. Users reach the app from the Cloudflare One Client.";
const NOTE_UDP =
	"Tunnel proxies UDP one flow at a time. Mesh forwards every packet.";
const NOTE_SERVER =
	"Tunnel only carries connections that clients start. With Mesh, either side can start.";
const NOTE_PLATFORM =
	"Every account includes 1,000 tunnels. Tunnels for Platforms adds more as you grow.";
const NOTE_KEEP_PRIVATE =
	"To keep the app private instead, use Cloudflare Mesh.";
const BOTH_WAYS = "Either side can start the connection";
const ONE_WAY = "Connections start on the left";
const EMPTY_HINT = "Select an option to see the recommended connector.";
const FOOT_TEXT =
	"Most deployments combine two or three connectors. Refer to Combine connectors.";

function resolve(need: Need, a: Answers): Outcome {
	if (need === "network") {
		if (a.wholeSite || a.managedBox) {
			return { id: "appliance", notes: [NOTE_ROUTER] };
		}
		return { id: "mesh", notes: a.agents ? [NOTE_AGENTS] : [] };
	}
	if (need === "app") {
		const notes: string[] = [];
		if (a.private) notes.push(NOTE_PRIVATE);
		if (a.udp) notes.push(NOTE_UDP);
		if (a.serverInitiated) notes.push(NOTE_SERVER);
		if (notes.length > 0) return { id: "mesh", notes };
		const note = a.platform ? NOTE_PLATFORM : NOTE_KEEP_PRIVATE;
		return { id: "tunnel", notes: [note] };
	}
	if (need === "code") {
		const id = a.singleTarget ? "vpc-service" : "vpc-network";
		return { id, notes: [] };
	}
	if (a.noInternet) return { id: "cni", notes: [] };
	return { id: a.existingRouter ? "wan-tunnels" : "appliance", notes: [] };
}

const PICKER_CSS = `
.cp-root {
  --cp-muted: color-mix(in oklch, currentColor 62%, transparent);
  display: flex; flex-direction: column; gap: 1.25rem; padding: 1rem;
}
.cp-root button, .cp-root a { font: inherit; color: inherit; }
.cp-root button:focus-visible, .cp-root a:focus-visible {
  outline: 2px solid var(--color-brand); outline-offset: 2px;
}
.cp-step {
  display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem;
  font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--cp-muted);
}
.cp-step-n {
  display: inline-flex; width: 1.25rem; height: 1.25rem; align-items: center;
  justify-content: center; border-radius: 9999px; background: var(--color-brand);
  color: #fff; font-size: 0.6875rem;
}
.cp-needs { display: grid; grid-template-columns: 1fr; gap: 0.5rem; }
.cp-need, .cp-q {
  display: flex; align-items: flex-start; gap: 0.75rem; text-align: left;
  border: 1px solid var(--nb-border); background: var(--nb-background);
  cursor: pointer;
  transition: border-color 150ms ease-out, box-shadow 150ms ease-out,
    background-color 150ms ease-out, transform 150ms ease-out;
}
.cp-need { padding: 0.75rem; border-radius: 0.5rem; }
.cp-need:hover {
  border-color: color-mix(in oklch, var(--color-brand) 40%, var(--nb-border));
}
.cp-need:active { transform: scale(0.99); }
.cp-need[aria-pressed="true"] {
  border-color: var(--color-brand); box-shadow: 0 0 0 1px var(--color-brand);
}
.cp-glyph {
  display: flex; width: 2.25rem; height: 2.25rem; flex-shrink: 0;
  align-items: center; justify-content: center; border-radius: 0.375rem;
  background: color-mix(in oklch, currentColor 8%, transparent);
  color: var(--cp-muted);
}
.cp-need[aria-pressed="true"] .cp-glyph {
  background: color-mix(in oklch, var(--color-brand) 12%, transparent);
  color: var(--color-brand);
}
.cp-col { display: flex; min-width: 0; flex-direction: column; gap: 0.125rem; }
.cp-title { font-size: 0.875rem; font-weight: 600; }
.cp-blurb, .cp-hint {
  font-size: 0.75rem; line-height: 1.35; color: var(--cp-muted);
}
.cp-qblock, .cp-qs { display: flex; flex-direction: column; gap: 0.5rem; }
.cp-qs { gap: 0.375rem; }
.cp-q { padding: 0.5rem 0.75rem; border-radius: 0.375rem; }
.cp-q[aria-checked="true"] {
  border-color: color-mix(in oklch, var(--color-brand) 60%, var(--nb-border));
  background: color-mix(in oklch, var(--color-brand) 6%, var(--nb-background));
}
.cp-qtext { font-size: 0.875rem; }
.cp-switch {
  position: relative; display: inline-flex; flex-shrink: 0; width: 1.75rem;
  height: 1rem; margin-top: 0.125rem; border-radius: 9999px;
  background: color-mix(in oklch, currentColor 25%, transparent);
  transition: background-color 150ms ease-out;
}
.cp-q[aria-checked="true"] .cp-switch { background: var(--color-brand); }
.cp-knob {
  position: absolute; top: 0.125rem; left: 0.125rem; width: 0.75rem;
  height: 0.75rem; border-radius: 9999px; background: #fff;
  transition: transform 150ms ease-out;
}
.cp-q[aria-checked="true"] .cp-knob { transform: translateX(0.75rem); }
.cp-result {
  display: flex; flex-direction: column; gap: 0.875rem; padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid color-mix(in oklch, var(--color-brand) 45%, var(--nb-border));
  background: color-mix(in oklch, var(--color-brand) 4%, var(--nb-background));
}
.cp-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.5rem; }
.cp-use {
  font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em;
  text-transform: uppercase; color: var(--cp-muted);
}
.cp-name { font-size: 1.125rem; font-weight: 700; color: var(--color-brand); }
.cp-tag {
  border: 1px solid var(--nb-border); border-radius: 9999px;
  padding: 0 0.5rem; font-size: 0.6875rem; font-weight: 600;
  color: var(--cp-muted);
}
.cp-verdict { margin: 0; font-size: 0.875rem; }
.cp-caption { margin: 0; font-size: 0.6875rem; color: var(--cp-muted); }
.cp-facts {
  display: grid; grid-template-columns: 1fr; gap: 0.5rem; margin: 0;
}
.cp-fact {
  padding: 0.5rem 0.625rem; border-radius: 0.375rem;
  border: 1px solid var(--nb-border); background: var(--nb-background);
}
.cp-fact dt {
  margin: 0; font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.04em;
  text-transform: uppercase; color: var(--cp-muted);
}
.cp-fact dd { margin: 0.125rem 0 0; font-size: 0.8125rem; }
.cp-why {
  display: flex; flex-direction: column; gap: 0.375rem; margin: 0;
  padding: 0; list-style: none;
}
.cp-why li {
  display: flex; gap: 0.5rem; margin: 0; font-size: 0.8125rem;
  line-height: 1.45;
}
.cp-mark {
  width: 0.375rem; height: 0.375rem; margin-top: 0.4rem; flex-shrink: 0;
  border-radius: 9999px;
  background: color-mix(in oklch, currentColor 45%, transparent);
}
.cp-mark[data-note="true"] { background: var(--color-brand); }
.cp-watch {
  display: flex; flex-direction: column; gap: 0.125rem;
  padding: 0.5rem 0.75rem; border-radius: 0.375rem; font-size: 0.8125rem;
  border: 1px solid color-mix(in oklch, #f59e0b 45%, var(--nb-border));
  background: color-mix(in oklch, #f59e0b 9%, var(--nb-background));
}
.cp-watch-label { font-weight: 600; }
.cp-links { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.cp-link {
  display: inline-flex; align-items: center; gap: 0.25rem;
  padding: 0.375rem 0.75rem; border-radius: 0.375rem;
  border: 1px solid var(--nb-border); font-size: 0.75rem; font-weight: 500;
  text-decoration: none;
}
.cp-link[data-primary="true"] {
  border-color: var(--color-brand); background: var(--color-brand);
  color: #fff;
}
.cp-link:hover { opacity: 0.9; }
.cp-foot { margin: 0; font-size: 0.75rem; color: var(--cp-muted); }
a.cp-foot { text-decoration: underline; }
.cp-sr {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); white-space: nowrap;
}
.cp-flow { display: flex; align-items: center; }
.cp-node {
  min-width: 0; padding: 6px 8px; border-radius: 6px; font-size: 11px;
  font-weight: 500; line-height: 1.25; text-align: center;
  border: 1px solid var(--nb-border); background: var(--nb-background);
}
.cp-node[data-cf="true"] {
  border-color: color-mix(in oklch, var(--color-brand) 55%, var(--nb-border));
  color: var(--color-brand);
}
.cp-line {
  position: relative; flex: 1 1 18px; min-width: 14px; height: 2px;
  background: var(--nb-border);
}
.cp-dot {
  position: absolute; top: 50%; left: 0; width: 7px; height: 7px;
  margin-top: -3.5px; border-radius: 9999px; background: var(--color-brand);
  opacity: 0;
  box-shadow: 0 0 0 4px color-mix(in oklch, var(--color-brand) 18%, transparent);
  animation: cp-travel 2.6s linear infinite;
  animation-delay: var(--cp-delay, 0s);
}
.cp-dot[data-back="true"] {
  animation-name: cp-travel-back;
  animation-delay: calc(var(--cp-delay, 0s) + 1.3s);
}
@keyframes cp-travel {
  0% { left: 0; opacity: 0; }
  8% { opacity: 1; }
  42% { left: calc(100% - 7px); opacity: 1; }
  50%, 100% { left: calc(100% - 7px); opacity: 0; }
}
@keyframes cp-travel-back {
  0% { left: calc(100% - 7px); opacity: 0; }
  8% { opacity: 1; }
  42% { left: 0; opacity: 1; }
  50%, 100% { left: 0; opacity: 0; }
}
@keyframes cp-enter {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
.cp-enter { animation: cp-enter 260ms cubic-bezier(0.23, 1, 0.32, 1); }
@media (min-width: 640px) {
  .cp-root { padding: 1.5rem; }
  .cp-needs, .cp-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (prefers-reduced-motion: reduce) {
  .cp-dot { display: none; }
  .cp-enter, .cp-need, .cp-q, .cp-switch, .cp-knob { animation: none; transition: none; }
}
`;

export default function ConnectorPicker(_props: DiagramFallbackProps) {
	const [need, setNeed] = useState<Need | null>(null);
	const [answers, setAnswers] = useState<Answers>({});

	const needDef = NEEDS.find((n) => n.id === need) ?? null;
	const outcome = need ? resolve(need, answers) : null;
	const result = outcome ? RESULTS[outcome.id] : null;
	const live = result ? `Recommended connector: ${result.name}.` : "";

	function pick(id: Need) {
		setNeed(id);
		setAnswers({});
	}

	function toggle(id: string) {
		setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
	}

	return (
		<DiagramStage accent="var(--color-brand)" className="not-content">
			<style>{PICKER_CSS}</style>
			<div className="cp-root">
				<StepLabel n={1} text="What are you connecting?" />
				<div
					role="group"
					aria-label="What are you connecting?"
					className="cp-needs"
				>
					{NEEDS.map((n) => (
						<button
							key={n.id}
							type="button"
							className="cp-need"
							aria-pressed={need === n.id}
							onClick={() => pick(n.id)}
						>
							<span className="cp-glyph">{GLYPHS[n.glyph]}</span>
							<span className="cp-col">
								<span className="cp-title">{n.title}</span>
								<span className="cp-blurb">{n.blurb}</span>
							</span>
						</button>
					))}
				</div>

				{needDef && (
					<div key={`q-${needDef.id}`} className="cp-enter cp-qblock">
						<StepLabel n={2} text="Do any of these apply?" />
						<div className="cp-qs">
							{needDef.questions.map((q) => (
								<button
									key={q.id}
									type="button"
									role="switch"
									className="cp-q"
									aria-checked={Boolean(answers[q.id])}
									onClick={() => toggle(q.id)}
								>
									<span className="cp-switch" aria-hidden="true">
										<span className="cp-knob" />
									</span>
									<span className="cp-col">
										<span className="cp-qtext">{q.text}</span>
										{q.hint && <span className="cp-hint">{q.hint}</span>}
									</span>
								</button>
							))}
						</div>
					</div>
				)}

				{result && outcome && (
					<div key={`r-${outcome.id}`} className="cp-enter cp-result">
						<div className="cp-head">
							<span className="cp-use">Use</span>
							<span className="cp-name">{result.name}</span>
							{result.badge && <span className="cp-tag">{result.badge}</span>}
						</div>
						<p className="cp-verdict">{result.verdict}</p>
						<Flow nodes={result.flow} both={result.bidirectional} />
						<p className="cp-caption">
							{result.bidirectional ? BOTH_WAYS : ONE_WAY}
						</p>
						<dl className="cp-facts">
							{result.facts.map((f) => (
								<div key={f.k} className="cp-fact">
									<dt>{f.k}</dt>
									<dd>{f.v}</dd>
								</div>
							))}
						</dl>
						<ul className="cp-why">
							{outcome.notes.map((w) => (
								<li key={w}>
									<span className="cp-mark" data-note="true" />
									<span>{w}</span>
								</li>
							))}
							{result.why.map((w) => (
								<li key={w}>
									<span className="cp-mark" />
									<span>{w}</span>
								</li>
							))}
						</ul>
						<div className="cp-watch">
							<span className="cp-watch-label">Watch for</span>
							<span>{result.watch}</span>
						</div>
						<div className="cp-links">
							{result.links.map((l, i) => (
								<a
									key={l.href}
									href={l.href}
									className="cp-link"
									data-primary={i === 0}
								>
									{l.label}
									<span aria-hidden="true">→</span>
								</a>
							))}
						</div>
					</div>
				)}

				{need ? (
					<a className="cp-foot" href="#combine-connectors">
						{FOOT_TEXT}
					</a>
				) : (
					<p className="cp-foot">{EMPTY_HINT}</p>
				)}
			</div>
			<div className="cp-sr" aria-live="polite">
				{live}
			</div>
		</DiagramStage>
	);
}

function StepLabel({ n, text }: { n: number; text: string }) {
	return (
		<div className="cp-step">
			<span className="cp-step-n">{n}</span>
			<span>{text}</span>
		</div>
	);
}

function Flow({ nodes, both }: { nodes: string[]; both: boolean }) {
	return (
		<div className="cp-flow">
			{nodes.map((node, i) => (
				<Fragment key={`${node}-${i}`}>
					{i > 0 && <FlowLine delay={(i - 1) * 0.36} both={both} />}
					<span className="cp-node" data-cf={node === "Cloudflare"}>
						{node}
					</span>
				</Fragment>
			))}
		</div>
	);
}

function FlowLine({ delay, both }: { delay: number; both: boolean }) {
	const style = { "--cp-delay": `${delay}s` } as CSSProperties;
	return (
		<span className="cp-line" style={style}>
			<span className="cp-dot" />
			{both && <span className="cp-dot" data-back="true" />}
		</span>
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
	"aria-hidden": true,
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
