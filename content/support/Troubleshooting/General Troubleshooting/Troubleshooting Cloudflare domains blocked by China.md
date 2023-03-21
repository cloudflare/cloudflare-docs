---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169566-Troubleshooting-Cloudflare-domains-blocked-by-China
title: Troubleshooting Cloudflare domains blocked by China
---

# Troubleshooting Cloudflare domains blocked by China



## Overview

To confirm the Cloudflare IPs associated with your domain are blocked in China, provide the following details to [Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476):

-   A [traceroute to your domain](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) from a location in China to demonstrate the network path. 
-   The results from the [Great Firewall Checker](http://www.greatfirewallofchina.org/).
-   DNS resolution response for the domain from a location in China.  Consider using a tool like [DNS Checker](https://dnschecker.org/).
-   The type of content hosted on your site.  China does censor certain content including pornography, gambling, and specific types of political discussion.

{{<Aside type="note">}}
Cloudflare Support can only confirm if a domain is blocked by China and
has no control over unblocking.
{{</Aside>}}
