---
pcx_content_type: how-to
title: DNSSEC
weight: 6
---

# DNSSEC

{{<render file="_dnssec-definition.md" productFolder="dns">}}

---

## Disable DNSSEC

{{<render file="_disable_dnssec.md" productFolder="dns">}}

{{<render file="_dnssec-enabled-migration.md" productFolder="dns">}}

---

## Enable DNSSEC

When you enable DNSSEC, Cloudflare signs your zone, publishes your public signing keys, and generates your **DS** record.

### Step 1 - Activate DNSSEC in Cloudflare

{{<render file="_dnssec-cloudflare-steps.md" productFolder="dns">}}

### Step 2 - Add DS record to your registrar

{{<render file="_dnssec-registrar-steps.md" productFolder="dns">}}

{{<render file="_dnssec-auto-add.md" productFolder="dns">}}

---

## Other DNSSEC setup options

If you are using Cloudflare as your Secondary DNS provider and want to configure DNSSEC on your secondary zone(s), you have [three options](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/) depending on your setup.

If you want to set up DNSSEC on a subdomain zone, refer to [Subdomain DNSSEC](/dns/zone-setups/subdomain-setup/dnssec/).

---

## Limitations

If your registrar does not support DNSSEC with Cloudflare's preferred cipher choice (Algorithm 13), you have several options:

- Contact your registrar to ask for DNSSEC with modern encryption.
- Transfer your domain to a different registrar that supports DNSSEC with Algorithm 13
- File a [complaint with ICANN](https://www.icann.org/compliance/complaint), citing your registrar's lack of compliance.

If your top-level domain does not support DNSSEC with Algorithm 13 (also known as *ECDSA Curve P-256 with SHA-256*), [contact that top-level domain](https://www.iana.org/domains/root/db).
