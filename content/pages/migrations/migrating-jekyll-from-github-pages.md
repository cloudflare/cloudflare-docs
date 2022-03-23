---
updated: 2021-07-27
difficulty: Beginner
pcx-content-type: tutorial
title: Migrating a Jekyll-based site from GitHub Pages
---

# Migrating a Jekyll-based site from GitHub Pages

In this tutorial, you will learn how to to migrate an existing [GitHub Pages site using Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll) to Cloudflare Pages. Jekyll is one of the most popular static site generators used with GitHub Pages, and migrating your GitHub Pages site to Cloudflare Pages will take a few short steps.

This tutorial will guide you through:

1.  Adding the necessary dependencies used by GitHub Pages to your project configuration.
2.  Creating a new Cloudflare Pages site, connected to your existing GitHub repository.
3.  Building and deploying your site on Cloudflare Pages.
4.  (Optional) Migrating your custom domain.

Including build times, this tutorial should take you less than 15 minutes to complete.

{{<Aside type="note">}}

If you have a Jekyll-based site not deployed on GitHub Pages, refer to [the Jekyll framework guide](/pages/framework-guides/deploy-a-jekyll-site/).

{{</Aside>}}

## Before you begin

This tutorial assumes:

1.  You have an existing GitHub Pages site using [Jekyll](https://jekyllrb.com/)
2.  You have some familiarity with running Ruby's command-line tools, and have both `gem` and `bundle` installed.
3.  You know how to use a few basic Git operations, including `add`, `commit`, `push`, and `pull`.
4.  You have read the [Get Started](/pages/get-started/) guide for Cloudflare Pages.

If you do not have Rubygems (`gem`) or Bundler (`bundle`) installed on your machine, refer to the installation guides for [Rubygems](https://rubygems.org/pages/download) and [Bundler](https://bundler.io/).

## Preparing your GitHub Pages repository

{{<Aside type="note">}}

If your GitHub Pages repository already has a `Gemfile` and `Gemfile.lock` present, you can skip this step entirely. The GitHub Pages environment assumes a default set of Jekyll plugins that are not explicitly specified in a `Gemfile`.

{{</Aside>}}

Your existing Jekyll-based repository must specify a `Gemfile` (Ruby's dependency configuration file) to allow Cloudflare Pages to fetch and install those dependencies during the [build step](/pages/platform/build-configuration/).

Specifically, you will need to create a `Gemfile` and install the `github-pages` gem, which includes all of the dependencies that the GitHub Pages environment assumes.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><span class="CodeBlock--header">Create a Gemfile</span><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cd my-github-pages-repo</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">bundle init</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Open the `Gemfile` that was created for you, and add the following line to the bottom of the file:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-ruby" language="ruby"><span class="CodeBlock--header">Specifying the github-pages version</span><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">gem </span><span class="CodeBlock--token-string-literal CodeBlock--token-string">&quot;github-pages&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string-literal CodeBlock--token-string">&quot;~&gt 215&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-symbol">group</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-symbol">:jekyll_plugins</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Your `Gemfile` should resemble the below:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-ruby" language="ruby"><span class="CodeBlock--filename">Gemfile</span><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># frozen_string_literal: true</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">source </span><span class="CodeBlock--token-string-literal CodeBlock--token-string">&quot;https://rubygems.org&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">git_source</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-symbol">:github</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain">repo_name</span><span class="CodeBlock--token-operator">|</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string-literal CodeBlock--token-string">&quot;https://github.com/</span><span class="CodeBlock--token-string-literal CodeBlock--token-interpolation CodeBlock--token-delimiter CodeBlock--token-punctuation">#{</span><span class="CodeBlock--token-string-literal CodeBlock--token-interpolation CodeBlock--token-content">repo_name</span><span class="CodeBlock--token-string-literal CodeBlock--token-interpolation CodeBlock--token-delimiter CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-string-literal CodeBlock--token-string">&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># gem &quot;rails&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">gem </span><span class="CodeBlock--token-string-literal CodeBlock--token-string">&quot;github-pages&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string-literal CodeBlock--token-string">&quot;~&gt 215&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-symbol">group</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-symbol">:jekyll_plugins</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Run `bundle update`, which will install the `github-pages` gem for you, and create a `Gemfile.lock` file with the resolved dependency versions.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><span class="CodeBlock--header">Running bundle update</span><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">bundle update</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment CodeBlock--token-unselectable"># Bundler will show a lot of output as it fetches the dependencies</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

This should complete successfully. If not, verify that you have copied the `github-pages` line above exactly, and have not commented it out with a leading `#`.

You will now need to commit these files to your repository so that Cloudflare Pages can reference them in the following steps:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><span class="CodeBlock--header">Commit Gemfile and Gemfile.lock</span><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git add Gemfile Gemfile.lock</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git commit -m &quot;deps: added Gemfiles&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">git push origin main</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Configuring your Pages project

With your GitHub Pages project now explicitly specifying its dependencies, you can start configuring Cloudflare Pages. The process is almost identical to [deploying a Jekyll site](/pages/framework-guides/deploy-a-jekyll-site/).

{{<Aside type="note">}}

If you are configuring your Cloudflare Pages site for the first time, refer to the [Get started guide](/pages/get-started/#connect-to-github), which explains how to connect your existing GitHub repository to Cloudflare Pages.

{{</Aside>}}

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

| Configuration option | Value          |
| -------------------- | -------------- |
| Production branch    | `main`         |
| Build command        | `jekyll build` |
| Build directory      | `_site`        |

</div>

After you have configured your site, you can begin your first deploy. You should see Cloudflare Pages installing `jekyll`, your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit new code to your Jekyll site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Migrating your custom domain

If you are using a [custom domain with GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site), you must update your DNS record(s) to point at your new Cloudflare Pages deployment. This will require you to update the `CNAME` record at the DNS provider for your domain to point to `<your-pages-site>.pages.dev`, replacing `<your-username>.github.io`.

Note that it may take some time for DNS caches to expire and for this change to be reflected, depending on the DNS TTL (time-to-live) value you set when you originally created the record.

Refer to the [adding a custom domain](/pages/get-started/#adding-a-custom-domain) section of the Get started guide for a list of detailed steps.

## What's next?

- Learn how to [customize HTTP response headers](/pages/how-to/add-custom-http-headers/) for your Pages site using Cloudflare Workers.
- Understand how to [rollback a potentially broken deployment](/pages/platform/rollbacks/) to a previously working version.
- [Configure redirects](/pages/platform/redirects/) so that visitors are always directed to your 'canonical' custom domain.
