import thumbsUp from "@phosphor-icons/core/regular/thumbs-up.svg?raw";
import thumbsDown from "@phosphor-icons/core/regular/thumbs-down.svg?raw";
import checkCircle from "@phosphor-icons/core/regular/check-circle.svg?raw";
import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg?raw";
import x from "@phosphor-icons/core/regular/x.svg?raw";
import checkBold from "@phosphor-icons/core/bold/check-bold.svg?raw";

const icons = {
	"thumbs-up": thumbsUp,
	"thumbs-down": thumbsDown,
	"check-circle": checkCircle,
	"magnifying-glass": magnifyingGlass,
	x,
	"check-bold": checkBold,
};

type IconName = keyof typeof icons;

interface Props {
	name: IconName;
	className?: string;
}

export default function PhosphorIcon({ name, className }: Props) {
	const svg = icons[name];
	return (
		<span
			aria-hidden
			className={className}
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}
