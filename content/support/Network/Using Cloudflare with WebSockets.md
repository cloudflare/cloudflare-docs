---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169466-Using-Cloudflare-with-WebSockets
title: Using Cloudflare with WebSockets
---

# Using Cloudflare with WebSockets



## Overview

WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming.

___

## What plan do I need for WebSockets support on my site?

{{<feature-table id="network.websockets">}}

___

## How can I use WebSockets with Cloudflare?

No additional configuration is required to send WebSockets traffic through Cloudflare. Cloudflare will immediately begin proxying your WebSockets through to your origin.

___

## Why are these volume limits not specific numbers?

Cloudflare powers several high-volume, mission critical WebSockets applications for Enterprise customers.

Since [introducing WebSockets support](https://blog.cloudflare.com/cloudflare-now-supports-websockets/) in 2014, Cloudflare has nearly tripled its network map, going from 28 locations to over 150 (as mid-2018). In all locations, we've added compute resources and multiple Tier 1 bandwidth providers.

We're confident in our ability to offer WebSockets to all our customers now, but we're also thoughtful about allocating resources – including WebSockets connections – by plan level. So, we're starting with guidelines, and we'll learn from our customers' adoption.

We enable modern technologies which make the Internet better. The best way to do that is let customers play, grow, and thrive.

___

## Can I use WebSockets over SSL?

Yes, Cloudflare SSL fully supports WebSockets traffic passing through our network.

___

## Do Cloudflare Workers support proxying WebSockets?

Yes, Cloudflare Workers support proxying WebSockets. However, it currently does not support:

-   Manipulating or modifying individual messages

Cloudflare Workers also supports terminating (acting as an endpoint for) WebSockets sessions using [Durable Objects](/durable-objects/).

___

## Does the Cloudflare Web Application Firewall (WAF) work with WebSockets?

The initial HTTP 101 request is subject to the WAF, rate limiting, and other firewall features just like any any other WebSockets connection. However, once a connection has been established the WAF does not perform any further inspections.

___

## What happens if my site exceeds the number of concurrent WebSockets connections that Cloudflare expects?

Immediately, nothing. Cloudflare will allow occasional spikes in usage beyond our guidelines and we will not apply unnecessary limits.

Repeated spikes or high continued usage will prompt a dialogue: we'll reach out to learn more about your application. We will not impose limit errors for any application without contacting the customer unless we suspect that abuse or an attack is involved.

Customers whose usage claims a disproportionate percentage of resources for their current plan level may be asked to upgrade to the plan level that matches their needs.

___

## Technical note

When Cloudflare releases new code to its global network, we may restart servers, which terminates WebSockets connections.
