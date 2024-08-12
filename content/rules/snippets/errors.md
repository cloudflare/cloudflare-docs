---
title: Common errors
pcx_content_type: troubleshooting
weight: 4
meta:
  title: Common errors
---

# Common errors

Cloudflare Snippets may encounter specific errors during execution. Here are the common errors:

## Error 1201: Snippet tried to continue to origin multiple times

This error occurs when a Snippet attempts to call `fetch(request)` more than once.

### Resolution

Ensure that your Snippet code only calls `fetch(request)` once. This method is used to send the modified request to the origin server, and it should be called only once per Snippet to avoid conflicts.

## Error 1202: Snippets exceeded subrequests limit

This error occurs when the number of {{<glossary-tooltip term_id="Snippets subrequest" prepend="A subrequest is ">}}subrequests{{</glossary-tooltip>}} exceeds [the limit](/rules/snippets/#availability) for your Cloudflare plan.

### Resolution

Review your Snippet to ensure your code is within the {{<glossary-tooltip term_id="Snippets subrequest" prepend="A subrequest is ">}}subrequest{{</glossary-tooltip>}} [limits](/rules/snippets/#availability) for your plan. Each subrequest counts against your limit, including any redirects within a subrequest chain.