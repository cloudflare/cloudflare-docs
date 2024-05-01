---
pcx_content_type: concept
title: URL normalization
weight: 4
---

# URL normalization

Cloudflare provides a URL normalization feature to modify the URLs of incoming requests so that they conform to a consistent formatting standard.

When you enable URL normalization, all incoming URLs are normalized before they pass to subsequent global network features that accept a URL input, such as WAF custom rules, Workers, and Access. Rule expressions that filter traffic based on URLs will therefore trigger correctly, regardless of the format of the incoming URL. When URL normalization is disabled, Cloudflare forwards the URL to origin in its original form.

{{<Aside type="warning">}}
When traffic is proxied via Cloudflare, essential request URL normalization is always applied regardless whether URL normalization is enabled for a specific zone. For example, you cannot disable the conversion of two or more adjacent slashes into a single slash in a request URL by turning off URL normalization.
{{</Aside>}}

URL normalization does not perform any {{<glossary-tooltip term_id="redirect">}}redirects{{</glossary-tooltip>}}, and therefore it will not change the address displayed in the visitor's browser. The normalization operation, when enabled, occurs on the global network and affects Cloudflare features executed later and (optionally) the URL received at the origin server.

{{<render file="_rules-requirements.md" withParameters="URL normalization requires">}}

***

## Availability

URL normalization is available in all Cloudflare plans.

## Get started

Learn more about [URL normalization](/rules/normalization/how-it-works/) and how to [configure URL normalization](/rules/normalization/manage/) in the Cloudflare dashboard.
