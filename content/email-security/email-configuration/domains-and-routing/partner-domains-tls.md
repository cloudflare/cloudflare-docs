---
title: Partner Domains TLS
pcx_content_type: how-to
weight: 3
---

# Partner Domains TLS

To add additional TLS requirements for emails coming from certain domains, you can enforce higher levels of SSL/TLS inspection. If TLS is required, mail without TLS from the specified domain will be dropped.

## Add a domain

To require that email from a specific domain passes SSL/TLS inspection:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Domains & Routing** > **Partner Domains TLS**.
4. Select **New Partner Domain**.
4. Enter a **Domain** and any **Notes**.
5. Select **Save**.

## Exempt TLS inspection

If you decide to exempt a domain from TLS inspection - by toggling **Require TLS Inbound** to **Off** - this will not turn off enforcement against legacy standards like SSLv1, SSLv2, and TLSv1, which is generally considered insecure.