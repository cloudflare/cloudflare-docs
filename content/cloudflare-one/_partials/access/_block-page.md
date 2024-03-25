---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note">}}
Only available on Pay-as-you-go and Enterprise plans.
{{</Aside>}}

You can display a custom block page when users fail to authenticate to an Access application. Each application can have a different block page.

{{<Aside type="note">}}
To customize the page that users see when they are blocked by a Gateway firewall policy, refer to [Gateway block page](/cloudflare-one/policies/gateway/configuring-block-page/).
{{</Aside>}}

## Create a custom block page

To create a custom block page for Access:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Custom Pages**.
2. Find the **Access Custom Pages** setting and select **Manage**.
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

You can now select this block page when you [configure an Access application](/cloudflare-one/applications/configure-apps/).