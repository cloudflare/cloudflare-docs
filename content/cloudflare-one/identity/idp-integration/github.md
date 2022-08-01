---
pcx-content-type: how-to
title: GitHub
weight: 13
---

# GitHub

Cloudflare Zero Trust allows your team to connect to your applications using their GitHub login. Administrators can build rules for specific individuals or using GitHub organizations. You do not need to have a GitHub organization to use the integration.

## Set up GitHub Access

To configure GitHub access in both GitHub and Cloudflare Zero Trust:

1.  Log in to GitHub.

1.  Go to your account **Settings > Developer Settings**, select **OAuth Apps** and click **Register a new application**. The **Register a new OAuth application** window displays.

    ![GitHub Register a new OAuth application window without any form fields completed](/cloudflare-one/static/documentation/identity/github/github2.png)

1.  Enter an **Application name**. Your users will see this name on the login page.

1.  Enter your [team domain](/cloudflare-one/glossary/#team-domain) in the **Homepage URL** field.

    For example, `https://<your-team-name>.cloudflareaccess.com`

1.  In the GitHub **Authorization callback URL** field, enter your [team domain](/cloudflare-one/glossary/#team-domain) and add this to the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

1.  Click **Register application**.

1.  Copy the **Client ID** and **Client Secret**.

    ![GitHub Cloudflare Access App showing Client ID and Client secret](/cloudflare-one/static/documentation/identity/github/github4.png)

1.  On the Zero Trust dashboard, navigate to **Settings > Authentication**.

1.  Under **Login methods**, click **Add new**.

1.  Choose **GitHub** on the next page.

1.  Paste in the **Client ID** and **Client secret**.

1.  Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to GitHub.
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
