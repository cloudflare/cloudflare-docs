---
pcx_content_type: concept
title: Advanced certificates
weight: 2
---

# Advanced certificates

{{<render file="_acm-definition.md">}}<br/>

To order advanced certificates you must purchase the Advanced Certificate Manager add-on, which also includes other features.

## Advanced Certificate Manager

Advanced Certificate Manager allows you to:

* Order advanced certificates that can:
  * Include the zone apex and up to 50 hosts as covered hostnames.
  * Cover more than one level of subdomain.
  * Be issued by the certificate authority (CA) you choose.
  * Use your preferred validation method.
  * Have the validity period you choose.
* Use [delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/) to delegate the {{<glossary-tooltip term_id="domain control validation (DCV)">}}DCV process{{</glossary-tooltip>}} of your {{<glossary-tooltip term_id="partial setup" link="/dns/zone-setups/partial-setup/">}}partial zones{{</glossary-tooltip>}} to Cloudflare.
* Enable [Total TLS](/ssl/edge-certificates/additional-options/total-tls/) to automatically protect proxied hostnames.
* Select a [custom trust store](/ssl/origin-configuration/custom-origin-trust-store/) for origin authentication.
* Control [cipher suites](/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) and [per-hostname minimum TLS version](/ssl/edge-certificates/additional-options/minimum-tls/#per-hostname).

{{<Aside type="note">}}

Enterprise customers can also purchase a subscription for Advanced Certificate Manager, which allows them to add up to 100 {{<glossary-tooltip term_id="edge certificate">}}edge certificates{{</glossary-tooltip>}} per zone.

{{</Aside>}}

## Availability

{{<feature-table id="ssl.advanced_certificates">}}

{{<render file="_non-contract-enablement.md" productFolder="fundamentals" >}}

## Limitations

Advanced certificates are not used with [Cloudflare Pages](/pages/) nor [R2](/r2/) due to [certificate prioritization](/ssl/reference/certificate-and-hostname-priority/). Both Pages and R2 custom domains use Cloudflare for SaaS certificates.

{{<render file="_validation-level-intro.md" withParameters="Advanced certificates">}}. If your organization needs Organization Validated (OV) or Extended Validation (EV) certificates, refer to [Custom certificates](/ssl/edge-certificates/custom-certificates/).
<br/>

## Related resources

{{<directory-listing>}}
