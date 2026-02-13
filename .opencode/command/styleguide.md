---
description: "validate against the style guide"
model: anthropic/claude-opus-4-5
---

Look at all the unstaged changes to markdown (.md, .mdx) files, pull out the lines that have changed, and validate against these rules:

## Writing Style

1. **Voice and tense**: Active voice and present tense should be used. Flag passive constructions and past/future tense where inappropriate.

2. **Plain language**: Sentences should be 8-12 words. Flag overly complex or verbose sentences.

3. **Contractions**: Should not be used. Flag any contractions (don't, won't, can't, etc.).

4. **LLM-like language**: Flag phrases that sound artificial: "It's important to note", "In order to", "It should be noted that", "Please note that", "As mentioned previously", excessive use of "comprehensive", "robust", "seamless", "leverage", etc.

## Terminology

5. **Inclusive language**: Flag and suggest replacements for:
   - `blacklist` → `denylist`
   - `whitelist` → `allowlist`
   - `master` → `primary` or `main`
   - `slave` → `secondary`

6. **Latin terms**: Replace:
   - `e.g.` → `for example`
   - `i.e.` → `that is`

7. **Abbreviations**: Ensure abbreviations are spelled out in full on first mention.

## Time-sensitive Content

8. **Avoid time-bound language**: Flag:
   - "Coming soon" or similar phrases
   - Month names (unless in changelog content)
   - Year references (unless in changelog content)

## Structure and Formatting

9. **Code blocks**: Ensure code blocks use appropriate components (`TypeScriptExample`, `WranglerConfig`, `PackageManagers`) or proper language hints. Code should include descriptions of what it does.

10. **Paragraphs**: Flag extremely long paragraphs (more than 2-3 sentences). Suggest breaking up with headers, lists, or asides.

11. **Link text**: Flag links with unhelpful text like "here", "this page", "read more", or "click here". Link text should describe the destination.

12. **Links format**: Flag full URLs to developers.cloudflare.com - should use relative paths (e.g., `/workers/get-started/`).

## Output Format

For each issue found, report:
- The problematic text (quote it)
- Which rule it violates
- A suggested fix

Then provide a short 1-3 sentence summary of the overall changes needed and their rationale.

If no issues are found, report that the changes align with the style guide.
