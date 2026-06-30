import { useState, useSyncExternalStore } from "react";
import { excludeCidr, parseCidr } from "cidr-tools";
import { track } from "~/util/zaraz";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";

const inputClass =
	"h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const isValidCidr = (cidr: string) => {
	try {
		parseCidr(cidr);
		return true;
	} catch {
		return false;
	}
};

const parseList = (value: string) =>
	value
		.split(",")
		.map((cidr) => cidr.trim())
		.filter(Boolean);

const exclude = (base: string, subtract: string[]) =>
	isValidCidr(base) && subtract.every(isValidCidr)
		? excludeCidr(base, subtract)
		: [];

const useIsHydrated = () =>
	useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

export default function SubtractIPCalculator({
	defaults,
}: {
	defaults: {
		base?: string;
		subtract?: string[];
	};
}) {
	const [base, setBase] = useState(defaults?.base ?? "");
	// Raw input text (preserves spaces/commas as typed); the parsed CIDR list is
	// derived from it during render.
	const [subtractInput, setSubtractInput] = useState(() =>
		(defaults?.subtract ?? []).join(", "),
	);
	// The inputs behind the last "Calculate" (seeded from defaults). Results are
	// derived from this snapshot, never stored — so there's no state to keep in
	// sync.
	const [committed, setCommitted] = useState(() => ({
		base: defaults?.base ?? "",
		subtract: defaults?.subtract ?? [],
	}));

	const subtract = parseList(subtractInput);
	const hydrated = useIsHydrated();
	const result = hydrated ? exclude(committed.base, committed.subtract) : [];
	const canCalculate = isValidCidr(base) && subtract.every(isValidCidr);

	function calculate() {
		setCommitted({ base, subtract });
		track("interacted with docs calculator", { value: "split ip calculator" });
	}

	return (
		<div className="my-4 space-y-5 rounded-lg bg-card p-6 text-foreground no-underline shadow-sm ring ring-border">
			<div className="grid gap-4 sm:grid-cols-2">
				<label className="block">
					<span className="mb-1.5 block text-sm font-medium text-foreground">
						Base CIDR
					</span>
					<input
						type="text"
						className={inputClass}
						placeholder="10.0.0.0/8"
						value={base}
						onChange={(e) => setBase(e.target.value)}
					/>
				</label>
				<label className="block">
					<span className="mb-1.5 block text-sm font-medium text-foreground">
						Subtracted CIDRs
					</span>
					<input
						type="text"
						className={inputClass}
						placeholder="10.0.0.0/24, 10.1.0.0/16"
						value={subtractInput}
						onChange={(e) => setSubtractInput(e.target.value)}
					/>
				</label>
			</div>

			<button
				className={cn(buttonVariants({ variant: "primary" }))}
				disabled={!canCalculate}
				onClick={calculate}
			>
				Calculate
			</button>

			{result.length > 0 && (
				<div className="space-y-2">
					<span className="block text-sm font-medium text-foreground">
						Results
					</span>
					<div className="flex flex-wrap gap-1.5">
						{result.map((cidr) => (
							<code
								key={cidr}
								className="rounded-md bg-muted px-2 py-1 font-mono text-sm text-foreground"
							>
								{cidr}
							</code>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
