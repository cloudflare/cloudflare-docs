---
order: 2
pcx-content-type: how-to
---

# API token

You can create API tokens to authenticate and define what type of permissions different users have. This is needed to use the Images API. For Cloudlare Images, you will have to create a custom token. Refer to [API tokens and keys](https://developers.cloudflare.com/api/tokens) for a complete guide on Cloudflare tokens.

To create an API token for Images:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and click **My profile**.
1. Click **Create Token**.
1. In Custom token, click **Get started**.
1. Give your token a name. 
1. In **Permissions**, make sure _Account_ is selected in the first drop-down menu.
1. From the _Select_ drop-down, scroll down until you find **Cloudflare Images**.
1. In the next drop-down, select **Read** or **Edit**, according to the permissions you want this token to have.
1. You can further limit or expand this token in the following inputs. Refer to [API tokens and keys](https://developers.cloudflare.com/api/tokens) for more information on what each field means.
1. Click **Continue to summary** > **Create Token** to create your token.

Your API token is now created and available. Make sure you copy your token from the next screen. As a security measure, Cloudflare will not show it again. If you do not copy the API token, you will have to [roll the token](https://developers.cloudflare.com/api/tokens/create#roll-api-token) to generate a new secret key. Alternatively, you will have to delete your API token and create a new one.

## Try your API token with the Images API

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
1. Click **Images**.
1. In the Images tab, click **Use API**.
1. In **API token**, paste the API token you created.
1. Input the name of the image you want to use in **Image File Name**.

The **cURL command** message box will show you the complete command you can use. Below, is an example for a PNG image: 

```bash
curl -X POST -F file=@./YOUR_IMAGE.png -H "Authorization: Bearer <Your_API_Token" https://api.cloudflare.com/client/v4/accounts/2f3dc21d188ba781322b520bbde5fb5a/images/v1
```