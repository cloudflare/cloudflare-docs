---
title: Add a site
pcx_content_type: tutorial
---

# Add site to Cloudflare

When you add a site to Cloudflare, you need to create a new domain within Cloudflare and then perform additional steps to activate that domain.

{{<Aside type="note">}}

These instructions are tailored to customers using a full setup for Cloudflare DNS (the most common configuration). If you are using a [partial setup](/dns/zone-setups/partial-setup/) or [secondary setup](/dns/zone-setups/zone-transfers/), your setup process will be different.

{{</Aside>}}

## Prerequisites

To use Cloudflare, you need to own a domain (`example.com`).

If you do not already own a domain name and plan to use Cloudflare for your [authoritative DNS](/dns/zone-setups/full-setup/), we highly recommend purchasing your domain name through [Cloudflare Registrar](/registrar/get-started/register-domain/).

Using Cloudflare Registrar simplifies your setup process by automatically using Cloudflare for authoritative DNS.

{{<render file="_disable_dnssec.md" productFolder="dns" >}}

## 1 — Add site in Cloudflare

{{<render file="_add-site.md" productFolder="fundamentals" >}}

## 2 — Update nameservers

{{<render file="_update-nameservers.md" productFolder="fundamentals" >}}

## 3 — Complete SSL/TLS setup

To prevent insecure connections and visitor browser errors, [enable SSL/TLS protection](/ssl/get-started/).

## 4 — Go beyond the basics

For suggestions and guidance about getting the most out of your Cloudflare account, refer to our [Fundamental Tasks](/fundamentals/basic-tasks/).
