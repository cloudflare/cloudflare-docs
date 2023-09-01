---
pcx_content_type: how-to
title: Deploy an Angular site
---

# Deploy an Angular site

[Angular](https://angular.io/) is an incredibly popular framework for building reactive and powerful front-end applications.

In this guide, you will create a new Angular application and deploy it using Cloudflare Pages. You will use the Angular CLI, a batteries-included tool for generating new Angular applications.

## Setting up a new project

If you already have [Angular CLI](https://angular.io/cli) installed globally, invoke the `ng` executable directly:

```sh
# Create the project
$ ng new my-angular-app
# Enter the new directory
$ cd my-angular-app
```

Alternatively, you can use [`npx`](https://www.npmjs.com/package/npx), which is included with all modern `npm` versions, to avoid the global installation:

{{<Aside type="note">}}

All modern versions of `npm` already include the `npx` executable. You do not need to install anything for this approach.

{{</Aside>}}

```sh
# Create the project
$ npx @angular/cli new my-angular-app
# Enter the new directory
$ cd my-angular-app
```

With both approaches, the Angular CLI will prompt you for customization choices. Your answers will not affect the rest of this tutorial. Choose the option that is ideal for your project.

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository_no_init.md">}}

## Deploying with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.

You will be asked to authorize access to your GitHub account if you have not already done so. Cloudflare needs this so that it can monitor and deploy your projects from the source. You may narrow access to specific repositories if you prefer; however, you will have to manually update this list [within your GitHub settings](https://github.com/settings/installations) when you want to add more repositories to Cloudflare Pages.

Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

{{<pages-build-preset framework="angular-cli">}}

{{<Aside type="warning" header="Minimum Node.js version">}}

Angular requires a Node version of `14.15` or `16.10` to deploy successfully to Cloudflare Pages. When setting up your project, select **Environment variables (advanced)** and input an environment variable `NODE_VERSION` with one of these values.

{{</Aside>}}

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

#### Angular CLI Configuration

Angular CLI expects to build and manage multiple projects by default.

When you generated a new project, you called it `"my-angular-app"` which means that Angular CLI created an `angular.json` file with a `"my-angular-app"` configuration key under the `"projects"` block. The CLI does this to prepare your workspace for new projects and configurations to be added at any point in time. It should look similar to this:

```js
// angular.json
{
  // ...
  "projects": {
    "my-angular-app": {
      "projectType": "application",
      // ...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/my-angular-app",
            "index": "src/index.html",
            // ...
          }
        }
      }
    }
  }
}
```

You will notice that there is an `outputPath` option within the `projects.my-angular-app.architect.build` object. This value tells Angular CLI where to place the "my-angular-app" project's output files. By default, it is `dist/my-angular-app` which is reflected in the **Build directory** setting of the Pages configuration.

You can modify this `outputPath` value but you must update the Pages settings too.

### Finalize Setup

After completing configuration, click the **Save and Deploy** button.

You will see your first deploy pipeline in progress. Pages installs all dependencies – including Angular CLI – and builds the project as specified.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](/pages/platform/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

{{<render file="_learn-more.md" withParameters="Angular">}}