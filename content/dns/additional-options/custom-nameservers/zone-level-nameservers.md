---
pcx_content_type: how-to
title: Zone nameservers
weight: 3
---

# Zone-level nameservers

With zone-level custom nameservers, each custom nameserver name must be a subdomain of the zone where the custom nameservers are configured.

For example, for a zone `domain.test`, the custom nameservers can be `ns1.domain.test` and `ns2.domain.test` but they cannot use a different TLD (`ns1.domain.org`) nor a different domain (`ns1.example.com`).

## Create zone-level nameservers

### Using the dashboard

To add custom nameservers to a specific zone:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2.  Go to **DNS** > **Records**.
3.  On **Custom Nameservers**, click **Add Custom Nameservers** and enter the subdomains used for the nameserver names (for example, `ns1`, `ns2`, `ns3`).
4.  Cloudflare will assign an IPv4 and IPv6 address to each custom nameserver name and automatically create the associated `A` or `AAAA` records (visible after you refresh the page).
5.  The next step depends on whether you are using [Cloudflare Registrar](/registrar/) for your domain:
    - If you are using Cloudflare Registrar for your domain, no further action is required. Glue records will be added automatically on your behalf.
    - If you are not using Cloudflare Registrar for your domain, add the **Custom Nameservers** at your registrar as your authoritative nameservers and as [glue (A and AAAA) records](https://www.ietf.org/rfc/rfc1912.txt). If you do not add these records, DNS lookups for your domain will fail.

### Using the API

To add zone-level custom nameservers via the API, use a [PATCH request](/api/operations/zone-edit-zone) and specify the custom nameservers in the payload:

```txt
"vanity_name_servers": ["ns1.example.com","ns2.example.com"]
```

### For incoming zone transfers (Secondary DNS)

If you are using [Cloudflare as a secondary DNS provider](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/), you can still set up zone-level custom nameservers but will need to perform a few steps manually, after [steps 1-3 above](#using-the-dashboard) or after [using the API](#using-the-api).

1. Use the [API](/api/operations/zone-edit-zone) to get the `vanity_name_servers_ips`.
2. Add [glue records](https://www.ietf.org/rfc/rfc1912.txt) at your registrar.
3. Add `A/AAAA` records at your primary DNS provider.
4. Add `NS` records at your primary DNS provider.
5. Add the custom nameservers at your registrar.

## Remove zone-level nameservers

### Using the dashboard

To remove zone-level nameservers (and their associated, read-only DNS records) using the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2.  Go to **DNS** > **Records**.
3.  On **Custom Nameservers**, click **Remove Custom Nameservers**.
4.  Cloudflare will remove your nameservers and their associated read-only `A` or `AAAA` records.

### Using the API

To remove zone-level custom nameservers (and their associated, read-only DNS records) via the API, use a [PATCH request](/api/operations/zone-edit-zone) and include an empty array in the payload:

```txt
"vanity_name_servers": []
```