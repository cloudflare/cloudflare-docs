---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
---

{{<beta>}}Cloudflare Privacy Gateway{{</beta>}}

{{<description>}}
Implements the Oblivious HTTP IETF standard to improve client privacy.
{{</description>}}

{{<plan type="all">}}

[Privacy Gateway](https://blog.cloudflare.com/building-privacy-into-internet-standards-and-how-to-make-your-app-more-private-today/) is a managed gateway service deployed on Cloudflare’s edge network that implements the [Oblivious HTTP IETF](https://www.ietf.org/archive/id/draft-thomson-http-oblivious-01.html) standard to improve client privacy when connecting to an application backend.

OHTTP introduces a trusted third party between client and server, called a relay, whose purpose is to forward requests from client to server, and likewise to forward responses from server to client. These messages are encrypted between client and server such that the relay learns nothing of the application data, beyond the server the client is interacting with.

---

## Availability

Privacy Gateway is currently in closed beta – available to select privacy-oriented companies and partners. If you’re interested, [contact us](https://www.cloudflare.com/lp/privacy-edge/).

---

## Features

{{<feature header="Make your first API request" href="/radar/get-started/first-request/" cta="Make your first API request">}}
Start learning how to use Radar's API by making your first request.
{{</feature>}}

{{<feature header="Compare data" href="/radar/get-started/making-comparisons/" cta="Compare data">}}
What to know before making comparisons between locations, [autonomous systems](https://www.cloudflare.com/en-gb/learning/network-layer/what-is-an-autonomous-system/) and more.
{{</feature>}}

--- 

## Limitations

End users should be aware that Cloudflare cannot ensure that websites and services will not send identifying user data from requests forwarded through the Privacy Gateway. This includes - for example - names, email addresses, and phone numbers. 