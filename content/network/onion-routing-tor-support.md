---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/203306930-Understanding-Cloudflare-Tor-support-and-Onion-Routing
title: Onion Routing and Tor support
---

# Onion Routing and Tor support

Due to the behavior of some individuals using the Tor network (spammers, distributors of malware, attackers, etc.), the IP addresses of Tor exit nodes may earn a bad reputation, elevating their Cloudflare threat score.

Our [basic protection level](https://support.cloudflare.com/hc/articles/200170056) issues challenges to visitors whose IP address has a high threat score, depending on the level chosen by the Cloudflare customer. The choices for security range from Essentially Off to I'm Under Attack. The default level is Medium.

Cloudflare assigns the two-letter code _T1_ for Tor.  There's no geographical country associated with these IPs, but this approach lets Cloudflare customers override the default Cloudflare threat score to define the experience for their Tor visitors.  Cloudflare updates its list of Tor exit node IP addresses every hour.

## Availability

{{<feature-table id="network.onion_routing">}}

### Onion Routing

Beyond applying firewall filters to Tor traffic, Cloudflare users can improve the Tor user experience by enabling Onion Routing.  Onion Routing allows Cloudflare to serve your website’s content directly through the Tor network, without requiring exit nodes. This improves Tor browsing as follows: 

-   Tor users no longer access your site via exit nodes, which can sometimes be compromised, and may snoop on user traffic.
-   Human Tor users and bots can be distinguished by our Onion services, such that interactive challenges are only served to malicious bot traffic. 

Toggle **Onion Routing** _On_ or _Off_ via the Cloudflare **Network** app.

[Tor Browser](https://tb-manual.torproject.org/about/) users receive an [alt-svc header](https://httpwg.org/specs/rfc7838.html#alt-svc) as part of the response to the first request to your website. The browser then creates a Tor Circuit to access this website using the `.onion` TLD service provided by this header.

You should note that the visible domain in the UI remains unchanged, as the host header and the SNI are preserved. However, the underlying connection changes to be routed through Tor, as the [UI denotes on the left of the address bar](https://tb-manual.torproject.org/managing-identities/#managing-identities) with a Tor Circuit. Cloudflare does not provide a certificate for the `.onion` domain provided as part of alt-svc flow, which therefore cannot be accessed via HTTPS.
