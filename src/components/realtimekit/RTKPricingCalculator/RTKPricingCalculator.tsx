import { useMemo, useState } from "react";
import { track } from "~/util/zaraz";
import {
	EMPTY_USAGE_INPUTS,
	USAGE_ROWS,
	type UsageInputs,
	type UsageRowConfig,
	type UsageRowKey,
	computeEstimate,
	formatMoney,
	formatNumber,
	includedZoneEnd,
	minutesToSliderForRow,
	sliderToMinutesForRow,
} from "./pricing-utils";

const GROUP_COLOR: Record<UsageRowConfig["group"], string> = {
	video: "#f6821f",
	audio: "#c05d08",
	export: "#521000",
	transcription: "#a37b71",
};

const GROUP_LABEL: Record<UsageRowConfig["group"], string> = {
	video: "A/V users",
	audio: "Audio-only",
	export: "Export",
	transcription: "Transcribe",
};

const GROUPS: UsageRowConfig["group"][] = [
	"video",
	"audio",
	"export",
	"transcription",
];

function trackInteraction() {
	track("interacted with docs calculator", {
		value: "realtimekit pricing calculator",
	});
}

function sliderScaleLabels(row: UsageRowKey): string[] {
	switch (row) {
		case "av":
		case "ao":
			return ["0", "10k", "100k", "1M+"];
		case "ev":
		case "eo":
		case "er":
			return ["0", "100", "5k", "50k+"];
		default:
			return ["0", "10k", "100k+"];
	}
}

function formatRate(rate: number): string {
	return rate.toString();
}

interface UsageSliderRowProps {
	row: UsageRowConfig;
	minutes: number;
	onChange: (minutes: number) => void;
}

function UsageSliderRow({ row, minutes, onChange }: UsageSliderRowProps) {
	const sliderValue = minutesToSliderForRow(row.key, minutes);
	const hasFreeTier = row.included !== undefined;
	const freeZoneEnd = hasFreeTier ? includedZoneEnd(row.key) : 0;
	const inputId = `rtk-pricing-${row.key}`;

	const trackBackground = hasFreeTier
		? `linear-gradient(to right, var(--color-cl1-orange-7) 0%, var(--color-cl1-orange-7) ${freeZoneEnd}%, var(--color-cl1-gray-8) ${freeZoneEnd}%, var(--color-cl1-gray-8) 100%)`
		: "var(--color-cl1-gray-8)";

	return (
		<div className="border-b border-gray-200 py-2 last:border-b-0 dark:border-gray-700">
			<div className="mb-1 flex flex-wrap items-baseline justify-between gap-1">
				<label htmlFor={inputId} className="text-sm font-semibold">
					{row.label}
				</label>
				<span className="text-[11px] text-gray-500 dark:text-gray-400">
					{hasFreeTier ? (
						<>
							<strong className="text-cl1-orange-5 dark:text-cl1-orange-6">
								{formatNumber(row.included ?? 0)} min free
							</strong>
							, then ${formatRate(row.rate ?? 0)}/min
						</>
					) : (
						row.description
					)}
				</span>
			</div>
			<div className="flex items-center gap-3">
				<input
					type="range"
					aria-label={`${row.label} minutes slider`}
					min={0}
					max={100}
					step={0.1}
					value={sliderValue}
					style={{ background: trackBackground }}
					onChange={(event) => {
						onChange(
							sliderToMinutesForRow(row.key, Number(event.target.value)),
						);
					}}
					onMouseUp={trackInteraction}
					onTouchEnd={trackInteraction}
					onKeyUp={trackInteraction}
					className="[&::-moz-range-thumb]:bg-cl1-brand-orange [&::-webkit-slider-thumb]:bg-cl1-brand-orange h-1.5 flex-grow cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm"
				/>
				<label className="focus-within:border-cl1-brand-orange flex w-24 shrink-0 items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-neutral-900">
					<input
						id={inputId}
						type="number"
						inputMode="numeric"
						min={0}
						value={minutes}
						onChange={(event) => {
							const value = Number(event.target.value);
							onChange(Number.isFinite(value) ? Math.max(0, value) : 0);
						}}
						onBlur={trackInteraction}
						className="w-full min-w-0 border-0 bg-transparent p-0 text-right text-sm font-bold outline-none"
					/>
					<span className="text-[10px] text-gray-500 dark:text-gray-400">
						min
					</span>
				</label>
			</div>
			<div className="mt-0.5 flex justify-between text-[10px] font-semibold text-gray-500 sm:mr-28 dark:text-gray-400">
				{sliderScaleLabels(row.key).map((label) => (
					<span key={label}>{label}</span>
				))}
			</div>
		</div>
	);
}

function SectionCard({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-neutral-900">
			<h3 className="mb-1 text-[11px] font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
				{title}
			</h3>
			<div>{children}</div>
		</div>
	);
}

export default function RTKPricingCalculator() {
	const [inputs, setInputs] = useState<UsageInputs>(EMPTY_USAGE_INPUTS);
	const [transcriptionDays, setTranscriptionDays] = useState(30);

	const estimate = useMemo(
		() => computeEstimate(inputs, transcriptionDays),
		[inputs, transcriptionDays],
	);

	const circumference = 2 * Math.PI * 40;
	const total = estimate.total;

	function updateMinutes(row: UsageRowKey, minutes: number) {
		setInputs((prev) => ({ ...prev, [row]: minutes }));
	}

	const participantRows = USAGE_ROWS.filter(
		(row) => row.key === "av" || row.key === "ao",
	);
	const exportRows = USAGE_ROWS.filter((row) =>
		["ev", "eo", "er"].includes(row.key),
	);
	const transcriptionRows = USAGE_ROWS.filter(
		(row) => row.key === "rt" || row.key === "pt",
	);

	let offset = 0;
	const donutSegments = GROUPS.map((group) => {
		const share = total > 0 ? estimate.costShares[group] / total : 0;
		const dash = share * circumference;
		const segment = { group, dash, offset };
		offset -= dash;
		return segment;
	});

	return (
		<div className="not-content my-6">
			<div className="grid gap-3 md:grid-cols-[1fr_260px]">
				<div className="grid gap-3">
					<SectionCard title="Participant minutes">
						{participantRows.map((row) => (
							<UsageSliderRow
								key={row.key}
								row={row}
								minutes={inputs[row.key]}
								onChange={(minutes) => updateMinutes(row.key, minutes)}
							/>
						))}
					</SectionCard>

					<SectionCard title="Export minutes">
						{exportRows.map((row) => (
							<UsageSliderRow
								key={row.key}
								row={row}
								minutes={inputs[row.key]}
								onChange={(minutes) => updateMinutes(row.key, minutes)}
							/>
						))}
					</SectionCard>

					<SectionCard title="Transcription audio minutes">
						{transcriptionRows.map((row) => (
							<UsageSliderRow
								key={row.key}
								row={row}
								minutes={inputs[row.key]}
								onChange={(minutes) => updateMinutes(row.key, minutes)}
							/>
						))}
						<div className="pt-2">
							<div className="mb-1 flex flex-wrap items-baseline justify-between gap-1">
								<label
									htmlFor="rtk-pricing-days"
									className="text-sm font-semibold"
								>
									Transcription days
								</label>
								<span className="text-[11px] text-gray-500 dark:text-gray-400">
									Workers AI includes 10,000 free Neurons/day
								</span>
							</div>
							<div className="flex items-center gap-3">
								<input
									type="range"
									aria-label="Transcription days slider"
									min={1}
									max={31}
									step={1}
									value={transcriptionDays}
									onChange={(event) =>
										setTranscriptionDays(Number(event.target.value))
									}
									onMouseUp={trackInteraction}
									onTouchEnd={trackInteraction}
									onKeyUp={trackInteraction}
									className="bg-cl1-gray-8 [&::-moz-range-thumb]:bg-cl1-brand-orange [&::-webkit-slider-thumb]:bg-cl1-brand-orange h-1.5 flex-grow cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-sm"
								/>
								<label className="focus-within:border-cl1-brand-orange flex w-24 shrink-0 items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-700 dark:bg-neutral-900">
									<input
										id="rtk-pricing-days"
										type="number"
										inputMode="numeric"
										min={1}
										max={31}
										step={1}
										value={transcriptionDays}
										onChange={(event) => {
											const value = Number(event.target.value);
											setTranscriptionDays(
												Number.isFinite(value)
													? Math.min(31, Math.max(1, value))
													: 30,
											);
										}}
										onBlur={trackInteraction}
										className="w-full min-w-0 border-0 bg-transparent p-0 text-right text-sm font-bold outline-none"
									/>
									<span className="text-[10px] text-gray-500 dark:text-gray-400">
										days
									</span>
								</label>
							</div>
						</div>
					</SectionCard>
				</div>

				<div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-neutral-900">
					<div className="bg-cl1-brand-orange h-1" aria-hidden="true" />
					<div className="p-3 md:sticky md:top-4">
						<div className="text-[11px] font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
							Estimated monthly cost
						</div>
						<div className="text-cl1-brand-orange mt-0.5 text-4xl font-black tracking-tight">
							{formatMoney(total)}
							<span className="ml-1 text-xs font-bold text-gray-500 dark:text-gray-400">
								/mo
							</span>
						</div>

						<div className="mt-3 flex items-center gap-3 border-t border-gray-200 pt-3 dark:border-gray-700">
							<svg
								viewBox="0 0 100 100"
								className="h-16 w-16 shrink-0 -rotate-90"
							>
								<circle
									cx="50"
									cy="50"
									r="40"
									fill="none"
									stroke="var(--color-cl1-gray-8)"
									strokeWidth="10"
								/>
								{total > 0 &&
									donutSegments.map(({ group, dash, offset: segOffset }) => (
										<circle
											key={group}
											cx="50"
											cy="50"
											r="40"
											fill="none"
											stroke={GROUP_COLOR[group]}
											strokeWidth="10"
											strokeLinecap="round"
											strokeDasharray={`${dash} ${circumference}`}
											strokeDashoffset={segOffset}
											style={{ transition: "stroke-dasharray 0.3s ease" }}
										/>
									))}
							</svg>
							<div className="grid gap-0.5">
								{GROUPS.map((group) => (
									<div
										key={group}
										className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400"
									>
										<span
											className="h-2 w-2 shrink-0 rounded-full"
											style={{ background: GROUP_COLOR[group] }}
										/>
										{GROUP_LABEL[group]}
									</div>
								))}
							</div>
						</div>

						{total > 0 && (
							<div className="mt-3 grid gap-1 border-t border-gray-200 pt-3 dark:border-gray-700">
								{estimate.breakdown.map((row) => (
									<div
										key={row.label}
										className="flex justify-between gap-3 text-[12px] text-gray-500 dark:text-gray-400"
									>
										<span>{row.label}</span>
										<strong className="text-right font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100">
											{formatMoney(row.cost)}
										</strong>
									</div>
								))}
								<div className="flex justify-between gap-3 text-[12px] text-gray-500 dark:text-gray-400">
									<span>Workers AI billable Neurons</span>
									<strong className="text-right font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100">
										{formatNumber(estimate.billableNeurons)}
									</strong>
								</div>
								<div className="flex justify-between gap-3 text-[12px] text-gray-500 dark:text-gray-400">
									<span>Annualized estimate</span>
									<strong className="text-right font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100">
										{formatMoney(estimate.annualized)}
									</strong>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
				RealtimeKit is currently in Beta and free to use. This calculator
				estimates costs based on the pricing model planned for general
				availability (GA) and is provided for informational purposes only — all
				results are estimates and actual GA pricing may differ.
			</p>
		</div>
	);
}
