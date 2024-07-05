---
pcx_content_type: concept
title: Snippets
weight: 9
meta:
  title: Cloudflare Snippets (alpha)
---

{{<heading-pill style="alpha">}} Cloudflare Snippets {{</heading-pill>}}

Cloudflare Snippets (alpha) provide a flexible way to customize the behavior of your website or application using short pieces of JavaScript code. Use snippets to customize HTTP response headers, implement {{<glossary-tooltip term_id="JSON web token (JWT)" prepend="JSON web token (JWT) is ">}}JWT{{</glossary-tooltip>}} validation, define complex {{<glossary-tooltip term_id="redirect">}}redirect{{</glossary-tooltip>}} functionality, and more.

## Snippet elements

To create and deploy a snippet you must define the following elements:

* **Snippet**: Contains a name and the JavaScript code that will be executed as part of the request handling process.
* **Snippet rule**: Contains a [filter expression](/ruleset-engine/rules-language/expressions/) that will define for which requests the snippet will run.

{{<Aside type="note">}}
Currently, each snippet can only be associated with one snippet rule.
{{</Aside>}}

## How it works

For each incoming request, Cloudflare evaluates the expression of each snippet rule defined in the zone checking for a match based on the request properties. Snippets are defined for each zone.

A snippet can run on every request or only on certain requests, based on various criteria such as bot score, country of origin, or a cookie.

Multiple snippets may run on the same request if their rule expressions match. This means that you could have a snippet adding an HTTP header and another snippet rewriting the URL, and they would both run if their corresponding expression matches the incoming request. Each snippet receives the modified request from the previous snippet and applies new modifications to it.

For each snippet rule whose expression matches the incoming request, the corresponding snippet code will be scheduled for execution. Cloudflare will apply the following logic for each snippet rule:

```txt
If <rule_expression> evaluates to true, then schedule <snippet_code> for execution
```

After evaluating all snippet rules, Cloudflare will execute the code of all scheduled snippets, in the same order their rules matched.

For more information, refer to our [blog post](https://blog.cloudflare.com/cloudflare-snippets-alpha).

## Availability

{{<feature-table id="rules.snippets">}}

## Limits

Cloudflare Snippets are lightweight compared to [Cloudflare Workers](/workers/). The following limits apply:

Description                                | All plans
-------------------------------------------|----------
Maximum execution time                     | 5 ms
Maximum memory                             | 2 MB
Maximum total package size                 | 32 KB
Subrequests<br>_(refer to the note below)_ | 1

{{<Aside type="warning" header="Redirects will count as subrequests">}}
Each subrequest in a redirect chain counts against the subrequest limit. This means that if a subrequest was redirected it would count as two subrequests. To avoid issues, ensure that you make a subrequest to the end location of the redirect chain.
{{</Aside>}}

## Execution order

{{<render file="_product-execution-order.md">}}
