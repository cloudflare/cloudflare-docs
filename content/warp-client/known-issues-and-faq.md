---
title: FAQ
pcx_content_type: faq
weight: 5
---

# FAQ

Below you will find answers to our most commonly asked questions regarding the WARP client. If you cannot find the answer you are looking for, refer to the [community page](https://community.cloudflare.com/) to explore more resources.

{{<faq-item>}}
{{<faq-question level=2 text="Why am I not connecting to a closer Cloudflare data center?" >}}

{{<faq-answer>}}

As our [Network Map](https://www.cloudflare.com/network/) shows, we have locations all over the globe. However, in the Advanced Connection stats of our application, you may notice that the server you are connecting to is not necessarily the one physically closest to your location. This can be due to a number of reasons:

- We work hard to prevent it, but sometimes your nearest server might be having problems. [Check the system status](https://www.cloudflarestatus.com/?_ga=2.155811579.1117044671.1600983837-1079355427.1599074097) for more information.
- Your Internet provider may choose to route traffic along an alternate path for reasons such as cost savings, reliability, or other infrastructure concerns.
- Not all Cloudflare locations are WARP enabled. We are constantly evaluating performance and how users are connecting, bringing more servers online with WARP all the time.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Does WARP reveal my IP address to websites I visit?" >}}

{{<faq-answer>}}

No. 1.1.1.1 + WARP replaces your original IP address with a Cloudflare IP that consistently and accurately represents your approximate location. This happens regardless of whether the site is on the Cloudflare network or not. 

Refer to our [blog post](https://blog.cloudflare.com/geoexit-improving-warp-user-experience-larger-network/) for more information on this topic.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Why has my throughput dropped while using WARP?" >}}

{{<faq-answer>}}

Cloudflare WARP is in part powered by [1.1.1.1](/1.1.1.1/), the world's fastest DNS resolver. When visiting sites or going to a new location on the Internet, you should see fast DNS lookups. WARP, however, is built to trade some throughput for enhanced privacy, by encrypting all traffic both to and from your device. While this is not noticeable at most mobile speeds, on desktop systems in countries where high-speed broadband is available, you may notice a drop. We think the tradeoff is worth it and continue to work on improving performance all over the system.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What about the performance of the WARP app?" >}}

{{<faq-answer>}}

Cloudflare WARP and the 1.1.1.1 with WARP applications go through performance testing that includes battery, network and CPU on a regular basis. In addition, both applications are used by millions of users worldwide that help us stay on top of issues across a wide variety of devices, networks, sites and applications.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="What is the version of .NET Framework required for the Windows client?" >}}

{{<faq-answer>}}

The WARP client for Windows requires .NET Framework version 4.7.2 or later to be installed on your computer.

{{</faq-answer>}}
{{</faq-item>}}

---

## Known issues

Applications or sites that rely on location information to enforce content licensing agreements (for example, certain games, video streaming, music streaming, or radio streaming) may not function properly. We are working on a product update that will allow these clients to work, by not sending their traffic through WARP.
