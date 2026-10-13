import type { SVGProps } from "react";
import icons from "./RTKicons.json";

const ICONS = icons as Record<
	string,
	{
		viewBox: string;
		paths: string[];
	}
>;

export type RTKIconName = keyof typeof ICONS;

interface RTKIconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
	name: RTKIconName;
	onClick?: () => void;
	className?: string;
}

function RTKIcon({ name, className, onClick, ...rest }: RTKIconProps) {
	const icon = ICONS[name];

	if (!icon) {
		return null;
	}

	return (
		<div onClick={onClick}>
			<svg
				aria-hidden="true"
				focusable="false"
				viewBox={icon.viewBox}
				className={className}
				{...rest}
			>
				{icon.paths.map((d, index) => (
					<path key={index} d={d} />
				))}
			</svg>
		</div>
	);
}

export default RTKIcon;
