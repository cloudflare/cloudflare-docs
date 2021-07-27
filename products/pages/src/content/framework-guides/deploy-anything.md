---
pcx-content-type: how-to
---

# Deploying your site

Cloudflare supports deploying any static HTML website to Cloudflare Pages. If you manage your website without using a framework or static site generator, or if your framework is not listed in our [How-To](/how-to) section, you can still deploy it using this guide.

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, you can push your local application to GitHub:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

You can deploy your site to Cloudflare Pages by going to the dashboard and creating a new site. Select your new GitHub repository that you created above, and in the configuration section, provide the following information:

<TableLayout>

| Configuration option     | Value              |
| ------------------------ | ------------------ |
| Production branch        | `main`             |
| Build command (optional) | `yourbuildcommand` |
| Build output directory   | `yourbuilddir`     |

</TableLayout>

Unlike many of our How-To guides, the build command and build directory for your site are going to be completely custom. If you do not need a build step, input  `exit 0` into the **Build command** field.

Once you have configured your site, you can begin your first deploy. Your custom build command (if provided) will run, and Pages will deploy your static site.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, refer to [the Get Started guide](/getting-started).

</Aside>

After you have deployed your site, you will receive a unique subdomain for your project on `pages.dev`. Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your site on Cloudflare Pages. To learn more about what you can do with the platform, refer to the [How-To section](/how-to).
