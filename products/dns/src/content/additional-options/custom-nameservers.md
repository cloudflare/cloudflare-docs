---
order: 1
pcx-content-type: how-to
---

# Custom nameservers

With custom nameservers, a domain can use Cloudflare DNS without using the host names of Cloudflare-assigned nameservers.

## Availability

Cloudflare domains on Business or Enterprise plans can set Custom Nameservers at Cloudflare:

- Enterprise plans:
    - Create account-level nameservers via the API
    - Create zone-level nameservers via the dashboard
- Business plans:
    - Create account-level nameservers via the API (after [contacting Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476)
    - Create zone-level nameservers via the dashboard

## Account-level nameservers

Once you configure account-level custom nameservers, these nameservers can be applied and used by any zones in that account. 

<Aside type="note">

When using [subdomain support](https://support.cloudflare.com/hc/articles/360026440252), a parent and child zone cannot share the same nameserver names.

</Aside>

### Cloudflare DNS

If Cloudflare manages your domain's DNS:

1. Create an account-level nameserver with a [POST command](https://api.cloudflare.com/#account-level-custom-nameservers-add-account-custom-nameserver).
1. Cloudflare creates the [glue records](https://www.ietf.org/rfc/rfc1912.txt) automatically.
1. To enable the custom nameservers on existing zones:
    1. Use a [PUT command](https://api.cloudflare.com/#account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) on each zone.
    1. Modify the zone's registrar to use the custom nameserver names.

To make this custom nameserver the default for all new zones, use a [PUT command](https://api.cloudflare.com/#accounts-update-account) on an account and set the value of `use_account_custom_ns_by_default` to `true`.

### Non-Cloudflare DNS

If another provider manages your domain's DNS:

1. Create an account-level nameserver with a [POST command](https://api.cloudflare.com/#account-level-custom-nameservers-add-account-custom-nameserver).
1. Add the [glue records](https://www.ietf.org/rfc/rfc1912.txt) for each entry at your DNS provider.
1. Use a [POST command](https://api.cloudflare.com/#account-level-custom-nameservers-verify-account-custom-nameserver-glue-records) to verify that the glue records are active.
1. To enable the custom nameservers on existing zones:
    1. Use a [PUT command](https://api.cloudflare.com/#account-level-custom-nameservers-usage-for-a-zone-set-account-custom-nameserver-related-zone-metadata) on each zone.
    1. Modify the zone's registrar to use the custom nameserver names.

To make this custom nameserver the default for all new zones, use a [PUT command](https://api.cloudflare.com/#accounts-update-account) on an account and set the value of `use_account_custom_ns_by_default` to `true`.

## Zone-level nameservers

To add custom nameservers to a specific zone:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
1. Go to **DNS**.
1. On **Custom Nameservers**, click **Add Custom Nameservers** and enter nameserver hostnames (like ns1, ns2, ns3).
1. Cloudflare will assign IPv4 and IPv6 to your nameservers.
1. The next steps depends on whether Cloudflare manages the DNS for your domain:
    - If Cloudflare does manage the DNS for your domain, no further action is required.
    - If Cloudflare does not manage the DNS for your domain, add the **Custom Nameservers** and IP addresses to your domain registrar’s DNS as [glue (A or AAAA) records](https://www.ietf.org/rfc/rfc1912.txt). If you do not add these records, DNS lookups for your domain will fail.