import codeRules from "../../prompts/code-rules.md";
import conventionsRules from "../../prompts/conventions-rules.md";
import coreContentRules from "../../prompts/style-guide/always/core-content.md";
import codeBlocksRules from "../../prompts/style-guide/conditional/code-blocks.md";
import frontmatterRules from "../../prompts/style-guide/conditional/frontmatter.md";
import imagesRules from "../../prompts/style-guide/conditional/images.md";
import importsRules from "../../prompts/style-guide/conditional/imports.md";
import linksRules from "../../prompts/style-guide/conditional/links.md";
import anchorHeadingRules from "../../prompts/style-guide/components/anchor-heading.md";
import apiRequestRules from "../../prompts/style-guide/components/api-request.md";
import curlRules from "../../prompts/style-guide/components/curl.md";
import dashButtonRules from "../../prompts/style-guide/components/dash-button.md";
import extraFlagDetailsRules from "../../prompts/style-guide/components/extra-flag-details.md";
import fileTreeRules from "../../prompts/style-guide/components/file-tree.md";
import markdownRules from "../../prompts/style-guide/components/markdown.md";
import packageManagersRules from "../../prompts/style-guide/components/package-managers.md";
import stepsRules from "../../prompts/style-guide/components/steps.md";
import subtractIpCalculatorRules from "../../prompts/style-guide/components/subtract-ip-calculator.md";
import tabsRules from "../../prompts/style-guide/components/tabs.md";
import typeScriptExampleRules from "../../prompts/style-guide/components/typescript-example.md";
import wranglerConfigRules from "../../prompts/style-guide/components/wrangler-config.md";

const STYLE_RULE_FILES = [
	["always/core-content", coreContentRules],
	["conditional/links", linksRules],
	["conditional/code-blocks", codeBlocksRules],
	["conditional/imports", importsRules],
	["conditional/frontmatter", frontmatterRules],
	["conditional/images", imagesRules],
	["components/anchor-heading", anchorHeadingRules],
	["components/api-request", apiRequestRules],
	["components/curl", curlRules],
	["components/dash-button", dashButtonRules],
	["components/extra-flag-details", extraFlagDetailsRules],
	["components/file-tree", fileTreeRules],
	["components/markdown", markdownRules],
	["components/package-managers", packageManagersRules],
	["components/steps", stepsRules],
	["components/subtract-ip-calculator", subtractIpCalculatorRules],
	["components/tabs", tabsRules],
	["components/typescript-example", typeScriptExampleRules],
	["components/wrangler-config", wranglerConfigRules],
] as const;

// Reviewers find violations with these rules and the judge verifies findings
// against the same text, so each reviewer and the judge load the same export.

/** Every style-guide rule file as a named `<style_rules>` instruction. */
export const STYLE_RULE_INSTRUCTIONS: readonly string[] = STYLE_RULE_FILES.map(
	([name, rules]) => `<style_rules name="${name}">\n${rules}\n</style_rules>`,
);

/** The code review rules as a `<code_rules>` instruction. */
export const CODE_RULE_INSTRUCTION = `<code_rules>\n${codeRules.trim()}\n</code_rules>`;

/** The PR conventions rules as a `<conventions_rules>` instruction. */
export const CONVENTIONS_RULE_INSTRUCTION = `<conventions_rules>\n${conventionsRules.trim()}\n</conventions_rules>`;
