---
pcx_content_type: how-to
title: Migrating from Wrangler 1
weight: 1
---

## Migrate from Wrangler 1

This document describes the steps to migrate a project from Wrangler 1 to Wrangler 2.

Wrangler 2 ships with new features and improvements that may require some changes to your configuration.

The CLI itself will guide you through the upgrade process.

<div style="position: relative; padding-top: 56.25%;">
	<iframe
		src="https://iframe.videodelivery.net/2a60561afea1159f7dd270fd9dce999f?poster=https%3A%2F%2Fcloudflarestream.com%2F2a60561afea1159f7dd270fd9dce999f%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
		style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
		allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
		allowfullscreen="true"
	></iframe>
</div>

{{<Aside type="note">}}
To learn more about the improvements to Wrangler, refer to the [Comparing Wrangler 1 & 2 page](/workers/wrangler/compare-v1-v2/).
{{</Aside>}}

### Update Wrangler version

#### 1. Uninstall Wrangler 1

If you had previously installed Wrangler 1 globally using NPM, you can uninstall it with:

```sh
$ npm uninstall -g @cloudflare/wrangler
```

If you used Cargo to install Wrangler 1, you can uninstall it with:

```sh
$ cargo uninstall wrangler
```

#### 2. Install Wrangler

Now, install the latest version of Wrangler.

```sh
$ npm install -g wrangler
```

#### 3. Verify your install

To check that you have installed the correct Wrangler version, run:

```sh
$ wrangler --version
```

### Test Wrangler 2 on your previous projects

Now you will test that Wrangler 2 can build your Wrangler 1 project. In most cases, it will build just fine. If there are errors, the command line should instruct you with exactly what to change to get it to build.

If you would like to read more on the deprecated `wrangler.toml` fields that cause Wrangler 2 to error, refer to [Deprecations](/workers/wrangler/migration/deprecations/).

Run the `wrangler dev` command. This will show any warnings or errors that should be addressed.
Note that in most cases, the messages will include actionable instructions on how to resolve the issue.

```sh
$ wrangler dev
```

- Errors need to be fixed before Wrangler can build your Worker.
- In most cases, you will only see warnings.
  These do not stop Wrangler from building your Worker, but consider updating the configuration to remove them.

Here is an example of some warnings and errors:

```sh
 ⛅️ wrangler 2.0.0
-------------------------------------------------------
▲ [WARNING] Processing wrangler.toml configuration:
  - 😶 Ignored: "type":
    Most common features now work out of the box with wrangler, including modules, jsx,
  typescript, etc. If you need anything more, use a custom build.
  - Deprecation: "zone_id":
    This is unnecessary since we can deduce this from routes directly.
  - Deprecation: "build.upload.format":
    The format is inferred automatically from the code.


✘ [ERROR] Processing wrangler.toml configuration:
  - Expected "route" to be either a string, or an object with shape { pattern, zone_id | zone_name }, but got "".
```

### Deprecations

Refer to the [deprecations guide](/workers/wrangler/migration/deprecations/) for more details on what is no longer supported.
