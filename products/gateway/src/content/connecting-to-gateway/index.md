---
order: 3
---

# Connecting to Gateway

Users can secure their internet-bound traffic by connecting to Gateway in two ways: 

1. [With the Cloudflare WARP client](/gateway/connecting-to-gateway/with-client). Users download the latest version for their operating system and configure the client to send DNS queries to Gateway for policy enforcement. Customers with subscriptions that support HTTP traffic filtering can enroll their users and devices in their Gateway organization through the client and configure L7 firewall rules to enforce HTTP policies in the L7 cloud firewall. 

2. [Without the Cloudflare WARP client](/gateway/connecting-to-gateway/without-client). Cloudflare Gateway supports a variety of client configurations and operating systems as well as DNS over HTTPS. Users configure their native operating system or browser to use Cloudflare Gateway as their upstream recursive resolver for DNS policy enforcement.