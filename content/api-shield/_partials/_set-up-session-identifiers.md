---
_build:
  publishResources: false
  render: never
  list: never
---

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** > **API Shield**.
3. Select **Settings**.
4. On **Endpoint settings**, select **Manage identifiers**.
5. Enter the necessary information.
6. Select **Save**. 

After setting up session identifiers and allowing some time for Cloudflare to learn your traffic patterns, you can view your per endpoint and per session rate limiting recommendations, as well as enforce per endpoint and per session rate limits by creating new rules. Session identifiers will allow you to view API Discovery results from session ID-based discovery and session traffic patterns in Sequence Analytics.