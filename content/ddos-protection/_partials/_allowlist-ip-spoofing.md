---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning" header="Important">}}

Prefixes in the allowlist will be vulnerable to IP spoofing [^1] attacks. If an attacker can guess the source IP addresses you have allowlisted, their packets will be allowlisted.

[^1]: IP spoofing is the creation of Internet Protocol (IP) packets which have a modified source address to hide the identity of the sender, impersonate another computer system, or both.

{{</Aside>}}
