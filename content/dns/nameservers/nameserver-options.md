---
pcx_content_type: how-to
title: Nameserver options
weight: 3
---

# Nameserver options

## Assignment method

When you add a domain on a full or secondary setup, Cloudflare automatically assigns your nameservers.

The [default assignment method](/dns/zone-setups/reference/nameserver-assignment/) is to use standard nameservers and favor consistent nameserver names across all zones within an account. Nonetheless, in case there are conflicts - for example, if someone else has already added the same zone to a different account - you may get different nameserver names.

To have control over what nameservers are assigned for different zones within an account, you can use [account custom nameservers](/dns/nameservers/custom-nameservers/account-custom-nameservers/).

### DNS zone defaults

If you have an Enterprise account, you also have the option to configure your own [DNS zone defaults](/dns/additional-options/dns-zone-defaults/) and change how Cloudflare handles nameserver assignment when you add a new zone to your account:

- Standard nameservers randomized: instead of attempting consistency, Cloudflare assigns random pairs of nameservers names every time you add a new domain to your account.
- Advanced nameservers: Cloudflare uses the same method as the default - trying to keep nameserver names consistent for different zones within an account - but uses the specific Foundation DNS nameservers.
- Account custom nameservers: You specify a set of account custom nameservers that you have previously configured for your account and Cloudflare automatically assigns them during new zone creation.

## Multi-provider DNS

Multi-provider DNS is an optional setting for zones using [full setup](/dns/zone-setups/full-setup/) and is an enforced default behaviour for zones using [secondary setup](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/).

When you enable multi-provider DNS on a primary (full setup) zone:
- Cloudflare will no longer ignore `NS` records created on the zone apex. This means that responses to DNS queries made to the zone apex and requesting `NS` records will contain both Cloudflare's and your other DNS providers' nameservers.
- Cloudflare will activate a primary (full setup) zone even if its nameservers listed in the registrar include nameservers from other DNS providers.

{{<Aside type="warning">}}
If you choose this option, you should also make sure to set up [multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/).
{{</Aside>}}

## NS record TTL

For both Cloudflare nameservers (standard or advanced) and custom nameservers, the `NS` record time-to-live (TTL) is controlled by the specific setting you find in **DNS** > **Records**.

The default TTL is 24 hours (or 86,400 seconds), but you have the option to lower this value depending on your needs. Shorter TTLs can be useful when you are changing nameservers or migrating a zone, for example. Accepted values range from 30 to 86,400 seconds.

This setting can also be configured as a [DNS zone default](/dns/additional-options/dns-zone-defaults/), meaning new zones created in your account will automatically start with the value defined by you.