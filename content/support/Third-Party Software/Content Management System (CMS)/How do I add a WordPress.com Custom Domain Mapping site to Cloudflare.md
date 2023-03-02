---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168886-How-do-I-add-a-WordPress-com-Custom-Domain-Mapping-site-to-Cloudflare-
title: How do I add a WordPress.com Custom Domain Mapping site to Cloudflare
---

# How do I add a WordPress.com Custom Domain Mapping site to Cloudflare?

## How do I add a WordPress.com Custom Domain Mapping site to Cloudflare?

Please read the [WordPress documentation](https://wordpress.com/support/domains/connect-existing-domain/) first. You will still have to change to the Cloudflare nameservers at the registrar for your domain in order for the site site to point to Cloudflare (these will be assigned when you add the domain to Cloudflare and go through the registration steps). You will need to make the changes below in your Cloudflare DNS settings for the domain.

1.  The default scanning process from Cloudflare will pick up multiple A records for your domain. Delete the A records for the domain.
    -   **Important**: You do not want to delete other records, such as mail, MX, etc.). You would only want to delete the multiple A records for the domain that look like: A example.com IP address
2.  Create a CNAME record that points your domain to lb.wordpress.com. The CNAME record would look like: CNAME example.com is an alias of lb.wordpress.com

For additional instructions, refer to [Managing DNS records](https://support.cloudflare.com/hc/articles/200168756).
