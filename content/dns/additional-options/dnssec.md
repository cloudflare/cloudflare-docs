---
pcx-content-type: how-to
title: Set up DNSSEC
weight: 3
---

# Set up DNSSEC

DNS Security Extensions (DNSSEC) adds an extra layer of authentication to DNS, ensuring requests are not routed to a spoofed domain.

<Aside type="note">

For additional background on DNSSEC, visit the [Cloudflare Learning Center](https://www.cloudflare.com/learning/dns/dns-security/).

</Aside>

## Enable DNSSEC

When you enable DNSSEC, Cloudflare signs your zone, publishes your public signing keys, and generates your **DS** record.

### Step 1 — Activate DNSSEC in Cloudflare

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2.  Go to **DNS**.
3.  For **DNSSEC**, click **Enable DNSSEC**.
4.  In the dialog, you have access to several necessary values to help you create a **DS** record at your registrar. Once you close the dialog, you can access this information by clicking **DS record** on the **DNSSEC** card.

### Step 2 — Add DS record to your registrar

You now need to add a **DS** record to your registrar.

<details>
<summary>Provider-specific instructions</summary>
<div>

This is not an exhaustive list, but the following links may be helpful:

*   [DNSimple](https://support.dnsimple.com/articles/cloudflare-ds-record/)
*   [domaindiscount24](https://www.domaindiscount24.com/faq/en/dnssec)
*   [DreamHost](https://help.dreamhost.com/hc/en-us/articles/219539467-DNSSEC-overview)
*   [dynadot](https://www.dynadot.com/community/help/question/set-DNSSEC)
*   [enom](https://help.enom.com/hc/en-us/articles/115001028212-Adding-a-DNSSEC-to-a-Domain-Name)
*   [gandi](https://wiki.gandi.net/en/domains/dnssec)
*   [GoDaddy](https://ph.godaddy.com/help/add-a-ds-record-23865)
*   [Google Domains](https://support.google.com/domains/answer/6387342?hl=en)
*   [hover](https://help.hover.com/hc/en-us/articles/217281647-Understanding-and-managing-DNSSEC)
*   [InMotion Hosting](https://www.inmotionhosting.com/support/edu/cpanel/enable-dnssec-cloudflare/)
*   [Joker.com](https://joker.com/faq/content/6/461/en/dnssec-support.html)
*   [name.com](https://www.name.com/support/articles/205439058-Managing-DNSSEC)
*   [namecheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9722/2232/managing-dnssec-for-domains-pointed-to-custom-dns)
*   [nameISP](https://www.nameisp.com/en/customer-service?question=dnssec)
*   [namesilo](https://www.namesilo.com/Support/DS-Records-%28DNSSEC%29)
*   [OVH](https://api.ovh.com/console/#/domain/%7BserviceName%7D/dsRecord#POST)
*   [Public Domain Registry](http://manage.publicdomainregistry.com/kb/answer/1909)
*   [registro.br](https://registro.br/tecnologia/dnssec.html?secao=tutoriais-dns)

</div>
</details>

<Aside type="note" header="Note:">

Cloudflare automatically adds **DS** records for domains using Cloudflare Registrar or those using `.ch` and `.cz` top-level domains.

</Aside>

## Troubleshooting

For more help with DNSSEC, refer to [Troubleshooting DNSSEC](https://support.cloudflare.com/hc/articles/360021111972).

## Limitations

If your registrar does not support DNSSEC with Cloudflare's preferred cipher choice (Algorithm 13), you have several options:

*   Contact your registrar to ask for DNSSEC with modern encryption.
*   Transfer your domain to a different registrar that supports DNSSEC with Algorithm 13
*   File a [complaint with ICANN](https://forms.icann.org/en/resources/compliance/complaints/registrars/standards-complaint-form), citing your registrar's lack of compliance.

If your top-level domain does not support DNSSEC with Algorithm 13, [contact that top-level domain](https://www.iana.org/domains/root/db).
