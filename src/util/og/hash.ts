/** First 8 bytes (hex) of the SHA-256 of `JSON.stringify(input)`. */
export async function ogHash(input: unknown[]) {
	const digest = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(JSON.stringify(input)),
	);
	return Array.from(new Uint8Array(digest).subarray(0, 8), (byte) =>
		byte.toString(16).padStart(2, "0"),
	).join("");
}
