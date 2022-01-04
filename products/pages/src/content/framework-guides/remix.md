---
pcx-content-type: how-to
---

import TutorialsBeforeYouStart from "../_partials/_tutorials-before-you-start.md" 

# Deploy a Remix site

[Remix](https://remix.run/) is a framework that is focused on fully utilizing the power of the web. Like Cloudflare Workers, it uses modern JavaScript APIs, and it places emphasis on web fundamentals such as meaningful HTTP status codes, caching and optimizing for both usability and performance.

In this guide, you will create a new Remix application and deploy to Cloudflare Pages. 

## Setting up a new project

Start by installing the latest version of Remix. Create a new project directory and then intialize a Remix project by running:

```sh
$ npx create-remix@latest

```

After running the above command, you will be prompted in the CLI to name your project and select your deploy method. This guide uses Cloudflare Pages. 

By selecting Cloudflare Pages as your deploy option in the CLI drop down, your folder will have a `functions/[[path]].ts` file. This is the functions integration where we serve your Remix application on all function paths of your website. After selecting your deployment option, change the directory to your project and see your project by running the following command: 

```sh
# choose Cloudflare Pages
cd [whatever you named the project]
$ npm run dev
```

<TutorialsBeforeYouStart/>

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```
## Deploying with Cloudflare Pages

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<TableLayout>

| Configuration option | Value           |
| -------------------- | ----------------|
| Production branch    | `main`          |
| Framework preset     | `Remix`         |
| Build command        | `npm run build` |
| Build directory      | `public`        |

</TableLayout>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `npm`, your project dependencies, and building your site before deploying it.

<Aside type="note">

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/get-started).

</Aside>

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your Remix site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Remix.js site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/framework-guides).
