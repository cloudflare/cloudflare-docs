# Deploy a Preact site

[Preact](https://preactjs.com) is a popular, open-source framework for building modern web applications. Preact can also be used as a lightweight alternative to React because the two share the same API and component model.

In this guide, you'll create a new Preact application and deploy it using Cloudflare Pages.
We'll be using [`wmr`](https://github.com/preactjs/wmr), an all-in-one development tool built by the Preact team, to quickly generate an optimized web application.

## Setting up a new project

Create a new project using [`npm init`](https://docs.npmjs.com/cli/v6/commands/npm-init), giving it a title:

```sh
$ npm init wmr your-project-name
$ cd your-project-name
```

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). You can then push your application to GitHub:

```sh
# setup the local repository
$ git init
$ git remote add origin https://github.com/yourgithubusername/githubrepo
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
| Build directory      | `dist`          |

</TableLayout>

Optionally, you can customize the `Project Name` setting. It defaults to the repository's name, but it does not need to match. This value is assigned as your `pages.dev` subdomain.

Once you've configured your site, click the "Save and Deploy" button!

You'll see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

<Aside>

**Note:** You will notice that within the `package.json` file, the `"build"` script uses the `--prerender` flag. With this, `wmr` produces static HTML pages – along with their assets – which is perfect for Pages.

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you'll have access to [preview deployments](/platform/preview-deployments), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project _with a real URL_ before deploying them to production.

## Learn more

Congratulations! You've deployed your Preact site to Cloudflare Pages!

To learn more about what you can do with the platform, [check out our How To section](/how-to).
