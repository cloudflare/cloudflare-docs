---
pcx-content-type: how-to
title: Start from existing
weight: 1
---

# Start from existing

Workers Sites require [Wrangler](https://github.com/cloudflare/wrangler) — make sure to use the [latest version](/workers/cli-wrangler/install-update/#update).

To deploy a pre-existing static site project, start with a pre-generated site. Workers Sites works well with all static site generators. For a quick-start, review the following projects:

- [Hugo](https://gohugo.io/getting-started/quick-start/)
- [Gatsby](https://www.gatsbyjs.org/docs/quick-start/), requires Node
- [Jekyll](https://jekyllrb.com/docs/), requires Ruby
- [Eleventy](https://www.11ty.io/#quick-start), requires Node
- [WordPress](https://wordpress.org) (refer to the tutorial on [deploying static WordPress sites with Workers](/workers/tutorials/deploy-a-static-wordpress-site/))

After you have generated a site, follow these steps:

1.  Run this Wrangler command in the root of your project’s directory:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">wrangler init --site my-static-site</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

This command creates a few things: a `wrangler.toml` file and a `workers-site` directory.

2.  Add your site’s build directory to the `wrangler.toml` file:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">site</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">bucket</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;./public&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-comment"># &lt-- Add your build directory name here.</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">entry-point</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;workers-site&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The default directories for the most popular static site generators are listed below:

    - Hugo: `public`
    - Gatsby: `public`
    - Jekyll: `_site`
    - Eleventy: `_site`

3\. Add your `account_id` to your `wrangler.toml`. You can find your `account_id` by logging into the Cloudflare dashboard **Account Home** > **choose your website** > **Overview** > **Account ID** For more details on finding your `account_id`, refer to the [Gett started guide](/workers/get-started/guide/#6a-obtaining-your-account-id-and-zone-id).

4.  You can preview your site by running:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">wrangler dev</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

5.  Decide if you would like to publish your site to a [`*.workers.dev` subdomain](/workers/get-started/guide/#configure-for-deploying-to-workersdev) or a [custom domain](/workers/get-started/guide/#optional-configure-for-deploying-to-a-registered-domain) that you own and have already attached as a Cloudflare zone.

Then update your `wrangler.toml`:

**Personal Domain**: Add your `zone_id` and a `route`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">zone_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;42ef..&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">route</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;example.com/*&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

**`*.workers.dev`**: Set `workers_dev` to true. This is the default.

Learn more about [configuring your project](/workers/get-started/guide/#6-configure-your-project-for-deployment).

6.  Run:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">wrangler publish</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
