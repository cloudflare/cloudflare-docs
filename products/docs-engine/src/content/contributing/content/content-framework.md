---
order: 0
---

# Content framework

This page provides an overview of how best to contribute to Cloudflare’s documentation.

--------------------------------

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

1. **Tutorials** – The [Tutorials](https://developers.cloudflare.com/workers/tutorials) section.
2. **How-to guides** – Though a work-in-progress¹, [Examples](https://developers.cloudflare.com/workers/examples) and [Starters](https://developers.cloudflare.com/workers/starters).
3. **Technical reference** – Three² components: [Platform](https://developers.cloudflare.com/workers/platform), [Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis), and [CLI (Wrangler)](https://developers.cloudflare.com/workers/cli-wrangler).
4. **Explanation** – The [Learning](https://developers.cloudflare.com/workers/learning) section.

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

When writing documentation as part of a technical reference (e.g. [runtime API](https://developers.cloudflare.com/workers/runtime-apis) doc), follow these additional guidelines ([from Divio](https://documentation.divio.com/reference/#reference)):

- **Structure the documentation around the codebase.** When documenting a set of APIs, for example, name and organize the files to match the codebase’s naming and folder structure. This helps ensure consistency when communicating with users, who may see and interact with codebase, and helps maintainers see where documentation is missing or needs to be updated.

- **Do nothing but describe.** The only job of technical reference is to describe, as clearly and completely as possible. Anything else (explanation, discussion, instruction, speculation, opinion) is a distraction and will make it harder to follow.

- **Provide examples.**

- **Be accurate.** Keep documentation up-to-date.

--------------------------------

## See also

- [Writing style](/contributing/content/writing-style)
