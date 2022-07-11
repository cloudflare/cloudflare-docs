---
pcx-content-type: how-to
title: Migrating from Workers
weight: 9
---

# Migrating from Workers

When migrating a Worker into the Pages platform, the simplest path is to target the [advanced mode](#advanced-mode) of Functions. To do this, ensure your Worker is in the [Module Worker format](/workers/runtime-apis/fetch-event/#syntax-module-worker). Then call `env.ASSETS` when you want to serve static assets. Failure to do so will result in broken and/or unwanted behavior.
