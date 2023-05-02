---
_build:
  publishResources: false
  render: never
  list: never
---

Sometimes, you might want to create a subdomain (`www.example.com`) that simply redirects traffic to your root domain (`example.com`).

1.  Create a [proxied DNS A record](/dns/manage-dns-records/how-to/create-dns-records/) for your subdomain. This record can point to any IP address since all traffic will be redirected prior to reaching the address.

    | **Type** | **Name** | **IPv4 address** | **Proxy status** |
    | -------- | -------- | ---------------- | ---------------- |
    | A        | `www`    | `192.0.2.1`      | Proxied          |

2.  Use [Bulk redirects](/rules/url-forwarding/bulk-redirects/) to forward traffic from your subdomain to your root domain. You will likely want to include **Subpath matching** and **Preserve path suffix** to ensure requests to `www.example.com/examples` go to `example.com/examples`.

    | **Source URL**    | **Target URL**        | **Status** | **Selected parameters**                       |
    | ----------------- | --------------------- | ---------- | --------------------------------------------- |
    | `www.example.com` | `https://example.com` | 301        | _Subpath matching_ and _Preserve path suffix_ |