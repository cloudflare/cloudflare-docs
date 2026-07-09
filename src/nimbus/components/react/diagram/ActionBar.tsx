"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ActionBarProps {
  children: ReactNode;
  className?: string;
}

/** Flex row, `gap-2`, vertically centred. Layout container for diagram controls. */
export function ActionBar({ children, className }: ActionBarProps) {
  return <div className={cn("flex items-center gap-2", className)}>{children}</div>;
}
