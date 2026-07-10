/**
 * Shared checkbox styling — the visual "box" that sits behind the check /
 * minus glyph. Inspired by kumo's `checkboxVariants` (@cloudflare/kumo), token-mapped
 * to Nimbus.
 *
 * The box is a sibling of a visually-hidden native <input>, so every stateful
 * style is expressed through Tailwind's `peer-*` variants (checked, hover,
 * focus-visible, indeterminate, disabled). Kumo token map:
 *   bg-kumo-base → bg-background      ring-kumo-hairline  → ring-border
 *   bg-kumo-contrast → bg-foreground  ring-kumo-brand     → ring-ring
 *   text-kumo-inverse → text-background (the glyph, set on the icon)
 *   ring-kumo-danger → ring-danger
 */
import { cn } from "@/lib/cn";

export type CheckboxVariant = "default" | "error";

// Geometry + state styles common to both variants. `ring` is a 1px hairline;
// focus-visible bumps it to 2px in the focus colour.
export const checkboxBox =
  "pointer-events-none absolute inset-0 z-0 rounded-sm bg-background ring transition-[box-shadow,background-color,opacity] peer-disabled:opacity-50 peer-focus-visible:ring-2 peer-focus-visible:ring-ring";

// Per-variant ring + filled (checked / indeterminate) colours.
export const checkboxVariantRing: Record<CheckboxVariant, string> = {
  default:
    "ring-border peer-hover:ring-border-strong peer-checked:bg-foreground peer-checked:ring-foreground peer-indeterminate:bg-foreground peer-indeterminate:ring-foreground",
  error:
    "ring-danger peer-checked:bg-danger peer-checked:ring-danger peer-indeterminate:bg-danger peer-indeterminate:ring-danger",
};

export function checkboxVariants({
  variant = "default",
}: { variant?: CheckboxVariant } = {}) {
  return cn(checkboxBox, checkboxVariantRing[variant]);
}
