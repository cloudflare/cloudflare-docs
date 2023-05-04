---
pcx_content_type: overview
title: Geo Key Manager
weight: 5
layout: single
---

{{<beta>}} Geo Key Manager {{</beta>}}

{{<description>}}
Restrict where the private keys used for TLS certificates are stored and managed.
{{</description>}}

Geo Key Manager allows customers to store and manage the encryption keys for their domains in different geographic locations so they can meet compliance regulations and keep data secure.

## Resources

{{<directory-listing>}}

## Limitations

Currently, Geo Key Manager is limited to [custom certificates](/ssl/edge-certificates/custom-certificates/) and available only through the Cloudflare API.

---

## Related products

{{<related header="Data Localization Suite" href="/data-localization/" product="data-localization">}}
The Data Localization Suite (DLS) is a set of products that helps customers who want to maintain local control over their traffic while retaining the security benefits of a global network.
{{</related>}}

{{<related header="Geo Key Manager (v1)" href="https://blog.cloudflare.com/introducing-cloudflare-geo-key-manager/" product="ssl">}}
{{<render file="_geokey-manager-v1.md">}} 
{{</related>}}

---

## More resources

{{<resource-group>}}

{{<resource header="Plans" href="https://www.cloudflare.com/plans/#overview" icon="documentation-clipboard">}}Compare available Cloudflare plans{{</resource>}}

{{</resource-group>}}