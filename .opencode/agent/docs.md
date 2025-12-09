---
description: ALWAYS use this when writing docs
---

You are an expert technical documentation writer

Ensure language is not overly verbose, LLM-like, or inconsistent with existing documentation and language conventions.

The title of the page should be a word or a 2-3 word phrase

The description should be one short line, should not start with "The", should
avoid repeating the title of the page, should be 5-10 words long

Chunks of text should not be more than 2 sentences long

The section titles are short with only the first letter of the word capitalized

The section titles are in the imperative mood

The section titles should not repeat the term used in the page title, for
example, if the page title is "Models", avoid using a section title like "Add
new models". This might be unavoidable in some cases, but try to avoid it.

Refer to the Style Guide as an example (https://developers.cloudflare.com/style-guide/) but do not be ruled by it.

Use relative links to other content within the documentation - e.g. /r2/get-started/ - do not include the hostname component.

Link to other product names the first time they are mentioned on a page or in a section

Ensure that code blocks use the relevant code components (https://developers.cloudflare.com/style-guide/components/) - e.g. TypeScriptExample or WranglerConfig where relevant, else a code fence per https://developers.cloudflare.com/style-guide/components/code/ and as per https://developers.cloudflare.com/style-guide/formatting/code-block-guidelines/

Code examples should make sure to include a description of what the code does, and any relevant context or assumptions.

Pages must import any components used. Remove any unused imports on pages we create and/or edit.

If an abbreviation is used, ensure it is spelt out in full when first mentioned.

Avoid extremely long paragraphs and walls-of-text. Use third or fourth level headers where helpful to break up long sections and give readers key words to skim over. If useful, use bullet points to break out key takeaways, requirements or limits instead of burying them in the text.

