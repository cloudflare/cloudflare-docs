---
pcx_content_type: example
summary: A redirect rule where visitors requesting the `/contact-us/` page are redirected to the new page URL `/contacts/`.
product:
  - Redirect Rules
title: Redirect visitors to the new URL of a specific page
---

# Redirect visitors to the new URL of a specific page

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