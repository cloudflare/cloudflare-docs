---
title: PackageManagers
description: Rules for the PackageManagers component used for install/exec commands.
---

## Rules

- If a code block contains only `npm install`, `yarn add`, `pnpm add`, or `npx` commands → **warning**: use `<PackageManagers>` instead of a bare code fence.

## Example

```mdx
import { PackageManagers } from "~/components";

<!-- Install a package: -->

<PackageManagers pkg="wrangler" />

<!-- Execute a command: -->

<PackageManagers type="exec" pkg="wrangler" args="init my-project" />
```
