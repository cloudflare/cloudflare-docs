---
pcx-content-type: concept
order: 3
---

# URL normalization

Cloudflare provides a URL normalization feature to modify the URLs of incoming requests so that they conform to a consistent formatting standard.

When you enable URL normalization, all incoming URLs are normalized before they pass to subsequent Cloudflare edge features that accept a URL input, such as Page Rules, Firewall Rules, Workers, and Access. Rule expressions that filter traffic based on URLs will therefore trigger correctly, regardless of the format of the incoming URL. When URL normalization is disabled, Cloudflare forwards the URL to origin in its original form.

***

## Availability

URL normalization is available in all Cloudflare plans.

## Get started

Learn more about [URL normalization](/normalization/how-it-works) and how to [configure URL normalization](/normalization/manage) in the Cloudflare dashboard.
