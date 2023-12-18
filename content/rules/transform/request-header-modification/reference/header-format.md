---
title: Format of header names and values
pcx_content_type: reference
weight: 2
meta:
  title: Format of HTTP request header names and values
---

# Format of HTTP request header names and values

The **name** of the HTTP request header you want to set or remove can only contain:

{{<render file="transform/_header-valid-names.md">}}

{{<Aside type="warning">}}
Cloudflare may remove HTTP request headers with names considered invalid [according to NGINX](https://nginx.org/en/docs/http/ngx_http_core_module.html#ignore_invalid_headers) — for example, header names containing a `.` (dot) character.
{{</Aside>}}

The **value** of the HTTP request header you want to set can only contain:

{{<render file="transform/_header-valid-values.md">}}
