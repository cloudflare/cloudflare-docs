---
pcx-content-type: configuration
title: Workers Sites configuration
weight: 4
---

# Workers Sites configuration

Workers Sites require the latest version of [Wrangler](https://github.com/cloudflare/wrangler).

## Commands

{{<definitions>}}

- `wrangler generate proj --site`

  - Creates a project with a Worker serving a generic HTML file and favicon with the directory structure:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">├── public # files to serve</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">|  ├── favicon.ico</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">|  └── index.html</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">├── workers-site</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">|  ├── index.js # Workers script that serves the assets</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">|  ├── package-lock.json</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">|  └── package.json # defines dependencies used by Workers script</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">└── wrangler.toml</span></div></span></span></span></code></pre>{{</raw>}}

  - Auto-fills `wrangler.toml` with `entry-point` (defaults to `workers-site`) and `bucket` (defaults to `public`).

- `wrangler init proj --site`
  - Creates a `wrangler.toml` file and a `workers-site` directory. In the `site` configuration key in the generated `wrangler.toml` file, you will need to update the `bucket` key with the relative path to the folder containing your static site assets. For example, if your website lives within the `public` directory of your project, then you should use the `bucket = "./public"` pairing.

{{</definitions>}}

## wrangler.toml

There are a few specific configuration settings for Workers Sites in your `wrangler.toml` file:

{{<definitions>}}

- `bucket` {{<prop-meta>}}required{{</prop-meta>}}

  - The directory containing your static assets, path relative to your `wrangler.toml`. Example: `bucket = "./public"`.

- `entry-point` {{<prop-meta>}}optional{{</prop-meta>}}

  - The location of your Worker script, default is `workers-site`. Example: `entry-point = "./workers-site"`.

- `include` {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of gitignore-style patterns for files or directories in `bucket` you exclusively want to upload. Example: `include = ["upload_dir"]`.

- `exclude` {{<prop-meta>}}optional{{</prop-meta>}}
  - A list of gitignore-style patterns for files or directories in `bucket` you want to exclude from uploads. Example: `exclude = ["ignore_dir"]`.

{{</definitions>}}

To learn more about the optional `include` and `exclude` fields, refer to [Ignoring subsets of static assets](#ignoring-subsets-of-static-assets).

{{<Aside type="note">}}

If your project uses [environments](/workers/platform/environments/), make sure to place `site` above any environment-specific configuration blocks.

{{</Aside>}}

Example of a `wrangler.toml`:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><span class="CodeBlock--filename">wrangler.toml</span><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">account_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;95e...&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;docs-site-blah&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">type</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;webpack&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">workers_dev</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">false</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">site</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">bucket</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;./public&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">entry-point</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;workers-site&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">env.production</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;docs-site&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">route</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;https://example.com/docs*&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">zone_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;351c..&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">account_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;b54f07a..&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">env.staging</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">zone_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;ef47a...&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">account_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;95e5d...&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;docs-site-staging&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">route</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;https://staging.example.com/docs*&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Storage limits

For very exceptionally large pages, Workers Sites might not work for you. There is a 25 MiB limit per page or file.

## Ignoring subsets of static assets

Workers Sites require [Wrangler](https://github.com/cloudflare/wrangler) - make sure to use the [latest version](/workers/cli-wrangler/install-update/#update).

There are cases where users may not want to upload certain static assets to their Workers Sites.
In this case, Workers Sites can also be configured to ignore certain files or directories using logic
similar to [Cargo's optional include and exclude fields](https://doc.rust-lang.org/cargo/reference/manifest.html#the-exclude-and-include-fields-optional).

This means that you should use gitignore semantics when declaring which directory entries to include or ignore in uploads.

### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, you can add an `include` field to your `[site]` section of your `wrangler.toml` file:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">site</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">bucket</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;./public&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">entry-point</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;workers-site&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">include</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;included_dir&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-comment"># must be an array.</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Wrangler will only upload files or directories matching the patterns in the `include` array.

### Excluding files/directories

If you want to exclude files or directories in your `bucket`, you can add an `exclude` field to your `[site]` section of your `wrangler.toml` file:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">site</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">bucket</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;./public&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">entry-point</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;workers-site&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">exclude</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;excluded_dir&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-comment"># must be an array.</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Wrangler will ignore files or directories matching the patterns in the `exclude` array when uploading assets to Workers KV.

### Include > exclude

If you provide both `include` and `exclude` fields, the `include` field will be used and the `exclude` field will be ignored.

### Default ignored entries

Wrangler will always ignore:

- `node_modules`
- Hidden files and directories
- Symlinks

#### More about include/exclude patterns

Learn more about the standard patterns used for include and exclude in the [gitignore documentation](https://git-scm.com/docs/gitignore).

## Customizing your build

Workers Sites projects use webpack by default. You can [bring your own webpack configuration](/workers/cli-wrangler/webpack/#using-with-workers-sites), however it is important to be cognizant of your `entry` and `context` settings.
