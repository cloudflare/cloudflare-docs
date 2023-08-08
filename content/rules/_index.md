---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare Rules
---

# Cloudflare Rules

{{<plan type="all">}}

{{<render file="_rules-definition.md">}}
<br>

Rules features require that you [proxy the DNS records](/dns/manage-dns-records/reference/proxied-dns-records/) of your domain (or subdomain) through Cloudflare.

---

## Features

{{<feature header="Transform Rules" href="/rules/transform/">}}
Adjust the URI path, query string, and HTTP headers of requests and responses on the Cloudflare global network.
{{</feature>}}

{{<feature header="URL normalization" href="/rules/normalization/" cta="Configure URL normalization">}}
Modify the URLs of incoming requests so that they conform to a consistent formatting standard.
{{</feature>}}

{{<feature header="URL forwarding" href="/rules/url-forwarding/">}}
Redirect visitors from a source URL to a target URL with a specific HTTP status code. Use Single Redirects or Bulk Redirects depending on your use case.
{{</feature>}}

{{<feature header="Origin Rules" href="/rules/origin-rules/">}}
Customize where the incoming traffic will go and with which parameters. Override request properties such as `Host` header, destination hostname, and destination port.
{{</feature>}}

{{<feature header="Configuration Rules" href="/rules/configuration-rules/">}}
Customize Cloudflare configuration settings for matching incoming requests.
{{</feature>}}

{{<feature header="Compression Rules" href="/rules/compression-rules/">}}
Customize the compression applied to responses from Cloudflare's global network to your website visitors, based on the file extension and content type.
{{</feature>}}

{{<feature header="Snippets" href="/rules/snippets/">}}
Customize the behavior of your website or application using short pieces of JavaScript code.
{{</feature>}}

{{<feature header="Custom error responses" href="/rules/custom-error-responses/" cta="Configure custom error responses">}}
Define custom responses for errors returned by an origin server or by a Cloudflare product, including Workers.
{{</feature>}}

{{<feature header="Page Rules" href="/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/">}}
Trigger certain actions when a request matches a URL pattern.
{{</feature>}}

---

## Related products

{{<related header="Custom rules" href="/waf/custom-rules/" product="waf">}}
Control incoming traffic by filtering requests to a zone. You can block or challenge incoming requests according to rules you define.
{{</related>}}

{{<related header="Rate limiting rules" href="/waf/rate-limiting-rules/" product="waf">}}
Define rate limits for requests matching an expression, and the action to perform when those rate limits are reached.
{{</related>}}

{{<related header="Cache rules" href="/cache/how-to/cache-rules/" product="cache">}}
Customize the cache properties of your HTTP requests.
{{</related>}}

{{<related header="Workers" href="/workers/" product="workers">}}
Cloudflare Workers provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure.
{{</related>}}

---

## More resources

{{<resource-group>}}

{{<resource header="Plans" href="https://www.cloudflare.com/plans/#overview" icon="documentation-clipboard">}}Compare available Cloudflare plans{{</resource>}}

{{</resource-group>}}