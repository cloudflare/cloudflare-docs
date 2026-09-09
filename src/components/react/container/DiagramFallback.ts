import type { ReactNode } from "react";

// A diagram is authored as a paired MDX tag whose children are a plain-text
// description of the picture. The agent-facing `index.md` twin keeps that
// text; the browser renders only the interactive SVG (children are ignored
// at runtime).
export interface DiagramFallbackProps {
	children?: ReactNode;
}
