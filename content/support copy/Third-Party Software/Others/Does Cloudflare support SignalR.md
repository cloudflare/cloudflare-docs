---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/218048207-Does-Cloudflare-support-SignalR-
title: Does Cloudflare support SignalR
---

# Does Cloudflare support SignalR?



Yes, Cloudflare supports [ASP.NET SignalR.](http://signalr.net/)

SignalR negotiates what transport method to use: long polling or WebSockets. 

Customers using [Cloudflare Railgun](/railgun/) (deprecated) should note that when SignalR negotiates using:

-   WebSockets, Railgun is bypassed.
-   Long polling, the request goes over Railgun but, if such request is idle for 60 seconds, Railgun times out and returns a [527 error](https://support.cloudflare.com/hc/articles/115003011431#527error).

Read more about [Cloudflare's support of WebSockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-CloudFlare-with-WebSockets-).
