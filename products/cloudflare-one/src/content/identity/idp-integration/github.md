---
order: 12
---

# GitHub

Cloudflare for Teams allows your to connect to your applications using their GitHub login. Administrators can build rules for specific individuals or using GitHub organizations. You do not need to have a GitHub organization to use the integration.

## Set up GitHub Access

To configure GitHub access in both GitHub and Cloudflare for Teams:

1. Log into GitHub.
1. Go to your account **Settings > Developer Settings**, select **OAuth Apps** and click **Register a new application**.

    ![GitHub OAuth page](../../static/documentation/identity/github/github1.png)

    The **Register a new OAuth application** window displays.

    ![GitHub Register a new OAuth application window](../../static/documentation/identity/github/github2.png)

1. Enter an **Application name**. You users willsee this name on the login page.

1. Enter your [team domain](/glossary#team-domain) in the **Homepage URL** field.

    For example, `https://your-team-name.cloudflareaccess.com`

1. In the GitHub **Authorization callback URL** field, enter your [team domain](/glossary#team-domain) and add this to the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```
    
1. Click **Register application**.
1. Copy the **Client ID** and **Client Secret**.

    ![Client ID and Client secret](../../static/documentation/identity/github/github4.png)

1. On the Teams dashboard, navigate to **Access > Authentication**.

1. Under **Login methods**, click *+ Add*.

1. Choose **GitHub** on the next page. 

1. Paste in the **Client ID** and **Client secret**.
1. Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to GitHub.

<Aside>
If you have GitHub two-factor authentication enabled, you will need to first login to GitHub directly and return to Access.
</Aside>

## Example API Configuration

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret"
    },
    "type": "github",
    "name": "my example idp"
}
```
