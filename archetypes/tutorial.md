---
pcx_content_type: tutorial
content_type: 📝 Tutorial
difficulty: Beginner | Intermediate | Expert
updated: '{{ time.Now.Format "2006-01-02" }}'
title: '{{ replace .File.ContentBaseName `-` ` ` | title }}'
---

# # Tutorial title. Second-person imperative verb phrase that reflects user goal or job-to-be-done. For example, 'Create a Worker' or 'Build a Pages application'.

{{<tutorial-date-info>}}

Describe the context for this tutorial. You can also optionally describe the intended audience, include a [GitHub link](https://github.com/) to completed code, and even outline a summary of the steps that the reader will be performing throughout this tutorial.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Before you start, make sure you have:

- Prerequisite 1
- Prerequisite 2
- Prerequisite 3

{{</tutorial-prereqs>}}

{{<tutorial-step title="Step 1 title">}}

(Shell command example. [For code block guidelines read our style guide](/style-guide/formatting/code-block-guidelines/))

First, use the `c3` CLI to create a new Cloudflare Workers project.

{{<render file="_c3-run-command-with-directory.md" productFolder="workers" withParameters="<PROJECT_NAME>">}}

Replace `<PROJECT_NAME>` with your desired project name.

(Numbered list example)

Once you run the command, set up a basic Worker by selecting the following options.

1. Select "Hello World" Worker as the type of application you want to create.
2. Answer yes or no to using TypeScript.

{{</tutorial-step>}}

{{<tutorial-step title="Step 2 content">}}

(JavaScript example)

```js
---
filename: src/index.js
---
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  },
};
```

(Aside example)

{{<Aside type="note">}}
An aside is a colored info box or aside with content (text, images, lists, code blocks) that adds relevant notes that do not fit the text or warns users of specific behavior that can break functionality or impact security. For more details read our [style guide documentation on Notes/tips/warnings](/style-guide/documentation-content-strategy/component-attributes/notes-tips-warnings/#recommendations).
{{</Aside>}}

{{</tutorial-step>}}

{{<tutorial-step title="Next steps" optional="true">}}

(Cloudflare docs link example)

To build more with Workers, refer to [Tutorials](/workers/tutorials/).

(External link example)

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord](https://discord.cloudflare.com) to connect with other developers and the Cloudflare team.

{{</tutorial-step>}}

{{</tutorial>}}
