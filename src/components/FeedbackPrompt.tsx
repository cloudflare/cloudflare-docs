import { useState } from "react";
import {
	MdOutlineThumbUp,
	MdOutlineThumbDown,
	MdCheckCircleOutline,
} from "react-icons/md";
import { Turnstile } from "@marsidev/react-turnstile";
import { track } from "~/util/zaraz";

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
				className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border-0 bg-[var(--sl-color-bg-nav)] px-3 text-[13px] font-medium text-[var(--sl-color-text)] shadow-none ring-1 ring-[var(--sl-color-hairline)] transition-colors duration-150 hover:bg-[var(--color-cl1-gray-9)] hover:ring-[var(--sl-color-gray-3)] dark:hover:bg-[var(--color-cl1-gray-2)]"
			>
				<MdOutlineThumbUp size={18} className="opacity-70" />
				<span>Yes</span>
			</button>
			<button
				onClick={() => {
					setTitle("What went wrong?");
					setOption("no");
				}}
				className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border-0 bg-[var(--sl-color-bg-nav)] px-3 text-[13px] font-medium text-[var(--sl-color-text)] shadow-none ring-1 ring-[var(--sl-color-hairline)] transition-colors duration-150 hover:bg-[var(--color-cl1-gray-9)] hover:ring-[var(--sl-color-gray-3)] dark:hover:bg-[var(--color-cl1-gray-2)]"
			>
				<MdOutlineThumbDown size={18} className="opacity-70" />
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
							className="relative flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-[var(--sl-color-text)] ring-1 ring-[var(--sl-color-hairline)] transition-colors duration-150 select-none hover:bg-[var(--color-cl1-gray-9)] hover:ring-[var(--sl-color-gray-3)] has-[:checked]:ring-[var(--sl-color-text-accent)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--sl-color-text-accent)] has-[:focus-visible]:outline-none dark:hover:bg-[var(--color-cl1-gray-2)]"
						>
							<input
								type="radio"
								name="reason"
								value={value}
								onChange={() => setSelectedReason(true)}
								className="peer absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
							/>
							{/* Outer ring — becomes accent-colored when checked or focused */}
							<span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ring-1 ring-[var(--sl-color-gray-3)] transition-all duration-150 peer-checked:ring-2 peer-checked:ring-[var(--sl-color-text-accent)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--sl-color-text-accent)]">
								{/* Inner dot — visible when checked or focused */}
								<span className="h-2 w-2 scale-0 rounded-full bg-[var(--sl-color-text-accent)] transition-transform duration-150 [label:has(:checked)_&]:scale-100 [label:has(:focus-visible)_&]:scale-100" />
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
				className="mt-1 w-full resize-none rounded-lg border-0 bg-white px-3 py-2 text-[13px] text-[var(--sl-color-text)] ring-1 ring-[var(--sl-color-hairline)] transition-all duration-150 outline-none placeholder:text-[var(--sl-color-gray-3)] focus:ring-2 focus:ring-[var(--sl-color-text-accent)] dark:bg-[var(--sl-color-bg-nav)]"
			/>
			<Turnstile
				siteKey="0x4AAAAAAA645TGhxiBMQ7Gu"
				options={{ size: "compact" }}
				onSuccess={() => setPassedTurnstile(true)}
			/>
			<button
				type="submit"
				disabled={!selectedReason || !passedTurnstile}
				className="mt-1 inline-flex h-8 w-max cursor-pointer items-center justify-center rounded-lg border-0 bg-[var(--sl-color-text-accent)] px-4 text-[13px] font-medium text-white shadow-none transition-colors duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
			>
				Submit
			</button>
		</form>
	);
}

function SuccessState() {
	return (
		<div className="mt-3 flex items-center gap-2 rounded-lg bg-[var(--color-cl1-green-9)] px-3 py-2.5 text-[13px] text-[var(--color-cl1-green-5)] dark:bg-[var(--color-cl1-green-0)] dark:text-[var(--color-cl1-green-7)]">
			<MdCheckCircleOutline size={16} />
			<span>Thank you for your feedback!</span>
		</div>
	);
}

export default function FeedbackPrompt() {
	const [title, setTitle] = useState("Was this helpful?");
	const [option, setOption] = useState<"yes" | "no">();
	const [submitted, setSubmitted] = useState(false);

	return (
		<div id="feedback-form">
			{!submitted && (
				<p className="m-0 text-[11px] font-semibold tracking-widest text-[var(--sl-color-gray-3)] uppercase">
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
