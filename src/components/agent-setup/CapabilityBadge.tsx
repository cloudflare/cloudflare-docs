type BadgeType =
	| "ide"
	| "terminal"
	| "standalone"
	| "cloud"
	| "extension"
	| "mcp"
	| "skills"
	| "open_source";

const BADGE_LABELS: Record<BadgeType, string> = {
	ide: "IDE",
	terminal: "Terminal",
	standalone: "Standalone",
	cloud: "Cloud",
	extension: "Extension",
	mcp: "MCP",
	skills: "Skills",
	open_source: "Open Source",
};

export function CapabilityBadge({ type }: { type: BadgeType }) {
	const cssClass = `agent-setup-badge agent-setup-badge--${type.replace("_", "-")}`;
	return <span className={cssClass}>{BADGE_LABELS[type]}</span>;
}

export function CapabilityBadges({
	capabilities,
}: {
	capabilities: Record<string, boolean>;
}) {
	const active = Object.entries(capabilities).filter(([, v]) => v);
	if (active.length === 0) return null;

	return (
		<div className="flex flex-wrap gap-1.5">
			{active.map(([key]) => (
				<CapabilityBadge key={key} type={key as BadgeType} />
			))}
		</div>
	);
}
