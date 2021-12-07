---
order: 1
pcx-content-type: navigation
---

# Get started

To start using Cloudflare Zaraz, log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/:zone/zaraz) and add a third-party tool or service to it. You also need to create the Event that will activate the loading of the tool in your website, and the trigger, or set of conditions, to determine if and when Zaraz should send events to the tool.

If your tool just needs a `pageviews` event as a trigger, go to [Add a third-party tool](/get-started/add-tool) to get started. If you need a different kind of trigger or set of triggers, go to [Create a trigger](/get-started/create-trigger) first.

All configurations and triggers are accessible from the dashboard. If you need more complex integrations, Cloudflare Zaraz provides a unified set of functions to send data programmatically to third-party tools. Regardless of the tool you need to use, `zaraz.track()` will send your data wherever you choose, without even needing to load the tool’s script.

<DirectoryListing path="/get-started"/> 
