---
pcx_content_type: example
summary: Create a redirect rule to redirect all requests for `smallshop.example.com` to a different hostname using HTTPS, keeping the original path and query string.
product:
  - Redirect Rules
title: Redirect requests to a different hostname
---

# Redirect all requests to a different hostname

This example dynamic redirect will redirect all requests for `smallshop.example.com` to a different hostname using HTTPS, keeping the original path and query string.

{{<example>}}

**When incoming requests match**

* **Field:** _Hostname_
* **Operator:** _equals_
* **Value:** `smallshop.example.com`

If you are using the Expression Editor, enter the following expression:<br>
`(http.host eq "smallshop.example.com")`

**Then**

* **Type:** _Dynamic_
* **Expression:** `concat("https://globalstore.example.net", http.request.uri.path)`
* **Status code:** _301_
* **Preserve query string:** Enabled

{{</example>}}

For example, the redirect rule would perform the following redirects:

Request URL                                           | Target URL                                         | Status code
------------------------------------------------------|----------------------------------------------------|------------
`http://smallshop.example.com/`                       | `https://globalstore.example.net/`                       | `301`
`http://smallshop.example.com/admin/?logged_out=true` | `https://globalstore.example.net/admin/?logged_out=true` | `301`
`https://smallshop.example.com/?all_items=1`          | `https://globalstore.example.net/?all_items=1`           | `301`
`http://example.com/about/`                           | (unchanged)                                              | n/a
