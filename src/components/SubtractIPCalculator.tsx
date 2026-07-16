import { useEffect, useState } from "react";
import { excludeCidr, parseCidr } from "cidr-tools";
import { track } from "~/util/zaraz";

export default function SubtractIPCalculator({
	defaults,
}: {
	defaults: {
		base?: string;
		subtract?: string[];
	};
}) {
	const [base, setBase] = useState(defaults?.base ?? "");
	const [subtract, setSubtract] = useState<string[]>(defaults?.subtract ?? []);

	const [result, setResult] = useState<string[]>([]);

	function calculate() {
		setResult(excludeCidr(base, subtract));
		track("interacted with docs calculator", { value: "split ip calculator" });
	}

	function disableButton() {
		try {
			parseCidr(base);
			subtract.map((cidr) => parseCidr(cidr));

			return false;
		} catch {
			return true;
		}
	}

	useEffect(() => {
		if (defaults) {
			calculate();
		}
	}, []);

	return (
		<div className="rounded-md border border-solid border-gray-200 p-6 no-underline dark:border-gray-700">
			<div>
				<label className="mr-4">
					<strong>Base CIDR: </strong>
					<input
						type="text"
						value={base}
						onChange={(e) => setBase(e.target.value)}
					/>
				</label>
				<label>
					<strong>Subtracted CIDRs: </strong>
					<input
						type="text"
						value={subtract}
						onChange={(e) => setSubtract(e.target.value.split(","))}
					/>
				</label>
			</div>
			<div>
				<button
					className="bg-cl1-brand-orange text-cl1-black disabled:bg-cl1-gray-4 disabled:text-cl1-gray-1 h-8 cursor-pointer rounded-sm px-4 text-sm font-medium disabled:cursor-not-allowed"
					disabled={disableButton()}
					onClick={() => calculate()}
				>
					Calculate
				</button>
			</div>
			<div>
				{result.length > 0 && (
					<>
						<strong>Results: </strong>
						{result.map((cidr, idx) => (
							<>
								<code key={cidr}>{cidr}</code>
								{idx < result.length - 1 && <span>, </span>}
							</>
						))}
					</>
				)}
			</div>
		</div>
		// <ul>
		// 	{excludeCidr("10.0.0.0/8", ["10.0.0.0/24"]).map((cidr) => (
		// 		<li key={cidr}>{cidr}</li>
		// 	))}
		// </ul>
	);
}
