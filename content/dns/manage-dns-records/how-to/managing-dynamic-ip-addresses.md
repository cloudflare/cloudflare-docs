---
pcx_content_type: reference
title: Use dynamic IP addresses
weight: 6
---

# Use dynamic IP addresses

Most Internet service providers and some hosting providers dynamically update their customer's IP addresses. These customers must then update the new origin server IPs in their Cloudflare DNS.

## Cloudflare API

Create a script to monitor IP address changes and then have that script push changes to the [Cloudflare API](/api/operations/dns-records-for-a-zone-update-dns-record).

## ddclient

[ddclient](https://github.com/ddclient/ddclient) is a third-party Perl client used to update dynamic DNS entries for accounts on various DNS providers.

## DNS-O-Matic

[DNS-O-Matic](https://dnsomatic.com/docs/) is a third-party tool that announces dynamic IP changes to multiple services.

Configuration of DNS-O-Matic requires the following information:

- **Email**: `<CLOUDFLARE ACCOUNT EMAIL ADDRESS>` (associated account must have sufficient privileges to manage DNS)
- **API Token**: `<CLOUDFLARE GLOBAL API KEY>` (for details refer to [API Keys](/fundamentals/api/get-started/keys/))
- **Domain**: `<example.com>`
- **Hostname**: _dynamic_
