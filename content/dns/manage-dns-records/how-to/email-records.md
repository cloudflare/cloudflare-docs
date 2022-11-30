---
pcx_content_type: how-to
title: Set up email records
weight: 5
---

# Set up email records

There are two reasons to set up email records for your domain: to make sure email [reaches your mail server](#add-mx-records) and to prevent other email senders from [spoofing your domain](#prevent-domain-spoofing).

---

## Add MX records

To route emails to your mail server, you need to [create two DNS records](/dns/manage-dns-records/how-to/create-dns-records/) within Cloudflare:

1.  An **A** or **AAAA** record for your mail subdomain that points to the IP address of your mail server.

     | **Type** | **Name** | **IPv4 address** | **Proxy status** |
     | -------- | -------- | ---------------- | ---------------- |
     | A        | `mail`   | `192.0.2.1`      | Proxied          |

2.  An **MX** record that points to that subdomain.

      | **Type** | **Name** | **Mail server**    | **TTL** |
      | -------- | -------- | ------------------ | ------- |
      | MX       | `@`      | `mail.example.com` | Auto    |

---

## Prevent domain spoofing

There are several DNS mechanisms to prevent others from sending emails on behalf of your domain. These all work as TXT records that need to be added on your domain:

- [Sender Policy Framework (SPF)](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/): List authorized IP addresses and domains that can send email on behalf of your domain.
- [DomainKeys Identified Mail (DKIM)](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/): Ensure email authenticity by cryptographically signing emails.
- [Domain-based Message Authentication Reporting and Conformance (DMARC)](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/): Receive aggregate reports about your email traffic and provide clear instructions for how email receivers should treat non-conforming emails.

{{<Aside type="note">}}

For additional background on email security records, refer to the [introductory blog post](https://blog.cloudflare.com/tackling-email-spoofing/).

{{</Aside>}}

### Configure email security records

To set up email security records:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your domain.
2.  Go to **DNS**.
3.  For **Email Security**, click **Configure**.
    - If your domain sends email, use the available options to set up SPF, DKIM, and DMARC records.
    - If your domain does not send email, use the **Your domain is not used to send email** section to set up restrictive email records.
