---
pcx_content_type: reference
title: Connection Limits
---

# Connection Limits

When `HTTP/HTTPS` traffic is [proxied through cloudflare](/fundamentals/concepts/how-cloudflare-works/#how-cloudflare-works-as-a-reverse-proxy), there are often two established connections: the first is between the requesting client to Cloudflare and the second is between Cloudflare and the origin server. Each connection has their own set of TCP and HTTP limits, which are documented below. 

## Between client and Cloudflare

| Type  | Limit (seconds) | Error at limit | Configurable | 
| ---  | --- | --- | --- | 
| Connection Keep-Alive HTTP/1.1 |  400 | [499](/support/troubleshooting/http-status-codes/4xx-client-error/#499-client-close-request) | No |
| Connection Idle HTTP/2 | 400 | [499](/support/troubleshooting/http-status-codes/4xx-client-error/#499-client-close-request) | No |


## Between Cloudflare and origin

{{<Aside type="note">}}
If you are using [Cloudflare tunnels](/cloudflare-one/connections/connect-networks/), refer to [origin configurations](/cloudflare-one/connections/connect-networks/configure-tunnels/origin-configuration/) to see or modify your connection settings. 
{{</Aside>}}

| Type  | Limit (seconds) | Error at limit | [Configurable](/fundamentals/reference/timeouts/#configurable-limits) | 
| ---  | --- | --- | --- | 
| {{<glossary-tooltip term_id="TCP three-way handshake">}}Complete TCP Connection{{</glossary-tooltip>}} | 15 | [522](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-522-connection-timed-out) | No | 
| TCP ACK Timeout | 90 | [522](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-522-connection-timed-out) | No | 
| {{<glossary-tooltip term_id="TCP Keep-Alive">}}TCP Keep-Alive{{</glossary-tooltip>}} Interval | 30 | [520](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-520-web-server-returns-an-unknown-error) | No | 
| {{<glossary-tooltip term_id="Idle connection">}}Proxy Idle Timeout{{</glossary-tooltip>}} | 900 | [520](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-520-web-server-returns-an-unknown-error) | No | 
| {{<glossary-tooltip term_id="Proxy read timeout">}}Proxy Read Timeout{{</glossary-tooltip>}} | 100 | [524](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-524-a-timeout-occurred) | Yes | 
| {{<glossary-tooltip term_id="Proxy write timeout">}}Proxy Write Timeout{{</glossary-tooltip>}} | 30 | [524](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-524-a-timeout-occurred) | No | 
| HTTP/2 Pings to Origin | Off | N/A | Yes | 
| {{<glossary-tooltip term_id="Idle connection">}}HTTP/2 Connection Idle{{</glossary-tooltip>}} | 900 |  No | No | 

## Configurable limits

Some TCP connections can be customized for Enterprise customers. Reach out to your account team for more details.

## Keep-Alives

Cloudflare maintains keep-alive connections to improve performance and reduce cost of recurring TCP connects in the request transaction as Cloudflare proxies customer traffic from its edge network to the site’s origin.

Ensure HTTP keep-alive connections are enabled on your origin. Cloudflare reuses open TCP connections for up to 15 minutes (900 seconds) after the last HTTP request. Origin web servers close TCP connections if too many are open. HTTP keep-alive helps avoid connection resets for requests proxied by Cloudflare.