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

{{<Aside type="warning">}}

If your project is on [Cloudflare Pages](/pages/), note that wildcard custom domains are not supported. Refer to [known issues](/pages/platform/known-issues/#custom-domains) for details.

{{</Aside>}}

You can also create a wildcard DNS record specifically for a deeper subdomain. For example, if you wanted to create a wildcard record on `*.www.example.com`, you would create a record with `*.www` in the name field.

{{<example>}}

| Type | Name  | IPv4 address | Proxy status |
| --- | --- | --- | --- |
| `CNAME`    | `*.www` | `example.com`  | Proxied      |

{{</example>}}

### Aspects to consider

- **Wildcards are only supported on the first label**: This means that a hostname such as `subdomain.*.example.com` is not a wildcard on the level of the asterisk character. If you create a DNS record with that name, the asterisk is interpreted as the literal character `*` and not as the wildcard operator.

- **You cannot create wildcards on multiple levels**: If you create a DNS record on `*.*.example.com`, only the first asterisk is interpreted as a wildcard while the second one is interpreted as the literal `*` character.

- **Specific DNS records take precedence over wildcard records**: Wildcards will be applied for multiple levels, but a specific record on any equal or lower level will terminate anything on or below this specific record.

    {{<details header="Example">}}

If you have only these two records on your domain, `A` and `TXT`:

| Type | Name | Content |
| --- | --- | --- |
| `A` | `*.example.com` | `192.0.2.3` |
| `TXT` | `subdomain1.example.com ` | `<some_text>` |

The `A` wildcard record will be used for queries going to any subdomain of `example.com` except `subdomain1.example.com` or anything below that specific label (`deeper.label.subdomain1.example.com`).

The wildcard will still be used for deeper labels that are not below the specific record on `subdomain1.example.com` — for example, `deeper.label.subdomain2.example.com`.

{{</details>}}

## Availability

Customers on all plans can create and proxy wildcard DNS records.

## Limitations

If you are using a [partial zone setup](/dns/zone-setups/partial-setup/) for your DNS, Cloudflare does not automatically provision SSL/TLS certificates for your wildcard record.

{{<render file="_partial-zone-acm-dcv-wildcard.md" productFolder="ssl" >}}

## Additional information

For more information on wildcard records — as well as more details about their limitations — refer to the [introductory blog post](https://blog.cloudflare.com/wildcard-proxy-for-everyone/).
