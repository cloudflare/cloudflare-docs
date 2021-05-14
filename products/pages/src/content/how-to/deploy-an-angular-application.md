# Deploy an Angular application

Angular is an incredibly popular framework for building reactive and powerful frontend applications.

In this guide, you'll create a new Angular application and deploy it using Cloudflare Pages. We'll be using Angular CLI, a batteries-included tool for generating new Angular applications.

## Setting up a new project

If you already have [Angular CLI](https://angular.io/cli) installed globally, you may invoke the `ng` executable directly:

```sh
# Create the project
$ ng new my-angular-app
# Enter the new directory
$ cd my-angular-app
```

Alternatively, you can use [`npx`](https://www.npmjs.com/package/npx), which is included with all modern `npm` versions, to avoid the global installation:

<Aside>

**Note:** All modern versions of `npm` already include the `npx` executable. You do not need to install anything for this approach.

</Aside>

```sh
# Create the project
$ npx @angular/cli new my-angular-app
# Enter the new directory
$ cd my-angular-app
```

With both approaches, the Angular CLI will prompt you for customization choices. Your answers _will not_ affect the rest of this tutorial, so please feel free to select what's ideal for your project.


## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). You can then push your new application to GitHub:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

You can deploy your site to Pages by going to the [Cloudflare dashboard](https://dash.cloudflare.com/) and clicking the "Create a project" button.

You will be asked to authorize access to your GitHub account, if you haven't already done so. Cloudflare needs this so that it can monitor and deploy your projects from source. You may narrow access to specific repositories if you prefer; however, you will have to update this list as you attach more repositories to Cloudflare Pages.

Select the new GitHub repository that you created above and, in the configuration section, provide the following information:

<TableLayout>

| Configuration option | Value                            |
| -------------------- | -------------------------------- |
| Production branch    | `main`                           |
| Build command        | `npm run build -- -c production` |
| Build directory      | `dist/my-angular-app`            |

</TableLayout>

Optionally, you can customize the `Project Name` setting. It defaults to the repository's name, but it does not need to match. This value is assigned as your `pages.dev` subdomain.

#### Angular CLI Configuration

Angular CLI expects to build and manage multiple projects by default.

When we generated a new project, we called it "my-angular-app" which means that Angular CLI created an `angular.json` file with a `"my-angular-app"` configuration key under the `"projects"` block. The CLI does this to prepare your workspace for new projects and configurations to be added at any point in time. It should look similar to this:

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

You'll notice that there's an `outputPath` option within the `projects.my-angular-app.architect.build` object. This value tells Angular CLI where to place the "my-angular-app" project's output files. By default, it is `dist/my-angular-app` which is reflected in the "Build directory" setting of the Pages configuration.

Of course, you can modify this `outputPath` value – but you must remember to update the Pages settings, too!

### Finalize Setup

Once you've configured your site, click the "Save and Deploy" button!

You'll see your first deploy pipeline in progress. Pages installs all dependencies – including Angular CLI – and builds the project as specified.

<Aside>

**Note:** For the complete guide to deploying your first site to Cloudflare Pages, check out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you'll have access to [preview deployments](/platform/preview-deployments), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project _with a real URL_ before deploying them to production.

## Learn more

Congratulations! You've deployed your Angular CLI site to Cloudflare Pages!

To learn more about what you can do with the platform, [check out our How To section](/how-to).
