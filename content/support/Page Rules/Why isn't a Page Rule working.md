---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200172356-Why-isn-t-a-Page-Rule-working-
title: Why isn't a Page Rule working
---

# Why isn't a Page Rule working?



The number one reason that a Page Rule isn't working, such as URL forwarding, is that the Page Rule you created is on a record that is not proxied by Cloudflare in your [DNS settings](/dns/manage-dns-records/how-to/create-dns-records/).

Example: You have a Page Rule that redirects a subdomain (`subdomain.yoursitename.com`) back to your apex domain (`yoursitename.com`). If you do not have that record proxied in your DNS settings for the subdomain record (orange cloud), Cloudflare's proxy is not running over the record and a Page Rule will not work because it is going direct to your server.

Also refer to: [Page Rules tutorial](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/)
