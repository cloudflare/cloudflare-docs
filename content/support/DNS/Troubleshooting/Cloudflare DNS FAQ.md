---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360017421192-Cloudflare-DNS-FAQ
title: Cloudflare DNS FAQ
---

# Cloudflare DNS FAQ



## Where can I learn more about DNS?

Please visit the [Cloudflare Learning Center DNS guides](https://www.cloudflare.com/learning/dns/what-is-dns/).

___

## Is Cloudflare a free DNS (domain nameserver) provider?

Yes. Cloudflare offers [free DNS services](https://www.cloudflare.com/dns) to customers in all plans. Note that:

1.  You do not need to change your hosting provider to use Cloudflare.
2.  You do not need to move away from your registrar. The only change you make with your registrar is to point the authoritative nameservers to the Cloudflare nameservers.

As of October 2018, you can transfer your domain to [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/).

___

## Does Cloudflare charge for or limit DNS queries?

Cloudflare never limits or caps DNS queries, but the pricing depends on your plan level.

For customers on Free, Pro, or Business plans, Cloudflare does not charge for DNS queries.

For customers on Enterprise plans, Cloudflare uses the number of monthly DNS queries as a pricing input to generate a custom quote. Any overages will not be charged.

___

## Where do I change my nameservers to point to Cloudflare?

Make the change at your registrar, which may or may not be your hosting provider. If you don't know who your registrar is for the domain, you can find this by doing a [WHOis search](http://www.whois.net/). Follow the instructions in [change nameservers to Cloudflare](/dns/zone-setups/full-setup/setup/).

___

## Does Cloudflare limit number of DNS records a domain can have?

Yes. Currently Free, Pro, and Business customers have a limit on the number of DNS records they can create.

If you are an Enterprise customer you can contact your Account team if you require more DNS records.

___

## Which record types does Cloudflare not proxy?

Cloudflare does not proxy the following record types:

-   LOC
-   MX
-   NS
-   SPF
-   TXT
-   SRV
-   CAA

___

## Can I CNAME a domain not on Cloudflare to a domain that is on Cloudflare?

No. If you would like to do a redirect for a site not on Cloudflare, then set up a traditional 301 or 302 redirect on your origin web server.

Redirecting non-Cloudflare sites via CNAME records would cause a DNS resolution error. Since Cloudflare is a reverse proxy for the domain that is on Cloudflare, the CNAME redirect for the domain (not on Cloudflare) wouldn't know where to send the traffic to.

___

## Does Cloudflare support wildcard DNS entries?

Cloudflare now supports proxying wildcard '\*' record for DNS management in all customer plans. This used to only be offered to Enterprise plans.

___

## How long does it take for a DNS change I made to push out?

By default, any changes or additions you make to your Cloudflare zone file will push out in 5 minutes or less. Your local DNS cache may take longer to update; as such, propagation everywhere might take longer than 5 minutes.

This setting is controlled by the Time-to-Live (TTL) value on a [DNS record](/dns/manage-dns-records/how-to/create-dns-records/). Proxied records update within 300 seconds (Auto), but the TTL for unproxied records can be customized.

___

## Does Cloudflare offer domain masking?

No. Cloudflare does not offer domain masking or DNS redirect services (your hosting provider might). However, we do offer URL forwarding through [Bulk Redirects](/rules/url-forwarding/bulk-redirects/).

___

## Why can't I make ANY queries to Cloudflare DNS servers?

ANY queries are special and often misunderstood. They are usually used to get all record types available on a DNS name, but what they return is just any type in the cache of recursive resolvers. This can cause confusion when they are used for debugging.

Because of Cloudflare's many advanced DNS features like CNAME flattening, it can be complex and even impossible to give correct answers to ANY queries. For example, when DNS records dynamically come and go or are stored remotely, it can be taxing or even impossible to get all the results at the same time.

ANY is rarely used in production, but is often used in DNS reflection attacks, taking advantage of the lengthy answer returned by ANY.

Instead of using ANY queries to list records, Cloudflare customers can get a better overview of their DNS records by logging in and checking their DNS app settings.

The decision to block ANY queries was implemented for all Authoritative DNS customers in September 2015, and does not affect Virtual DNS customers.

Read [Deprecating the DNS ANY meta-query type](https://blog.cloudflare.com/deprecating-dns-any-meta-query-type/) in the Cloudflare blog.

___

## Why do I have to remove my DS record when signing up for Cloudflare?

Cloudflare supports DNSSEC. If a DS record is present at your registrar while using Cloudflare, you will run into connectivity errors such as SERVFAIL when using a validating resolver like Google and noErrror from non-validating ones.

Here is an example of what an error would look like:

```sh
$ dig dnssec-failed.org @8.8.8.8
  <<>> DiG 9.8.3-P1 <<>> dnssec-failed.org @8.8.8.8
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: SERVFAIL, id: 5531
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0 ;; QUESTION SECTION:
;dnssec-failed.org. IN A
```

With DNSSEC support, Cloudflare provides the DS record that must be uploaded to your parent when you [enable DNSSEC](https://support.cloudflare.com/hc/articles/360006660072) for your domain.

___

## What happens when I remove the DS record?

When you remove your DS record, an invalidation process begins which results in the unsigning of your domain’s DNS records. This will allow your authoritative nameservers to be changed. If you are an existing customer, this will not affect your ability to use Cloudflare. New customers will need to complete this step before Cloudflare can be used successfully.

___

## Does Cloudflare support EDNS0 (extension mechanisms for DNS)?

Yes, Cloudflare DNS supports EDNS0. EDNS0 is enabled for all Cloudflare customers. It is a building block for modern DNS implementations that adds support for signaling if the DNS Resolver (recursive DNS provider) supports larger message sizes and DNSSEC.

EDNS0 is the first approved set of mechanisms for [DNS extensions](http://en.wikipedia.org/wiki/Extension_mechanisms_for_DNS), originally published as [RFC 2671](https://datatracker.ietf.org/doc/html/rfc2671).

___

## What should I do if I change my server IP address or hosting provider?

After switching hosting providers or server IP addresses, update the IP addresses in your Cloudflare **DNS** app. Your new hosting provider will provide the new IP addresses that your DNS should use.  To modify DNS record content in the **DNS** app, click on the IP address, and enter the new IP address.

___

## Where can I find my Cloudflare name servers?

Under the **DNS** app of your Cloudflare account, review the **Cloudflare Nameservers**.

The IP address associated with a specific Cloudflare nameserver can be retrieved via a dig command or a third-party DNS lookup tool hosted online such as [whatsmydns.net](https://www.whatsmydns.net/):

```sh
$ dig kate.ns.cloudflare.com
kate.ns.cloudflare.com.    68675    IN    A    173.245.58.124.
```

___

## Why are Cloudflare's A or AAAA records / IP addresses for my domain's DNS responses appearing?

For DNS records proxied to Cloudflare, Cloudflare's IP addresses are returned in DNS queries instead of your original server IP address. This allows Cloudflare to optimize, cache, and protect all requests for your website.

___

## Should the cloud icon beside my DNS record be orange or gray?

By default, only A and CNAME records that handle web traffic (HTTP and HTTPs) can be proxied to Cloudflare. All other DNS records should be toggled to a gray cloud. For further details, refer to our [support guide](/dns/manage-dns-records/reference/proxied-dns-records).

___

## Can subdomains be added directly to Cloudflare?

Only Enterprise customers can add subdomains directly to Cloudflare via [Subdomain Support](https://support.cloudflare.com/hc/articles/360026440252).

___

## 403 Authentication error when creating DNS records using Terraform

**Problem Description**

`Error: failed to create DNS record: HTTP status 403: Authentication error (10000)` is returned when using Terraform with Cloudflare API.

**Root Cause**

Error seems to be misleading, as the error was found to be in customer code syntax, specifically: zone\_id = data.cloudflare\_zones.example\_com.id

**Solution**

Make sure the argument `zone_id = data.cloudflare_zones.example_com.zones[0].id`. A more detailed use case can be found in [this](https://github.com/cloudflare/terraform-provider-cloudflare/issues/913) Github thread.

___

## Why am I getting hundreds of random DNS records after adding my domain?

This can happen when you had a wildcard \* record configured at your previous authoritative DNS. You can remove these records in bulk using the API: https://api.cloudflare.com/#dns-records-for-a-zone-delete-dns-record . Or you can also delete your domain from the Cloudflare Dashboard, then delete the wildcard record from your authoritative DNS, and then re-add the domain again

___

## What IP should I use for parked domain / redirect-only / originless setup?

In the case a placeholder address is needed for “originless” setups, use the IPv6 reserved address **100::** or the IPv4 reserved address **192.0.2.0** in your Cloudflare DNS to create the entry in Proxied-mode to leverage Cloudflare Page Rules or Cloudflare Workers.
