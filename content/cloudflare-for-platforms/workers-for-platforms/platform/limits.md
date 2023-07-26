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

{{<Aside type="warning">}}

Any product-specific limits still apply to your account (for example, the [100 KV namespace limit](/workers/platform/limits/#kv-limits)). You can request adjustments to limits that conflict with your project goals by contacting Cloudflare. To request an increase to a limit, complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

{{</Aside>}}

## ​Tags

You can set a maximum of eight tags per script. Avoid special characters like `,` and `&` when naming your tag.
