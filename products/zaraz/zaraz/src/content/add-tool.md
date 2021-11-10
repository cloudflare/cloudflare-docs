---
pcx-content-type: how-to
---

# Add a third-party tool

You can add new third-party tools and load them into your website through the dashboard.

1. On the third-parties page, click the **plus sign**.
1. Choose a tool from the catalog page. You can also use the search bar or browse the catalog by category. Then, click **Confirm**.
1. You will be directed to a wizard to configure the new tool. The information you need to enter will depend on the tool you chose. In the first step, you need to configure the primary default fields, like account ID or API keys. Then, click **Configure optimization**.
1. Next, configure the loading strategy for the tool. The loading strategy defines the optimization technique Zaraz will use to load the new tool. We recommend using the default optimization setting. Click **Add events**.
1. Now, you need to configure the first event that will trigger the loading of the tool on your website. For most tools, this will be a simple `pageview` event, for which Zaraz offers a preset configuration. We recommend using the default information from Cloudflare. Click **Next** to complete adding the tool.

<Aside type="note" header="Note about events">

Every event includes:

* **Event Name**. The name of the event that will be used internally in the Zaraz dashboard.
* **Trigger**. A set of rules that trigger an event, like `pageviews`.
* **Additional fields**. When applicable. Here you can configure the type of data you wish to send to the new tool.

</Aside>

The new tool you just added will be loaded on your website only after the changes you have made are published.