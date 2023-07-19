---
pcx_content_type: how-to
title: Get Origin CA keys
weight: 12
---


# Get Origin CA keys

Origin CA keys are often used as the value of header `X-AUTH-USER-SERVICE-KEY` when interacting with [Origin CA certificates](/ssl/origin-configuration/origin-ca/) API. It is also used by [Keyless SSL](/ssl/keyless-ssl/) key server.

The key value always starts with `v1.0-`.

## Limitations

- Changing the Origin CA key is not recorded by [Audit Logs](/fundamentals/account-and-billing/account-security/review-audit-logs/).
- Each time you view the Origin CA key, it will be presented as a different value. All these different values are **simultaneously valid** until you click the `Change` button, which immediately invalidates all previously generated values.
- Origin CA keys have access to every account the user has access to.

## View/Change your Origin CA keys

To retrieve your Origin CA keys:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **User Profile** > **API Tokens**.
3. In the **API Keys** section, select `Origin CA Key`.
