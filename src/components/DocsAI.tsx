import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Ring } from "ldrs/react";
import { MdOutlineThumbUp, MdOutlineThumbDown } from "react-icons/md";
import { track } from "~/util/zaraz";
import "ldrs/react/Ring.css";
import { PiSparkle, PiX } from "react-icons/pi";
import {
	RiCollapseHorizontalLine,
	RiExpandHorizontalLine,
} from "react-icons/ri";

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
		base: "",
		user: "max-w-3/4 py-2 px-3 bg-cl1-brand-orange dark:bg-cl1-brand-orange/60 text-white self-end rounded-lg rounded-tr-none",
		assistant: "",
	};

	const handleFeedback = async (queryId: string, positive: boolean) => {
		track("submit chat feedback", {
			value: positive.toString(),
		});
		await sendCSATFeedback(queryId, positive);
		setFeedbackGiven((prev) => new Set(prev).add(queryId));
	};

	return (
		<div className="flex flex-1 flex-col gap-4 text-sm">
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

export default function SupportAI({
	enableHeader = false,
	maximized,
	setMaximized,
	onClose,
}: {
	enableHeader?: boolean;
	maximized?: boolean;
	setMaximized?: React.Dispatch<React.SetStateAction<boolean>>;
	onClose?: () => void;
}) {
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
		<div className="flex size-full flex-col">
			{enableHeader && (
				<div className="flex items-center justify-between p-3">
					<div className="flex flex-1 items-center gap-1.5">
						<PiSparkle className="translate-y-1" />
						<div className="relative flex flex-col gap-0">
							<h3>Assistant</h3>
							<span className="absolute -bottom-2 w-max text-[9px] font-normal">
								Powered by <a href="#">AutoRAG</a>
							</span>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<button
							className="hidden size-7 cursor-pointer items-center justify-center bg-transparent text-zinc-400 lg:flex"
							onClick={() => setMaximized?.((prev) => !prev)}
						>
							{maximized ? (
								<RiCollapseHorizontalLine className="size-4" />
							) : (
								<RiExpandHorizontalLine className="size-4" />
							)}
						</button>

						<button
							className="flex size-7 cursor-pointer items-center justify-center bg-transparent text-zinc-400"
							onClick={() => onClose?.()}
						>
							<PiX className="size-4" />
						</button>
					</div>
				</div>
			)}

			<div className="flex-1 overflow-y-auto px-3 wrap-break-word">
				<p className="mt-2 mb-4 rounded-md border border-orange-600/20 bg-orange-700/10 p-3 px-3 text-center text-xs text-balance dark:text-zinc-500">
					Use of Ask AI is subject to{" "}
					<a href="https://www.cloudflare.com/website-terms/">Terms of Use</a>
					.<br />
					Response is generated by AI and may contain mistakes.
				</p>

				<Messages messages={messages} loading={loading} />
			</div>

			<div className="flex items-center justify-center gap-4 p-2.5">
				<textarea
					className="max-h-48 min-h-24 w-full resize-none rounded-md border border-neutral-200 bg-neutral-100 p-2 text-sm focus:outline-orange-400 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:outline-orange-600"
					placeholder="Ask a question..."
					value={question}
					disabled={loading}
					onChange={(e) => setQuestion(e.target.value)}
					onKeyDown={async (e) => {
						if (e.key === "Enter" && !e.shiftKey && !loading) {
							e.preventDefault();
							await handleSubmit();
						}
						const textarea = e.currentTarget;
						textarea.style.height = "auto";
						textarea.style.height = `${Math.min(textarea.scrollHeight, 192)}px`;
					}}
				/>
			</div>
		</div>
	);
}

export function AskAIOverlay() {
	const [maximized, setMaximized] = useState<boolean>(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handleToggleAskAI = () => {
			setOpen((prev) => !prev);
		};

		window.addEventListener("toggle-ask-ai", handleToggleAskAI);

		return () => {
			window.removeEventListener("toggle-ask-ai", handleToggleAskAI);
		};
	}, []);

	if (!open) return null;

	return (
		<div
			className={
				"fixed top-24 right-0 bottom-0 left-0 h-[calc(100vh-6rem)] w-full max-w-full border-neutral-200 bg-white transition-all md:top-16 md:left-auto md:h-[calc(100vh-4rem)] md:w-86 md:border-l dark:border-neutral-800 dark:bg-neutral-900" +
				(maximized ? " lg:w-128" : "")
			}
		>
			<SupportAI
				enableHeader
				maximized={maximized}
				setMaximized={setMaximized}
				onClose={() => setOpen(false)}
			/>
		</div>
	);
}
