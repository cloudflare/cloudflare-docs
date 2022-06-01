---
title: Partner Domains TLS
pcx-content-type: how-to
weight: 3
---

# Partner Domains TLS

When you completely trust a sender, you can exempt their incoming messages from SSL/TLS inspection (including TLS versions 1.1, 1.2, and 1.3).

## Exempt a domain

To exempt a specific domain from SSL/TLS inspection:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Domains & Routing** > **Partner Domains TLS**.
4. Click **New Partner Domain**.
4. Enter a **Domain** and any **Notes**.
5. For **Require TLS Inbound**, move the toggle to **Off**.
6. Click **Save**.

{{<Aside type="note">}}

Creating an exemption will not turn off enforcement against legacy standards like SSLv1, SSLv2, and TLSv1, which are insecure by contemporary measures.

{{</Aside>}}