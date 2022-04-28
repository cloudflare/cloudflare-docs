---
pcx-content-type: how-to
title: Migrating from Wrangler 1
weight: 2
---

## Migration Guide

This document describes the steps to migrate a project from wrangler 1 to 2.

The latest version of wrangler ships with new features and improvements that will require you to include a few changes to your wrangler configuration to get it working as expected.

The good news is that the CLI itself should guide you through the upgrade process.

To learn more about what's new in wrangler, refer to the [What's new page](/workers/wrangler/compare-v1-v2/).

### Upgrade to Wrangler 2

Test out your project by upgrading your CLI to Wrangler 2 and running the `dev` command.

Start using Wrangler 2 in your project by running the command:

```sh
npx wrangler@beta dev
```

This will return some deprecated warnings that you will need to fix in order to get it working.

### Deprecations

The following commands is now deprecated in wrangler 2.0, if you're migrating, be sure to go through the list and remove the commands that is no longer required:

- Remove the `type` and `webpack_config` property in the config that is no longer required.
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
