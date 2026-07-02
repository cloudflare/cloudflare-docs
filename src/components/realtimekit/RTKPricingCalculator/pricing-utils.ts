/**
 * Pure pricing math for the RealtimeKit pricing calculator.
 *
 * Kept free of React/DOM so it can be unit tested independently and reused
 * if the calculator ever needs a non-React host (e.g. a different framework
 * or a server-rendered estimate).
 *
 * Rates mirror /realtime/realtimekit/pricing/. Update both together.
 */

export type UsageRowKey = "av" | "ao" | "ev" | "eo" | "er" | "rt" | "pt";

export interface UsageRowConfig {
	key: UsageRowKey;
	label: string;
	description: string;
	/** $ per minute once the included allowance is exceeded. Omit for Workers AI rows. */
	rate?: number;
	/** Minutes included for free each month. Omit for Workers AI rows. */
	included?: number;
	/** Workers AI neurons consumed per minute of audio. Omit for flat-rate rows. */
	neuronsPerMinute?: number;
	/** Which cost-share bucket this row rolls up into for the donut chart. */
	group: "video" | "audio" | "export" | "transcription";
}

export const USAGE_ROWS: UsageRowConfig[] = [
	{
		key: "av",
		label: "Audio/video participants",
		description: "$0.002/min after 10,000 min included",
		rate: 0.002,
		included: 10_000,
		group: "video",
	},
	{
		key: "ao",
		label: "Audio-only participants",
		description: "$0.0005/min after 10,000 min included",
		rate: 0.0005,
		included: 10_000,
		group: "audio",
	},
	{
		key: "ev",
		label: "Audio/video recordings, RTMP, or HLS",
		description: "$0.010/min after 100 min included",
		rate: 0.01,
		included: 100,
		group: "export",
	},
	{
		key: "eo",
		label: "Audio-only recordings, RTMP, or HLS",
		description: "$0.003/min after 100 min included",
		rate: 0.003,
		included: 100,
		group: "export",
	},
	{
		key: "er",
		label: "Raw RTP into R2",
		description: "$0.0005/min after 100 min included",
		rate: 0.0005,
		included: 100,
		group: "export",
	},
	{
		key: "rt",
		label: "Real-time transcription",
		description: "Workers AI pricing, ~ $0.0092/audio min",
		neuronsPerMinute: 836.36,
		group: "transcription",
	},
	{
		key: "pt",
		label: "Post-meeting transcription",
		description: "Workers AI pricing, ~ $0.0005/audio min",
		neuronsPerMinute: 46.63,
		group: "transcription",
	},
];

export const WORKERS_AI_FREE_NEURONS_PER_DAY = 10_000;
export const WORKERS_AI_NEURON_RATE = 0.011 / 1000;

export type UsageInputs = Record<UsageRowKey, number>;

export const EMPTY_USAGE_INPUTS: UsageInputs = {
	av: 0,
	ao: 0,
	ev: 0,
	eo: 0,
	er: 0,
	rt: 0,
	pt: 0,
};

/** Piecewise breakpoints shared by the three slider families below. */
interface PiecewiseSegment {
	/** Slider position (0-100) where this segment ends. */
	sliderMax: number;
	/** Minutes value where this segment ends. */
	minutesMax: number;
}

function sliderToMinutes(value: number, segments: PiecewiseSegment[]): number {
	const clamped = Math.max(0, Math.min(100, value));
	let sliderMin = 0;
	let minutesMin = 0;

	for (const segment of segments) {
		if (clamped <= segment.sliderMax) {
			const ratio =
				segment.sliderMax === sliderMin
					? 0
					: (clamped - sliderMin) / (segment.sliderMax - sliderMin);
			return Math.round(minutesMin + ratio * (segment.minutesMax - minutesMin));
		}
		sliderMin = segment.sliderMax;
		minutesMin = segment.minutesMax;
	}

	return segments[segments.length - 1].minutesMax;
}

function minutesToSlider(
	minutes: number,
	segments: PiecewiseSegment[],
): number {
	const clamped = Math.max(0, minutes);
	let sliderMin = 0;
	let minutesMin = 0;

	for (const segment of segments) {
		if (clamped <= segment.minutesMax) {
			if (segment.minutesMax === minutesMin) return segment.sliderMax;
			const ratio = (clamped - minutesMin) / (segment.minutesMax - minutesMin);
			return sliderMin + ratio * (segment.sliderMax - sliderMin);
		}
		sliderMin = segment.sliderMax;
		minutesMin = segment.minutesMax;
	}

	return 100;
}

// Participant minutes: 0-30 => 0-10k (included zone), 30-70 => 10k-100k, 70-100 => 100k-1M
const PARTICIPANT_SEGMENTS: PiecewiseSegment[] = [
	{ sliderMax: 30, minutesMax: 10_000 },
	{ sliderMax: 70, minutesMax: 100_000 },
	{ sliderMax: 100, minutesMax: 1_000_000 },
];

// Export minutes: 0-30 => 0-100 (included zone), 30-70 => 100-5k, 70-100 => 5k-50k
const EXPORT_SEGMENTS: PiecewiseSegment[] = [
	{ sliderMax: 30, minutesMax: 100 },
	{ sliderMax: 70, minutesMax: 5_000 },
	{ sliderMax: 100, minutesMax: 50_000 },
];

// Transcription minutes: 0-50 => 0-10k, 50-100 => 10k-100k
const TRANSCRIPTION_SEGMENTS: PiecewiseSegment[] = [
	{ sliderMax: 50, minutesMax: 10_000 },
	{ sliderMax: 100, minutesMax: 100_000 },
];

const SEGMENTS_BY_ROW: Record<UsageRowKey, PiecewiseSegment[]> = {
	av: PARTICIPANT_SEGMENTS,
	ao: PARTICIPANT_SEGMENTS,
	ev: EXPORT_SEGMENTS,
	eo: EXPORT_SEGMENTS,
	er: EXPORT_SEGMENTS,
	rt: TRANSCRIPTION_SEGMENTS,
	pt: TRANSCRIPTION_SEGMENTS,
};

export function sliderToMinutesForRow(
	row: UsageRowKey,
	sliderValue: number,
): number {
	return sliderToMinutes(sliderValue, SEGMENTS_BY_ROW[row]);
}

export function minutesToSliderForRow(
	row: UsageRowKey,
	minutes: number,
): number {
	return minutesToSlider(minutes, SEGMENTS_BY_ROW[row]);
}

/** The slider position (0-100) marking the end of the free/included zone, for visual affordance. */
export function includedZoneEnd(row: UsageRowKey): number {
	return SEGMENTS_BY_ROW[row][0].sliderMax;
}

export interface BreakdownRow {
	label: string;
	cost: number;
}

export interface CostShares {
	video: number;
	audio: number;
	export: number;
	transcription: number;
}

export interface PricingEstimate {
	total: number;
	annualized: number;
	costShares: CostShares;
	breakdown: BreakdownRow[];
	billableNeurons: number;
	totalNeurons: number;
}

export function computeEstimate(
	inputs: UsageInputs,
	transcriptionDays: number,
): PricingEstimate {
	const days = Math.min(31, Math.max(1, transcriptionDays));
	const freeNeurons = WORKERS_AI_FREE_NEURONS_PER_DAY * days;

	const costShares: CostShares = {
		video: 0,
		audio: 0,
		export: 0,
		transcription: 0,
	};
	const breakdown: BreakdownRow[] = [];

	let total = 0;
	let totalNeurons = 0;
	const neuronRows: { label: string; neurons: number }[] = [];

	for (const row of USAGE_ROWS) {
		const minutes = Math.max(0, inputs[row.key] ?? 0);

		if (row.neuronsPerMinute !== undefined) {
			const neurons = minutes * row.neuronsPerMinute;
			totalNeurons += neurons;
			neuronRows.push({ label: row.label, neurons });
			continue;
		}

		const included = row.included ?? 0;
		const rate = row.rate ?? 0;
		const billableMinutes = Math.max(0, minutes - included);
		const cost = billableMinutes * rate;
		total += cost;
		costShares[row.group] += cost;

		if (minutes > 0 || cost > 0) {
			breakdown.push({ label: row.label, cost });
		}
	}

	const billableNeurons = Math.max(0, totalNeurons - freeNeurons);
	const transcriptionCost = billableNeurons * WORKERS_AI_NEURON_RATE;
	total += transcriptionCost;
	costShares.transcription += transcriptionCost;

	for (const { label, neurons } of neuronRows) {
		const rowCost =
			totalNeurons > 0 ? transcriptionCost * (neurons / totalNeurons) : 0;
		if (neurons > 0 || rowCost > 0) {
			breakdown.push({ label, cost: rowCost });
		}
	}

	return {
		total,
		annualized: total * 12,
		costShares,
		breakdown,
		billableNeurons,
		totalNeurons,
	};
}

export function formatMoney(value: number): string {
	const formatted = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
	return formatted.replace(/\.00$/, "");
}

export function formatNumber(value: number): string {
	return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
		value,
	);
}
