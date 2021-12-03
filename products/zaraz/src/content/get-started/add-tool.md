---
order: 2
pcx-content-type: how-to
---

# Add a third-party tool

You can add new third-party tools and load them into your website through the dashboard.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
1. Select **Zaraz**.
1. From **Third-party tools**, select **Add new tool**.
1. Choose a tool from the tools library page and **Confirm** your selection. You will be directed to the **Settings** page to configure the new tool. The information you need to enter will depend on the tool you choose.
1. Click on the **Events** tab > **Create event** and give your Event a name. 
1. Click the **Firing Triggers** dropdown menu. You need to configure the first event that will trigger the loading of the tool on your website. For most tools, this will be a simple *Page view* event type, for which Zaraz offers a `__zarazPageview` preset configuration.
For more advanced usage of Events, refer to [Send Events to a third-party tool](/get-started/send-events)
1. Click **Save**.

Your tool is now configured. The Event you created will load the tool into your website when the conditions you set are met. Every Event includes:

* **Event Name**. The name of the event that will be used internally in the Zaraz dashboard.
* **Trigger**. A set of rules that trigger an event, like `pageviews`.
* **Additional fields**. When applicable. Here you can configure the type of data you wish to send to the new tool.

If you go back to the main Zaraz page, you will see your tool listed under **Third-party tools**, and the name of the Event associated with it. In this page you can also toggle the **Active** button to activate and deactivate your tool.
