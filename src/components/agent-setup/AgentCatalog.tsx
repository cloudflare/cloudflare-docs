import { AgentCard } from "./AgentCard";
import type { AgentData } from "./types";

export function AgentCatalog({ agents }: { agents: AgentData[] }) {
	return (
		<div className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{agents.map((agent) => (
				<AgentCard key={agent.slug} agent={agent} />
			))}
		</div>
	);
}
