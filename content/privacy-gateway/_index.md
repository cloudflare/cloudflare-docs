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

{{<plan type="enterprise">}}

[Privacy Gateway](https://blog.cloudflare.com/building-privacy-into-internet-standards-and-how-to-make-your-app-more-private-today/) is a managed gateway service deployed on Cloudflare’s edge network that implements the [Oblivious HTTP IETF](https://www.ietf.org/archive/id/draft-thomson-http-oblivious-01.html) standard to improve client privacy when connecting to an application backend.

OHTTP introduces a trusted third party between client and server, called a relay, whose purpose is to forward requests from client to server, and likewise to forward responses from server to client. These messages are encrypted between client and server such that the relay learns nothing of the application data, beyond the server the client is interacting with.

---

## Availability

Privacy Gateway is currently in closed beta – available to select privacy-oriented companies and partners. If you’re interested, [contact us](https://www.cloudflare.com/lp/privacy-edge/).

---

## Features

{{<feature header="Get started" href="/privacy-gateway/get-started/" cta="Get started">}}
Learn how to set up Privacy Gateway for your application.
{{</feature>}}

{{<feature header="About" href="/privacy-gateway/about/" cta="Learn more">}}
Learn about the different parties and data shared in Privacy Gateway.
{{</feature>}}