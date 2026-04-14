import { CapabilityBadges } from "./CapabilityBadge";
import { AgentIcon } from "./AgentIcon";
import type { AgentData } from "./types";

export function AgentCard({ agent }: { agent: AgentData }) {
	return (
		<a href={`/agent-setup/${agent.slug}/`} className="agent-setup-card">
			<div className="agent-setup-card-header">
				<AgentIcon icon={agent.icon} name={agent.name} size={36} />
				<div>
					<div className="agent-setup-card-title">{agent.name}</div>
					<div className="agent-setup-card-vendor">{agent.vendor}</div>
				</div>
			</div>

			<div className="agent-setup-card-body">
				<p className="agent-setup-card-description">{agent.description}</p>

				<CapabilityBadges capabilities={agent.capabilities} />

				<ul className="agent-setup-card-features">
					{agent.features.slice(0, 4).map((feature) => (
						<li key={feature}>{feature}</li>
					))}
				</ul>

				<span className="agent-setup-card-cta">
					View guide <span aria-hidden="true">&rarr;</span>
				</span>
			</div>
		</a>
	);
}
