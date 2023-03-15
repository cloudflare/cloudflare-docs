---
pcx_content_type: how-to
title: Deploy an Mkdocs site
---

# Deploy an Mkdocs site

[Mkdocs](https://www.mkdocs.org/) is a modern documentation platform where teams can document products, internal knowledge bases and APIs.

## Install Mkdocs

MkDocs requires a recent version of Python and the Python package manager, pip, to be installed on your system. To install pip, refer to the [Mkdocs Installation guide](https://www.mkdocs.org/user-guide/installation/). With pip installed, run:

```sh
$ pip install mkdocs
```

## Create an Mkdocs project

Use the `mkdocs new` command to create a new application:

```sh
$ mkdocs new <PROJECT_NAME>
```

Then `cd` into your project, take Mkdocs and its dependencies and put them into a `requirements.txt` file:

```sh
pip freeze > requirements.txt
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository.md">}}

You have successfully created a GitHub repository and pushed your Mkdocs project to that repository.

## Deploy with Cloudflare Pages

Deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In **Account Home**, select **Pages** > **Create a project**. 
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, select *Mkdocs* as your **Framework preset**. Your selection will provide the following information:

{{<table-wrap>}}

| Configuration option | Value                       |
| -------------------- | --------------------------- |
| Production branch    | `main`                      |
| Build command        | `mkdocs build`               |
| Build directory      | `site`                      |

{{</table-wrap>}}

4. Go to **Environment variables (advanced)** > **Add variable** > and add the variable `PYTHON_VERSION` with a value of `3.7`.

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Every time you commit new code to your Mkdocs site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests and be able to preview how changes to your site look before deploying them to production.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{<render file="_learn-more.md" withParameters="Mkdocs">}}
