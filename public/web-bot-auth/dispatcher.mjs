import { Agent, Dispatcher } from "undici";
import { createSigner, signingHeaders } from "./signer.mjs";

export function createWebBotAuthDispatcher(options) {
	const signer = createSigner(options);
	const inner = options.dispatcher ?? new Agent();
	return new (class extends Dispatcher {
		dispatch(options, handler) {
			try {
				// Undici accepts a flat header array or an object.
				const headers = new Headers();
				if (Array.isArray(options.headers)) {
					for (let i = 0; i < options.headers.length; i += 2) {
						headers.append(
							String(options.headers[i]),
							String(options.headers[i + 1]),
						);
					}
				} else {
					const entries = options.headers?.[Symbol.iterator]
						? options.headers
						: Object.entries(options.headers ?? {});
					for (const [name, value] of entries) {
						if (value === undefined) continue;
						for (const item of Array.isArray(value) ? value : [value]) {
							headers.append(name, String(item));
						}
					}
				}
				for (const name of signingHeaders) headers.delete(name);
				const url = `${new URL(String(options.origin)).origin}${options.path}`;
				const signed = signer.headers(
					url,
					options.method,
					headers.get("host"),
					options.path,
				);
				for (const [name, value] of Object.entries(signed))
					headers.set(name, value);
				return inner.dispatch(
					{ ...options, headers: [...headers].flat() },
					handler,
				);
			} catch (error) {
				handler.onError(error);
				return false;
			}
		}
		close(...args) {
			return inner.close(...args);
		}
		destroy(...args) {
			return inner.destroy(...args);
		}
	})();
}
