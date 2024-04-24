---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1;;param2;;param3;;param4;;param5
---

$1 custom nameservers ($2CNS) allow you to define $3-level custom nameservers and use them for different $4 within a Cloudflare $5.

$2CNS are organized in different sets (`ns_set`) and $2CNS names can be provided by any domain, even if the domain does not exist as a zone in Cloudflare.

For instance, if the $2CNS are `ns1.example.com` and `ns2.vanity.org`, the domains `example.com` and `vanity.org` are not required to be zones in Cloudflare.