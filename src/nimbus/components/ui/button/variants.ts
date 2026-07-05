/**
 * Shared button styling — the single source of truth for both <Button>
 * (a real button) and <LinkButton> (an anchor styled as a button), so the
 * two stay visually identical. Inspired by kumo's `buttonVariants`.
 *
 * Token-mapped to Nimbus. Import `buttonVariants()` to compose the trigger
 * classes for a button-shaped element; `buttonIconSize` sizes a leading/
 * trailing icon for a given size.
 */
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "secondary-destructive"
  | "outline";
export type ButtonSize = "xs" | "sm" | "base" | "lg";
export type ButtonShape = "base" | "square" | "circle";

// `rounded-full` is the default radius for every button; `square` overrides
// it (see `buttonVariants`), `circle` keeps it.
export const buttonBase =
  "group inline-flex w-max shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap no-underline shadow-xs transition-colors cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary:
    "bg-card text-foreground ring ring-border hover:bg-accent hover:ring-border-strong",
  ghost: "bg-transparent text-foreground shadow-none hover:bg-accent",
  destructive: "bg-danger text-white hover:bg-danger/90",
  "secondary-destructive":
    "bg-card text-danger ring ring-border hover:bg-accent hover:ring-danger/40",
  outline:
    "bg-transparent text-foreground ring ring-border hover:ring-border-strong",
};

// Rectangular sizing (shape="base"). Radius comes from `buttonBase`.
export const buttonSizeText: Record<ButtonSize, string> = {
  xs: "h-5 gap-1 px-1.5 text-xs",
  sm: "h-7 gap-1 px-2 text-xs",
  base: "h-9 gap-1.5 px-3 text-sm",
  lg: "h-10 gap-2 px-4 text-sm",
};

// Square/circle sizing (icon-only): equal dimensions, no horizontal padding.
export const buttonSizeCompact: Record<ButtonSize, string> = {
  xs: "size-5",
  sm: "size-7",
  base: "size-9",
  lg: "size-10",
};

export const buttonIconSize: Record<ButtonSize, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-3.5 w-3.5",
  base: "h-4 w-4",
  lg: "h-[1.125rem] w-[1.125rem]",
};

export interface ButtonVariantsOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
}

/** Compose the base + variant + size/shape classes for a button-shaped element. */
export function buttonVariants({
  variant = "secondary",
  size = "base",
  shape = "base",
}: ButtonVariantsOptions = {}): string {
  // base + circle inherit `rounded-full` from buttonBase; square overrides it
  // to a rounded square.
  const dims =
    shape === "base"
      ? buttonSizeText[size]
      : cn(buttonSizeCompact[size], "p-0", shape === "square" && "rounded-lg");
  return cn(buttonBase, buttonVariantClasses[variant], dims);
}
