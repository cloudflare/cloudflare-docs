---
pcx_content_type: how-to
title: Get API keys (legacy)
weight: 12
---

# Get API keys (legacy)

API keys are the previous authorization scheme for interacting with the Cloudflare API. When possible, use [API tokens](/fundamentals/api/get-started/create-token/) instead of API keys.

## Limitations

API keys have multiple limitations when compared to API tokens:

- **Access to all Cloudflare resources** - API keys have access to all of a user's resources. This makes it impossible to safely use API keys to access non-production resources when a user also has access to production resources.

- **Full permissions** - Similarly, API keys have the exact same permissions as the user, which means if the user can delete zones or change DNS records, so can the API key.

- **Limited to one per user** - Only one API key can be provisioned per user. This complicates using Cloudflare's API in production systems where maintaining two secrets for accessing the API is important in the case one needs to be rolled.

- **Lack of advanced limits on usage** - API tokens can be limited to specific time windows and expire or be limited to use from specific IP ranges.

For these reasons, API keys are not recommended for new customers. Current customers using API keys are encouraged to migrate and use API tokens instead. Refer to the [API schema docs](https://api.cloudflare.com/#getting-started-requests) for more information about using API keys.

## View your API key

To retrieve your API key:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and go to **User Profile** > **API Tokens**.
2.  In the **API Keys** section, view or change either of your API keys:

    - **Global API Key**: Serves as your main API key.
    - **Origin CA Key**: Only used when creating origin certificates using the API.

## Change your API key

{{<render file="_change-api-key.md">}}