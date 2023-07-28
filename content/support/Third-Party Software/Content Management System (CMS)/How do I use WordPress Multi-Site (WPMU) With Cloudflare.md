---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169356-How-do-I-use-WordPress-Multi-Site-WPMU-With-Cloudflare-
title: How do I use WordPress Multi-Site (WPMU) With Cloudflare
---

# How do I use WordPress Multi-Site (WPMU) With Cloudflare?



## Overview

WPMU (WordPress Multi-User) is the earlier version of WordPress Multi-Site, which is now part of the core WordPress software.

**To use a WPMU site configuration with Cloudflare, do the following:**

1\. Add the apex domain (also known as "root domain" or "naked domain", e.g. `example.com`) to Cloudflare and point the DNS to Cloudflare, using the Cloudflare nameservers specified during the signup process and making the DNS change at your registrar.

2\. Define the wildcard subdomains in your DNS zone file during the signup process. Cloudflare cannot proxy wildcard DNS entries, so to benefit from Cloudflare performance and security, you must explicitly define any entries in your zone file as either CNAMEs or A record entries.

Note: Having a proxy run over wildcard entries is available only at the Enterprise tier of service. The information above is related to customers on other Cloudflare plans. If you are looking for Enterprise support or quotes, then please create an [Enterprise request](https://www.cloudflare.com/enterprise-service-request) via the form for a quote.

Other recommended steps:

1\. Install the [Cloudflare WordPress plugin](http://wordpress.org/extend/plugins/cloudflare/) to restore original visitor IP at the WordPress commenting level.

2\. [Restore visitor IP addresses](https://support.cloudflare.com/hc/en-us/articles/200170786) so original visitor IP is restored at your server level.
