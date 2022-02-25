---
pcx-content-type: how-to
title: API token
weight: 3
---

# API token

Before you can start using Cloudflare Images API, you need to create an API token to authenticate and define what type of permissions different users have. For Images, you will have to create a custom token with account level permissions.

Refer to [Creating API tokens](/api/tokens/create#getting-started) to learn how to create a custom token.

## Try your API token with the Images API

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2.  Click **Images**.
3.  In the Images tab, click **Use API**.
4.  In **API token**, paste your API token.
5.  Input the name of the image you want to use in **Image File Name**.

The **cURL command** message box will show you the complete command you can use:

```bash
curl -X POST -F file=@./MY_IMAGE -H "Authorization: Bearer MY_TOKEN" https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/images/v1
```
