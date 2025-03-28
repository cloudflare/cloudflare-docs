import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { MdOutlineThumbUp, MdOutlineThumbDown } from "react-icons/md";

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
		<>
			<button
				onClick={() => {
					setTitle("What did you like?");
					setOption("yes");
				}}
				className="cursor-pointer bg-transparent"
			>
				<MdOutlineThumbUp className="text-2xl text-sl hover:text-accent" />
			</button>
			<button
				onClick={() => {
					setTitle("What went wrong?");
					setOption("no");
				}}
				className="cursor-pointer bg-transparent"
			>
				<MdOutlineThumbDown className="text-2xl text-sl hover:text-accent" />
			</button>
		</>
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
		<form action={submit}>
			{questions[option].map(([label, value]) => (
				<label key={value} className="mb-2 block text-xs">
					<input
						type="radio"
						name="reason"
						value={value}
						onChange={() => setSelectedReason(true)}
						className="mr-2 align-middle"
					/>
					{label}
				</label>
			))}
			<textarea
				name="info"
				placeholder="Tell us more about your experience."
				className="mb-2 block resize-none text-xs"
			/>
			<Turnstile
				siteKey="0x4AAAAAAA645TGhxiBMQ7Gu"
				options={{ size: "compact" }}
				onSuccess={() => setPassedTurnstile(true)}
			/>
			<input
				type="submit"
				value="Submit"
				disabled={!selectedReason || !passedTurnstile}
				className="mt-2"
			/>
		</form>
	);
}

export default function FeedbackPrompt() {
	const [title, setTitle] = useState("Was this helpful?");
	const [option, setOption] = useState<"yes" | "no">();
	const [submitted, setSubmitted] = useState(false);

	return (
		<div>
			<h2>{title}</h2>
			{!option && <Buttons setTitle={setTitle} setOption={setOption} />}
			{!submitted && (
				<Form setTitle={setTitle} setSubmitted={setSubmitted} option={option} />
			)}
		</div>
	);
}
