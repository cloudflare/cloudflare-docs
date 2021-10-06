---
updated: 2020-08-13
difficulty: Beginner
content_type: "📝 Tutorial"
pcx-content-type: tutorial
---

import TutorialsBeforeYouStart from "../../_partials/_tutorials-before-you-start.md"

# Managing multiple Workers projects with Lerna

<TutorialsBeforeYouStart/>

## Overview

Using [`lerna`](https://github.com/lerna/lerna), a tool for managing multiple JavaScript codebases inside a single monorepo, developers can work with multiple Wrangler projects and share dependencies between them. If your codebase is already managed with `lerna`, you can also add a new Wrangler project into your existing monorepo without disrupting your workflow.

Begin by installing `lerna`, and creating a new project in the folder `workers-monorepo`:

```sh
---
header: Install lerna and init a new project
---
$ npm install -g lerna
$ mkdir workers-monorepo && cd workers-monorepo
$ lerna init
```

Inside of `packages`, where `lerna` will look for your projects, you can generate multiple new Wrangler codebases, or even `git clone` your existing Workers codebase to migrate it into a `lerna` monorepo:

```sh
---
header: Generate projects using Wrangler
---
$ cd packages
$ wrangler generate my-api
$ wrangler generate my-site --site

# If you have existing projects, you can clone them into the directory:
$ git clone https://github.com/cloudflare/worker-template.git
```

This approach to managing your Workers projects can become incredibly powerful when you begin to share dependencies between projects. Imagine that your codebase has a pre-defined set of API handlers that you want to reuse between your public and private APIs, in the packages `public-api` and `private-api`:

```sh
---
header: Generate projects using Wrangler
---
$ cd packages
$ wrangler generate public-api
$ wrangler generate private-api
```

Next to your API projects, create a new package `handlers`, which can be imported into each project:

```sh
---
header: Create a new lerna package
---
$ lerna create handlers
```

```json
---
filename: packages/public-api/package.json
---
{
  "dependencies": {
    "handlers": "1.0.0"
  }
}
```

Link the packages together using the `bootstrap` command and use them inside of your code:

```sh
---
header: Link packages using lerna bootstrap
---
$ lerna bootstrap
```

```js
---
filename: packages/public-api/index.js
---
// Omitting addEventListener and boilerplate code

import { json } from "handlers"
const handler = request => {
  return json({ status: 200 })
}
```

After adding an identical `dependency` to `private-api/package.json`, run `lerna bootstrap` again, and begin sharing code between your projects.

When you are ready to deploy your codebases, define a script in each package’s `package.json` file (for example, `publish`), so that you can later deploy both codebases in a coordinated manner using the command `lerna run <SCRIPT_NAME>`:

```json
---
filename: packages/public-api/package.json
---
{
  "name": "public-api",
  "scripts": {
    "publish": "wrangler publish"
  }
}
```

```json
---
filename: packages/private-api/package.json
---
{
  "name": "private-api",
  "scripts": {
    "publish": "wrangler publish"
  }
}
```

`lerna run publish` will look for the `publish` script defined in each package’s `project.json`, and if the project defines it, it will run the script inside of that project’s directory:

```sh
---
header: Publish packages using lerna run
---
~/workers-monorepo $ lerna run publish

lerna info Executing command in 2 packages: "npm run publish"
lerna info run Ran npm script "publish" in "public-api" in 4.8s:

> public-api@1.0.0 publish /workers-monorepo/packages/public-api
> wrangler publish

lerna info run Ran npm script "publish" in "private-api" in 6.5s:

> private-api@1.0.0 publish /workers-monorepo/packages/private-api
> wrangler publish

lerna success run Ran npm script "publish" in 2 packages in 6.5s:
lerna success - public-api
lerna success - private-api
```

If you would like to review an example repository, refer to the accompanying open-source codebase on [GitHub](https://github.com/signalnerve/lerna-wrangler-monorepo-example) for this tutorial.
