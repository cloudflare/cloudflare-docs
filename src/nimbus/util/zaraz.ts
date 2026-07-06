/**
 * Zaraz analytics shim.
 *
 * Upstream cloudflare-docs wires `track()` to Cloudflare Zaraz for product
 * analytics. cf-nimbus has no analytics layer, so this is a no-op that
 * satisfies the `~/util/zaraz` import in ported components
 * (e.g. SubtractIPCalculator) without pulling in the analytics stack.
 */
export const track = () => {};
