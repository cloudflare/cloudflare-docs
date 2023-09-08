---
pcx_content_type: how-to
title: Tenant level
weight: 5
meta:
  title: Tenant custom nameservers
  description: With tenant-level custom nameservers, you can use the same custom nameservers for different zones and across different accounts, as long as the accounts are part of the [tenant](/tenant/). The domain or domains that provide the nameservers names do not have to exist as zones in Cloudflare.
---

# Tenant custom nameservers

{{<render file="_acns-tcns-intro.md" withParameters="Tenant;;T;;tenant;;accounts;;[tenant](/tenant/) " >}}

## Configuration conditions

For this configuration to be possible, a few conditions apply:

{{<render file="_acns-tcns-conditions.md" withParameters="tenant;;the tenant owner;;Tenant owners" >}}

{{<render file="_acns-tcns-byoip.md" withParameters="Tenant;;tenant" >}}

## For account owners

### Enable tenant custom nameservers on a zone

If you are an account owner and your account is part of a tenant that has custom nameservers, do the following:

1. Use a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) and specify `ns_type` and `ns_set`.

``` bash
curl --request PUT https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_ns \
  --header "X-Auth-Email: <EMAIL>" \
  --header "X-Auth-Key: <KEY>" \
  --header "Content-Type: application/json" \
  --data '{
     "enabled":true,
     "ns_type":"tenant",
     "ns_set": <SET>
     }'
```

{{<Aside>}}
If the parameter `ns_type` is omitted, the default type `account` will be assigned.
If the parameter `ns_set` is omitted, the default set `1` will be assigned.
{{</Aside>}}

2. If you are **not** using [Cloudflare Registrar](/registrar/), update the nameservers at your registrar to use the TCNS names. If you are using [Cloudflare Registrar](/registrar/), no further action is needed.

To make these TCNS the default namerservers for all new zones added to your account from now on, use the [Update Account endpoint](/api/operations/accounts-update-account) and set the value of `default_nameservers` to `custom.tenant`.

### Disable tenant custom nameservers on a zone

To remove TCNS and their associated DNS records from a zone, use a [PUT command](/api/operations/account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata).

If you are **not** using [Cloudflare Registrar](/registrar/), also remove the TCNS at your domain’s registrar.

## For tenant owners

### Create tenant custom nameservers

If you are a tenant owner and you want to make TCNS available for accounts within your tenant, do the following:

1. Observe the [conditions](#configuration-conditions) for `ns_name` and `ns_set`, and create TCNS in your tenant by using the following POST command:

```bash
$ curl --request POST https://api.cloudflare.com/client/v4/tenants/{tenant_id}/custom_ns \
  --header "X-Auth-Email: <EMAIL>" \
  --header "X-Auth-Key: <KEY>" \
  --header "Content-Type: application/json" \
  --data '{
    "ns_name":"<NS_NAME>",
    "ns_set": <SET>
  }'
```

{{<render file="_ns-set-omission-callout.md">}}

### Get a list of all TCNS names

To get a list of all TCNS names in your tenant account, use the following API request:

```bash
$ curl https://api.cloudflare.com/client/v4/tenants/{tenant_id}/custom_ns \
  --header "X-Auth-Email: <EMAIL>" \
  --header "X-Auth-Key: <KEY>"
```