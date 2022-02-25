---
title: Cloudflare and Google Analytics
pcx-content-type: reference
---

# Using Google Analytics with Cloudflare

Using Cloudflare does not affect Google Analytics (GA) tracking.

Cloudflare proxies traffic to your origin web server, but the GA JavaScript code never actually sends traffic to your server. Instead, it executes directly in a user's browser and does not interact with Cloudflare.

Cloudflare only affects analytics tools that read logs directly from your web server (like awstats).

<Aside type="note">

To troubleshoot potential issues with Google Analytics, refer to [Common GA setup mistakes](https://support.google.com/analytics/answer/1009683).

</Aside>
