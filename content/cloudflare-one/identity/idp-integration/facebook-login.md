---
pcx_content_type: how-to
title: Facebook
weight: 13
---

# Facebook

Use these steps to set up Facebook as your identity provider.

1.  Go to [developers.facebook.com](https://developers.facebook.com/).

1.  Select **Create App** at the top-right. The **Create a New App ID** card displays.

1.  Enter the **Display Name** and **Contact Email**.

1.  Select **Create App ID**. The **Create a New App ID** window displays.

1.  Enter the CAPTCHA code to proceed.

1.  Select **Submit**.

1.  On the **Facebook Login** card, select **Set Up**. A Quickstart card displays offering platform choices.

1.  Select **Web**. The **Web** tab displays.

1.  Enter your **Site URL**.

1.  Select **Save**.

1.  Select **Continue**. Ignore any JavaScript page that suggests that you install it on your site.

1.  Select **Settings** > **Basic**.

1.  Copy the **App ID** and **App Secret**.

    ![Facebook Settings with App ID and App Secret highlighted](/images/cloudflare-one/identity/facebook/fb6.png)

1.  In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

1.  Under **Login methods**, select **Add new**.

1.  Fill in the **App ID** and **App Secret** obtained from Facebook.

1.  (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.

1.  Select **Save**.

1.  On [developers.facebook.com](https://developers.facebook.com/), select **Facebook Login** > **Settings** on the left-hand menu.

1.  Ensure that the **Use Strict Mode for Redirect URIs** slider is set to **Yes**.

1.  In the **Valid OAuth redirect URIs** field, enter your [team domain](/cloudflare-one/glossary/#team-domain), followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

1.  Select **Save Changes**.

To test that your connection is working, follow the steps on [SSO Integration](/cloudflare-one/identity/idp-integration#test-idps-in-zero-trust).

## Example API Configuration

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>"
  },
  "type": "facebook",
  "name": "my example idp"
}
```
