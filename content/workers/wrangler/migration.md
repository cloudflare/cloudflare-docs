---
pcx-content-type: how-to
title: Migrating from Wrangler 1
weight: 10
---

## Migration Guide

This document describes the steps to migrate a project from wrangler 1 to 2.

The latest version of wrangler ships with new features and improvements that will require you to include a few changes to your wrangler configuration to get it working as expected.

The good news is that the CLI itself should guide you through the upgrade process.

To learn more about new updates in Wrangler, refer to the [What's new page](/workers/wrangler/compare-v1-v2/).

### Upgrade to Wrangler 2

The first step is to either install Wrangler globally or use the `npx command` to run it against your Wrangler 1 project. If you had previously installed Wrangler globally, you can uninstall it with:

```sh
npm uninstall -g @cloudflare/wrangler
```

And then install Wrangler 2 with

```sh
npm install -g wrangler
```

Then, run the `wrangler dev` command to generate a list of deprecation warnings or fields which need to be changed in order to build your Worker using Wrangler 2.

```sh
wrangler dev
```

This will return some deprecated warnings that you will need to fix in order to get it working.

Example output:

````sh
 ⛅️ wrangler 0.0.34
-------------------------------------------------------
▲ [WARNING] Processing wrangler.toml configuration:
  - DEPRECATION: "type":
    DO NOT USE THIS. Most common features now work out of the box with wrangler, including modules, jsx, typescript, etc. If you need anything more, use a custom build.
  - DEPRECATION: "zone_id":
    This is unnecessary since we can deduce this from routes directly.
  - DEPRECATION: "build.upload.format":
    The format is inferred automatically from the code.


✘ [ERROR] Processing wrangler.toml configuration:
  - Expected "route" to be either a string, or an object with shape { pattern, zone_id | zone_name }, but got "".
````

### Deprecations

The following commands are deprecated in Wrangler 2.0, if you are migrating, be sure to go through the list and remove the commands that are no longer required:

- Remove the `type` and `webpack_config` property in your `wrangler.toml`. It is no longer required.
- Remove `webpack`
- Remove `zone_id` this is also no longer required since it can be deduced from the routes directly.
- Remove `site.entry-point` field as it is no longer used, the entry point should be specified through the `main` field.
- Remove `build.upload.format`, the format is now inferred automatically from the code.
- Remove `build.upload.main` and `build.upload.dir` fields in your configuration, instead use the top level `main` field, whuich now serves as the entry-point for the Worker.
- No longer need to use `wrangler preview`, this is now replaced by the `wrangler dev` command, for running your worker in your local environment.
- The `wrangler generate` command is now deprecated, you can use a worker starter by cloning it directly from GitHub.
- The `wrangler route` command is deprecated, use `wrangler build` instead.
- The `wrangler report` command is deprecated, the error reports are now made interactively.
- The `wrangler build` command is deprecated, you can invoke your own build scripts using the [custom builds](link here) field in your configuration.

Refer to the [deprecations guide](/workers/wrangler/deprecations/) for more details on what's no longer supported.
