---
order: 1
pcx-content-type: how-to
---

# Custom nameservers

With custom (or vanity) nameservers, a domain can use Cloudflare DNS without using the hostnames of Cloudflare-assigned nameservers. For instance, you can configure `ns1.example.com` and `ns2.example.com` as nameservers for `example.com`.

<Aside type="note">

When using [subdomain support](https://support.cloudflare.com/hc/articles/360026440252), a parent and child zone cannot share the same nameserver names.

</Aside>

## Availability

Cloudflare domains on Business or Enterprise plans can set Custom Nameservers at Cloudflare:

- Enterprise plans:
    - Create account-level nameservers via the [API](https://api.cloudflare.com/#account-level-custom-nameservers-properties)
    - Create zone-level nameservers via the dashboard or [API](https://api.cloudflare.com/#zone-edit-zone)
- Business plans:
    - Create account-level nameservers via the [API](https://api.cloudflare.com/#account-level-custom-nameservers-properties) (after [contacting Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476))
    - Create zone-level nameservers via the dashboard or [API](https://api.cloudflare.com/#zone-edit-zone)

## Account-level nameservers

Once you configure account-level custom nameservers, these nameservers can be applied and used by any zones in that account. 

<Aside type="note">

When you choose the names for your account-level nameservers, each hostname must be a subdomain of a zone that is part of your Cloudflare account and on a Business plan or higher.

</Aside>

### Cloudflare Registrar

If you are using [Cloudflare Registrar](https://developers.cloudflare.com/registrar) for the zone that provides the hostnames for the account-level custom nameservers:

1. Create between two and five account-level nameservers with a [POST command](https://api.cloudflare.com/#account-level-custom-nameservers-add-account-custom-nameserver).
1. Cloudflare creates the [glue records](https://www.ietf.org/rfc/rfc1912.txt) automatically.
1. To enable the custom nameservers on existing zones:
    1. Use a [PUT command](https://api.cloudflare.com/#account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) on each zone.
    1. Modify the zone's registrar to use the custom nameserver names.

To make this custom nameserver the default for all new zones, use a [PUT command](https://api.cloudflare.com/#accounts-update-account) on an account and set the value of `use_account_custom_ns_by_default` to `true`.

### Non-Cloudflare Registrar

If you are **not** using [Cloudflare Registrar](https://developers.cloudflare.com/registrar) for the zone that provides the hostnames for the account-level custom nameservers:

1. Create between two and five account-level nameservers with a [POST command](https://api.cloudflare.com/#account-level-custom-nameservers-add-account-custom-nameserver).
1. Add the [glue records](https://www.ietf.org/rfc/rfc1912.txt) for each entry at your DNS provider.
1. Use a [POST command](https://api.cloudflare.com/#account-level-custom-nameservers-verify-account-custom-nameserver-glue-records) to verify that the glue records are active.
1. To enable the custom nameservers on existing zones:
    1. Use a [PUT command](https://api.cloudflare.com/#account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) on each zone.
    1. Modify the zone's registrar to use the custom nameserver names.

To make this custom nameserver the default for all new zones added to your account from now on, use a [PUT command](https://api.cloudflare.com/#accounts-update-account) on an account and set the value of `use_account_custom_ns_by_default` to `true`.

## Zone-level nameservers

When you choose the names for your zone-level nameservers, each hostname must be a subdomain of the zone this is configured for.

### Using the dashboard

To add custom nameservers to a specific zone:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
1. Go to **DNS**.
1. On **Custom Nameservers**, click **Add Custom Nameservers** and enter the subdomains used for the nameserver hostnames (like ns1, ns2, ns3).
1. Cloudflare will assign an IPv4 and IPv6 address to each custom nameserver hostname.
1. The next step depends on whether you are using [Cloudflare Registrar](https://developers.cloudflare.com/registrar) for your domain:
    - If you are using Cloudflare Registrar for your domain, no further action is required. Glue records will be added automatically on your behalf.
    - If you are not using Cloudflare Registrar for your domain, add the **Custom Nameservers** and IP addresses to your domain's registrar as [glue (A and AAAA) records](https://www.ietf.org/rfc/rfc1912.txt). If you do not add these records, DNS lookups for your domain will fail.

### Using the API

To add zone-level custom nameservers via the API, use a [PATCH request](https://api.cloudflare.com/#zone-edit-zone) and specify the custom nameservers in the payload:
```
"vanity_name_servers": ["ns1.example.com","ns2.example.com"]
```

## Restrictions

For both account-level and zone-level custom nameservers, you have to configure at least two custom nameservers and no more than five.
