---
order: 12
---

# Facebook

Cloudflare Access allows your users to use Facebook as their IdP.

## Set up Facebook as your IdP

Use these steps to set up Facebook as your identity provider.

1. Go to go to [developers.facebook.com](https://developers.facebook.com/).
2. Click **Create App** at the top-right.

    ![Facebook IdP Login page](../../static/documentation/identity/facebook/fb1.png)

3. The **Create a New App ID** card displays
4. Enter the **Display Name** and **Contact Email**.
5. Click **Create App ID**.

    The Create a New App ID window displays.

    ![Facebook Create New App ID](../../static/documentation/identity/facebook/fb2.png)

6. Enter the Captcha code to proceed.
7. Click **Submit**.
8. On the **Facebook Login** card, click **Set Up**.

    ![Facebook Add a Product](../../static/documentation/identity/facebook/fb3.png)

    A Quickstart card displays offering platform choices.

    ![Facebook Quickstart](../../static/documentation/identity/facebook/fb4.png)

9. Click **Web**.

    The _Web_ tab displays.

10. Enter your **Site URL**.
11. Click **Save**.
12. Click **Continue**.

    Ignore any JavaScript page that suggests that you install it on your site.

13. Click **Settings > Basic** on the left-hand menu.

    ![Facebook Settings](../../static/documentation/identity/facebook/fb6.png)

14. In the **Cloudflare** **Access** app, copy the App ID and App Secret into the **OAuth ID** and **OAuth Secret** fields.

    ![OAuth ID and OAuth Secret](../../static/documentation/identity/facebook/fb7.png)

15. Click **Facebook Login**.

    ![Facebook OAuth Settings](../../static/documentation/identity/facebook/fb8.png)

16. Set the **Use Strict Mode for Redirect URIs** slider to **Yes**.
17. Enter your authentication domain in the **Valid OAuth redirect URIs** field.
18. Click **Save Changes**.
19. Click **Save and Test** in the **Cloudflare Access** app.

    On successful connection to your identity provider, a confirmation window displays.

    ![Cloudflare Idp Connection Success](../../static/documentation/identity/facebook/fb9.png)

## Example API Configuration

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret"
    },
    "type": "facebook",
    "name": "my example idp"
}
