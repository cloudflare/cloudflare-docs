---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1;;param2;;param3
---

1. If the domain or domains that are used for the $1 custom nameservers do not exist within the same account, $2 must create the `A/AAAA` records on the configured nameserver names (e.g. `ns1.example.com`) at the authoritative DNS provider.

  {{<example>}}

  | Type | Name | Content |
  | --- | --- | --- |
  | `A` | `ns1.example.com` | `<IPv4>` |

  {{</example>}}

2. $3 can create up to five different $1 custom nameserver sets. Each nameserver set must have between two and five different nameserver names (`ns_name`) and each name cannot belong to more than one set. For example, if `ns1.example.com` is part of `ns_set 1` it cannot be part of `ns_set 2` or vice versa.
3. [Subdomain setup](/dns/zone-setups/subdomain-setup/) or [Reverse zones](/dns/additional-options/reverse-zones/) can use $1 custom nameservers as long as they use a different nameserver set (`ns_set`) than their parent, child, or any other zone in their direct hierarchy tree.