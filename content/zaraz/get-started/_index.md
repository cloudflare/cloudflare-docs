---
pcx-content-type: get-started
title: Get started
weight: 2
---

# Get started

Before being able to use Zaraz, your website has to be proxied through Cloudflare. Refer to [Creating a Cloudflare account and adding a website](https://support.cloudflare.com/hc/articles/201720164) for more information. If you do not want to proxy your website through Cloudflare, refer to [Use Zaraz on domains not proxied by Cloudflare](/zaraz/advanced/domains-not-proxied/).

Zaraz relies on events and triggers to automatically load and activate the tools you need in your website. The way you configure Zaraz and where you start largely depend on the tool you wish to use.

## Triggers, events or tools?

If the tool you need just requires a simple `pageview` trigger to operate, start by [adding a third-party tool](/zaraz/get-started/add-tool/) to your Zaraz dashboard.

If you need a different kind of trigger, or set of triggers, [start by creating a trigger](/zaraz/get-started/add-tool/) before adding your third-party tool. Then, add your tool to the Zaraz dashboard, and configure it with the trigger or set of triggers you created.

You may also want to create specific events to send to your tool. Events are bundles of information that Zaraz sends to a tool when a particular trigger is matched. Refer to [Send events to a third-party tool](/zaraz/get-started/send-events/) for more information.

## Web API

If you need complex integrations, Cloudflare Zaraz provides a unified set of functions to send data programmatically to third-party tools, with the `zaraz.track()` and `zaraz.set()` methods.

[Zaraz Track](/zaraz/web-api/zaraz-track/) allows you to track the actions your users are taking on your website, and other events that might happen in real time. [Zaraz Set](/zaraz/web-api/zaraz-set/) allows you to define your own variables, which are then automatically included with your Zaraz Track calls or triggers. Refer to [Web API](/zaraz/web-api/) for more information.
