/**
 * Zaraz analytics shim.
 *
 * Mirrors root `src/util/zaraz.ts` behavior exactly: when Cloudflare Zaraz has
 * injected `window.zaraz` (only on the `developers.cloudflare.com` zone, at the
 * edge), forward the event; otherwise fall back to `console.log`, which is the
 * local/preview test vehicle.
 *
 * Pollution note: the Nimbus preview is served from a `*.workers.dev` host,
 * which is NOT the Zaraz-enabled zone, so `window.zaraz` is undefined there and
 * every `track()` call no-ops to `console.log` — no events reach production
 * analytics. At cutover, when `developers.cloudflare.com` serves the Nimbus
 * build, Zaraz auto-injects (zone-level, build-agnostic) and the same call
 * sites begin emitting real events with no further wiring.
 */
declare global {
	interface Window {
		zaraz?: {
			track: Track;
		};
	}
}

type Track = (event: string, properties?: Record<string, any>) => void;

export const track: Track = (event, properties) => {
	if (!window.zaraz) {
		console.log("zaraz.track:", event, properties);
		return;
	}

	window.zaraz.track(event, properties);
};
