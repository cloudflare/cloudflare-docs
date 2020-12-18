# Deploying your site

We support deploying any static HTML website to Cloudflare Pages. If you manage your website without using a framework or static site generator, or if your framework isn't listed in our [How-To](/how-to) section, you can still deploy it using this guide.

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). Once you've created a new repository, you can push your local application to GitHub:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

You can deploy your site to Cloudflare Pages by going to the dashboard, and creating a new site. Select your new GitHub repository that you created above, and in the configuration section, provide the following information:

<TableLayout>

| Configuration option     | Value              |
| ------------------------ | ------------------ |
| Production branch        | `main`             |
| Build command (optional) | `yourbuildcommand` |
| Build directory          | `yourbuilddir`     |

</TableLayout>

Unlike many of our How-To guides, the build command and build directory for your site are going to be completely custom. If you don't use a build command for your site, you can omit that field.

Once you've configured your site, you can begin your first deploy. Your custom build command (if provided) will run, and Pages will deploy your static site.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, check out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`. Every time you commit new code to your Vue application, Cloudflare Pages will automatically rebuild your project and deploy it. You'll also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

Congrats, you've deployed your custom site on Cloudflare Pages! To learn more about what you can do with the platform, [check out our How-To section](/how-to).
