---
pcx_content_type: concept
title: Wildcard DNS records
weight: 4
---

# Wildcard DNS records

Normal DNS records map a domain name to one or multiple IP addresses or other associated resources to a specific domain name (a one-to-many mapping).

Wildcard DNS records allow you to have a many-to-many mapping, for example if you had hundreds or thousands of subdomains you wanted to point to the same resources. Wildcard records are used as the response for all subdomains that are not specifically covered by another DNS record.

Within Cloudflare, wildcard DNS records can be either [proxied or DNS-only](/dns/manage-dns-records/reference/proxied-dns-records/).

## Create a Wildcard record

To create a wildcard DNS record, [create a DNS record](/dns/manage-dns-records/how-to/create-dns-records/) with an `*` in the **Name** field.

{{<example>}}

| Type | Name  | IPv4 address | Proxy status |
| --- | --- | --- | --- |
| `A`    | `*` | `192.0.2.1`  | Proxied      |

{{</example>}}

You can also create a wildcard DNS record specifically for a deeper subdomain. For example, if you wanted to create a wildcard record on `*.www.example.com`, you would create a record with `*.www` in the name field.

{{<example>}}

| Type | Name  | IPv4 address | Proxy status |
| --- | --- | --- | --- |
| `A`    | `*.www` | `192.0.2.2`  | Proxied      |

{{</example>}}

## Availability

Customers on all plans can create and proxy wildcard DNS records.

## Limitations

If you are using a [partial zone setup](/dns/zone-setups/partial-setup/) for your DNS, Cloudflare does not automatically provision SSL/TLS certificates for your wildcard record.

{{<render file="_partial-zone-acm-dcv-wildcard.md" productFolder="ssl" >}}

## Additional information

For more information on wildcard records — as well as more details about their limitations — refer to the [introductory blog post](https://blog.cloudflare.com/wildcard-proxy-for-everyone/).