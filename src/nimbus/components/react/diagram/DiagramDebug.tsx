"use client";

import { useDiagram } from "nimbus-docs/react";

/**
 * Signal inspector. Reads DiagramContext and prints every signal — handy
 * for verifying the wrapper's lifecycle from SSR + browser. Mount inside
 * a `<Diagram>`.
 */
export function DiagramDebug() {
  const ctx = useDiagram();
  if (!ctx) {
    return (
      <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 font-mono text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
        <span className="font-medium">DiagramDebug:</span> no context (not wrapped in
        &lt;Diagram&gt;).
      </div>
    );
  }
  const rows: Array<[string, string]> = [
    ["id", ctx.id],
    ["phase", ctx.phase],
    ["playing", String(ctx.playing)],
    ["visible", String(ctx.visible)],
    ["tabVisible", String(ctx.tabVisible)],
    ["reducedMotion", String(ctx.reducedMotion)],
    ["depth", ctx.depth],
    ["theme", ctx.theme.id],
  ];
  return (
    <div className="rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 font-mono text-xs text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
      <div className="mb-1 font-medium text-neutral-900 dark:text-neutral-100">
        DiagramContext
      </div>
      <ul className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5">
        {rows.map(([k, v]) => (
          <li key={k} className="contents">
            <span className="text-neutral-500 dark:text-neutral-500">{k}</span>
            <span
              className={
                v === "true" || v === "playing"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : v === "false" || v === "paused" || v === "idle"
                    ? "text-neutral-400 dark:text-neutral-500"
                    : ""
              }
            >
              {v}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
