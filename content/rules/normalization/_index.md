---
pcx-content-type: concept
title: URL normalization
weight: 4
---

# URL normalization

Cloudflare provides a URL normalization feature to modify the URLs of incoming requests so that they conform to a consistent formatting standard.

When you enable URL normalization, all incoming URLs are normalized before they pass to subsequent Cloudflare edge features that accept a URL input, such as Page Rules, Firewall Rules, Workers, and Access. Rule expressions that filter traffic based on URLs will therefore trigger correctly, regardless of the format of the incoming URL. When URL normalization is disabled, Cloudflare forwards the URL to origin in its original form.

URL normalization does not perform any redirects, and therefore it will not change the address displayed in the visitor's browser. The normalization operation, when enabled, occurs at the edge and affects Cloudflare features executed later and (optionally) the URL received at the origin server.

***

## Availability

URL normalization is available in all Cloudflare plans.

## Get started

Learn more about [URL normalization](/rules/normalization/how-it-works/) and how to [configure URL normalization](/rules/normalization/manage/) in the Cloudflare dashboard.
