---
pcx_content_type: how-to
title: Zone defaults
weight: 3
---

# Configure DNS zone defaults

While there are default values for DNS settings that Cloudflare applies to all new zones, Enterprise accounts have the option to configure their own DNS zone defaults according to their preference.

## Steps

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations** > **DNS Settings**.
3. For **DNS zone defaults**, select (TBD)**Configure defaults**.

The values you select for the listed settings will be automatically applied to new zones as you add them to the respective Cloudflare account.

## Available settings

- Nameserver assignment: Select your preferred nameserver type or assignment method that you want Cloudflare to use for your new zones.
- Multi-provider DNS: Control whether or not Cloudflare will consider `NS` records you add on the zone apex when responding to DNS queries made to the zone apex and requesting `NS` records.
- NS record TTL: Control how long, in minutes, Cloudflare nameservers are cached. The default time-to-live (TTL) is 24 hours.
- SOA record: Adjust values for the Start of Authority ([SOA](/dns/manage-dns-records/reference/dns-record-types/#soa)) record that Cloudflare creates for your zone.

For secondary zones, you also have the option to select the status (TBD)(`on`/`off`) for [Secondary DNS override](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/).