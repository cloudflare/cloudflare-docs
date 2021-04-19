# Deploy a Svelte site

[Svelte](https://svelte.dev) is an increasingly popular, open-source framework for building user interfaces and web applications. Unlike most frameworks, Svelte is primarily a compiler that converts your component code into efficient JavaScript that surgically updates the DOM when your application state changes.

In this guide, you'll create a new Svelte application and deploy it using Cloudflare Pages.
We'll be using [`SvelteKit`](https://kit.svelte.dev/), the official Svelte framework for building web applications of all sizes.

<Aside type="warning">

**Note:** At the time of writing, SvelteKit is still in beta. However, the Svelte team is confident that the steps below are stable. This guide will be updated as needed, both during and after the beta phase.

</Aside>

## Setting up a new project

Create a new project using [`npm init`](https://docs.npmjs.com/cli/v6/commands/npm-init), giving it a title:

```sh
$ npm init svelte@next my-svelte-app
$ cd my-svelte-app
```

During `init`, SvelteKit will prompt you for customization choices. Your answers _will not_ affect the rest of this tutorial, so please feel free to select what's ideal for your project.

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). You can then push your application to GitHub:

```sh
# setup the local repository
$ git init
$ git remote add origin https://github.com/<username>/<repo>
$ git branch -M main

# commit all initial files
$ git add -A
$ git commit -m "initial commit"

# send commit to new GitHub repo
$ git push -u origin main
```

## Deploying with Cloudflare Pages

You can deploy your site to Pages by going to the [Cloudflare dashboard](https://dash.cloudflare.com/) and clicking the "Create a project" button.

You will be asked to authorize access to your GitHub account, if you haven't already done so. Cloudflare needs this so that it can monitor and deploy your projects from source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) as you wish to attach more repositories to Cloudflare Pages.

Select the new GitHub repository that you created above and, in the configuration section, provide the following information:

<TableLayout>

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Build command        | `npm run build` |
| Build directory      | `build`          |

</TableLayout>

Optionally, you can customize the `Project Name` setting. It defaults to the repository's name, but it does not need to match. This value is assigned as your `pages.dev` subdomain.

### SvelteKit Configuration

By default, SvelteKit prepares our project with the assumption that it will deployed to a Node.js server. This isn't appropriate for our case, but luckily SvelteKit is flexible and has a ready-made "adapter" for our needs. A few changes have to be made, but it will be a very easy process!

First, let's remove the [`@sveltejs/adapter-node`](https://www.npmjs.com/package/@sveltejs/adapter-node) dependency and install the [`@sveltejs/adapter-static`](https://www.npmjs.com/package/@sveltejs/adapter-static) package instead:

```sh
$ npm uninstall @sveltejs/adapter-node
$ npm install @sveltejs/adapter-static@next --save-dev
```

Then, in the `svelte.config.cjs` file, we need to update the adapter selection too:

```diff
const sveltePreprocess = require('svelte-preprocess');
--const node = require('@sveltejs/adapter-node');
const pkg = require('./package.json');

module.exports = {
  // ... truncated ...
	kit: {
--		adapter: node(),
++		adapter: require('@sveltejs/adapter-static')(),
		// ... truncated ...
	}
};
```

<Aside>

**Important:** Remember to commit and push these changes to your GitHub repository!

</Aside>

### Finalize Setup

Once you've configured your site, click the "Save and Deploy" button!

You'll see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you'll have access to [preview deployments](/platform/preview-deployments), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project _with a real URL_ before deploying them to production.


## Learn more

Congratulations! You've deployed your Svelte site to Cloudflare Pages!

To learn more about what you can do with the platform, [check out our How To section](/how-to).
