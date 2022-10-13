---
_build:
  publishResources: false
  render: never
  list: never
---

Your customers should place these at their authoritative DNS provider under the `"_acme-challenge"` DNS label. Once these TXT records are in place, validation and certificate issuance will automatically complete.

{{<Aside type="note">}}

These tokens are different than the hostname validation tokens.

{{</Aside>}}