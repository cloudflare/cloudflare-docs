---
order: 12
---

# Centrify



Centrify secures access to infrastructure, DevOps, cloud, and other modern enterprise so you can prevent the #1 cause of breaches – privileged access abuse.

## Set up Centrify

These steps help you set up Centrify as your identity provider (IdP).

1. Log in to the Centrify administrator panel.
2. Click **Apps**.

    ![Centrify Security Overview](../static/centrify/centrify-1.png)

3. Click **Add Web Apps**.

    ![Add Web Apps](../static/centrify/centrify-2.png)

4. Select the **Custom** tab and click **Add OpenID Connect**.
5. On the **Add Web App** screen click **Yes** to create an OpenID Connect application.

    ![Add Web App screen](../static/centrify/centrify-3.png)

6. Enter an **Application ID**.

    ![Centrify Settings](../static/centrify/centrify-4.png)

7. Click **Save**.
8. Click **Trust** in the **Settings** menu.
9. Enter a strong application secret on the **Trust** section.
10. Under **Service Provider Configuration** enter your application’s authentication domain as the resource application URL.
11. Under **Authorized Redirect URIs** click **Add**.

    ![Centrify OpenID Connect](../static/centrify/centrify-5.png)

12. Under **Authorized Redirect URIs** enter your authentication domain as `/cdn-cgi/access/callback`.
13. Click **Save**.

    ![Centrify Trust](../static/centrify/centrify-6.png)

14. Copy the Client ID, Client Secret, and OpenID Connect Issuer URL.

    <Aside>
    
    Do not use the forward slash from the <strong>Settings</strong> tab.
    </Aside>

15. Copy the Application ID from the Settings tab in the Centrify dashboard, and paste them into the Cloudflare Access.
16. Navigate to the **User Access** tab.
17. Select the roles to grant access to your application.

    ![Centrify User Access](../static/centrify/centrify-7.png)

18. In the **Cloudflare Access** app, under click **Add** under **Login Methods**, and select Centrify as your IdP.
19. Paste in the **Client ID** and **Client Secret**.
20. Click **Save and Test**.

    On success, a confirmation displays that your connection works.

    ![Cloudflare IdP Connection Success](../static/centrify/centrify-8.png)

## **Example API Config**

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret",
        "centrify_account": "https://abc123.my.centrify.com/",
        "centrify_app_id": "exampleapp",
    },
    "type": "centrify",
    "name": "my example idp"
}
