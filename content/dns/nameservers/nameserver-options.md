---
pcx_content_type: how-to
title: Nameserver options
weight: 3
---

# Nameserver options

Refer to the sections below to learn about different nameserver options.

## Multi-provider DNS

Multi-provider DNS is an optional setting for zones using [full setup](/dns/zone-setups/full-setup/) and is an enforced default behaviour for zones using [secondary setup](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/).

When you enable multi-provider DNS on a primary (full setup) zone:
- Cloudflare will no longer ignore `NS` records created on the zone apex, as in the example below.

  {{<example>}}

| Type | Name  | Nameserver |
| ---- | ----- | ------------ |
| `NS`    | `@` | `ns1.external.com`  |

{{</example>}}

  This means that responses to DNS queries made to the zone apex and requesting `NS` records will contain both Cloudflare's and your other DNS providers' nameservers.
- Cloudflare will activate a primary (full setup) zone even if its [nameservers listed at the registrar](/dns/nameservers/update-nameservers/) include nameservers from other DNS providers.

{{<Aside type="warning">}}
If you choose this option, you should also make sure to set up [multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/).
{{</Aside>}}