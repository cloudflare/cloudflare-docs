---
pcx-content-type: how-to
title: Deploy a Zola site
---

# Deploy a Zola site

[Zola](https://www.getzola.org/) is a fast static site generator in a single binary with everything built-in. In this guide, you will create a new Zola application and deploy it using Cloudflare Pages. You will use the `zola` CLI to create a new Zola site.

## Installing Zola

First, [install](https://www.getzola.org/documentation/getting-started/installation/) the `zola` CLI, using the specific instructions for your operating system below:

### macOS (Homebrew)

If you use the package manager [Homebrew](https://brew.sh), run the `brew install` command in your terminal to install Zola:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">brew install zola</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Windows (Chocolatey)

If you use the package manager [Chocolatey](https://chocolatey.org/), run the `choco install` command in your terminal to install Zola:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">choco install zola</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Windows (Scoop)

If you use the package manager [Scoop](https://scoop.sh/), run the `scoop install` command in your terminal to install Zola:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">scoop install zola</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Linux (pkg)

Your Linux distro's package manager may include Zola. If this is the case, you can install it directly using your distro's package manager -- for example, using `pkg`, run the following command in your terminal:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">pkg install zola</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

If your package manager does not include Zola or you would like to download a release directly, refer to the [**Manual**](/pages/framework-guides/deploy-a-zola-site/#manual-installation) section below.

### Manual installation

The Zola GitHub repository contains pre-built versions of the Zola command-line tool for various operating systems, which can be found on [the Releases page](https://github.com/getzola/zola/releases).

For more instruction on installing these releases, refer to [Zola's install guide](https://www.getzola.org/documentation/getting-started/installation/).

## Creating a new project

With Zola installed, create a new project by running the `zola init` command in your terminal using the default template:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">zola init my-zola-project</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Upon running `zola init`, you will prompted with three questions:

1.  What is the URL of your site? (https://example.com):
    You can leave this one blank for now.

2.  Do you want to enable Sass compilation? \[Y/n]: Y

3.  Do you want to enable syntax highlighting? \[y/N]: y

4.  Do you want to build a search index of the content? \[y/N]: y

{{<render file="_tutorials-before-you-start.md">}}

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git remote add origin https://github.com/yourgithubusername/githubrepo</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git branch -M main</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git push -u origin main</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value        |
| -------------------- | ------------ |
| Production branch    | `main`       |
| Build command        | `zola build` |
| Build directory      | `public`     |

</div>

Below the configuration, make sure to set the **Environment Variables (advanced)** for specifying the `ZOLA_VERSION`.

For example, `ZOLA_VERSION`: `0.14.0`.

{{<Aside type="warning">}}

Currently, Cloudflare Pages only supports `ZOLA_VERSION`: <=`0.14.0` in builds.

{{</Aside>}}

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `zola`, your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

You can now add that subdomain as the `base_url` in your `config.toml` file.

For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-yaml" language="yaml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># The URL the site will be built for</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">base_url = &quot;https</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">//my</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">zola</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">project.pages.dev&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Every time you commit new code to your Zola site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Zola site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
