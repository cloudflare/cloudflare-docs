---
pcx_content_type: how-to
title: Account level
weight: 4
meta:
  title: Account-level custom nameservers
  description: With account-level custom nameservers, you can use the same custom nameservers for different zones in the account. The domain or domains that provide the nameservers names do not have to exist as zones in Cloudflare.
---

# Account custom nameservers

{{<render file="_acns-tcns-intro.md" withParameters="Account;;A;;account;;zones;;account " >}}

## Configuration conditions

For this configuration to be possible, a few conditions apply:

{{<render file="_acns-tcns-conditions.md" withParameters="account;;you;;You" >}}

{{<render file="_acns-tcns-byoip.md" withParameters="Account;;account" >}}

## Cloudflare Registrar

If you are using [Cloudflare Registrar](/registrar/) for the zone that provides the ACNS names, you have a different setup process.

### Add account custom nameservers

1. Create account custom nameservers with a [POST command](/api/operations/account-level-custom-nameservers-add-account-custom-nameserver), following the [conditions](#configuration-conditions) for `ns_name` and `ns_set`.

{{<render file="_ns-set-omission-callout.md">}}

2. [Contact Cloudfare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) to add glue records to your ACNS and update your nameservers.
3. To enable the ACNS on existing zones, use a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) on each zone. Cloudflare will assign an IPv4 and an IPv6 address to each ACNS name and automatically create the associated `A` or `AAAA` records.

{{<render file="_ns-set-omission-callout.md">}}

To make these ACNS the default nameservers for all new zones added to your account from now on, use the [Update Account endpoint](/api/operations/accounts-update-account) and set the value of `default_nameservers` to `custom.account`.

### Remove account custom nameservers

To remove ACNS and their associated DNS records from a zone, use a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata).

## Non-Cloudflare Registrar

If you are **not** using [Cloudflare Registrar](/registrar/) for the zone that provides the ACNS names, you have to set the glue records yourself.

### Add account custom nameservers

1. Create account custom nameservers with a [POST command](/api/operations/account-level-custom-nameservers-add-account-custom-nameserver), following the [conditions](#configuration-conditions) for `ns_name` and `ns_set`.

{{<render file="_ns-set-omission-callout.md">}}

2. Add the account custom nameservers and IP addresses to your domain's registrar as [glue (A and AAAA) records](https://www.ietf.org/rfc/rfc1912.txt). If you do not add these records, DNS lookups for your domain will fail.
3. To enable the ACNS on existing zones:

    1.  Use a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) on each zone. Cloudflare will assign an IPv4 and an IPv6 address to each ACNS name and automatically create the associated `A` or `AAAA` records.
    
    {{<render file="_ns-set-omission-callout.md">}}
    
    2.  Update the nameservers at the registrar to use the account custom nameserver names.

To make these ACNS the default namerservers for all new zones added to your account from now on, use the [Update Account endpoint](/api/operations/accounts-update-account) and set the value of `default_nameservers` to `custom.account`.

### Remove account custom nameservers

To remove ACNS and their associated DNS records from a zone, modify the domain's registrar to use your regular Cloudflare branded nameservers and then send a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) to the Cloudflare API.