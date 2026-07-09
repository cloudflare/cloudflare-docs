"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface DiagramStageProps {
  children: ReactNode;
  /** Override the accent token for everything inside (e.g. a brand color). */
  accent?: string;
  className?: string;
}

/**
 * Bordered, dotted-grid canvas for diagram cards — same recipe as the
 * flue diagrams. Also registers the shared `diagram-enter` /
 * `diagram-progress` keyframes so cards inside need no embedded CSS.
 */
export function DiagramStage({ children, accent, className }: DiagramStageProps) {
  return (
    <div
      className={cn(
        "diagram-stage relative w-full border border-border rounded-lg overflow-hidden",
        className,
      )}
      style={accent ? ({ "--diagram-accent": accent } as CSSProperties) : undefined}
    >
      <style>{`
        @keyframes diagram-enter {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes diagram-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .diagram-stage {
          background-color: var(--nb-background);
          background-image: radial-gradient(
            circle at 1px 1px,
            color-mix(in oklch, var(--nb-border-strong) 65%, transparent) 1px,
            transparent 0
          );
          background-size: 14px 14px;
        }
        [data-mode="dark"] .diagram-stage {
          background-image: radial-gradient(
            circle at 1px 1px,
            color-mix(in oklch, var(--nb-border) 55%, transparent) 1px,
            transparent 0
          );
        }
      `}</style>
      {children}
    </div>
  );
}
