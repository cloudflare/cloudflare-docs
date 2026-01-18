import type { ReactNode } from "react";
import { useFramework } from "../hooks/useFramework";

interface RTKCodeSnippetProps {
	id: string | string[]; // e.g. "web-react" or ["web-react", "web-vue"]
	children: ReactNode; // MDX content
}

export default function RTKCodeSnippet({ id, children }: RTKCodeSnippetProps) {
	const { platform, framework } = useFramework();

	if (!framework) return null;

	const activeId = `${platform}-${framework.id}`;
	const ids = Array.isArray(id) ? id : [id];

	return (
		<div className={ids.includes(activeId) ? "" : "hidden"}>{children}</div>
	);
}
