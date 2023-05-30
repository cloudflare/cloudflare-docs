---
pcx_content_type: how-to
title: Account nameservers
weight: 4
---

# Account-level nameservers

Account-level custom nameservers can be part of any domain, even if the domain does not exist as a zone within any account in Cloudflare. These nameservers are organized in different sets (`ns_set`) and can be applied and used by different zones in the account.

## Configuration conditions

For this configuration to be possible, a few conditions apply:

1. If the domain that is used for the account custom nameservers does not exist within the same account, you must create the `A/AAAA` records on the configured nameserver names (e.g. `ns1.example.org`) at the authoritative DNS provider.
2. You can create up to five different account nameserver sets. Each nameserver set must have between two and five different nameserver names (`ns_name`) and each name cannot belong to more than one set. For example, if `ns1.example.com` is part of `ns_set 1` it cannot be part of `ns_set 2` or vice versa.
3. [Subdomain](/dns/zone-setups/subdomain-setup/) or [Reverse](/dns/additional-options/reverse-zones/) zones can use account-level custom nameservers as long as they use a different nameserver set (`ns_set`) than their parent or child.

{{<render file="_acns-tcns-byoip.md" withParameters="Account;;account-" >}}

## Cloudflare Registrar

If you are using [Cloudflare Registrar](/registrar/) for the zone that provides the names for the account-level custom nameservers, you have a different setup process.

### Add account nameservers

1. Create account-level nameservers with a [POST command](/api/operations/account-level-custom-nameservers-add-account-custom-nameserver), following the [conditions](#configuration-conditions) for `ns_name` and `ns_set`.
{{<render file="_ns-set-omission-callout.md">}}
2. Open a ticket with [customer support](https://support.cloudflare.com/hc/articles/200172476) to add glue records to your account nameservers and have your nameservers updated.
3. To enable the custom nameservers on existing zones, use a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) on each zone. Cloudflare will assign an IPv4 and IPv6 address to each custom nameserver name and automatically create the associated `A` or `AAAA` records.
{{<render file="_ns-set-omission-callout.md">}}
To make this custom nameserver the default for all new zones, use a [PUT command](/api/operations/accounts-update-account) on an account and set the value of `default_nameservers` to `custom.account`.

### Remove account nameservers

To remove account-level nameservers and their associated DNS records from a zone, use a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata).

## Non-Cloudflare Registrar

If you are **not** using [Cloudflare Registrar](/registrar/) for the zone that provides the names for the account-level custom nameservers, you have to set the glue records yourself.

### Add account nameservers

1. Create account-level nameservers with a [POST command](/api/operations/account-level-custom-nameservers-add-account-custom-nameserver), following the [conditions](#configuration-conditions) for `ns_name` and `ns_set`.
{{<render file="_ns-set-omission-callout.md">}}
2. If you are not using Cloudflare Registrar for your domain, add the **Custom Nameservers** and IP addresses to your domain's registrar as [glue (A and AAAA) records](https://www.ietf.org/rfc/rfc1912.txt). If you do not add these records, DNS lookups for your domain will fail.
3. To enable the custom nameservers on existing zones:

    1.  Use a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) on each zone. Cloudflare will assign an IPv4 and IPv6 address to each custom nameserver name and automatically create the associated `A` or `AAAA` records.
    {{<render file="_ns-set-omission-callout.md">}}
    2.  Update the nameservers at the registrar to use the custom nameserver names.

To make this custom nameserver the default for all new zones added to your account from now on, use a [PUT command](/api/operations/accounts-update-account) on an account and set the value of `default_nameservers` to `custom.account`.

### Remove account nameservers

To remove account-level nameservers and their associated DNS records from a zone, modify the zone's registrar to use your regular Cloudflare branded nameservers and then send a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) to the Cloudflare API.