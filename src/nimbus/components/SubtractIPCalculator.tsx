/**
 * Re-export shim.
 *
 * The implementation lives at `~/components/react/SubtractIPCalculator`
 * (cf-nimbus React-island convention). The two ported cloudflare-one
 * partials import it byte-identically from `~/components/SubtractIPCalculator.tsx`
 * (upstream's path), so this shim re-exports the default to keep that
 * content import resolving without editing the partials.
 */
export { default } from "./react/SubtractIPCalculator";
