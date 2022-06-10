---
pcx-content-type: how-to
title: Facebook
weight: 13
---

# Facebook

Use these steps to set up Facebook as your identity provider.

1.  Go to [developers.facebook.com](https://developers.facebook.com/).

1.  Click **Create App** at the top-right.

    ![Facebook IdP Login page](/cloudflare-one/static/documentation/identity/facebook/fb1.png)

    The **Create a New App ID** card displays.

1.  Enter the **Display Name** and **Contact Email**.

1.  Click **Create App ID**. The **Create a New App ID** window displays.

1.  Enter the CAPTCHA code to proceed.

1.  Click **Submit**.

1.  On the **Facebook Login** card, click **Set Up**.

    ![Facebook Add a Product](/cloudflare-one/static/documentation/identity/facebook/fb3.png)

    A Quickstart card displays offering platform choices.

1.  Click **Web**. The **Web** tab displays.

1.  Enter your **Site URL**.

1.  Click **Save**.

1.  Click **Continue**. Ignore any JavaScript page that suggests that you install it on your site.

1.  Click **Settings > Basic**.

    ![Facebook Settings](/cloudflare-one/static/documentation/identity/facebook/fb6.png)

1.  Copy the **App ID** and **App Secret**.

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings > Authentication**.

1.  Under **Login methods**, click **Add new**.

1.  Fill in the **App ID** and **App Secret** obtained from Facebook.

1.  (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.

1.  Click **Save**.

1.  On [developers.facebook.com](https://developers.facebook.com/), click **Facebook Login > Settings** on the left-hand menu.

1.  Ensure that the **Use Strict Mode for Redirect URIs** slider is set to **Yes**.

1.  In the **Valid OAuth redirect URIs** field, enter your [team domain](/cloudflare-one/glossary/#team-domain), followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

1.  Click **Save Changes**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to Facebook.

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
