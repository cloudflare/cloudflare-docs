import type { ReactNode } from "react";

type RTKPillProps = {
	children: ReactNode;
};

function RTKPill({ children }: RTKPillProps) {
	return (
		<span
			style={{
				backgroundColor: "#f9d59aff",
				borderRadius: "9999px",
				padding: "0.1rem 0.5rem",
				fontSize: "12px",
				margin: "0 4px",
				fontWeight: 500,
				display: "inline-block",
			}}
		>
			{children}
		</span>
	);
}

export default RTKPill;
