---
order: 2
---

# Formatting

This document provides general formatting and typography guidelines for Cloudflare documentation.

--------------------------------

## General formatting

- **Use sentence casing for headlines and page titles.**

- **Ensure proper header hierarchy.** For pages with the [`"document"` type](/reference/pages#title) (the default), their table of contents is automatically generated from the header hierarchy. For this reason it’s critical that each document begin with an `h1` and that for all `N > 1`, all `h{N}` immediately follow an `h{N-1}`. For example an `h3` should never succeed an `h1`.

- **For longer pages, use a separator between h2 sections.** Written as an `<hr/>` in Markdown (`--------`):

  ```markdown
  ## Some heading

  Imagine several paragraphs of text here.

  --------------------------------

  ## Some other heading

  <!-- ... -->
  ```

- **Always add a language hint to code blocks.** If you don’t want any syntax highlighting, explicitly use `txt`:

  ``````markdown
  ```txt
  https://example.com
  ```
  ``````

- **When using an ellipsis (`...`) in a code block, make sure to place it in a comment for the appropriate language.**

  ``````markdown
  Here’s an example:

  ```js
  let foo = "bar"

  // ...

  console.log(foo)
  ```
  ``````

--------------------------------

## Typography

As the medium of communication, typography is critical to writing great documentation.

When contributing to Cloudflare docs, make sure to follow best practices for good typography. [Butterick’s Practical Typography](https://practicaltypography.com) is a great resource for technical writers, and especially the [“type composition“](https://practicaltypography.com/type-composition.html) guidelines should be followed for these docs.

Specifically, please make sure to:

- **Use curly quotes and apostrophes.**
  - Use [curly quotes](https://practicaltypography.com/straight-and-curly-quotes.html) in regular text (but straight quotes for strings in code).
  - For possessives and contractions, [use a closing single quote](https://practicaltypography.com/apostrophes.html) as an apostrophe.

- **Use an [em dash](https://practicaltypography.com/hyphens-and-dashes.html) (not a hyphen) to make a break between parts of a sentence.**
  - Never use two hyphens (--) in place of an em dash (—).

- **Always use one space between sentences.** ([Reference](https://practicaltypography.com/one-space-between-sentences.html))

--------------------------------

<ButtonGroup>
  <Button type="secondary" href="/contributing/content/writing-style">← Writing style</Button>
  <Button type="secondary" href="/contributing/content/accessibility">Accessibility →</Button>
</ButtonGroup>
