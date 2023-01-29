interface Change {
  date?: string;
  text?: string;
  items?: string[];

  // string still in progress of being written
  wip?: string;
}
type Changes = Change[];

export const onRequestGet: PagesFunction<{}, 'product'> = async ({ env, request, params }) => {
  // Attempt to get the changelog, it's usually at the root of the product or under platform
  // TODO: This is pretty gross but is there a better way to handle than requiring to update this file?
  let changelog = await env.ASSETS.fetch(`https://docs/${params.product}/changelog/`);
  if (changelog.status === 404) {
    changelog = await env.ASSETS.fetch(`https://docs/${params.product}/platform/changelog/`);
    if (changelog.status === 404) {
      return env.ASSETS.fetch('https://docs/404/');
    }
  }

  const changes: Changes = [];
  const res = new HTMLRewriter()
    .on('h1, h2, li', new ChangelogParser(changes))
    .transform(changelog);

  // Trigger HTMLRewriter to stream through
  await res.text();

  return Response.json(changes);
}

class ChangelogParser {

  #changes: Changes;
  #entry: Change = null;
  #heading = false;
  #listItem = false;

  constructor(changes: Changes) {
    this.#changes = changes;
  }

  element(elem: Element) {
    // TOOD: Clean this up
    if (elem.tagName === 'h2') {
      this.#heading = true;
      this.#listItem = false;

      // If we have an entry in the works, submit it and reset for the next one
      if (this.#entry !== null) {
        this.#changes.push(this.#entry);
      }
      this.#entry = null;
    } else if (elem.tagName === 'li' && this.#entry) {
      this.#heading = false;
      this.#listItem = true;

      elem.onEndTag(() => {
        this.#listItem = false;
        if (!this.#entry.items) {
          this.#entry.items = [];
        }
        if (this.#entry.wip) {
          // Write out WIP string
          this.#entry.items.push(this.#entry.wip);
          delete this.#entry.wip;
        }
      });
    } else {
      this.#heading = false;
    }
  }

  text(chunk: Text) {
    // Ignore juml
    if (chunk.text.trim() === '') return;

    // If this is a heading of a new entry
    if (this.#heading && /\d{4}-\d{2}-\d{2}/.test(chunk.text)) {
      this.#entry = {
        date: chunk.text,
      };

    // If there's an entry in progress we append to it
    } else if (this.#entry !== null) {
      if (this.#listItem) {
        this.#entry.wip = (this.#entry.wip ?? '') + chunk.text;
      } else {
        this.#entry.text = (this.#entry.text ?? '') + chunk.text;
      }
    }
  }
}
