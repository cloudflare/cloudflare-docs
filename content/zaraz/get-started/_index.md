---
pcx_content_type: get-started
title: Get started
layout: single
weight: 2
---

# Get started

Before being able to use Zaraz, it is recommended that you proxy your website through Cloudflare. Refer to [Set up Cloudflare](/fundamentals/get-started/setup/) for more information. If you do not want to proxy your website through Cloudflare, refer to [Use Zaraz on domains not proxied by Cloudflare](/zaraz/advanced/domains-not-proxied/).

## Events, triggers, actions and tools

Zaraz relies on events and triggers to determine when to load the tools you need in your website, and what action they need to perform. The way you configure Zaraz and where you start largely depend on the tool you wish to use.

Every tool needs an action to work, and actions must have a trigger. A trigger can be based on an event, or a condition. A tool without actions will not do anything.

Some tools come with a preconfigured `Pageview` action, that uses the built-in `Pageview` system trigger. For example, when adding Google Analytics to your site, Zaraz will, by default, send page views whenever a page is loaded. Other tools might not use the concept of page views. These tools will require you to create triggers and define your own actions. Whatever the case, Zaraz is flexible and allows you to configure it for your specific use case or needs.

## ​Web API

If you need to programmatically start actions in your tools, Cloudflare Zaraz provides a unified Web API to send events to Zaraz, and from there, to third-party tools. This Web API includes the `zaraz.track()`, `zaraz.set()` and `zaraz.ecommerce()` methods.

[The Track method](/zaraz/web-api/track/) allows you to track custom events and actions on your website, that might happen in real time. [The Set method](/zaraz/web-api/set/) is an easy shortcut to define a variable once and have it sent with every future Track call. [E-commerce](/zaraz/web-api/ecommerce/) is a unified method for sending e-commerce related data to multiple tools without needing to configure triggers and events. Refer to [Web API](/zaraz/web-api/) for more information.
