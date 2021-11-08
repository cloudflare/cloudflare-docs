---
order: 4
pcx-content-type: concept
---

# Email security

There are several DNS mechanisms to prevent others from sending emails on behalf of your domain. These all work as TXT records that need to be added on your domain:

- [Sender Policy Framework (SPF)](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/): List authorized IP addresses and domains that can send email on behalf of your domain.
- [DomainKeys Identified Mail (DKIM)](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/): Ensure email authenticity by cryptographically signing emails.
- [Domain-based Message Authentication Reporting and Conformance (DMARC)](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/): Receive aggregate reports about your email traffic and provide clear instructions for how email receivers should treat non-conforming emails.

<Aside type="note">

For additional background on email security records, refer to the [introductory blog post](https://blog.cloudflare.com/tackling-email-spoofing/).

</Aside>

## Configure email security records

To set up email security records:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your domain.
1. Go to **DNS**.
1. For **Email Security**, click **Configure**.
1. If your domain sends email, use the available options to set up SPF, DKIM, and DMARC records.
1. If your domain does not send email, use the **Your domain is not used to send email** section to set up restrictive email records.