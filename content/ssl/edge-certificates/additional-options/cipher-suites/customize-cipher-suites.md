---
title: Customize cipher suites
pcx_content_type: how-to
weight: 1
meta:
  title: Customize cipher suites
---

# Customize cipher suites

With [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) or within [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/), you can restrict connections between Cloudflare and clients - such as your visitor's browser - to specific [cipher suites](/ssl/edge-certificates/additional-options/cipher-suites/).

You may want to do this to follow specific [recommendations](/ssl/edge-certificates/additional-options/cipher-suites/recommendations/), to disable weak cipher suites, or to comply with [industry standards](/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/).

Customizing cipher suites will not lead to any downtime in your SSL/TLS protection.

{{<Aside type="note">}}

Note that this process only refers to connections [between clients and the Cloudflare network](/ssl/concepts/#edge-certificate). For connections between Cloudflare and your origin server, refer to [Origin server > Cipher suites](/ssl/origin-configuration/cipher-suites/).

{{</Aside>}}

## How it works

Custom cipher suites is a hostname-level setting, which implies that:

- When you customize cipher suites for a [zone](/fundamentals/setup/accounts-and-zones/#zones), this will affect all hostnames within that zone.
- The configuration is applicable to all edge certificates used to connect to the hostname(s), regardless of [certificate type](/ssl/edge-certificates/) (universal, advanced, or custom).
- If you need to use a per-hostname cipher suite customization, you must ensure that the hostname is specified on the certificate.

### Scope

Currently, you can only customize cipher suites when using the API:

- [Zone](/api/operations/zone-settings-edit-single-setting) (using `ciphers` as the setting name in the URI path)
- [Per-hostname](/api/operations/per-hostname-tls-settings-put) (regular zones only)
- [Custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#cipher-suites) (Cloudflare for SaaS zones only)

### Settings priority and ciphers order

Cloudflare uses the [hostname priority logic](/ssl/reference/certificate-and-hostname-priority/) to determine which setting to apply.

ECDSA is prioritized over RSA and Cloudflare preserves the specified cipher suites in the order they are set. This means that, if both ECDSA and RSA are used, Cloudflare presents the ECDSA ciphers first - in the order they were set - and then the RSA ciphers, also in the order they were set.

## Set up

### Before you begin

Note that:

* Cipher suites are used in combination with other [SSL/TLS settings](/ssl/edge-certificates/additional-options/cipher-suites/#related-ssltls-settings).
* You cannot set specific TLS 1.3 ciphers. Instead, you can [enable TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) for your entire zone and Cloudflare will use all applicable [TLS 1.3 cipher suites](/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/).
* Each cipher suite also supports a specific algorithm (RSA or ECDSA) so you should consider the algorithms in use by your edge certificates when making your ciphers selection. You can find this information under each certificate listed in [**SSL/TLS** > **Edge Certificates**](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates).

### Steps and API examples

1. Decide which cipher suites you want to specify and which ones you want to disable (meaning they will not be included in your selection).

    Below you will find samples covering the recommended ciphers [by security level](/ssl/edge-certificates/additional-options/cipher-suites/recommendations/) and [compliance standards](/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/), but you can also refer to the [full list](/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/) of supported ciphers and customize your choice.

2. Log in to the Cloudflare dashboard and get your Global API Key in [**My Profile** > **API Tokens**](https://dash.cloudflare.com/?to=/:account/profile/api-tokens/).
3. Get the Zone ID from the [Overview page](https://dash.cloudflare.com/?to=/:account/:zone/) of the domain you want to specify cipher suites for.
4. Make an API call to either the [Edit zone setting](/api/operations/zone-settings-edit-single-setting) or the [Edit TLS setting for hostname](/api/operations/per-hostname-tls-settings-put) endpoint, specifying `ciphers` in the URL and listing your array of chosen cipher suites in the `value` field.

    {{<Aside type="warning">}}
For guidance around custom hostnames, refer to [TLS settings - Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#cipher-suites).
{{</Aside>}}

{{<tabs labels="Compatible | Modern | PCI DSS | FIPS-140-2">}}
{{<tab label="compatible" no-code="true">}}

{{<render file="_ciphers-api-general-notes.md">}}

```bash
# Replace the first two lines by the following to configure cipher suites per hostname
# curl --request PUT \
# "https://api.cloudflare.com/client/v4/zones/{zone_id}/hostnames/settings/ciphers/{hostname}" \

curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/ciphers" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{"value": ["ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES128-SHA256", "ECDHE-RSA-AES128-SHA256", "ECDHE-ECDSA-AES256-SHA384", "ECDHE-RSA-AES256-SHA384"]}'
```

{{</tab>}}
{{<tab label="modern" no-code="true">}}

{{<render file="_ciphers-api-general-notes.md">}}

```bash
# Replace the first two lines by the following to configure cipher suites per hostname
# curl --request PUT \
# "https://api.cloudflare.com/client/v4/zones/{zone_id}/hostnames/settings/ciphers/{hostname}" \

curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/ciphers" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{"value": ["ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384"]}'
```

{{</tab>}}
{{<tab label="pci dss" no-code="true">}}

{{<render file="_ciphers-api-general-notes.md">}}

```bash
# Replace the first two lines by the following to configure cipher suites per hostname
# curl --request PUT \
# "https://api.cloudflare.com/client/v4/zones/{zone_id}/hostnames/settings/ciphers/{hostname}" \

curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/ciphers" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{"value": ["ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-CHACHA20-POLY1305"]}'
```

{{</tab>}}
{{<tab label="fips-140-2" no-code="true">}}

{{<render file="_ciphers-api-general-notes.md">}}

```bash
# Replace the first two lines by the following to configure cipher suites per hostname
# curl --request PUT \
# "https://api.cloudflare.com/client/v4/zones/{zone_id}/hostnames/settings/ciphers/{hostname}" \

curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/ciphers" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{"value":["AES128-GCM-SHA256", "AES128-SHA", "AES128-SHA256", "AES256-SHA", "AES256-SHA256", "DES-CBC3-SHA", "ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-AES128-SHA", "ECDHE-ECDSA-AES128-SHA256", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES256-SHA384", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-SHA", "ECDHE-RSA-AES128-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-SHA", "ECDHE-RSA-AES256-SHA384"]}'
```

{{</tab>}}
{{</tabs>}}

## Reset to default values

{{<tabs labels="Zone | Per-hostname">}}
{{<tab label="zone" no-code="true">}}

To reset to the default cipher suites at zone level, use the [Edit zone setting](/api/operations/zone-settings-edit-single-setting) endpoint, specifying `ciphers` as the setting name in the URI path, and send an empty array in the `value` field.

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/ciphers" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{"value": []}'
```

{{</tab>}}
{{<tab label="per-hostname" no-code="true">}}

For specific hostname settings, use the [Delete TLS setting for hostname](/api/operations/per-hostname-tls-settings-delete) endpoint.

```bash
curl --request DELETE \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/hostnames/settings/ciphers/{hostname}" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header 'Content-Type: application/json' \
```

{{</tab>}}
{{</tabs>}}

For guidance around custom hostnames, refer to [TLS settings - Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#cipher-suites).