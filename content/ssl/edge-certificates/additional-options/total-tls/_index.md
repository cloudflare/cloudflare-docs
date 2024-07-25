---
pcx_content_type: concept
title: Total TLS
weight: 14
---

# Total TLS

Total TLS allows Cloudflare to issue individual certificates for your proxied hostnames. These certificates will protect proxied hostnames not covered by [Universal certificates](/ssl/edge-certificates/universal-ssl/).

{{<Aside type="warning">}}
{{<render file="_total-tls-character-limitation.md">}}
{{</Aside>}}

When issued, these certificates will have a type of **Advanced - Total TLS**, and their default validity period is 90 days.

## Reference

{{<directory-listing>}}

## Availability

Total TLS is available for domains that have purchased [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) and are currently using a [full DNS setup](/dns/zone-setups/full-setup/).

## Limitations

### Hostnames used with other Cloudflare products

Total TLS does not issue certificates for any hostnames used with:
- [Cloudflare Load Balancing](/load-balancing/)
- [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/routing-to-tunnel/)

You can use other types of certificates or manually [order advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#create-a-certificate) for these hostnames.

### Deleting certificates

Once you [enable Total TLS](/ssl/edge-certificates/additional-options/total-tls/enable/), be careful deleting any Total TLS certificates associated with proxied hostnames.

If you do, our system assumes you want to opt that hostname out of Total TLS certificate and will not order new certificates for the hostname in the future. This behavior applies even if you delete and re-create the hostname's DNS record.
