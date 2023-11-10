---
pcx_content_type: how-to
title: Under a DDoS attack?
meta:
    description: Learn a few ways to tell if your application is under a DDoS attack.
---

# How to tell if you are under DDoS attack

{{<render file="_ddos-definition-and-diagram.md" productFolder="learning-paths">}}

## Common signs of an attack

Common signs that you are under DDoS attack include:

-   Your site is offline or slow to respond to requests.
-   There are unexpected spikes in the graph of **Requests Through Cloudflare** or **Bandwidth** in your Cloudflare **Analytics** app.
-   There are strange requests in your origin web server logs that do not match normal visitor behavior.

{{<Aside type="note">}}
If you are currently under DDoS attack, refer to our guide on [responding to a DDoS attack](/ddos-protection/best-practices/respond-to-ddos-attacks/).
{{</Aside>}}