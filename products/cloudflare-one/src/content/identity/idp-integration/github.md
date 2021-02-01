---
order: 12
---

# GitHub

Cloudflare Access allows your to connect to your applications using their GitHub login. Administrators can build rules for specific individuals or using GitHub organizations. You do not need to have a GitHub organization to use the integration.

## Set up GitHub Access

To configure GitHub access in both GitHub and Cloudflare Access:

1. Log into GitHub.
2. Go to your account **Settings > Developer Settings**, select **OAuth Apps** and click **Register a new application**.

    ![GitHub OAuth page](../../static/documentation/identity/github/github1.png)

    The **Register a new OAuth application** window displays.

    ![GitHub Register a new OAuth application window](../../static/documentation/identity/github/github2.png)

3. Enter an **Application name**. You users willsee this name on the login page.

4. Enter your [team domain](/glossary#team-domain) in the **Homepage URL** field.

    For example, `https://your-team-name.cloudflareaccess.com`

5. In the GitHub **Authorization callback URL** field, enter your [team domain](/glossary#team-domain) and add this to the end of the path: `/cdn-cgi/access/callback`.
6. Click **Register application**.
7. Copy the **Client ID** and **Client Secret**.

    ![Client ID and Client secret](../../static/documentation/identity/github/github4.png)

8. On the Teams dashboard, navigate to **Access > Authentication**.

9. Under **Login methods**, click *+ Add*.

10. Choose **GitHub** on the next page. 

11. Paste in the **Client ID** and **Client secret**.
10. Click **Save**.

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
