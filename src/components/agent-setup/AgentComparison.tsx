import type { AgentData } from "./types";

const COLUMNS: { key: keyof AgentData["capabilities"]; label: string }[] = [
	{ key: "ide", label: "IDE" },
	{ key: "terminal", label: "Terminal" },
	{ key: "standalone", label: "Standalone" },
	{ key: "cloud", label: "Cloud" },
	{ key: "extension", label: "Extension" },
	{ key: "mcp", label: "MCP" },
	{ key: "skills", label: "Skills" },
	{ key: "open_source", label: "Open Source" },
];

function CheckIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			className="check"
			aria-label="Yes"
		>
			<path
				d="M3 8.5L6.5 12L13 4"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function DashIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			className="dash"
			aria-label="No"
		>
			<path
				d="M4 8H12"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function AgentComparison({ agents }: { agents: AgentData[] }) {
	return (
		<div className="not-content overflow-x-auto" style={{ width: "100%" }}>
			<table className="agent-setup-table">
				<thead>
					<tr>
						<th>Agent</th>
						{COLUMNS.map(({ key, label }) => (
							<th key={key} style={{ textAlign: "center" }}>
								{label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{agents.map((agent) => (
						<tr key={agent.slug}>
							<td>
								<a
									href={`/agent-setup/${agent.slug}/`}
									className="font-semibold no-underline"
									style={{ color: "inherit" }}
								>
									{agent.name}
								</a>
							</td>
							{COLUMNS.map(({ key }) => (
								<td key={key}>
									{agent.capabilities[key] ? <CheckIcon /> : <DashIcon />}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
