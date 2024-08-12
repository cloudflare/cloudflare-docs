---
title: How it works
pcx_content_type: concept
weight: 1
meta:
  title: How it works
---

# How it works

Cloudflare Snippets are executed based on rules defined within your zone. Here is how the process works:

## Request evaluation

For each incoming request, Cloudflare evaluates the expression of every Snippet Rule defined in the zone. The evaluation checks for a match based on various request properties (such as bot score, country of origin, cookies).

## Snippet execution

If a Snippet Rule's expression evaluates to true, the corresponding Snippet's code is scheduled for execution.
Multiple Snippets may run on the same request if their respective expressions match. In such cases, each Snippet receives the modified request from the previous Snippet and applies further modifications.

## Execution order

After evaluating all Snippet Rules, Cloudflare executes the code of all scheduled Snippets in the order their rules matched.

For more information, refer to our [blog post](https://blog.cloudflare.com/cloudflare-snippets-alpha).