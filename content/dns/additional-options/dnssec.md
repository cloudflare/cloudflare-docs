---
pcx_content_type: how-to
title: DNSSEC
weight: 3
---

# DNSSEC

DNS Security Extensions (DNSSEC) adds an extra layer of authentication to DNS, ensuring requests are not routed to a spoofed domain.

{{<Aside type="note">}}

For additional background on DNSSEC, visit the [Cloudflare Learning Center](https://www.cloudflare.com/learning/dns/dns-security/).

{{</Aside>}}

---

## Disable DNSSEC

{{<render file="_disable_dnssec.md">}}

---

## Enable DNSSEC

When you enable DNSSEC, Cloudflare signs your zone, publishes your public signing keys, and generates your **DS** record.

### Step 1 - Activate DNSSEC in Cloudflare

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2.  Go to **DNS**.
3.  For **DNSSEC**, click **Enable DNSSEC**.
4.  In the dialog, you have access to several necessary values to help you create a **DS** record at your registrar. Once you close the dialog, you can access this information by clicking **DS record** on the **DNSSEC** card.

### Step 2 — Add DS record to your registrar

You now need to add a **DS** record to your registrar.

{{<render file="_dnssec-providers.md">}}

{{<Aside type="note" header="Note:">}}

Cloudflare automatically adds **DS** records for domains using Cloudflare Registrar or those using `.ch` and `.cz` top-level domains.

{{</Aside>}}

## Troubleshooting

For more help with DNSSEC, refer to [Troubleshooting DNSSEC](https://support.cloudflare.com/hc/articles/360021111972).

## Limitations

If your registrar does not support DNSSEC with Cloudflare's preferred cipher choice (Algorithm 13), you have several options:

- Contact your registrar to ask for DNSSEC with modern encryption.
- Transfer your domain to a different registrar that supports DNSSEC with Algorithm 13
- File a [complaint with ICANN](https://forms.icann.org/en/resources/compliance/complaints/registrars/standards-complaint-form), citing your registrar's lack of compliance.

If your top-level domain does not support DNSSEC with Algorithm 13, [contact that top-level domain](https://www.iana.org/domains/root/db).