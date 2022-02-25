---
---

## Restrictions

To transfer to a new registrar, your domain must meet a few requirements:

*   ICANN rules prohibit a domain from being transferred if it has been registered or previously transferred within the last 60 days or if the WHOIS Registrant contact information was modified in the last 60 days (even if redacted).
*   Your account at your current registrar must be active. If your domain has expired, you may be able to transfer the domain. If the domain is in the `RedemptionPeriod` you will likely need to restore the domain first before the transfer can proceed.

<Aside type="warning">

The transfer of an expired domain may result in an additional year NOT being added during the transfer.

</Aside>

*   Cloudflare does not currently support premium domains. Some registries designate a domain name as “premium” and charge higher wholesale rates for these domains.
*   Cloudflare does not currently support internationalized domain names (IDNs).
*   Domains that have a status of `serverHold`, `serverTransferProhibited`, `pendingDelete`, `pendingTransfer`, or `RedemptionPeriod` may not be transferred.
*   Domains that have a status of `clientTransferProhibited` (Transfer Lock) will show as available for transfer. However, the Transfer Lock must be removed at your current registrar before the transfer can begin.

If your domain is listed as available for transfer in the Cloudflare dashboard, these restrictions have already been checked.
