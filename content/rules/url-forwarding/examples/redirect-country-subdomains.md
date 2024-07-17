---
pcx_content_type: example
summary: Create a redirect rule to redirect United Kingdom and France visitors from the `example.com` website's  root path (`/`) to their localized subdomains `https://gb.example.com` and `https://fr.example.com`, respectively.
product:
  - Redirect Rules
title: Redirect local visitors to specific subdomains
---

# Redirect UK and France visitors to their specific subdomains

This example dynamic redirect for zone `example.com` will redirect United Kingdom and France visitors requesting the website's root path (`/`) to their localized subdomains `https://gb.example.com` and `https://fr.example.com`, respectively.

{{<example>}}

**When incoming requests match**

Using the Expression Editor:<br>
`(ip.geoip.country eq "GB" or ip.geoip.country eq "FR") and http.request.uri.path eq "/"`

**Then**

* **Type:** _Dynamic_
* **Expression:** `lower(concat("https://", ip.geoip.country, ".example.com"))`
* **Status code:** _301_

{{</example>}}

For example, the redirect rule would perform the following redirects:

Visitor country | Request URL    | Target URL               | Status code
----------------|----------------|--------------------------|------------
United Kingdom  | `example.com` | `https://gb.example.com` | `301`
France          | `example.com` | `https://fr.example.com` | `301`
United States   | `example.com` | (unchanged)              | n/a
