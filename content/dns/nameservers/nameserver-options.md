---
pcx_content_type: how-to
title: Nameserver options
weight: 2
---

# Nameserver options

## Assignment method

## Multi-provider DNS

Multi-provider DNS is an option for zones using full setup and is an enforced default behaviour for zones in secondary setup.

Without enabling this setting, Cloudflare will ignore any `NS` records created on the zone apex. This means that responses to DNS queries made to the zone apex and requesting NS records will only contain Cloudflare nameservers.

Also, primary (full setup) zones that contain external nameservers listed in the registrar will only be activated if this settings is enabled.

If you choose this option, you should also make sure to have a compatible multi-signer DNSSEC set up.

## NS record TTL