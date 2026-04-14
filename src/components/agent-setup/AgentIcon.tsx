interface AgentIconProps {
	icon: string;
	name: string;
	size?: number;
}

export function AgentIcon({ icon, name, size = 36 }: AgentIconProps) {
	const lightSrc = `/icons/agents/${icon}/light.svg`;
	const darkSrc = `/icons/agents/${icon}/dark.svg`;

	return (
		<span
			className="agent-setup-icon-wrap"
			style={{ width: size, height: size, flexShrink: 0 }}
		>
			<img
				src={lightSrc}
				alt={`${name} icon`}
				width={size}
				height={size}
				className="agent-icon-light"
			/>
			<img
				src={darkSrc}
				alt={`${name} icon`}
				width={size}
				height={size}
				className="agent-icon-dark"
			/>
		</span>
	);
}
