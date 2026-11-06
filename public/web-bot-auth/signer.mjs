import {
	createHash,
	createPrivateKey,
	createPublicKey,
	randomBytes,
	sign,
} from "node:crypto";

export const signingHeaders = [
	"signature",
	"signature-input",
	"signature-agent",
];

function origin(value) {
	const url = new URL(value);
	if (
		url.protocol !== "https:" ||
		url.username ||
		url.password ||
		url.pathname !== "/" ||
		url.search ||
		url.hash
	) {
		throw new Error("Use an HTTPS origin, such as https://bot.example.com");
	}
	return url.origin;
}

// Pass the final URL and method from the HTTP library's send hook.
export function createSigner({ privateKey, signatureAgent, allowedOrigins }) {
	const key = createPrivateKey(privateKey);
	if (key.asymmetricKeyType !== "ed25519") {
		throw new Error("Web Bot Auth requires an Ed25519 private key");
	}
	const { x } = createPublicKey(key).export({ format: "jwk" });
	const jwk = { crv: "Ed25519", kty: "OKP", x };
	const keyId = createHash("sha256")
		.update(JSON.stringify(jwk))
		.digest("base64url");
	const agent = JSON.stringify(origin(signatureAgent));
	if (!allowedOrigins?.length) throw new Error("Set allowedOrigins explicitly");
	const allowed = new Set(allowedOrigins.map(origin));

	return {
		keyId,
		publicJwk: jwk,
		headers(urlValue, method = "GET", host, requestTarget) {
			const url = new URL(urlValue);
			if (!allowed.has(url.origin)) return {};
			if (url.username || url.password)
				throw new Error("URL credentials are unsupported");
			if (host && host !== url.host)
				throw new Error("Do not override the Host header");
			// A dispatcher may receive a raw path that URL would normalize.
			const target = requestTarget ?? `${url.pathname}${url.search}`;
			if (!target.startsWith("/") || /[^\x21-\x7e]|#/.test(target)) {
				throw new Error("Expected an ASCII, origin-form request target");
			}
			if (!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(method))
				throw new Error("Invalid HTTP method");
			const queryAt = target.indexOf("?");
			const path = queryAt < 0 ? target : target.slice(0, queryAt);
			const query = queryAt < 0 ? "?" : target.slice(queryAt);
			const created = Math.floor(Date.now() / 1000);
			const params =
				'("@authority" "@method" "@path" "@query" "signature-agent")' +
				`;created=${created};expires=${created + 60};keyid="${keyId}"` +
				`;alg="ed25519";nonce="${randomBytes(18).toString("base64url")}";tag="web-bot-auth"`;
			const base = [
				`"@authority": ${url.host}`,
				`"@method": ${method}`,
				`"@path": ${path}`,
				`"@query": ${query}`,
				`"signature-agent": ${agent}`,
				`"@signature-params": ${params}`,
			].join("\n");
			return {
				"signature-agent": agent,
				"signature-input": `sig1=${params}`,
				signature: `sig1=:${sign(null, Buffer.from(base, "ascii"), key).toString("base64")}:`,
			};
		},
	};
}
