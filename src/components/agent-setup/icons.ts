export function getAgentIconSource(
	icon: string,
	iconFile: string | undefined,
	theme: "light" | "dark",
): string {
	return iconFile
		? `/icons/agents/${icon}/${iconFile}`
		: `/icons/agents/${icon}/${theme}.svg`;
}
