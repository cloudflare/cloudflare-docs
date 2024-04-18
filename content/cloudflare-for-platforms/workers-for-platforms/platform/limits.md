---
pcx_content_type: concept
title: Limits
weight: 1
---

# Limits

## Script limits

Cloudflare provides an unlimited number of scripts for Workers for Platforms customers.

## ​Tags

You can set a maximum of eight tags per script. Avoid special characters like `,` and `&` when naming your tag.

{{<render file="_limits_increase.md" productFolder="workers">}}

## Gradual Deployments

[Gradual Deployments](/workers/configuration/versions-and-deployments/gradual-deployments/) is not supported yet for user Workers. Changes made to user Workers create a new version that deployed all-at-once to 100% of traffic.
