---
pcx_content_type: how-to
title: Deploy a Pelican site
---

# Deploy a Pelican site

[Pelican](https://docs.getpelican.com) is a static site generator, written in Python. With Pelican, you can write your content directly with your editor of choice in reStructuredText or Markdown formats.

## Create a Pelican project

To begin, create a Pelican project directory. `cd` into your new directory and run:


```sh
$ python3 -m pip install pelican
```

Then run:

```sh
$ pip freeze > requirements.txt
```

Create a directory in your project named `content`:

```sh
$ mkdir content
```

This is the folder name that you will set in the build command.

{{<render file="_tutorials-before-you-start.md">}}

## Create a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). When creating your repository, do not select to add a README file, `.gitignore` template or a license as these selections will cause the push to GitHub to fail.

In your terminal, `cd` into your new Pelican project directory and run:

```sh
$ git init
$ git add -A
$ git commit -m "<YOUR_COMMIT_MESSAGE>"
$ git remote add origin <YOUR_NEW_GITHUB_REPOSITORY_URL>
$ git push -u origin main
```

You have successfully created a GitHub repository and pushed your Pelican project to that repository.

## Deploy with Cloudflare Pages

Deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In **Account Home**, select **Pages** > **Create a project**. 
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select *Pelican* as your **Framework preset**. Your selection will provide the following information. The build command `pelican content` refers to the `content` folder you made earlier in this guide.

{{<table-wrap>}}

| Configuration option | Value                       |
| -------------------- | --------------------------- |
| Production branch    | `main`                      |
| Build command        | `pelican content`           |
| Build directory      | `output`                    |

{{</table-wrap>}}

4. Select **Environment variables (advanced)** and set the `PYTHON_VERSION` variable with the value of `3.7`.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Every time you commit new code to your Pelican site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests and be able to preview how changes look to your site before deploying them to production.

## Related resources

By completing this guide, you have successfully deployed your Pelican site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
