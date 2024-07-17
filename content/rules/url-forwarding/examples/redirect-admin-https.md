---
pcx_content_type: example
summary: Create a redirect rule to redirect requests for the administration area of `store.example.com` to HTTPS, keeping the original path and query string.
product:
  - Redirect Rules
title: Redirect admin area requests to HTTPS
---

# Redirect admin area requests to HTTPS

This example dynamic redirect for zone `example.com` will redirect requests for the administration area of a specific subdomain (`store.example.com`) to HTTPS, keeping the original path and query string.

{{<example>}}

**When incoming requests match**

* **Field:** _SSL/HTTPS_
* **Value:** _Off_

_And_

* **Field:** _Hostname_
* **Operator:** _equals_
* **Value:** `store.example.com`

_And_

* **Field:** _URI Path_
* **Operator:** _starts with_
* **Value:** `/admin`

If you are using the Expression Editor, enter the following expression:<br>
`(not ssl and http.host eq "store.example.com" and starts_with(http.request.uri.path, "/admin"))`

**Then**

* **Type:** _Dynamic_
* **Expression:** `concat("https://", http.host, http.request.uri.path)`
* **Status code:** _301_
* **Preserve query string:** Enabled

{{</example>}}

The rule includes _SSL/HTTPS: Off_ (`not ssl` in the rule expression) to avoid redirect loops.

For example, the redirect rule would perform the following redirects:

Request URL                                       | Target URL                                         | Status code
--------------------------------------------------|----------------------------------------------------|------------
`http://store.example.com/admin/products/`        | `https://store.example.com/admin/products/`        | `301`
`https://store.example.com/admin/products/`       | (unchanged)                                        | n/a
`http://store.example.com/admin/?logged_out=true` | `https://store.example.com/admin/?logged_out=true` | `301`
`http://store.example.com/?all_items=true`        | (unchanged)                                        | n/a
`http://example.com/admin/`                       | (unchanged)                                        | n/a
