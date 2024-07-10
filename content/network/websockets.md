---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/200169466-Using-Cloudflare-with-WebSockets
title: WebSockets
---

# WebSockets

Cloudflare supports proxied WebSocket connections without additional configuration.

## Availability

{{<feature-table id="network.websockets">}}

## Background

WebSockets are open connections sustained between the client and the origin server. Inside a WebSockets connection, the client and the origin can pass data back and forth without having to reestablish sessions. This makes exchanging data within a WebSockets connection fast. WebSockets are often used for real-time applications such as live chat and gaming.

## Enable WebSockets

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **WebSockets** connections to your origin server in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **Network**.
3.  For **WebSockets**, switch the toggle to **On**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable **WebSockets** connections to your origin server with the API, send a [`PATCH`](/api/operations/zone-settings-edit-single-setting) request with `websockets` as the setting name in the URI path, and the `value` parameter set to `"on"`.

{{</tab>}}
{{</tabs>}}

## Compatibility notes

| Product | Compatible | Notes |
| --- | --- | --- |
| [SSL](/ssl/) | Yes |
| [WAF](/waf/) | Yes* | The initial HTTP 101 request is subject to WAF managed rules, custom rules, rate limiting rules, and other WAF features like any other WebSockets connection. However, once a connection has been established, the WAF does not perform any further inspections. |
| [Workers](/workers/examples/websockets/) | Yes | You can also use [Durable Objects](/durable-objects/) as an endpoint for WebSocket sessions, giving you full control over messages sent to and from clients. |

{{<Aside type="note">}}

Cloudflare also supports [ASP.NET SignalR](http://signalr.net/), which helps negotiate which transport method to use (long polling or WebSockets).

{{</Aside>}}

## What happens if my site exceeds the number of concurrent WebSockets connections that Cloudflare expects?

Immediately, nothing. Cloudflare will allow occasional spikes in usage beyond our guidelines and we will not apply unnecessary limits.

Repeated spikes or high continued usage will prompt a dialogue. Cloudflare will reach out to learn more about your application. We will not impose limit errors for any application without contacting the customer unless we suspect that abuse or an attack is involved.

Customers whose usage claims a disproportionate percentage of resources for their current plan level may be asked to upgrade to the plan level that matches their needs.

## Technical note

When Cloudflare releases new code to its global network, we may restart servers, which terminates WebSockets connections.

### Best practises

- Implement a [keepalive](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#pings_and_pongs_the_heartbeat_of_websockets).
- Review and then remove or extend timeout settings on the origin and/or on the client.

### Troubleshooting

Investigating issues with Websocket can be facilitated with client tools like [wscat](https://github.com/websockets/wscat).
Being able to reproduce an issue on a single URL with a minimalistic tool helps narrowing down the issue.
