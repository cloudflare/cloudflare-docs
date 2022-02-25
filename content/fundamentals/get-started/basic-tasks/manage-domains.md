---
order: 0
pcx-content-type: reference
---

# Manage domains

A *domain* or *domain name* is the location of a website or application, or what an end user types into their browser to get to your website (`example.com`).

## Get a domain name

You can get domain names for your website from a variety of places, such as through popular website builders or dedicated [registrars](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name-registrar/).

Cloudflare also offers an at-cost registrar service to [purchase new domain names](https://developers.cloudflare.com/registrar/get-started/register-domain) or [manage existing domain names](https://developers.cloudflare.com/registrar/get-started/transfer-domain-to-cloudflare).

## Host your domain

A web host keeps your website online so visitors can reach it via the domain name.

Cloudflare does not offer web hosting for most websites, though you can deploy and host JAMstack sites with [Cloudflare Pages](https://developers.cloudflare.com/pages/).

## Add a domain to Cloudflare

For help adding a domain to Cloudflare, refer to our [setup guide](https://support.cloudflare.com/hc/articles/201720164#2YulMb5YJTVnMxgAgNWdS2).

Once you finish adding your domain, you likely will want to also [update your domain's nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup) to get Cloudflare's performance and security benefits.

## Remove a domain from Cloudflare

For help removing an active domain from Cloudflare, refer to [our Support guide](https://support.cloudflare.com/hc/articles/360033554252).

## Redirect one domain to another

If you have an alias domain that simply forwards traffic to another domain, you can set up redirects directly within Cloudflare.

1.  [Add](#add-a-domain-to-Cloudflare) your alias domain (`previous.com`) to Cloudflare.

2.  Make sure that your alias domain has a proxied [DNS A or CNAME record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records) that properly resolves DNS queries. You may also want to include a record for the `www` subdomain.

     <Example>

    | **Type** | **Name** | **IPv4 address** | **Proxy status** |
    | --- | --- | --- | --- |
    | A | `@` | `192.0.2.1`| Proxied |
    | A | `www` | `192.0.2.1`| Proxied |

     </Example>

3.  Use [Bulk redirects](https://developers.cloudflare.com/rules/bulk-redirects) to forward traffic from your alias domain to your other domain. Select **Include subdomains** and **Subpath matching** to cover your entire alias domain (`www.previous.com` and `www.previous.com/examples`).

     <Example>

    | **Source URL** | **Target URL** | **Status** | **Selected parameters** |
    | --------- | --------- | --- | --- |
    | `previous.com` | `https://new.com` | 301 | *Include subdomains* and *Subpath matching* |

     </Example>

## Get free SSL certificates

Cloudflare offers free, unshared, publicy trusted [Universal SSL certificates](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl) to all Cloudflare domains.

## Manage subdomains

For more details about subdomains (`www.example.com` or `blog.example.com`), refer to [Manage subdomains](../manage-subdomains).
