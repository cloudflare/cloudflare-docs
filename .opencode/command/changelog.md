---
description: Generate a product changelog entry
---

Generate a changelog entry for the Cloudflare documentation site based on the user's request.

## User Request

$ARGUMENTS

## Instructions

1. **Validate the request**: Ensure the user has provided:
   - A clear product name (for example, Workers, KV, Hyperdrive, Containers, R2, etc.)
   - A description of the change or feature being documented
   - Enough context to explain the "why" and use-cases

   If any of these are missing or unclear, ask the user for clarification before proceeding.

2. **Determine the product folder**: Use the product name to identify the correct changelog folder under `src/content/changelog/{product}/`. Refer to existing folders for valid product names.

3. **Create the changelog file**: Create a new file at:
   ```
   src/content/changelog/{product}/{YYYY-MM-DD}-{useful-short-name}.mdx
   ```
   Use today's date and a concise, hyphenated slug describing the change.

4. **Frontmatter format**:
   ```yaml
   ---
   title: {Concise title describing the change}
   description: {One-sentence summary of what changed and why it matters}
   products:
     - {product}
   date: {YYYY-MM-DD}
   ---
   ```

5. **Writing style guidelines**:
   - Use imperative mood and active voice
   - The opening sentence must clearly explain what the new feature/change is and what problem it solves
   - Expand on usage, use-cases, and the "why" in subsequent paragraphs
   - Assume a technical developer/cloud audience
   - Keep sentences concise (8-12 words where possible)
   - Avoid contractions
   - Avoid LLM-like phrases ("It's important to note", "leverage", "seamless", etc.)
   - Replace `e.g.` with "for example" and `i.e.` with "that is"

6. **Code examples for Developer Platform products**:
   For products in the Developer Platform group (Workers, Durable Objects, Pipelines, KV, Hyperdrive, R2, D1, Queues, Containers, etc.):
   - Include a code block demonstrating usage of the new feature
   - Use plain JavaScript/TypeScript code blocks (```js or ```ts)
   - If showing wrangler.json config, use ```jsonc
   - Keep code snippets short and focused on the new feature
   - Minimize boilerplate and unnecessary code
   - Add imports at the top if using components: `import { Render, TypeScriptExample, WranglerConfig } from "~/components";`

7. **Documentation links**: End the changelog with a link to relevant documentation:
   - Use relative paths (for example, `/workers/configuration/placement/`)
   - Link text should describe the destination, not "click here" or "read more"
   - Check for any uncommitted/staged .md/.mdx files that might be the related documentation

## Reference Examples

Review these existing changelogs for style and format guidance:
- `src/content/changelog/workers/` - Workers changelogs with code examples
- `src/content/changelog/kv/` - KV changelogs
- `src/content/changelog/hyperdrive/` - Hyperdrive changelogs
- `src/content/changelog/containers/` - Container changelogs

## Output

Create the changelog file and show the user the complete file path and content.
