---
_build:
  publishResources: false
  render: never
  list: never
---

## Restrictions

To transfer your domain, it must meet the following requirements:

* ICANN rules prohibit a domain from being transferred if it has been registered or previously transferred within the last 60 days or if the WHOIS Registrant contact information was modified in the last 60 days (even if redacted).
* Your account at your current registrar must be active. If your domain has expired, you may be able to transfer the domain. If the domain is in the `RedemptionPeriod` you will likely need to restore the domain first before the transfer can proceed.
{{<Aside type="warning">}}
The transfer of an expired domain may result in an additional year NOT being added during the transfer.
{{</Aside>}}
* Your domain cannot be a premium domain as Cloudflare currently does not support them. Some registries designate a domain name as premium and charge higher wholesale rates for these domains. In most cases Cloudflare is able to identify premium (non-standard priced) domains during the transfer eligibility step. However, this check might fail. When this happens, Cloudflare will not be able to determine the domain's premium status until the transfer is initiated.
* Your domain cannot be an internationalized domain name (IDNs) as Cloudflare does not currently support them. These domains are also known as unicode.
* Domains that have a status of `serverHold`, `serverTransferProhibited`, `pendingDelete`, `pendingTransfer`, or `RedemptionPeriod` may not be transferred.
* Domains that have a status of `clientTransferProhibited` (Transfer Lock) will not show as available for transfer. You will have to unlock the domain at your current registrar before being able to proceed.

If your domain is listed as available for transfer in the Cloudflare dashboard, these restrictions have already been checked.