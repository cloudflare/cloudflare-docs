---
pcx_content_type: concept
title: Snippets
weight: 3
meta:
  title: Cloudflare Snippets (alpha)
---

{{<heading-pill style="alpha">}} Cloudflare Snippets {{</heading-pill>}}

Cloudflare Snippets (alpha) provide a powerful and flexible way to customize the behavior of your website or application using short pieces of JavaScript code. With Snippets, you can modify HTTP response headers, implement {{<glossary-tooltip term_id="JSON web token (JWT)" prepend="JSON web token (JWT) is ">}}JWT{{</glossary-tooltip>}} validation, perform complex {{<glossary-tooltip term_id="redirect">}}redirects,{{</glossary-tooltip>}} and much more.

For code samples addressing common use cases, please refer to the [Examples](/rules/snippets/examples/) section.

## Snippets elements

To create and deploy a Snippet, you need to define the following elements:

* **Snippet**: JavaScript code to be executed during the request-handling process.
* **Snippet rule**: A [filter expression](/ruleset-engine/rules-language/expressions/) that determines which requests the Snippet will be applied to. Each Snippet can only be associated with one Snippet Rule.

For more information, refer to the [How it works](how-it-works/) and [Create in the dashboard](create-dashboard/) sections.

## Availability

{{<feature-table id="rules.snippets">}}

{{<Aside type="warning" header="Redirects will count as subrequests">}}
Each {{<glossary-tooltip term_id="Snippets subrequest" prepend="A subrequest is ">}}subrequest{{</glossary-tooltip>}} in a redirect chain counts against the subrequest limit. This means that if a subrequest was redirected it would count as two subrequests. To avoid issues, ensure that you make a subrequest to the end location of the redirect chain.
{{</Aside>}}

## Limits

Cloudflare Snippets are lightweight compared to [Cloudflare Workers](/workers/). The following limits apply:

Description                                | All plans
-------------------------------------------|----------
Maximum execution time                     | 5 ms
Maximum memory                             | 2 MB
Maximum total package size                 | 32 KB

## Execution order

{{<render file="_product-execution-order.md">}}
