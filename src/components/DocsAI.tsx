import { useState } from "react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Ring } from "ldrs/react";
import { MdOutlineThumbUp, MdOutlineThumbDown } from "react-icons/md";
import { track } from "~/util/zaraz";
import "ldrs/react/Ring.css";

type Messages = {
	role: "user" | "assistant";
	content: string;
	queryId?: string;
	sources?: { title: string; file_path: string }[];
}[];

async function sendCSATFeedback(queryId: string, positive: boolean) {
	try {
		await fetch("https://support-ai.cloudflaresupport.workers.dev/csat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				queryId,
				positive,
			}),
		});
	} catch (error) {
		console.error("Failed to send CSAT feedback:", error);
	}
}

function TrackedLink({
	href,
	children,
}: {
	href?: string;
	children?: React.ReactNode;
}) {
	return (
		<a
			href={href}
			target="_blank"
			onClick={() =>
				track("click chat link", {
					value: children?.toString() ?? "",
					href,
				})
			}
		>
			{children}
		</a>
	);
}

function Messages({
	messages,
	loading,
}: {
	messages: Messages;
	loading: boolean;
}) {
	const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set());

	const classes = {
		base: "w-fit max-w-3/4 rounded p-4",
		user: "bg-cl1-brand-orange text-cl1-black self-end",
		assistant: "self-start bg-(--sl-color-bg-nav)",
	};

	const handleFeedback = async (queryId: string, positive: boolean) => {
		track("submit chat feedback", {
			value: positive.toString(),
		});
		await sendCSATFeedback(queryId, positive);
		setFeedbackGiven((prev) => new Set(prev).add(queryId));
	};

	return (
		<div className="flex flex-col justify-center gap-4">
			{messages
				.filter((message) => Boolean(message.content))
				.map((message, index) => (
					<div key={index} className="flex flex-col gap-2">
						<div
							className={`${classes.base} ${message.role === "user" ? classes.user : classes.assistant}`}
						>
							<Markdown
								remarkPlugins={[remarkGfm, remarkBreaks]}
								components={{
									a: TrackedLink,
								}}
							>
								{message.content}
							</Markdown>
							{message.sources && (
								<>
									<p>
										I used these sources to answer your question, please review
										them if you need more information:
									</p>
									<ul>
										{message.sources.map((source) => (
											<li key={source.file_path}>
												<TrackedLink href={source.file_path}>
													{source.title}
												</TrackedLink>
											</li>
										))}
									</ul>
								</>
							)}
							{message.role === "assistant" && message.queryId && (
								<div className="not-content flex gap-2 self-start">
									{feedbackGiven.has(message.queryId) ? (
										<span>Thanks for your feedback!</span>
									) : (
										<>
											<button
												onClick={() => handleFeedback(message.queryId!, true)}
												className="cursor-pointer rounded bg-transparent p-2"
												title="Thumbs up"
											>
												<MdOutlineThumbUp className="size-6 hover:text-green-600" />
											</button>
											<button
												onClick={() => handleFeedback(message.queryId!, false)}
												className="cursor-pointer rounded bg-transparent p-2"
												title="Thumbs down"
											>
												<MdOutlineThumbDown className="size-6 hover:text-red-600" />
											</button>
										</>
									)}
								</div>
							)}
						</div>
					</div>
				))}
			{loading && (
				<div className={`${classes.base} ${classes.assistant}`}>
					<Ring size={16} speed={1} color="var(--color-cl1-brand-orange)" />
				</div>
			)}
		</div>
	);
}

export default function SupportAI() {
	const [threadId, setThreadId] = useState<string | undefined>();
	const [question, setQuestion] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const [messages, setMessages] = useState<Messages>([]);

	async function handleSubmit() {
		track("submit chat", {
			value: question,
		});

		setLoading(true);
		setMessages((messages) => [
			...messages,
			{ role: "user", content: question },
			{ role: "assistant", content: "" },
		]);
		setQuestion("");

		const controller = new AbortController();
		const { signal } = controller;

		let chunkedAnswer = "";
		let sources: Messages[number]["sources"] = [];
		let currentQueryId: string | undefined;

		await fetchEventSource(
			// "http://localhost:8010/proxy/devdocs/ask",
			"https://support-ai.cloudflaresupport.workers.dev/devdocs/ask",
			{
				method: "POST",
				body: JSON.stringify({
					question,
					threadId,
				}),
				signal,
				openWhenHidden: true,
				async onopen(response) {
					if (!response.ok) {
						throw new Error(response.status.toString());
					}

					return;
				},
				onerror(error) {
					if (error instanceof Error) {
						setLoading(false);
						setMessages((messages) => [
							...messages,
							{
								role: "assistant",
								content:
									"We are experiencing errors with your request. These errors can be due to too many requests or an issue with our upstream model availability.\n\nTry asking again later. If that does not work, search [our docs](/search/) or the [Cloudflare Community](community.cloudflare.com/search).",
							},
						]);
						throw error;
					}
				},
				onmessage(ev) {
					if (ev.data === "[DONE]") {
						controller.abort();

						setMessages((messages) => {
							const newMessages = [...messages];
							const lastMessage = newMessages[newMessages.length - 1];

							if (sources) {
								lastMessage.sources = sources;
							}

							if (currentQueryId) {
								lastMessage.queryId = currentQueryId;
							}

							return newMessages;
						});
					}

					const { threadId, response, queryId, botResponse } = JSON.parse(
						ev.data,
					);

					if (queryId) {
						currentQueryId = queryId;
					}

					if (botResponse?.sources) {
						sources = botResponse.sources;
					}

					if (threadId) {
						setThreadId(threadId);
					}

					if (!response) return;

					chunkedAnswer += response;

					setLoading(false);
					setMessages((messages) => {
						const newMessages = [...messages];
						newMessages[newMessages.length - 1].content = chunkedAnswer;
						return newMessages;
					});
				},
			},
		);
	}

	return (
		<div>
			<Messages messages={messages} loading={loading} />
			<div className="flex items-center justify-center gap-4">
				<textarea
					className="w-full rounded p-2"
					placeholder="Ask a question..."
					value={question}
					disabled={loading}
					onChange={(e) => setQuestion(e.target.value)}
					onKeyDown={async (e) => {
						if (e.key === "Enter" && !e.shiftKey && !loading) {
							e.preventDefault();
							await handleSubmit();
						}
					}}
				/>
			</div>
			<p className="text-center text-xs">
				Use of Docs AI is subject to the Cloudflare Website and Online Services{" "}
				<a href="https://www.cloudflare.com/website-terms/">Terms of Use</a>.
				You acknowledge and agree that the output generated by Docs AI has not
				been verified by Cloudflare for accuracy and does not represent
				Cloudflare's views.
			</p>
		</div>
	);
}
