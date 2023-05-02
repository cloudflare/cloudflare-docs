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

3.  Use [Bulk redirects](/rules/url-forwarding/bulk-redirects/) to forward traffic from your root domain to your subdomain. You will likely want to include **Subpath matching** and **Preserve path suffix** to ensure requests to `example.com/examples` go to `www.example.com/examples`.

    | **Source URL** | **Target URL**            | **Status** | **Selected parameters**                       |
    | -------------- | ------------------------- | ---------- | --------------------------------------------- |
    | `example.com`  | `https://www.example.com` | 301        | _Subpath matching_ and _Preserve path suffix_ |