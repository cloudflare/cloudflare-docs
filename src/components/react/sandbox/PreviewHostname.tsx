// Preview hostname anatomy (Serve previews on their own hostnames). One
// preview URL, repeated once for each part that matters, in the order a
// request meets them: the domain brings it to your Worker, the name picks
// the sandbox, and the path reaches the server. The URL is monospaced and
// left-aligned in every row, so each part stays in place and only the
// highlight moves. Static: rendered on the server with no client script.
import type { ReactNode } from "react";
import { DiagramStage } from "@/components/react/diagram";
import { cn } from "@/lib/cn";
import type { DiagramFallbackProps } from "../container/DiagramFallback";

type Part = "domain" | "name" | "path";

const URL_PARTS: { id: Part | "scheme"; text: string }[] = [
	{ id: "scheme", text: "https://" },
	{ id: "name", text: "ada" },
	{ id: "domain", text: ".example-previews.com" },
	{ id: "path", text: "/app/" },
];

function Code({ children }: { children: string }) {
	return (
		<code className="rounded-sm bg-neutral-100 px-1 py-0.5 font-mono text-[0.85em] dark:bg-neutral-800">
			{children}
		</code>
	);
}

const ROWS: { part: Part; text: string; body: ReactNode }[] = [
	{
		part: "domain",
		text: ".example-previews.com",
		body: (
			<>
				A wildcard DNS record and the route{" "}
				<Code>*.example-previews.com/*</Code> send every preview hostname to
				your Worker.
			</>
		),
	},
	{
		part: "name",
		text: "ada",
		body: (
			<>
				Your Worker reads the sandbox name and calls{" "}
				<Code>getByName("ada")</Code>. A name that is not a valid DNS label gets
				a <Code>404</Code>.
			</>
		),
	},
	{
		part: "path",
		text: "/app/",
		body: (
			<>
				The path reaches the web server in the container unchanged, with the
				preview hostname in the <Code>Host</Code> header.
			</>
		),
	},
];

function HighlightedUrl({ part }: { part: Part }) {
	return (
		<span aria-hidden="true" className="font-mono whitespace-nowrap">
			{URL_PARTS.map((p) => (
				<span
					key={p.id}
					className={cn(
						"rounded-sm",
						p.id === part ? "px-px" : "text-neutral-400 dark:text-neutral-500",
					)}
					style={
						p.id === part
							? {
									color: "var(--color-brand)",
									backgroundColor:
										"color-mix(in oklch, var(--color-brand) 12%, transparent)",
								}
							: undefined
					}
				>
					{p.text}
				</span>
			))}
		</span>
	);
}

export function PreviewHostname(_props: DiagramFallbackProps) {
	return (
		<DiagramStage className="mt-4">
			<div className="px-3 py-5 sm:px-6">
				<dl className="mx-auto max-w-[40rem] divide-y divide-neutral-200 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-xs dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
					{ROWS.map((row) => (
						<div key={row.part} className="grid gap-1 px-4 py-3">
							<dt className="text-[12px] sm:text-sm">
								<span className="sr-only">{row.text}</span>
								<HighlightedUrl part={row.part} />
							</dt>
							<dd className="m-0 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
								{row.body}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</DiagramStage>
	);
}

export default PreviewHostname;
