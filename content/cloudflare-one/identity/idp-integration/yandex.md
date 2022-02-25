---
pcx-content-type: how-to
title: Yandex
weight: 13
---

# Yandex

Yandex is a web search engine that also offers identity provider (IdP) services.

## Set up Yandex

To set up Yandex for Cloudflare Access:

1.  Log into your Yandex account.

2.  Select **Open a new OAuth Application**.

    ![Yandex OAuth page](/cloudflare-one/static/documentation/identity/yandex/yandex-1.png)

3.  Select **New client**.

4.  Complete the required fields.

5.  Choose **Yandex.Passport API** to set the basic scopes.

6.  Select the **Access to email address**, **Access to user avatar,** and **Access to username, first name and surname, gender** options.

    ![Yandex OAuth fields](/cloudflare-one/static/documentation/identity/yandex/yandex-2.png)

7.  Select **Platform** and click **Web Services.**

8.  In the **Callback URL #1** field, enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    ![Yandex scopes](/cloudflare-one/static/documentation/identity/yandex/yandex-3.png)

9.  Click **Add**.

10. Scroll to the **Platforms** card, and click **Submit**.

    **Yandex OAuth** card titled **Cloudflare Access App** displays.

11. Copy the **ID** and **Password**.

    ![Yandex Platform card](/cloudflare-one/static/documentation/identity/yandex/yandex-4.png)

12. On the Zero Trust dashboard, navigate to **Settings > Authentication**.

13. Under **Login methods**, click **Add new**.

14. Select Yandex.

15. Paste the ID and password in the appropriate fields.

16. Click **Save**.

## Example API Config

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret>"
    },
    "type": "yandex",
    "name": "my example idp"
}
```
