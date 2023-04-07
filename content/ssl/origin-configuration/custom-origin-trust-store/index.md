---
pcx_content_type: concept
title: Custom Origin Trust Store
layout: single
meta:
    description: Custom Origin Trust Store allows you to upload certificate authorities (CAs) that Cloudflare will use to authenticate connections to your origin server.
---

# Custom Origin Trust Store

By default, Cloudflare's global network maintains a list of publicly trusted certificate authorities. This means that when using [Full (strict) encryption mode](/ssl/origin-configuration/ssl-modes/full-strict/), Cloudflare will only trust origin server certificates issued by a CA in this trust store.

{{<render file="_custom-origin-trust-store-definition.md">}}

When a CA has been uploaded to Custom Origin Server Trust Store, Cloudflare will ignore all default publicly trusted CAs and exclusively use the CA or CAs that have been uploaded to authenticate the origin server.

## Availability

To get access to Custom Origin Trust Store, you need to have [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) enabled on your zone.

## How to

To manage origin trust stores in the dashboard, go to **SSL/TLS** > **Origin Server** and use the **Custom Origin Trust Store** card.

To manage origin trust stores using the API, refer to the [API commands](#api-commands).

## Limitations

With [Full (strict) encryption mode](/ssl/origin-configuration/ssl-modes/full-strict/) enabled, if your uploaded CA expires and no alternative CAs are valid within the trust store, Cloudflare will not be able to properly authenticate connections to the origin server.

## API commands

| Command                          | Method   | Endpoint                                       |
| -------------------------------- | -------- | ---------------------------------------------- |
| Create custom origin trust store | `POST`   | `/zones/<ZONE_ID>/acm/custom_trust_store`      |
| List custom origin trust stores  | `GET`    | `/zones/<ZONE_ID>/acm/custom_trust_store`      |
| Get custom origin trust store    | `GET`    | `/zones/<ZONE_ID>/acm/custom_trust_store/<ID>` |
| Delete custom origin trust store | `DELETE` | `/zones/<ZONE_ID>/acm/custom_trust_store/<ID>` |
