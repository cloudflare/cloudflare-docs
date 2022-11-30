---
pcx_content_type: reference
title: Browser Isolation with firewall
weight: 8
---

# Browser Isolation with firewall

If your organization uses a firewall or other policies to restrict Internet traffic, you may need to make a few changes to allow Browser Isolation to connect.

## Remoting client

Isolated pages are served by the remoting client. This client communicates to Cloudflare's network via HTTPS and WebRTC.

### Remoting Client (Services)

The remoting client provides static assets and API endpoints. For Browser Isolation to function, you must allow:

- HTTPS traffic to `*.browser.run` on port `443`

#### Clientless Web Isolation

Users connecting through Clientless Web Isolation also require connectivity to Cloudflare Access. For users to connect to Access, you must allow:

- HTTPS traffic to `https://<team-name>.cloudflareaccess.com` on port `443`

### WebRTC channel

Browser Isolation uses WebRTC for low-latency communication between the local browser and the remote browser. 

In order to pass WebRTC traffic, the remoting client must be able to connect to the following IP addresses:

- IPv4 Range: `162.159.201.10 - 162.159.201.255`
- IPv6 Range: `2606:4700:f2::/48`

{{<Aside type="note">}}
WebRTC traffic does not flow through proxies specified in local browser HTTP/HTTPS proxy settings. The connecting device needs to be able to directly connect to the WebRTC IP ranges.
{{</Aside>}}