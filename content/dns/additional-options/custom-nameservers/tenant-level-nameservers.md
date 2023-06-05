---
pcx_content_type: how-to
title: Tenant level
weight: 5
meta:
  title: Tenant-level custom nameservers
  description: With tenant-level custom nameservers, you can use the same custom nameservers for different zones and across different accounts, as long as the accounts are part of the [tenant](/tenant/). The domain that provides the nameservers names does not have to exist as a zone within any account in Cloudflare.
---

# Tenant custom nameservers

Tenant custom nameservers (TCNS) can be part of any domain, even if the domain does not exist as a zone within any account in Cloudflare. These nameservers are organized in different sets (`ns_set`) and can be applied and used across different accounts, as long as the accounts are part of the [tenant](/tenant/).

## Configuration conditions

For this configuration to be possible, a few conditions apply:

{{<render file="_acns-tcns-conditions.md" withParameters="tenant;;the tenant owner;;Tenant owners" >}}

{{<render file="_acns-tcns-byoip.md" withParameters="Tenant;;tenant" >}}

## Enable tenant custom nameservers on a zone

If you are an account owner and your account is part of a tenant that has custom nameservers, you can enable the TCNS on your zones by using a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) and specifying `ns_type` and `ns_set`.

``` bash
curl -- request PUT "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/custom_ns" \
  -- header "X-Auth-Email: <EMAIL>" \
  -- header "X-Auth-Key: <KEY>" \
  -- header "Content-Type: application/json" \
  -- data '{
     "enabled":true,
     "ns_type":"tenant",
     "ns_set": <SET>
     }'
```

{{<Aside>}}
If the parameter `ns_type` is omitted, the default type `account` will be assigned.
If the parameter `ns_set` is omitted, the default set `1` will be assigned.
{{</Aside>}}

## Make tenant custom nameservers default for new zones

To make TCNS the default nameservers for all new zones added to your account from now on, use a [PUT command](/api/operations/accounts-update-account) on your account with the following parameters.

``` bash
curl -- request PUT “https://api.cloudflare.com/client/v4/accounts/{account_id}” \
  -- header "X-Auth-Email: <EMAIL>" \
  -- header "X-Auth-Key: <KEY>" \
  -- header "Content-Type: application/json" \
  -- data '{
     "settings": {
      "default_nameservers":"custom.tenant"
      }
     }'
```