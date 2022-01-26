---
order: 2
pcx-content-type: how-to
---

# API token

Before you can start using Cloudflare Images API, you need to create an API token to authenticate and define what type of permissions different users have. For Images, you will have to create a custom token with account level permissions.

Refer to [Creating API tokens](https://developers.cloudflare.com/api/tokens/create#getting-started) to learn how to create a custom token.

## Try your API token with the Images API

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
1. Click **Images**.
1. In the Images tab, click **Use API**.
1. In **API token**, paste your API token.
1. Input the name of the image you want to use in **Image File Name**.

The **cURL command** message box will show you the complete command you can use. Below, is an example for a PNG image: 

```bash
curl -X POST -F file=@./MY_IMAGE -H "Authorization: Bearer MY_TOKEN" https://api.cloudflare.com/client/v4/accounts/2f3dc21d188ba781322b520bbde5fb5a/images/v1
```