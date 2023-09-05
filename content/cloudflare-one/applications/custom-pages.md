---
pcx_content_type: how-to
title: Customize an application
weight: 7
---

# Customize an application

You can customize the pages your end users will see when trying to reach applications behind Cloudflare Access.

## Login page

To change the appearance of your Access login page:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Custom Pages**.
2. Find the **Login page** setting and select **Customize**.
3. Give the login page the look and feel of your organization by adding:
    - Your organization's name
    - A logo
    - A custom header and footer
    - A preferred background color

    Any changes you make will be reflected in real time in the **Preview** card.

4. Once you are satisfied with your customization, select **Save**.

The login page is now updated for all of your Access applications.

## Block page

You can display a custom block page when users fail to authenticate to an Access application.

{{<Aside type="note">}}
To customize the page that users see when they are blocked by a Gateway firewall policy, refer to [Gateway block page](/cloudflare-one/policies/gateway/configuring-block-page/).
{{</Aside>}}

To create a custom block page for Access:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Custom Pages**.
2. Find the **Custom Pages** setting and select **Manage**.
3. Select **Add a page template**.
4. Enter a unique name for the block page.
5. Select **Failed identity provider check**.
6. Copy the **Required script**.
7. In **Custom HTML**, enter the HTML code for your custom page. For example,

    ```html
    <!DOCTYPE html>
    <html>
    <body>

    <h1>Access denied.</h1>

    <p>To obtain access, contact your IT administrator.</p>

    </body>
    </html>
    ```

8. To check the appearance of your custom page, select **Download** and open the HTML file in a browser.
9. Once you are satisfied with your custom page, select **Save**.

You can now select this block page when you [configure an Access application](/cloudflare-one/applications/configure-apps/). Each application can have a different block page.
