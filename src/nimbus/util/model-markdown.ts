/**
 * Markdown rendering of a model page — shared by the `/workers-ai/models` and
 * `/ai/models` `[...name].md.ts` routes. Backs the page-actions row (Copy page /
 * View as Markdown), matching every other docs page. Deterministic, fully
 * static — derived from the unchanged model JSON.
 */
import { detectApiModes, type ModelView } from "~/util/models";

/**
 * Shallow top-level parameter extraction — markdown-only. The HTML page uses
 * the recursive `SchemaDisplay` tree, but the `.md` variant (for LLMs / copy
 * page) renders a flat table, so we keep a lightweight extractor here.
 */
interface MdParamRow {
  name: string;
  type: string;
  required: boolean;
  description: string;
}
interface MdParamVariant {
  title?: string;
  rows: MdParamRow[];
}
const mdTypeOf = (def: Record<string, unknown>): string => {
  if (typeof def.type === "string") return def.type;
  if (Array.isArray(def.type)) return def.type.join(" | ");
  if (def.oneOf || def.anyOf) return "one of";
  return "";
};
function shallowVariants(side: unknown): MdParamVariant[] {
  const root = side as Record<string, unknown> | undefined;
  if (!root) return [];
  const branches = Array.isArray(root.oneOf)
    ? (root.oneOf as Record<string, unknown>[])
    : Array.isArray(root.anyOf)
      ? (root.anyOf as Record<string, unknown>[])
      : [root];
  return branches
    .map((branch) => {
      const required = Array.isArray(branch.required)
        ? (branch.required as string[])
        : [];
      const props =
        (branch.properties as Record<string, Record<string, unknown>>) ?? {};
      const rows: MdParamRow[] = Object.entries(props).map(([name, def]) => ({
        name,
        type: mdTypeOf(def),
        required: required.includes(name),
        description: typeof def.description === "string" ? def.description : "",
      }));
      return {
        title: typeof branch.title === "string" ? branch.title : undefined,
        rows,
      };
    })
    .filter((v) => v.rows.length > 0);
}

function escapeMarkdownTableCell(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
}

function paramTable(variants: MdParamVariant[]): string {
  if (variants.length === 0) return "_No parameters defined._\n";
  return variants
    .map((v) => {
      const head = v.title ? `**${v.title}**\n\n` : "";
      const rows = v.rows
        .map(
          (r) =>
            `| \`${r.name}\`${r.required ? " *" : ""} | \`${r.type}\` | ${escapeMarkdownTableCell(r.description)} |`,
        )
        .join("\n");
      return `${head}| Name | Type | Description |\n| --- | --- | --- |\n${rows}\n`;
    })
    .join("\n");
}

/**
 * Build the markdown body for a model. `basePath`/`slug` control the absolute
 * links to the raw schema JSON endpoints so they resolve under the correct
 * route (short slug under /workers-ai, full slug under /ai).
 */
export function renderModelMarkdown(
  model: ModelView,
  basePath: string,
  slug: string,
): string {
  const lines = [
    `# ${model.shortName}`,
    ``,
    `${model.task} • ${model.authorName}${model.beta ? " • Beta" : ""}`,
    ``,
    `\`${model.name}\``,
    ``,
    model.description,
    ``,
  ];

  if (model.task === "Text Generation" && model.hosting === "hosted") {
    lines.push(
      `## Playground`,
      ``,
      `[Launch the LLM Playground](https://playground.ai.cloudflare.com/?model=${model.name})`,
      ``,
    );
  }

  const usageBody =
    model.task === "Text Generation"
      ? `{ "prompt": "Tell me about Workers AI" }`
      : `{ "...": "see the Parameters below" }`;
  lines.push(
    `## Usage`,
    ``,
    "```sh",
    `curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/${model.name} \\`,
    `  -X POST \\`,
    `  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \\`,
    `  -d '${usageBody}'`,
    "```",
    ``,
  );

  if (Object.keys(model.schema.input).length > 0) {
    const modes = detectApiModes(model.schema);
    const schemaLinks = modes
      ? modes.flatMap((mode) => [
          `- [${mode.name} input](${basePath}/${slug}/${mode.id}-input.json)`,
          `- [${mode.name} output](${basePath}/${slug}/${mode.id}-output.json)`,
        ])
      : [
          `- [Input schema](${basePath}/${slug}/schema-input.json)`,
          `- [Output schema](${basePath}/${slug}/schema-output.json)`,
        ];

    lines.push(
      `## Parameters`,
      ``,
      `### Input`,
      ``,
      paramTable(shallowVariants(model.schema.input)),
      `### Output`,
      ``,
      paramTable(shallowVariants(model.schema.output)),
      `## API Schemas (Raw)`,
      ``,
      ...schemaLinks,
      ``,
    );
  }

  return lines.join("\n");
}
