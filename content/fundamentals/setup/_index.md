---
pcx_content_type: how-to
title: Setup
weight: 2
meta:
  title: Set up Cloudflare
---

# Set up Cloudflare

To get the [security, performance, and reliability benefits]((/fundamentals/concepts/how-cloudflare-works/)) of Cloudflare, you need to set up Cloudflare on your domain:

1. [Create your account]((/fundamentals/setup/account-setup/)): Create a new account with Cloudflare and adjust account settings as needed.
2. [Minimize downtime]((/fundamentals/basic-tasks/minimize-downtime/))(*for some*): If your domain is particularly sensitive to downtime, review our suggestions to avoid it.
2. [Add a site]((/fundamentals/setup/account-setup/add-site/)): Add and activate a new domain to use Cloudflare.
3. [Allow Cloudflare IP addresses]((/fundamentals/setup/allow-cloudflare-ip-addresses/)) (*for some*): If you control your [origin server](https://www.cloudflare.com/learning/cdn/glossary/origin-server/) and plan on using [Cloudflare's proxy](/dns/manage-dns-records/reference/proxied-dns-records/), you should review your server configuration to make sure you are not accidentally blocking Cloudflare IP addresses.
4. [Optimize site setup](/fundamentals/basic-tasks/): Once your site is activated on Cloudflare, you can improve site speed and SEO, build out layers of application security, and more.

{{<render file="_pointer-to-workers-zt-docs.md">}}