---
pcx_content_type: how-to
title: GitHub
weight: 13
meta:
    title: GitHub - IdP Integration
---

# GitHub

Cloudflare Zero Trust allows your team to connect to your applications using their GitHub login. Administrators can build rules for specific individuals or using GitHub organizations. You do not need to have a GitHub organization to use the integration.

## Set up GitHub Access

To configure GitHub access in both GitHub and Cloudflare Zero Trust:

1. Log in to GitHub.

2. Go to your account **Settings** > **Developer Settings**, select **OAuth Apps** and select **Register a new application**. The **Register a new OAuth application** window displays.

    ![GitHub Register a new OAuth application window without any form fields completed](/images/cloudflare-one/identity/github/github2.png)

3. Enter an **Application name**. Your users will see this name on the login page.

4. In the **Homepage URL** field, enter your team domain:
    ```txt
    https://<your-team-name>.cloudflareaccess.com
    ```

    You can find your team name in Zero Trust under **Settings** > **Custom Pages**.

5. In the GitHub **Authorization callback URL** field, enter the following URL:
    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

6. Select **Register application**.

7. Copy the **Client ID** and **Client Secret**.

    ![GitHub Cloudflare Access App showing Client ID and Client secret](/images/cloudflare-one/identity/github/github4.png)

8. In Zero Trust, go to **Settings** > **Authentication**.

9. Under **Login methods**, select **Add new**.

10. Choose **GitHub** on the next page.

11. Paste in the **Client ID** and **Client secret**.

12. Select **Save**.

To test that your connection is working, go to **Authentication** > **Login methods** and select **Test** next to GitHub.
If you have GitHub two-factor authentication enabled, you will need to first login to GitHub directly and return to Access.

## Example API Configuration

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>"
  },
  "type": "github",
  "name": "my example idp"
}
```
