---
_build:
  publishResources: false
  render: never
  list: never
---

Even if you manually handle DCV when issuing certificates in a [partial DNS setup](/dns/zone-setups/partial-setup/), at certificate renewal, Cloudflare will attempt to automatically perform DCV via HTTP.

If all of the following conditions are confirmed at the first attempt, the renewal happens automatically via HTTP.

* Hostnames are proxied.
* Hostnames on the certificate resolve to the IPs assigned to the zone.
* The certificate does not contain wildcards.

{{<Aside type="note">}}

To automatically renew certificates that do not meet the referred criteria, consider using [Delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).

{{</Aside>}}