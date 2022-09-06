---
pcx_content_type: how-to
title: API keys (legacy)
weight: 15
---

# API keys (legacy)

API Keys are the legacy authorization scheme for talking to Cloudflare's APIs.

## Limitations

When possible, you should use [API tokens](/api/tokens/create/) instead of API Keys.

API Keys have multiple limitations when compared to API tokens:

1.  **Access to all Cloudflare Resources** - API Keys have access to all the resources of the user. This makes it impossible to safely use API Keys for access to non-production resources when a user also has access to production resources.

2.  **Full permissions** - Similar to (1), API Keys have the exact same permissions as the user which means if the user can delete zones, or change DNS records so can the key.

3.  **Limited to 1 per user** - Only one API Key can be provisioned per user. This complicates using Cloudflare's API in production systems where maintaining two secrets for accessing the API is important in the case 1 needs to be rolled.

4.  **Lack of advanced limits on usage** - API tokens can be limited to use in specific time windows and expire or be limited to use from specific IP ranges.

For these reasons, API Keys are not recommended for new customers. Current customers using API Keys are encouraged to migrate and use API tokens instead. You can find information about using API Keys in the [API schema docs](https://api.cloudflare.com/#getting-started-requests).

## View your API key

To retrieve your API key:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2.  Go to **User Profile** > **API Tokens**.
3.  In the **API Keys** section, view or change either of your API keys:

    - **Global API Key**: Serves as your main API key.
    - **Origin CA Key**: Only used when creating origin certificates using the API.

## Change your API key

{{<render file="_change-api-key.md">}}