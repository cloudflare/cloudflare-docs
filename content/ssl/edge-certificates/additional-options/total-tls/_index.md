---
pcx_content_type: concept
title: Total TLS
weight: 14
layout: single
---

# Total TLS

Total TLS allows Cloudflare to issue individual certificates for your proxied hostnames. These certificates will protect proxied hostnames not covered by [Universal certificates](/ssl/edge-certificates/universal-ssl/).

{{<Aside type="warning">}}
{{<render file="_total-tls-character-limitation.md">}}
{{</Aside>}}

When issued, these certificates will have a type of **Advanced - Total TLS**.

## Reference

{{<directory-listing>}}

## Availability

Total TLS is available for domains that have purchased [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) and are currently using a [full DNS setup](/dns/zone-setups/full-setup/).
  
## Limitations

### Load Balancing

Because Total TLS does not issue certificates for any subdomain used by [Cloudflare Load Balancing](/load-balancing/), we recommend using other types of certificates to avoid any potential downtime.

### Deleting certificates

Once you [enable Total TLS](/ssl/edge-certificates/additional-options/total-tls/enable/), be careful deleting any certificates associated with proxied hostnames. 

If you do, our system assumes you want to opt that hostname out of Total TLS certificate and will not order new certificates for the hostname in the future. This behavior applies even if you delete and re-create the hostname's DNS record.