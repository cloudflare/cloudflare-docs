// A browser window showing the terminal page from Open a terminal in the
// browser. The screen is real text copied from a deployed run of the page's
// code, so it wraps, selects, and reaches search like prose. The browser
// frame follows the site theme; the terminal keeps xterm.js's black
// background and tmux's default green status line, as readers see them.
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

// tmux's default status style is black on green; xterm.js draws that green
// as #4e9a06.
const STATUS_GREEN = "#4e9a06";

export function BrowserTerminal({ url, lines, status }: BrowserTerminalProps) {
	return (
		<DiagramStage className="mt-4">
			<div className="px-3 py-5 sm:px-6">
				<div className="mx-auto max-w-[40rem] overflow-hidden rounded-md border border-neutral-200 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
					<div className="flex items-center gap-3 border-b border-neutral-200 px-3 py-2 dark:border-neutral-800">
						<span aria-hidden="true" className="flex shrink-0 gap-1.5">
							{[0, 1, 2].map((i) => (
								<span
									key={i}
									className="size-2.5 rounded-full bg-neutral-200 dark:bg-neutral-700"
								/>
							))}
						</span>
						<span className="min-w-0 flex-1 truncate rounded-sm bg-neutral-100 px-2 py-1 font-mono text-[11px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
							{url}
						</span>
					</div>
					<div className="flex min-h-[15rem] flex-col bg-black font-mono text-[11px] leading-[1.5] text-neutral-100">
						<pre className="m-0 flex-1 overflow-hidden bg-transparent p-2 break-all whitespace-pre-wrap">
							{lines.join("\n")}
							{"\n"}
							<span
								aria-hidden="true"
								className="inline-block h-[1.5em] w-[0.6em] bg-neutral-100 align-top"
							/>
						</pre>
						<div
							className="flex justify-between gap-4 px-2 text-black"
							style={{ backgroundColor: STATUS_GREEN }}
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
