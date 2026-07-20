import { PrivacyChoices } from "@/components/icons/PrivacyChoices";
import { cn } from "@/lib/cn";

// "Your Privacy Choices" button — toggles the OneTrust preference center.
declare global {
	interface Window {
		OneTrust?: {
			ToggleInfoDisplay: () => void;
		};
	}
}

export interface FooterPrivacyChoicesProps {
	className?: string;
	label?: string;
}

export function FooterPrivacyChoices({
	className,
	label,
}: FooterPrivacyChoicesProps) {
	const handleClick = () => {
		if (window.OneTrust?.ToggleInfoDisplay) {
			window.OneTrust.ToggleInfoDisplay();
		}
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={cn(
				"hover:text-foreground-200/65 inline-flex shrink-0 cursor-pointer items-center gap-1.5 transition-colors duration-200",
				className,
			)}
		>
			<PrivacyChoices className="h-3.5 w-auto shrink-0" />
			<span>{label ?? "Your Privacy Choices"}</span>
		</button>
	);
}
