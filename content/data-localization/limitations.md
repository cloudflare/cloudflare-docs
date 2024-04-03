---
title: Limitations
pcx_content_type: reference
weight: 8
meta:
  title: Limitations
---

# Limitations

There are some caveats and limitations when deploying Data Localization Suite features.

Cloudflare is working hard to improve this offering and fill the gaps. If you have a specific feature request, please contact your [Account Team](/support/contacting-cloudflare-support/).

## Key Management

When using Geo Key Manager or Keyless SSL, some caveats may apply.

The remote procedure call from the server to the key server can add latency to the handshake, slowing down connection establishment. The additional latency cost corresponds to the round-trip time from the server to the key server, which can be as much as a second if the key server is on the other side of the world. Luckily, this latency cost only applies to the first time you connect to a server. Once the handshake is complete, the key server is not involved. Furthermore, if you reconnect to a site you do not have to pay the latency cost either because resuming a connection with TLS Session Resumption does not require the private key. Hence, latency is only added for the initial connection.

Learn more about how it works in our [blog post](https://blog.cloudflare.com/geo-key-manager-how-it-works/).

## Regional Services

When using Regional Services, some caveats and limitations may apply.

For product-specific caveats, refer to [Cloudflare product compatibility](/data-localization/compatibility/) page.

The following features and protocols are not supported by Regional Services and might not work on regionalized hostnames:

- Unencrypted HTTP (plain text) requests
- [ICMP](https://www.cloudflare.com/learning/ddos/glossary/internet-control-message-protocol-icmp/)
- [Encrypted Client Hello (ECH)](/ssl/edge-certificates/ech/)
- [Orange-to-Orange (O2O)](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/)
- [Onion Routing (Tor)](/network/onion-routing/)

Since Regional Services leverages Spectrum in the background, [Spectrum limitations](/spectrum/reference/limitations/) apply.

Regional Services does not apply to [Subrequests](/workers/platform/limits/#subrequests).

## Customer Metadata Boundary

There are certain limitations and caveats when using Customer Metadata Boundary.

Specifically most of the Zone Analytics & Logs UI Tabs will be showing up as empty, when configuring Customer Metadata Boundary to EU only. It is recommended to use the UI [Security Analytics](/waf/analytics/security-analytics/) instead, or the [HTTP request](/logs/reference/log-fields/zone/http_requests/) logs via [Logpush](/logs/about/).

For product-specific caveats, refer to [Cloudflare product compatibility](/data-localization/compatibility/) page.