---
pcx-content-type: how-to
---

import TutorialsBeforeYouStart from "../_partials/_tutorials-before-you-start.md" 

# Deploy a Crisp React app

[Crisp React](https://github.com/winwiz1/crisp-react) is an open-source boilerplate for building modern web applications. It has small codebase and a simple build with focus on performance and maintainability while offering build-time SSR and ability to split a monolithic React app into multiple SPAs.
In this guide, you will create a new Crisp React application and deploy it using Cloudflare Pages.

## Setting up a new project

Create a new project by cloning the Crisp React repository:

```sh
$ git clone https://github.com/winwiz1/crisp-react.git
$ cd crisp-react
```

<TutorialsBeforeYouStart/>

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your cloned repository to GitHub by running the following commands in your terminal:

```sh
# Setup the local repository to point to the newly created one
$ git remote set-url origin https://github.com/your-github-username/your-newly-created-repo

# Send commit to new GitHub repo
$ git push
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<TableLayout>

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `master`          |
| Build command        | `yarn build:jamstack` |
| Build output directory | `/client/dist` |

</TableLayout>

Add the following environment variable:

<TableLayout>

| Environment variable | Value |
| -------------------- | ----- |
| NODE_VERSION | `14.17.5` |

</TableLayout>

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

After you have deployed your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/platform/preview-deployments), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

<Aside type="note">

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/get-started).

</Aside>

## Learn more

By completing this guide, you have successfully deployed your Crisp React app to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/framework-guides).
