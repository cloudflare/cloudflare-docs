---
title: Limitations
order: 3
pcx-content-type: reference
---

# Limitations for Universal SSL

Universal SSL certificates are limited by the hostnames they cover and the browsers they support.

## Hostname coverage

### Full setup

Universal SSL certificates only support SSL for the root or first-level subdomains such as `example.com` and `www.example.com`. To enable SSL support on second, third, and fourth-level subdomains such as `dev.www.example.com` or `app3.dev.www.example.com`, you can:

- Purchase [Advanced Certificate Manager](../../advanced-certificate-manager)
- Upgrade to a Business or Enterprise plan to [upload a Custom SSL certificate](../../custom-certificates)

### CNAME setup

On a CNAME setup zone, each subdomain has its own Universal SSL certificate and does not require additional features or purchases.

## Browser support

For more on browser support, see [Browser compatibility](/ssl-tls/browser-compatibility).