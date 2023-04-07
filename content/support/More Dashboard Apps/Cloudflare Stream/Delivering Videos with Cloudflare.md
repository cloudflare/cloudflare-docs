---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360057976851-Delivering-Videos-with-Cloudflare
title: Delivering Videos with Cloudflare
---

# Delivering Videos with Cloudflare



## Using Cloudflare's Services

Cloudflare launched in 2010 believing everyone deserves a secure, fast, reliable web presence. We did not think you should have to pay more when you came under cyber attack, so we offered free and fixed-rate pricing for websites. That worked because most websites don’t consume much bandwidth, and so we could provide our services in an affordable way to everyone.From the beginning, we prohibited streaming video content using our bandwidth. While you could embed a video from another provider, we limited your ability to use our services to deliver video bits from our network to your visitors. This is because every second of a typical video requires as much bandwidth as loading a full web page.

Over time we recognized that some of our customers wanted to stream video using our network. To accommodate them, we developed our [Stream](https://www.cloudflare.com/products/cloudflare-stream/) product. Stream delivers great performance at an affordable rate charged based on how much load you place on our network.

Unfortunately, while most people respect these limitations and understand they exist to ensure high quality of service for all Cloudflare customers, some users attempt to misconfigure our service to stream video in violation of our Terms of Service. We want to make sure our service is great for everyone, including public service initiatives we run like [Project Galileo](https://www.cloudflare.com/galileo/), [The Athenian Project](https://www.cloudflare.com/athenian/), and [Project Fair Shot](https://www.cloudflare.com/fair-shot/). A handful of people misusing our service limits our ability to run these initiatives.

The following are some recommendations for using Cloudflare’s services based on what may have brought you to this page.

___

## I’m a website operator and my content was redirected for Terms of Service violations

If you are on a Free, Pro, or Business Plan and your application appears to be serving videos or a disproportionate amount of large files without using the appropriate paid service as described below, Cloudflare may redirect your content or take other actions to protect quality of service. When this happens, you will receive an email notification regarding Cloudflare’s actions and your options.

## Options for web admins to remove redirects 

-   **Serve redirected content from a grey-clouded sub-domain**

-   **Serve redirected content from a paid service as outlined below**

## Delivering videos with Cloudflare using paid products

Cloudflare permits the delivery of video content with specific paid services. If you are interested in serving video content, there are two recommended options. 

### Option 1: Cloudflare Stream 

[Stream](https://www.cloudflare.com/products/cloudflare-stream/) is a video-on-demand platform for building video applications. Stream encodes, stores, and delivers optimized video formatted for different devices and network connections. 

To get started with Stream, visit **Stream** from your Dashboard or [sign up](https://dash.cloudflare.com/sign-up/stream). Your Stream videos are not attached to a domain in your Cloudflare account, and you don't need a domain on Cloudflare to use Stream.

### Option 2: Stream Delivery (Enterprise only)

[Stream Delivery](https://www.cloudflare.com/products/stream-delivery/) offers caching and delivery of video content through Cloudflare data centers around the globe. This CDN feature is only available on the Cloudflare Enterprise Plan. Please [contact sales](https://www.cloudflare.com/products/stream-delivery/#) if you’d like to explore this option.

___

## Getting information on the content you are delivering

If you need more information about the content your zone is serving (e.g. content type), you can use the following tools: 

-   Cache Analytics users: Open the **Caching tab** on the Dashboard to filter by content type and identify the type of traffic you are transferring. 
-   Users without Cache Analytics: Open the **Analytics tab** on the Dashboard and select the **Performance** section for information about the content you are serving.

![Cache Analytics - Identify type of traffic being transferred](/support/static/traffic-types.png)

## Still have questions? Contact support

If you have additional questions about redirection (e.g. if you believe your content was redirected in error and have supporting evidence), file a [support ticket](https://dash.cloudflare.com/redirect?account=support) and include the following information: 

-   Name of your domain
-   Description of the problem
-   Description of the content you’re serving through Cloudflare’s network
