---
description: "validate against the style guide"
model: opencode/claude-opus-4-5
---

Look at all the unstaged changes to markdown (.md, .mdx) files, pull out the lines that have changed, and:

1. Check for alignment with the Cloudflare style guide: https://developers.cloudflare.com/style-guide/
2. Ensure that code blocks use the relevant code components (https://developers.cloudflare.com/style-guide/components/) - e.g. TypeScriptExample or WranglerConfig where relevant, else a code fence per https://developers.cloudflare.com/style-guide/components/code/ and as per https://developers.cloudflare.com/style-guide/formatting/code-block-guidelines/
3. Code examples should make sure to include a description of what the code does, and any relevant context or assumptions.
4. If an abbreviation is used, ensure it is spelt out in full when first mentioned.
5. Avoid extremely long paragraphs and walls-of-text. Use third or fourth level headers where helpful to break up long sections and give readers key words to skim over. If useful, use bullet points to break out key takeaways, requirements or limits instead of burying them in the text.
6. Ensure language is not overly verbose, LLM-like, and inconsistent with existing documentation and language conventions.

Report a short 1-3 sentence summary of changes and rationale behind those changes.
