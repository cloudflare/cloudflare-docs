---
order: 1
pcx-content-type: navigation
---

# Get started

Before being able to use Zaraz, your website has to be proxied through Cloudflare. Refer to [Creating a Cloudflare account and adding a website](https://support.cloudflare.com/hc/articles/201720164) for more information.

If your website is already proxied through Cloudflare, log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/:zone/zaraz) and add the third-party tool or service you need to Zaraz.

Zaraz relies on Events and triggers to automatically load and activate a tool of your choice in your website. The way you configure Zaraz depends on the tool you wish to use. For example, if the tool just needs a `Pageview` event as a trigger, refer to [Add a third-party tool](/get-started/add-tool) to get started. If you need a different kind of trigger or set of triggers, refer to [Create a trigger](/get-started/create-trigger).

All configurations and triggers are accessible from the dashboard. If you need more complex integrations, Cloudflare Zaraz provides a unified set of functions to send data programmatically to third-party tools. Regardless of the tool you need to use, `zaraz.track()` will send your data wherever you choose, without even needing to load the tool’s script.

<DirectoryListing path="/get-started"/>