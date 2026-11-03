// A browser window showing the terminal page from Open a terminal in the
// browser. The screen is real text copied from a deployed run of the page's
// code, so it wraps, selects, and reaches search like prose. The browser
// frame and the screen use the same theme tokens as the site's code blocks,
// so the figure changes with light and dark mode. The status line stays
// green, tinted from the theme's success color, because the page tells
// readers to look for tmux's green status line. Prompts are muted so the
// commands and their output stand out.
// Static: rendered on the server with no client script.
import { DiagramStage } from "@/components/react/diagram";

export interface BrowserTerminalProps {
	/** Address bar text. */
	url: string;
	/** Terminal screen, one entry per line, in the order they printed. */
	lines: string[];
	/** tmux status line, left and right parts. */
	status: { left: string; right: string };
}

// A shell prompt such as `root@1f2e:~# `: user@host, a directory, then # or $.
const PROMPT = /^(\S+@\S+:\S*[#$] )(.*)$/;

function Line({ text }: { text: string }) {
	const match = PROMPT.exec(text);
	if (!match) return <>{text}</>;
	return (
		<>
			<span style={{ color: "var(--nb-muted-foreground)" }}>{match[1]}</span>
			{match[2]}
		</>
	);
}

export function BrowserTerminal({ url, lines, status }: BrowserTerminalProps) {
	return (
		<DiagramStage className="mt-4">
			<div className="px-3 py-5 sm:px-6">
				<div
					className="mx-auto max-w-[40rem] overflow-hidden rounded-md border shadow-xs"
					style={{
						borderColor: "var(--nb-border)",
						backgroundColor: "var(--nb-card)",
					}}
				>
					<div
						className="flex items-center gap-3 border-b px-3 py-2"
						style={{
							borderColor: "var(--nb-border)",
							backgroundColor: "var(--nb-surface-sunken)",
						}}
					>
						<span aria-hidden="true" className="flex shrink-0 gap-1.5">
							{[0, 1, 2].map((i) => (
								<span
									key={i}
									className="size-2.5 rounded-full"
									style={{ backgroundColor: "var(--nb-border-strong)" }}
								/>
							))}
						</span>
						<span
							className="min-w-0 flex-1 truncate rounded-sm border px-2 py-1 font-mono text-[11px]"
							style={{
								borderColor: "var(--nb-border)",
								backgroundColor: "var(--nb-card)",
								color: "var(--nb-muted-foreground)",
							}}
						>
							{url}
						</span>
					</div>
					<div
						className="flex min-h-[15rem] flex-col font-mono text-[11px] leading-[1.5]"
						style={{ color: "var(--nb-foreground)" }}
					>
						<pre className="m-0 flex-1 overflow-hidden bg-transparent px-3 py-2.5 break-all whitespace-pre-wrap">
							{lines.map((line, i) => (
								<span key={i}>
									<Line text={line} />
									{"\n"}
								</span>
							))}
							<span
								aria-hidden="true"
								className="inline-block h-[1.5em] w-[0.6em] align-top"
								style={{ backgroundColor: "var(--color-brand)" }}
							/>
						</pre>
						<div
							className="flex justify-between gap-4 px-3 py-0.5"
							style={{
								color: "var(--nb-success)",
								backgroundColor:
									"color-mix(in oklch, var(--nb-success) 18%, transparent)",
							}}
						>
							<span className="whitespace-pre">{status.left}</span>
							<span className="hidden truncate whitespace-pre sm:inline">
								{status.right}
							</span>
						</div>
					</div>
				</div>
			</div>
		</DiagramStage>
	);
}

export default BrowserTerminal;
