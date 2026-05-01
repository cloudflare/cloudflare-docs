/**
 * Browser stub for @stoplight/json-schema-merge-allof.
 *
 * The real package uses require() and is CJS-only — it can't run in the
 * browser. Since none of the AI model schemas use allOf, a no-op stub is
 * safe: just return the schema unchanged.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeAllOf(schema: any): any {
	return schema;
}

mergeAllOf.stoplightResolvers = {};

export default mergeAllOf;
export { mergeAllOf };
