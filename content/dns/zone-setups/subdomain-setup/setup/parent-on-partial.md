---
pcx_content_type: how-to
title: Parent zone on partial setup
weight: 3
meta:
    title: Set up a child zone in Cloudflare with parent on partial setup
---

# Parent zone on partial setup

When the parent zone is using a [partial setup](/dns/zone-setups/partial-setup/)[^2], the steps to set up your child zone depend on whether the subdomain already exists in the parent domain.

## Subdomain does not exist

If you have not yet created a DNS record covering your subdomain in the parent zone:

{{<tabs labels="Child is full or secondary | Child is partial">}}
{{<tab label="child is full or secondary" no-code="true">}}

1. Add the subdomain to a Cloudflare account as a new zone. It can be the same account where the parent zone exists or a different one.
2. Complete the configuration accordingly for [full](/dns/zone-setups/full-setup/setup/) or [secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) setup.
3. After creating the DNS records on the child zone, add the Cloudflare nameservers as `NS` records at your external DNS provider.
4. Within a short period of time, the child zone should be active.

{{</tab>}}
{{<tab label="child is partial" no-code="true">}}

1. Add the subdomain to a Cloudflare account as a new zone. It can be the same account where the parent zone exists or a different one.
2. Select either Business or Enterprise as your zone plan and complete the onboarding flow according to your needs.
3. On the [Overview page](https://dash.cloudflare.com/?to=/:account/:zone), select **Convert to CNAME DNS Setup**.
4. Confirm that you have created all the [DNS records](/dns/manage-dns-records/how-to/create-dns-records/) needed for your child zone.
5. On [**DNS** > **Records**](https://dash.cloudflare.com/?to=/:account/:zone/dns/records), get the **Verification TXT Record** and add it at your authoritative DNS provider.

{{<details header="Example verification record">}}

A verification record for `sub.example.com` might be:

| Type | Name                            | Content             |
| ---- | ------------------------------- | ------------------- |
| TXT  | `cloudflare-verify.sub.example.com` | 966215192-518620144 |

If your authoritative DNS provider automatically appends DNS record `name` fields with your domain, make sure to only insert `cloudflare-verify` as the record name. Otherwise, it may result in an incorrect record name, such as `cloudflare-verify.sub.example.com.sub.example.com`.

After creating the record, you can use this [Dig Web Interface link](https://digwebinterface.com/?type=TXT&ns=auth&nameservers=) to search (`dig`) for `cloudflare-verify.<YOUR DOMAIN>` and validate if it is working.

{{</details>}}

That record must remain in place for as long as your subdomain is active on the partial setup on Cloudflare.

6. Within a short period of time, the child zone should be active.
7. At your authoritative DNS provider, add `CNAME` records pointing to `{your-hostname}.cdn.cloudflare.net` for the subdomain you have added and any deeper subdomain records you want to proxy through Cloudflare.

{{<details header="Example CNAME record at authoritative DNS provider">}}

The `CNAME` record for `sub.example.com` would be:

```txt
sub.example.com CNAME sub.example.com.cdn.cloudflare.net
```

{{</details>}}

{{</tab>}}
{{</tabs>}}

## Subdomain already exists

If you have already created a DNS record covering your subdomain in the parent zone:

{{<tabs labels="Child is full or secondary | Child is partial">}}
{{<tab label="child is full or secondary" no-code="true">}}

1. Add the subdomain to a Cloudflare account as a new zone. It can be the same account where the parent zone exists or a different one.
2. Complete the configuration accordingly for [full](/dns/zone-setups/full-setup/setup/) or [secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) setup.
3. In your child zone, [re-create all DNS records](/dns/manage-dns-records/how-to/create-dns-records/) that relate to your subdomain. This includes all DNS records deeper than the delegated subdomain, meaning that if you are delegating `www.example.com`, you should also move over records for `api.www.example.com`.

    {{<Aside type="note">}}If your child zone is on a full setup, consider [exporting](/dns/manage-dns-records/how-to/import-and-export/#export-records) records from the parent zone, deleting all unnecessary records, and then [importing](/dns/manage-dns-records/how-to/import-and-export/#import-records) the records into your new zone.
    {{</Aside>}}

4. Make sure that you migrate over any settings ([WAF custom rules](/waf/custom-rules/), [Rules](/rules/), [Workers](/workers/), and more) that might be needed for the child zone.
5. In the child zone, [order an advanced SSL certificate](/ssl/edge-certificates/advanced-certificate-manager/) that covers the child subdomain and any deeper subdomains.
6. Get the Cloudflare nameservers for the subdomain and add them as `NS` records at your external DNS provider.
7. Within a short period of time, the child zone should be active.
8. Within the **DNS** > **Records** of the parent zone, [delete](/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) any `A`, `AAAA`, or `CNAME` records referencing the subdomain or any of its deeper subdomains.

{{</tab>}}
{{<tab label="child is partial" no-code="true">}}

1. Add the subdomain to a Cloudflare account as a new zone. It can be the same account where the parent zone exists or a different one.
2. Select either Business or Enterprise as your zone plan and complete the onboarding flow according to your needs.
3. On the [Overview page](https://dash.cloudflare.com/?to=/:account/:zone), select **Convert to CNAME DNS Setup**.
4. In your child zone, [re-create all DNS records](/dns/manage-dns-records/how-to/create-dns-records/) that relate to your subdomain. This includes all DNS records deeper than the subdomain you used to create the zone - if you are creating a zone for `www.example.com`, you should also move over records for `api.www.example.com`.

    {{<Aside type="note">}}Cloudflare recommends [exporting](/dns/manage-dns-records/how-to/import-and-export/#export-records) records from the parent zone, deleting all unnecessary records, and then [importing](/dns/manage-dns-records/how-to/import-and-export/#import-records) the records into your new zone.
    {{</Aside>}}

5. Make sure that you migrate over any settings ([WAF custom rules](/waf/custom-rules/), [Rules](/rules/), [Workers](/workers/), and more) that might be needed for the child zone.
6. In the child zone, [order an advanced SSL certificate](/ssl/edge-certificates/advanced-certificate-manager/) that covers the child subdomain and any deeper subdomains.
7. On [**DNS** > **Records**](https://dash.cloudflare.com/?to=/:account/:zone/dns/records), get the **Verification TXT Record** and add it at your authoritative DNS provider.

{{<details header="Example verification record">}}

A verification record for `sub.example.com` might be:

| Type | Name                            | Content             |
| ---- | ------------------------------- | ------------------- |
| TXT  | `cloudflare-verify.sub.example.com` | 966215192-518620144 |

If your authoritative DNS provider automatically appends DNS record `name` fields with your domain, make sure to only insert `cloudflare-verify` as the record name. Otherwise, it may result in an incorrect record name, such as `cloudflare-verify.sub.example.com.sub.example.com`.

After creating the record, you can use this [Dig Web Interface link](https://digwebinterface.com/?type=TXT&ns=auth&nameservers=) to search (`dig`) for `cloudflare-verify.<YOUR DOMAIN>` and validate if it is working.

{{</details>}}

That record must remain in place for as long as your subdomain is active on the partial setup on Cloudflare.

8. Within a short period of time, the child zone should be active.
9. Within the **DNS** > **Records** of the parent zone, [delete](/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) any previous `A`, `AAAA`, or `CNAME` records referencing the subdomain or any of its deeper subdomains.
10. At your authoritative DNS provider, confirm you have `CNAME` records pointing to `{your-hostname}.cdn.cloudflare.net` for the subdomain you have added and any deeper subdomain records you want to proxy through Cloudflare.

{{<details header="Example CNAME record at authoritative DNS provider">}}

The `CNAME` record for `sub.example.com` would be:

```txt
sub.example.com CNAME sub.example.com.cdn.cloudflare.net
```

{{</details>}}

{{</tab>}}
{{</tabs>}}

[^2]: Meaning that another DNS provider - not Cloudflare - maintains your Authoritative DNS.