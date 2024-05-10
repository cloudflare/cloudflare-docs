---
title: Custom Rules
pcx_content_type: overview
weight: 3
layout: learning-unit
---

Cloudflare Rules allows you to make adjustments to requests and responses, configure Cloudflare settings, and trigger specific actions for matching requests. In addition, you can increase your security posture by including security headers to the browser or augmenting request headers with security intelligence. Cloudflare offers many ways to manipulate your traffic: 

1. [**Transform Rules**](/rules/transform/) enable the modification of the URI path, query string, and HTTP headers for both requests and responses on its global network. This feature provides extensive control over HTTP traffic, allowing users to rewrite URLs, modify request and response headers, and apply common adjustments easily.

2. [**URL normalization rules**](/rules/normalization/) normalizes all requests before they pass to subsequent global network features that accept a URL input, such as WAF custom rules, Workers, and Access. Rule expressions that filter traffic based on URLs will therefore trigger correctly, regardless of the format of the incoming URL. When URL normalization is disabled, Cloudflare forwards the URL to origin in its original form.

3. [**Redirect rules**](/rules/url-forwarding/) navigates the user from a source URL to a target URL with a specific HTTP status code. This can be done using [single redirects](/rules/url-forwarding/single-redirects/) (per domain) or [bulk redirects](/rules/url-forwarding/bulk-redirects/) (per account).

4. [**Origin rules**](/rules/origin-rules/) allows you to customize where the incoming traffic will go and with which parameters. Currently you can perform the following overrides: host header, Server Name Indication, DNS record, and destination port.

5. [**Configuration rules**](/rules/configuration-rules/) allows you to customize certain Cloudflare configuration settings for matching incoming requests.

6. [**Compression rules**](/rules/compression-rules/) allows you to customize the default behavior, which includes defining preferred compression algorithms for particular file types.

7. [**Snippets**](/rules/snippets/) provides a flexible way to customize the behavior of your website or application using short pieces of JavaScript code. Use snippets to customize HTTP response headers, implement JWT validation, define complex redirect functionality, and more.


