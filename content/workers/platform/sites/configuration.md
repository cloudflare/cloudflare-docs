---
pcx_content_type: configuration
title: Workers Sites configuration
weight: 4
---

# Workers Sites configuration

Workers Sites require the latest version of [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler).

## wrangler.toml

There are a few specific configuration settings for Workers Sites in your `wrangler.toml` file:

{{<definitions>}}

- `bucket` {{<prop-meta>}}required{{</prop-meta>}}

  - The directory containing your static assets, path relative to your `wrangler.toml`. Example: `bucket = "./public"`.

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

```toml
---
filename: wrangler.toml
---
name = "docs-site-blah"

[site]
bucket = "./public"

[env.production]
name = "docs-site"
route = "https://example.com/docs*"

[env.staging]
name = "docs-site-staging"
route = "https://staging.example.com/docs*"
```

## Storage limits

For very exceptionally large pages, Workers Sites might not work for you. There is a 25 MiB limit per page or file.

## Ignoring subsets of static assets

Workers Sites require [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) - make sure to use the [latest version](/workers/wrangler/install-and-update/#update-wrangler).

There are cases where users may not want to upload certain static assets to their Workers Sites.
In this case, Workers Sites can also be configured to ignore certain files or directories using logic
similar to [Cargo's optional include and exclude fields](https://doc.rust-lang.org/cargo/reference/manifest.html#the-exclude-and-include-fields-optional).

This means that you should use gitignore semantics when declaring which directory entries to include or ignore in uploads.

### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, you can add an `include` field to your `[site]` section of your `wrangler.toml` file:

```toml
[site]
bucket = "./public"
include = ["included_dir"] # must be an array.
```

Wrangler will only upload files or directories matching the patterns in the `include` array.

### Excluding files/directories

If you want to exclude files or directories in your `bucket`, you can add an `exclude` field to your `[site]` section of your `wrangler.toml` file:

```toml
[site]
bucket = "./public"
exclude = ["excluded_dir"] # must be an array.
```

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
