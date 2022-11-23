---
title: Example rules
pcx_content_type: configuration
weight: 5
meta:
  title: Single Redirects — Example rules
---

# Example rules

The following sections contain example single redirect rule configurations.

## Redirect visitors to the new URL of a page

This example static redirect for zone `example.com` will redirect visitors requesting the `/contact-us/` page to the new page URL `/contacts/`.

{{<example>}}

**When incoming requests match**

* **Field:** _URI Path_
* **Operator:** _equals_
* **Value:** `/contact-us/`

If you are using the Expression Editor, enter the following expression:<br>
`http.request.uri.path eq "/contact-us/"`

**Then**

* **Type:** _Static_
* **URL:** `/contacts/`
* **Status code:** _301_
* **Preserve query string:** Enabled

{{</example>}}

For example, the redirect rule would perform the following redirects:

Request URL                        | Target URL                       | Status code
-----------------------------------|----------------------------------|------------
`example.com/contact-us/`          | `example.com/contacts/`          | `301`
`example.com/contact-us/?state=TX` | `example.com/contacts/?state=TX` | `301`
`example.com/team/`                | (unchanged)                      | n/a

## Redirect UK and France visitors to their specific subdomains

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

## Remove locale information from URL path

This example dynamic redirect for zone `example.com` will redirect visitors from an old URL format that included the locale (for example, `/en-us/<page_name>`) to the new format `/<page_name>`.

{{<example>}}

**When incoming requests match**

* **Field:** _URI Path_
* **Operator:** _matches regex_
* **Value:** `^/[A-Za-z]{2}-[A-Za-z]{2}/`

If you are using the Expression Editor, enter the following expression:<br>
`http.request.uri.path matches "^/[A-Za-z]{2}-[A-Za-z]{2}/"`

**Then**

* **Type:** _Dynamic_
* **Expression:** `regex_replace(http.request.uri.path, "^/[A-Za-z]{2}-[A-Za-z]{2}/(.*)", "/${1}")`
* **Status code:** _301_
* **Preserve query string:** Enabled

{{</example>}}

The function [`regex_replace()`](/ruleset-engine/rules-language/functions/#function-regex_replace) allows you to extract parts of the URL using regular expressions' capture groups. Create capture groups by putting part of the regular expression in parentheses. Then, reference a capture group using `${<num>}` in the replacement string, where `<num>` is the number of the capture group.

For example, the redirect rule would perform the following redirects:

Request URL                             | Target URL                        | Status code
----------------------------------------|-----------------------------------|------------
`example.com/en-us/meet-our-team`       | `example.com/meet-our-team`       | `301`
`example.com/pt-BR/meet-our-team`       | `example.com/meet-our-team`       | `301`
`example.com/en-us/calendar?view=month` | `example.com/calendar?view=month` | `301`
`example.com/meet-our-team`             | (unchanged)                       | n/a
`example.com/robots.txt`                | (unchanged)                       | n/a
