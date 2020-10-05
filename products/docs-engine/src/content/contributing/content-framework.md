---
order: 1
---

# Content framework

This page provides an overview of how best to contribute to Cloudflare’s documentation. This is a living document and will be updated as recommendations change.

## Information architecture

Whether you’re adding a new page or just updating an existing one, it’s important to understand the philosophy behind our choice of information architecture.

### Divio’s documentation system

Our content structure was heavily inspired by the [Divio’s documentation system](https://documentation.divio.com), which recommends dividing docs into four categories:

<strong>

1. Tutorials
2. How-to guides
3. Technical reference
4. Explanation

</strong>

We highly recommend reading their [introduction to the system](https://documentation.divio.com/introduction) to help familiarize yourself with the philosophy around why this is so effective.

For convenience, we’ll reproduce a key table here:

<TableWrap>
<span style={{fontSize:".9em"}}>

|            | Tutorials                          | How-to guides                        | Reference                         | Explanation                           |
|------------|------------------------------------|--------------------------------------|-----------------------------------|---------------------------------------|
| oriented to| learning                           | a goal                               | information                       | understanding                         |
| must       | allow the newcomer to get started  | show how to solve a specific problem | describe the machinery            | explain                               |
| its form   | a lesson                           | a series of steps                    | dry description                   | discursive explanation                |
| analogy    | teaching a small child how to cook | a recipe in a cookery book           | a reference encyclopaedia article | an article on culinary social history |

</span>
</TableWrap>

<p style={{margin:"-.5em 0 1.5em",fontSize:".9em"}}>

Source: [Divio documentation system introduction](https://documentation.divio.com/introduction)

</p>

The key insight is that by breaking content up in this way, each of the four types of documentation _only have one job_, and they can really nail it.

The division makes it easier for authors to determine where new material should go, and makes it easier for readers to consume because the content is clear and practical.

### Cloudflare Workers docs

The first Cloudflare product to adopt this system was the Cloudflare Workers docs.

Within Cloudflare Workers, the division is as as follows:

1. **Tutorials** – The [Tutorials](/tutorials) section.
2. **How-to guides** – Though a work-in-progress¹, [Examples](/examples) and [Starters](/starters).
3. **Technical reference** – Three² components: [Platform](/platform), [Runtime APIs](/runtime-apis), and [CLI (Wrangler)](/cli-wrangler).
4. **Explanation** – The [Learning](/learning) section.

¹ _[Examples](/examples) certainly do “show how to solve a specific problem”, but as currently written, they don’t always provide a clear “series of steps”, similar to a recipe in a cookbook. This is something we’d like to improve over time._

² _Prior to [cloudflare/workers-docs-engine#85](https://github.com/cloudflare/workers-docs-engine/pull/85), all three of these sections were consolidated under a top level “Reference” folder. Ultimately we decided to remove this nested hierarchy to improve discoverability. We recognize the impact of the loss of the word “Reference” from the navigation, but felt the tradeoff was worth it._

--------------------------------

## Writing style

Cloudflare documentation should be practical and approachable.

- **Use short words, short sentences, and short paragraphs.**

- **Focus on clearly documenting the “80%” case first.** Complete documentation is important, but don’t let perfection be the enemy of the good.

- **Avoid hierarchy.** When possible, it’s better to flatten hierarchy as much as possible. Practically, this often means re-wording headings to avoid h4s and h5s, and instead add a few more h2s and h3s. Flatter hierarchies are conceptually easier to understand and generally increases discoverability.

- **Consistency trumps style.** When in doubt, match your content to the documentation around it. Raise an issue on GitHub when something feels off.

### Writing technical reference

When writing documentation as part of a technical reference (e.g. [runtime API](/runtime-apis) doc), follow these additional guidelines ([from Divio](https://documentation.divio.com/reference/#reference)):

- **Structure the documentation around the codebase.** When documenting a set of APIs, for example, name and organize the files to match the codebase’s naming and folder structure. This helps ensure consistency when communicating with users, who may see and interact with codebase, and helps maintainers see where documentation is missing or needs to be updated.

- **Do nothing but describe.** The only job of technical reference is to describe, as clearly and completely as possible. Anything else (explanation, discussion, instruction, speculation, opinion) is a distraction and will make it harder to follow.

- **Provide examples.**

- **Be accurate.** Keep documentation up-to-date.

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

## General formatting

- **Use sentence casing for headlines.**

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

## Accessibility guidelines

<Aside>

Contributions are welcome.

</Aside>

- **Use descriptive link text.** Don’t say “Learn more [here](https://example.com).” Instead say “[Learn more about examples at example.com](https://example.com).”

- **Use descriptive alt text and file names for images.** Don’t write `![screenshot](image.png)`. Instead write `![Workers dashboard screenshot](workers-dashboard-screenshot.png)`.

- **Use an `sh` code block over a screenshot of a terminal output.** This also helps ensure a consistent display.

--------------------------------

## Next steps

Now that you’re generally familiar with the guidelines for contributing to these docs, check out [Docs-flavored Markdown](/reference/markdown) page to learn about all of the specific frontmatter properties and MDX components you can use in your Markdown `*.md` pages.
