---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/203306930-Understanding-Cloudflare-Tor-support-and-Onion-Routing
title: Understanding Cloudflare Tor support and Onion Routing
---

# Understanding Cloudflare Tor support and Onion Routing



## Overview

Due to the behavior of some individuals using the Tor network (spammers, distributors of malware, attackers, etc.), the IP addresses of Tor exit nodes may earn a bad reputation, elevating their Cloudflare threat score.

Our [basic protection level](https://support.cloudflare.com/hc/articles/200170056) issues challenges to visitors whose IP address has a high threat score, depending on the level chosen by the Cloudflare customer. The choices for security range from Essentially Off to I'm Under Attack. The default level is Medium.

Cloudflare assigns the two-letter code _T1_ for Tor.  There's no geographical country associated with these IPs, but this approach lets Cloudflare customers override the default Cloudflare threat score to define the experience for their Tor visitors.  Cloudflare updates its list of Tor exit node IP addresses every hour.

### Onion Routing

Beyond applying firewall filters to Tor traffic, Cloudflare users can improve the Tor user experience by enabling Onion Routing.  Onion Routing allows Cloudflare to serve your website’s content directly through the Tor network, without requiring exit nodes. This improves Tor browsing as follows: 

-   Tor users no longer access your site via exit nodes, which can sometimes be compromised, and may snoop on user traffic.
-   Human Tor users and bots can be distinguished by our Onion services, such that interactive challenges are only served to malicious bot traffic. 

Toggle **Onion Routing** _On_ or _Off_ via the Cloudflare **Network** app.
