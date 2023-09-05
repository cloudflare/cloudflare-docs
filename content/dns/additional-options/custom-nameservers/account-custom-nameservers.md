---
pcx_content_type: how-to
title: Account level
weight: 4
meta:
  title: Account custom nameservers
  description: With account-level custom nameservers, you can use the same custom nameservers for different zones in the account. The domain or domains that provide the nameservers names do not have to exist as zones in Cloudflare.
---

# Account custom nameservers

{{<render file="_acns-tcns-intro.md" withParameters="Account;;A;;account;;zones;;account " >}}

## Configuration conditions

For this configuration to be possible, a few conditions apply:

{{<render file="_acns-tcns-conditions.md" withParameters="account;;you;;You" >}}

{{<render file="_acns-tcns-byoip.md" withParameters="Account;;account" >}}

## Add account custom nameservers

1. Use the [Add Account Custom Nameserver endpoint](/api/operations/account-level-custom-nameservers-add-account-custom-nameserver) to create account custom nameservers. Follow the [conditions](#configuration-conditions) for `ns_name` and `ns_set`.

    {{<render file="_ns-set-omission-callout.md">}}

2. This step depends on whether you are using [Cloudflare Registrar](/registrar/) for the domain that provides the ACNS names:

    * If you are using Cloudflare Registrar, [contact Cloudfare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) to add glue records to your ACNS and update your nameservers.

    * If you are not using Cloudlfare Registrar, add the account custom nameservers and IP addresses to your domain's registrar as [glue (A and AAAA) records](https://www.ietf.org/rfc/rfc1912.txt). If you do not add these records, DNS lookups for your domain will fail.

3. To enable the ACNS on existing zones, use the [Set ACNS Related Zone Metadata endpoint](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) on each zone. Cloudflare will assign an IPv4 and an IPv6 address to each ACNS name and automatically create the associated `A` or `AAAA` records.

    {{<render file="_ns-set-omission-callout.md">}}
    
    * If you are not using [Cloudflare Registrar](/registrar/), also update the nameservers at your registrar to use the account custom nameserver names.

To make these ACNS the default nameservers for all new zones added to your account from now on, use the [Update Account endpoint](/api/operations/accounts-update-account) and set the value of `default_nameservers` to `custom.account`.

## Remove account custom nameservers

To remove ACNS and their associated DNS records from a zone:

  * If you are using [Cloudflare Registrar](/registrar/), use the [Set ACNS Related Zone Metadata endpoint](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) and set the `enabled` parameter to `false`.
  * If you are not using [Cloudflare Registrar](/registrar/), modify the domain's registrar to use your regular Cloudflare branded nameservers and then use the [Set ACNS Related Zone Metadata endpoint](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) to set the `enabled` parameter to `false`.