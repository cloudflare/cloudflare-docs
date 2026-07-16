import type { ApiMode } from "./model-types";

/** One labelled branch of a top-level `oneOf`/`anyOf` schema. */
export type SchemaVariant = {
  title: string;
  schema: Record<string, unknown>;
};

/**
 * Split a model's schema into logical API modes (sync / streaming / batch).
 * Returns undefined when there are no meaningful splits — the caller then emits
 * a single combined schema (`schema-input`/`schema-output`).
 */
export function detectApiModes(schema: {
  input: Record<string, unknown>;
  output: Record<string, unknown>;
}): ApiMode[] | undefined {
  const { input, output } = schema;
  const modes: ApiMode[] = [];

  const inputVariants =
    (input.anyOf as Record<string, unknown>[]) ||
    (input.oneOf as Record<string, unknown>[]);
  const outputVariants =
    (output.anyOf as Record<string, unknown>[]) ||
    (output.oneOf as Record<string, unknown>[]);

  if (!inputVariants || inputVariants.length === 0) return undefined;

  const batchInputIndex = inputVariants.findIndex((v) => {
    const props = v.properties as Record<string, unknown> | undefined;
    return props && "requests" in props;
  });
  const syncInputIndex = inputVariants.findIndex((_, i) => i !== batchInputIndex);

  const jsonOutputIndex =
    outputVariants?.findIndex((v) => {
      return (
        v.contentType === "application/json" ||
        (v.type === "object" && v.properties)
      );
    }) ?? -1;
  const streamOutputIndex =
    outputVariants?.findIndex((v) => {
      return v.type === "string" || v.format === "binary";
    }) ?? -1;

  if (syncInputIndex !== -1) {
    const syncInput = inputVariants[syncInputIndex];
    const syncOutput =
      jsonOutputIndex !== -1 && outputVariants
        ? outputVariants[jsonOutputIndex]
        : output;
    modes.push({
      id: "sync",
      name: "Synchronous",
      description: "Send a request and receive a complete response",
      input: syncInput,
      output: syncOutput,
    });
    if (streamOutputIndex !== -1 && outputVariants) {
      modes.push({
        id: "streaming",
        name: "Streaming",
        description:
          "Send a request with `stream: true` and receive server-sent events",
        input: syncInput,
        output: outputVariants[streamOutputIndex],
      });
    }
  }

  if (batchInputIndex !== -1) {
    const batchInput = inputVariants[batchInputIndex];
    const batchOutput =
      jsonOutputIndex !== -1 && outputVariants
        ? outputVariants[jsonOutputIndex]
        : output;
    modes.push({
      id: "batch",
      name: "Batch",
      description: "Send multiple requests in a single API call",
      input: batchInput,
      output: batchOutput,
    });
  }

  return modes.length > 1 ? modes : undefined;
}

/**
 * Detect a root-level `oneOf`/`anyOf` whose branches should be shown as a
 * labelled variant selector (e.g. "Chat Completions" vs "Responses"). Returns
 * one entry per branch when there are at least two and at least one carries a
 * real `title`; otherwise null, so the caller renders a single tree.
 */
export function getTopLevelVariants(
  schemaObj: Record<string, unknown>,
): SchemaVariant[] | null {
  const variants = (schemaObj.oneOf || schemaObj.anyOf) as
    | Record<string, unknown>[]
    | undefined;
  if (!variants || variants.length < 2) return null;

  const titled = variants.map((v, i) => ({
    title: (v.title as string) || `Option ${i + 1}`,
    schema: v,
  }));

  const hasRealTitle = variants.some((v) => v.title);
  return hasRealTitle ? titled : null;
}
