---
pcx_content_type: concept
title: Limits
---

# Limits

## Script limits

Cloudflare provides an unlimited number of scripts for Workers for Platforms customers.
​​
## Bindings

You can use Workers [bindings](/workers/configuration/bindings) with the dynamic dispatch Worker or any namespaced Workers. Your user Workers cannot be defined as Durable Objects. User Workers can have a Durable Objects binding.  

Bindings for your dynamic dispatch Worker or any user Workers can be defined on multipart script uploads in the metadata blob.

## ​Tags

You can set a maximum of eight tags per script. Avoid special characters like `,` and `&` when naming your tag.

{{<render file="_limits_increase.md" productFolder="workers">}}
