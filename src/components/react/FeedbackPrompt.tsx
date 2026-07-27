// "Was this helpful?" docs feedback widget. Ported from the Starlight
// src/components/FeedbackPrompt.tsx, re-themed onto nimbus tokens.
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { track } from "~/util/zaraz";
import PhosphorIcon from "./PhosphorIcon";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const questions = {
	yes: Object.entries({
		Accurate: "accurate",
		"Easy to understand": "easy-to-understand",
		"Solved my problem": "solved-my-problem",
		"Helped me decide to use the product":
			"helped-me-decide-to-use-the-product",
		Other: "other-yes",
	}),
	no: Object.entries({
		"Hard to understand": "hard-to-understand",
		"Incorrect information": "incorrect-information",
		"Missing the information": "missing-the-information",
		Other: "other-no",
	}),
} as const;

function Buttons({
	setTitle,
	setOption,
}: {
	setTitle: SetState<string>;
	setOption: SetState<"yes" | "no" | undefined>;
}) {
	return (
		<div className="mt-3 flex gap-2">
			<button
				onClick={() => {
					setTitle("What did you like?");
					setOption("yes");
				}}
				className="border-border bg-background text-foreground hover:bg-accent hover:text-foreground inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-[13px] font-medium shadow-none transition-colors duration-150"
			>
				<PhosphorIcon name="thumbs-up" className="size-[18px] opacity-70" />
				<span>Yes</span>
			</button>
			<button
				onClick={() => {
					setTitle("What went wrong?");
					setOption("no");
				}}
				className="border-border bg-background text-foreground hover:bg-accent hover:text-foreground inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-[13px] font-medium shadow-none transition-colors duration-150"
			>
				<PhosphorIcon name="thumbs-down" className="size-[18px] opacity-70" />
				<span>No</span>
			</button>
		</div>
	);
}

function Form({
	option,
	setTitle,
	setSubmitted,
}: {
	option?: "yes" | "no";
	setTitle: SetState<string>;
	setSubmitted: SetState<boolean>;
}) {
	if (!option) {
		return null;
	}

	const [selectedReason, setSelectedReason] = useState(false);
	const [passedTurnstile, setPassedTurnstile] = useState(false);

	function submit(formData: FormData) {
		track("submit docs feedback", {
			selected_option: option,
			selected_reason: formData.get("reason"),
		});
		formData.set("option", option!);

		formData.set("page", document.location.pathname);
		formData.set("referrer", document.referrer);

		fetch("https://feedback.developers.cloudflare.com", {
			method: "POST",
			body: formData,
		});

		setTitle("Thank you for helping improve Cloudflare's documentation!");
		setSubmitted(true);
	}

	return (
		<form action={submit} className="mt-3 flex flex-col gap-2">
			<fieldset className="m-0 border-0 p-0">
				<legend className="sr-only">
					{option === "yes" ? "What did you like?" : "What went wrong?"}
				</legend>
				<div className="flex flex-col gap-1.5">
					{questions[option].map(([label, value]) => (
						<label
							key={value}
							className="border-border text-foreground hover:bg-accent has-[:checked]:border-primary has-[:focus-visible]:border-primary relative flex cursor-pointer items-center gap-2.5 rounded-lg border px-2.5 py-2 text-[13px] transition-colors duration-150 select-none has-[:focus-visible]:outline-none"
						>
							<input
								type="radio"
								name="reason"
								value={value}
								onChange={() => setSelectedReason(true)}
								className="peer absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
							/>
							<span className="border-border peer-checked:border-primary peer-focus-visible:border-primary inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-150">
								<span className="bg-primary h-2 w-2 scale-0 rounded-full transition-transform duration-150 [label:has(:checked)_&]:scale-100 [label:has(:focus-visible)_&]:scale-100" />
							</span>
							<span className="leading-tight">{label}</span>
						</label>
					))}
				</div>
			</fieldset>
			<textarea
				name="info"
				rows={2}
				placeholder="Tell us more about your experience."
				className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary mt-1 w-full resize-none rounded-lg border px-3 py-2 text-[13px] transition-colors duration-150 outline-none focus:outline-none"
			/>
			<Turnstile
				siteKey="0x4AAAAAAA645TGhxiBMQ7Gu"
				options={{ size: "compact" }}
				onSuccess={() => setPassedTurnstile(true)}
			/>
			<button
				type="submit"
				disabled={!selectedReason || !passedTurnstile}
				className="bg-primary text-primary-foreground mt-1 inline-flex h-8 w-max cursor-pointer items-center justify-center rounded-lg border-0 px-4 text-[13px] font-medium shadow-none transition-colors duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
			>
				Submit
			</button>
		</form>
	);
}

function SuccessState() {
	return (
		<div className="border-success/20 bg-success/10 text-success mt-3 flex items-center gap-2 rounded-lg border px-3 py-2.5 text-[13px]">
			<PhosphorIcon name="check-circle" className="size-4" />
			<span>Thank you for your feedback!</span>
		</div>
	);
}

export default function FeedbackPrompt({
	id = "feedback-form",
}: {
	// Distinct per placement — the two DocsLayout copies can coexist in the DOM.
	id?: string;
}) {
	const [title, setTitle] = useState("Was this helpful?");
	const [option, setOption] = useState<"yes" | "no">();
	const [submitted, setSubmitted] = useState(false);

	return (
		<div id={id}>
			{!submitted && (
				<p className="text-muted-foreground m-0 text-[11px] font-semibold tracking-widest uppercase">
					{title}
				</p>
			)}
			{!option && !submitted && (
				<Buttons setTitle={setTitle} setOption={setOption} />
			)}
			{!submitted && (
				<Form setTitle={setTitle} setSubmitted={setSubmitted} option={option} />
			)}
			{submitted && <SuccessState />}
		</div>
	);
}
