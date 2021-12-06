---
order: 2
pcx-content-type: how-to
---

# Add a third-party tool

You can add new third-party tools and load them into your website through the Cloudflare dashboard.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.

1. Select **Zaraz**.

1. From **Third-party tools**, select **Add new tool**.

1. Choose a tool from the tools library page and **Confirm** your selection. You will be directed to the **Settings** page to configure the new tool. The information you need to enter will depend on the tool you choose.

1. Click the **Events** tab. You need to create an Event to load the tool into your website. Select **Create event** and give your Event a name.

1. Click the **Firing Triggers** dropdown menu. A Firing Trigger is the condition (or set of conditions) that tells Cloudflare Zaraz to fire the Event and load the tool to your website. For most tools, this will be a simple *Page view* event type, for which Cloudflare Zaraz offers a `pageview` preset configuration. If this is the case for the tool you are choosing, you do not need to do anything else. For example, with the tool Facebook Pixel, you just need to add your account ID and Zaraz will configure the event for you. If you need to add a different kind of trigger, refer to [Create a trigger](/get-started/create-trigger).

Your tool is now configured. The Event you have created will load the tool into your website when the conditions you set are met. Every Event includes:

* **Event Name**. The name of the event that will be used internally by Cloudflare Zaraz.
* **Trigger**. A set of rules that trigger an event, like `pageviews`.
* **Additional fields**. When applicable. Here you can configure the type of data you wish to send to the new tool.

If you go back to the main Cloudflare Zaraz page, you will see your tool listed under **Third-party tools**, and the name of the Event associated with it. In this page you can also toggle the **Active** button to activate and deactivate your tool.