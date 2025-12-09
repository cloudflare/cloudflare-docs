import { useMemo } from "react";
import { useFramework } from "../hooks/useFramework";
import uikit from "../../../util/realtimekit/ui-kit.ts";
import core from "../../../util/realtimekit/web-core.ts";

const renderChange = (change: string) => {
	const segments = change.split("```");

	// No fenced code blocks, only possible inline code with single backticks
	if (segments.length === 1) {
		const inline = segments[0];
		const inlineParts = inline.split("`");

		if (inlineParts.length === 1) {
			return <>{inline}</>;
		}

		return (
			<>
				{inlineParts.map((part, idx) => {
					const isInlineCode = idx % 2 === 1;

					if (!part) return null;

					if (isInlineCode) {
						return (
							<code
								key={idx}
								className="rounded bg-neutral-900/5 px-1 py-[1px] font-mono text-[0.9em] text-neutral-900 dark:bg-neutral-100/10 dark:text-neutral-100"
							>
								{part}
							</code>
						);
					}

					return <span key={idx}>{part}</span>;
				})}
			</>
		);
	}

	// Has fenced code blocks (```...```)
	return (
		<>
			{segments.map((segment, index) => {
				const isCode = index % 2 === 1;

				if (!segment) return null;

				if (isCode) {
					return (
						<pre
							key={index}
							className="m-0 mt-1 mb-2 overflow-x-auto rounded bg-neutral-100 px-3 py-2 text-sm text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
						>
							<code>{segment.trim()}</code>
						</pre>
					);
				}

				// For the non-code portions around ``` blocks, also support inline `code`
				const inlineParts = segment.split("`");

				if (inlineParts.length === 1) {
					return (
						<p key={index} className="m-0">
							{segment}
						</p>
					);
				}

				return (
					<p key={index} className="m-0">
						{inlineParts.map((part, idx) => {
							const isInlineCode = idx % 2 === 1;

							if (!part) return null;

							if (isInlineCode) {
								return (
									<code
										key={idx}
										className="rounded bg-neutral-900/5 px-1 py-[1px] font-mono text-[0.9em] text-neutral-900 dark:bg-neutral-100/10 dark:text-neutral-100"
									>
										{part}
									</code>
								);
							}

							return <span key={idx}>{part}</span>;
						})}
					</p>
				);
			})}
		</>
	);
};

const ReleaseNotes = ({ type }: { type: "ui-kit" | "core" }) => {
	const { platform, framework } = useFramework();

	const notes = useMemo(() => {
		if (platform === "web") {
			if (type === "ui-kit") return uikit;
			return core;
		}
		return [];
	}, [framework, platform, type]);

	if (notes?.length < 1) {
		return <div>No releas notes found!</div>;
	}

	return (
		<div className="mt-6 flex w-full flex-col items-start justify-start">
			{notes.map((note: any) => (
				<div
					key={note.version}
					className="flex w-full flex-col items-start justify-start gap-0"
				>
					<div className="m-0 p-0 text-2xl font-bold">v{note.version}</div>
					<div className="m-0 mb-2 p-0 text-sm text-neutral-600">
						Released on {new Date(note.createdAt).toDateString()}
					</div>
					{note["breaking-changes"]?.length > 0 && (
						<div className="m-0 grid w-full grid-cols-4 gap-2 border-b-[1px] border-neutral-200 dark:border-neutral-700">
							<div className="text-cl1-red-5 col-span-1 py-2 font-medium">
								Breaking Changes
							</div>
							<div className="border-cl1-red-5 bg-cl1-red-5/10 col-span-3 m-0 border-l-2 p-2">
								{note["breaking-changes"].map(
									(change: string, index: number) => (
										<div
											key={index}
											className={`${index === note["breaking-changes"].length - 1 && index !== 0 ? "border-b-[1px] border-neutral-200 dark:border-neutral-700" : ""} py-2`}
										>
											{renderChange(change)}
										</div>
									),
								)}
							</div>
						</div>
					)}
					{note["dep_api"]?.length > 0 && (
						<div className="m-0 grid w-full grid-cols-4 gap-2 border-b-[1px] border-neutral-200 dark:border-neutral-700">
							<div className="text-cl1-red-5 col-span-1 py-2 font-medium">
								Deprecated API
							</div>
							<div className="border-cl1-red-5 bg-cl1-red-5/10 col-span-3 m-0 border-l-2 p-2">
								{note["dep_api"].map((change: string, index: number) => (
									<div
										key={index}
										className={`${index === note["dep_api"].length - 1 && index !== 0 ? "border-b-[1px] border-neutral-200 dark:border-neutral-700" : ""} py-2`}
									>
										{renderChange(change)}
									</div>
								))}
							</div>
						</div>
					)}
					{note["features"]?.length > 0 && (
						<div className="m-0 grid w-full grid-cols-4 gap-2 border-b-[1px] border-neutral-200 dark:border-neutral-700">
							<div className="col-span-1 py-2 font-medium text-neutral-700 dark:text-neutral-200">
								Features
							</div>
							<div className="col-span-3 m-0 border-l-2 border-emerald-300 p-2">
								{note["features"].map((change: string, index: number) => (
									<div
										key={index}
										className={`m-0 p-0 ${index !== note["features"].length - 1 ? "border-b-[1px] border-neutral-200 dark:border-neutral-700" : ""} py-2`}
									>
										{renderChange(change)}
									</div>
								))}
							</div>
						</div>
					)}
					{note["fixes"]?.length > 0 && (
						<div className="m-0 grid w-full grid-cols-4 gap-2 border-b-[1px] border-neutral-200 dark:border-neutral-700">
							<div className="col-span-1 py-2 font-medium text-neutral-700 dark:text-neutral-200">
								Fixed Issues
							</div>
							<div className="col-span-3 m-0 border-l-2 border-amber-500 p-2">
								{note["fixes"].map((change: string, index: number) => (
									<div
										key={index}
										className={`m-0 p-0 ${index !== note["fixes"].length - 1 ? "border-b-[1px] border-neutral-200 dark:border-neutral-700" : ""} py-2`}
									>
										{renderChange(change)}
									</div>
								))}
							</div>
						</div>
					)}
					{note["enhancements"]?.length > 0 && (
						<div className="m-0 grid w-full grid-cols-4 gap-2 border-b-[1px] border-neutral-200 dark:border-neutral-700">
							<div className="col-span-1 py-2 font-medium text-neutral-700 dark:text-neutral-200">
								Enhancements
							</div>
							<div className="col-span-3 m-0 border-l-2 border-blue-500 p-2">
								{note["enhancements"].map((change: string, index: number) => (
									<div
										key={index}
										className={`m-0 p-0 ${index !== note["enhancements"].length - 1 ? "border-b-[1px] border-neutral-200 dark:border-neutral-700" : ""} py-2`}
									>
										{renderChange(change)}
									</div>
								))}
							</div>
						</div>
					)}

					{note["perf"]?.length > 0 && (
						<div className="m-0 grid w-full grid-cols-4 gap-2 border-b-[1px] border-neutral-200 dark:border-neutral-700">
							<div className="col-span-1 py-2 font-medium text-neutral-700 dark:text-neutral-200">
								Performance
							</div>
							<div className="col-span-3 m-0 border-l-2 border-blue-800 p-2">
								{note["perf"].map((change: string, index: number) => (
									<div
										key={index}
										className={`m-0 p-0 ${index !== note["perf"].length - 1 ? "border-b-[1px] border-neutral-200 dark:border-neutral-700" : ""} py-2`}
									>
										{renderChange(change)}
									</div>
								))}
							</div>
						</div>
					)}

					{note["new_api"]?.length > 0 && (
						<div className="m-0 grid w-full grid-cols-4 gap-2 border-b-[1px] border-neutral-200 dark:border-neutral-700">
							<div className="col-span-1 py-2 font-medium text-blue-800 dark:text-blue-500">
								New API
							</div>
							<div className="col-span-3 m-0 border-l-2 border-blue-800 bg-blue-800/10 p-2">
								{note["new_api"].map((change: string, index: number) => (
									<div
										key={index}
										className={`m-0 p-0 ${index !== note["new_api"].length - 1 ? "border-b-[1px] border-neutral-200 dark:border-neutral-700" : ""} py-2`}
									>
										{renderChange(change)}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default ReleaseNotes;
