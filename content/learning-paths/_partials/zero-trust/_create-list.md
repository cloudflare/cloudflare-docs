---
_build:
  publishResources: false
  render: never
  list: never
---

Gateway supports creating [lists](/cloudflare-one/policies/gateway/lists/) of IPs, hostnames, or other entries to reference in your policies.

It is likely that you will be onboarding to the Cloudflare platform with some predetermined series of security policies. Maybe you have explicit deny lists based on hostnames, IPs, or another measure that tie to individual users. Maybe some networks can access certain apex records while others cannot.

The best way to migrate to Cloudflare in a way that will simplify ongoing maintenance is to build as many reusable objects as possible. Not only because that makes policy building simpler, but because as those applications, networks, and services organically change and grow, updates to the lists automatically update everywhere that the lists are applied.

{{<render file="gateway/_lists.md" productFolder="cloudflare-one">}}
