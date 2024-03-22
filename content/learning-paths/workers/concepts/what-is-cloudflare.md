---
title: What is Cloudflare?
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

Cloudflare is a global network of [servers](https://www.cloudflare.com/learning/cdn/glossary/edge-server/).

Cloudflare's product offering is composed of [SASE and SSE services](https://www.cloudflare.com/zero-trust/), [application](https://www.cloudflare.com/application-services/) and [infrastructure services](https://www.cloudflare.com/network-services/), and [Developer Platform](https://www.cloudflare.com/developer-platform/solutions/).

Cloudflare's products offer something to developers, private and public organizations, businesses, governments, and individual consumers.

## Cloudflare Developer Platform

The [Cloudflare Developer Platform](https://www.cloudflare.com/developer-platform/products/) includes [Cloudflare Workers](/workers/), which allows you to deploy serverless code instantly across the globe. You will learn more about [the Developer Platform in this module](http://localhost:5173/learning-paths/workers/concepts/developer-platform/).

## Built on Cloudflare

If your application is built on Cloudflare, then Cloudflare would act as the origin server of your application.

An example tech stack for an application built on Cloudflare would look like:

- [Domain Registrar](/registrar/) to buy a new your domain.
- [Cloudflare Pages](/pages/) to configure and deploy a front-end site.
- [Cloudflare Workers](/workers/) or [Pages Functions](/pages/functions/) (which are Workers under the hood) to add dynamic functionality to your site.
- [Storage resources](/workers/platform/storage-options/) to persist different types of data.
- [Application security](https://developers.cloudflare.com/products/?product-group=Application+security) to secure your site.
- [Application performance](https://developers.cloudflare.com/products/?product-group=Application+performance) to customize and enhance your site's performance.
- [AI](/ai/) to run machine learning models.
- And more depending on your use case.

## Built with Cloudflare

When you add your application to Cloudflare, Cloudflare's global network of servers will sit in between requests and your application's [origin server](https://www.cloudflare.com/learning/cdn/glossary/origin-server/).

![Cloudflare sits in between requests and your origin server.](/images/fundamentals/get-started/website-with-cloudflare.svg)

After you add your application to [Cloudflare](/fundamentals/concepts/how-cloudflare-works/), you can use Workers to augment the application by deploying code, add storage resources, or enhance your performance and security via speeding up content delivery and user experience ([CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)), protecting your website from malicious activity ([DDoS](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/), [Web Application Firewall](https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/)), routing traffic ([Load balancing](/load-balancing/), [Waiting Room](/waiting-room/)), and more.

{{<Aside type="note">}}

For more details about what Cloudflare is and does, refer to the [Learning Center](https://www.cloudflare.com/learning/what-is-cloudflare/).

{{</Aside>}}

In the next section, you will learn the basics of serverless computing, the concept behind Cloudflare Workers.

