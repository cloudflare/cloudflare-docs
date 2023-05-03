---
_build:
  publishResources: false
  render: never
  list: never
---

Sometimes, you might want all traffic to your root domain (`example.com`) to actually go to a subdomain (`www.example.com`).

1.  If you have already added that subdomain at your host, create a corresponding [DNS A or CNAME record](/dns/manage-dns-records/how-to/create-dns-records/) for that subdomain.

2.  Create a proxied DNS A record for your root domain. This record can point to any IP address since all traffic will be redirected prior to reaching the address.

    | **Type** | **Name** | **IPv4 address** | **Proxy status** |
    | -------- | -------- | ---------------- | ---------------- |
    | A        | `@`      | `192.0.2.1`      | Proxied          |

3.  Create a [Single Redirect](/rules/url-forwarding/single-redirects/create-dashboard/) to forward traffic from your subdomain to your root domain.

{{<example>}}

**When incoming requests match**

Using the Expression Editor:<br>
`(http.request.full_uri contains "example.com")`

**Then**

* **Type:** _Dynamic_
* **Expression:** `concat("https://","www.example.com",http.request.uri.path)`
* **Status code:** _301_

{{</example>}}