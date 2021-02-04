---
order: 12
---

# Yandex

Yandex is a web search engine that also offers identity provider (IdP) services.

## Set up Yandex

To set up Yandex for Cloudflare Access:

1. Log into your Yandex account.
1. Select **Open a new OAuth Application**.

    ![Yandex OAuth page](../../static/documentation/identity/yandex/yandex-1.png)

1. Select **New client**.
1. Complete the required fields.
1. Choose **Yandex.Passport API** to set the basic scopes.
1. Select the **Access to email address**, **Access to user avatar,** and **Access to username, first name and surname, gender** options.

    ![Yandex OAuth fields](../../static/documentation/identity/yandex/yandex-2.png)

1. Select **Platform** and click **Web Services.**
1. In the **Callback URL #1** field, enter your [team domain](/glossary#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    ![Yandex scopes](../../static/documentation/identity/yandex/yandex-3.png)

1. Click **Add**.
1. Scroll to the **Platforms** card, and click **Submit**.

    **Yandex OAuth** card titled **Cloudflare Access App** displays.

1. Copy the **ID** and **Password**.

    ![Yandex Platform card](../../static/documentation/identity/yandex/yandex-4.png)

1. On the **Teams dashboard**, navigate to **Access > Authentication**.

1. Click *+ Add* under **Login Methods**, and select Yandex.

1. Paste the ID and password in the appropriate fields.

1. Click **Save**.


## Example API Config

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret"
    },
    "type": "yandex",
    "name": "my example idp"
}
```
