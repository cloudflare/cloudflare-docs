---
pcx_content_type: how-to
title: Get Global API key (legacy)
weight: 12
---

# Get Global API key (legacy)

Global API key is the previous authorization scheme for interacting with the Cloudflare API. When possible, use [API tokens](/fundamentals/api/get-started/create-token/) instead of Global API key.

{{<Aside type="note">}}

Global API key is only available after the [account email address is verified](/fundamentals/account-and-billing/account-setup/verify-email-address/).

{{</Aside>}}

## Limitations

Global API key has multiple limitations when compared to API tokens:

- **Access to all Cloudflare resources** - Global API key has access to all of a user's resources. This makes it impossible to safely use Global API key to access non-production resources when a user also has access to production resources.

- **Full permissions** - Similarly, Global API key has the exact same permissions as the user, which means if the user can delete zones or change DNS records, so can the Global API key.

- **Limited to one per user** - Only one Global API key can be provisioned per user. This complicates using Cloudflare's API in production systems where maintaining two secrets for accessing the API is important in the case one needs to be rolled.

- **Lack of advanced limits on usage** - API tokens can be limited to specific time windows and expire or be limited to use from specific IP ranges.

For these reasons, Global API key is not recommended for new customers. Current customers using Global API key are encouraged to migrate and use API tokens instead.

## View your Global API key

To retrieve your Global API key:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and go to **User Profile** > **API Tokens**.
2.  In the **API Keys** section, click `View` button of **Global API Key**.

## Change your Global API key

{{<render file="_api-change-api-key.md">}}
