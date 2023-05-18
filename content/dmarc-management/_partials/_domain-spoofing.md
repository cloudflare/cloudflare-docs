---
_build:
  publishResources: false
  render: never
  list: never
---

There are several DNS mechanisms to prevent others from sending emails on behalf of your domain. These all work as TXT records that need to be added on your domain:

- [Sender Policy Framework (SPF)](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/): List authorized IP addresses and domains that can send email on behalf of your domain.
- [DomainKeys Identified Mail (DKIM)](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/): Ensure email authenticity by cryptographically signing emails.
- [Domain-based Message Authentication Reporting and Conformance (DMARC)](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/): Receive aggregate reports about your email traffic and provide clear instructions for how email receivers should treat non-conforming emails.

{{<Aside type="note">}}

For additional background on email security records, refer to the [introductory blog post](https://blog.cloudflare.com/tackling-email-spoofing/).

{{</Aside>}}