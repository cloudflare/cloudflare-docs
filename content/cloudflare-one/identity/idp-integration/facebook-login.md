---
pcx_content_type: how-to
title: Facebook
weight: 13
---

# Facebook

Use these steps to set up Facebook as your identity provider.

1. Go to [developers.facebook.com](https://developers.facebook.com/).

2. Select **Create App** at the top-right. The **Create a New App ID** card displays.

3. Enter the **Display Name** and **Contact Email**.

4. Select **Create App ID**. The **Create a New App ID** window displays.

5. Enter the CAPTCHA code to proceed.

6. Select **Submit**.

7. On the **Facebook Login** card, select **Set Up**. A Quickstart card displays offering platform choices.

8. Select **Web**. The **Web** tab displays.

9. Enter your **Site URL**.

10. Select **Save**.

11. Select **Continue**. Ignore any JavaScript page that suggests that you install it on your site.

12. Select **Settings** > **Basic**.

13. Copy the **App ID** and **App Secret**.

    ![Facebook Settings with App ID and App Secret highlighted](/images/cloudflare-one/identity/facebook/fb6.png)

14. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

15. Under **Login methods**, select **Add new**.

16. Fill in the **App ID** and **App Secret** obtained from Facebook.

17. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.

18. Select **Save**.

19. On [developers.facebook.com](https://developers.facebook.com/), select **Facebook Login** > **Settings** on the left-hand menu.

20. Ensure that the **Use Strict Mode for Redirect URIs** slider is set to **Yes**.

21. In the **Valid OAuth redirect URIs** field, enter the following URL:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    You can find your team name in Zero Trust under **Settings** > **Custom Pages**.

22. Select **Save Changes**.

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
