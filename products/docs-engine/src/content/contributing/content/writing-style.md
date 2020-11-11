---
order: 1
---

# Writing style

Cloudflare documentation should be practical and approachable.

- **Use short words, short sentences, and short paragraphs.**

- **Focus on clearly documenting the “80%” case first.** Complete documentation is important, but don’t let perfection be the enemy of the good.

- **Avoid hierarchy.** When possible, it’s better to flatten hierarchy as much as possible. Practically, this often means re-wording headings to avoid h4s and h5s, and instead add a few more h2s and h3s. Flatter hierarchies are conceptually easier to understand and generally increases discoverability.

- **Consistency trumps style.** When in doubt, match your content to the documentation around it. Raise an issue on GitHub when something feels off.

## Writing technical reference

When writing documentation as part of a technical reference (e.g. [runtime API](https://developers.cloudflare.com/workers/runtime-apis) doc), follow these additional guidelines ([from Divio](https://documentation.divio.com/reference/#reference)):

- **Structure the documentation around the codebase.** When documenting a set of APIs, for example, name and organize the files to match the codebase’s naming and folder structure. This helps ensure consistency when communicating with users, who may see and interact with codebase, and helps maintainers see where documentation is missing or needs to be updated.

- **Do nothing but describe.** The only job of technical reference is to describe, as clearly and completely as possible. Anything else (explanation, discussion, instruction, speculation, opinion) is a distraction and will make it harder to follow.

- **Provide examples.**

- **Be accurate.** Keep documentation up-to-date.

--------------------------------

<ButtonGroup>
  <Button type="secondary" href="/contributing/content/content-framework">← Content framework</Button>
  <Button type="secondary" href="/contributing/content/formatting">Formatting →</Button>
</ButtonGroup>
