---
pcx_content_type: how-to
title: Zone defaults
weight: 3
---

# Configure DNS zone defaults

While there are default values for DNS settings that Cloudflare applies to all new zones, Enterprise accounts have the option to configure their own DNS zone defaults according to their preference.

{{<Aside type="warning">}}
These settings are only applied at the moment a new zone is created. Editing DNS zone defaults will not impact already existing zones and any of the values specified as default can later be adjusted on the respective **DNS > Settings** or **DNS** > **Records** for each zone.
{{</Aside>}}

## Steps

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations** > **DNS Settings**.
3. For **DNS zone defaults**, select (TBD)**Configure defaults**.

The values you select for the listed settings will be automatically applied to new zones as you add them to the respective Cloudflare account.

## Available settings

- Nameserver assignment: Select your preferred nameserver type or assignment method that you want Cloudflare to use for your new zones. This setting applies both to primary zones ([full setup](/dns/zone-setups/full-setup/)) and [secondary zones](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/).

For primary zones:

- Multi-provider DNS: Control whether or not Cloudflare will consider `NS` records you add on the zone apex and if zones that contain external nameservers listed in the registrar will be activated.
- NS record TTL: Control how long, in minutes, your nameserver (`NS`) records are cached. The default time-to-live (TTL) is 24 hours. This setting applies both to Cloudflare nameservers and [custom nameservers](/dns/nameservers/custom-nameservers/).
- SOA record: Adjust values for the Start of Authority ([SOA](/dns/manage-dns-records/reference/dns-record-types/#soa)) record that Cloudflare creates for your zone.

For secondary zones:

- [Secondary DNS override](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/): Enable the option use Cloudflare [proxy](/dns/manage-dns-records/reference/proxied-dns-records/) and add `CNAME` records at your zone apex.

{{<Aside type="note">}}
Multi-provider DNS does not apply as a setting for secondary zones, as this is already a required behaviour for this setup.
{{</Aside>}}