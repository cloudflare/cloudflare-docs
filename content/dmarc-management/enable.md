---
title: Enable DMARC Management (beta)
weight: 2
pcx_content_type: how-to
---

{{<beta>}}Enable DMARC Management{{</beta>}}

Before enabling DMARC Management, note that it does not support subdomains. You can only use it with your primary domain on [each zone](/fundamentals/get-started/concepts/accounts-and-zones/) of your Cloudflare account.

{{<Aside type="warning" header="A warning on DMARC Management and SPF records">}}
DMARC Management does not support actions on SPF records when your zone has a CNAME record that points to a different domain. Changing the SPF record would make DMARC rules invalid, as Cloudflare cannot change other DNS records to reflect your updates.
{{</Aside>}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Email** > **DMARC Management**.
3. Select **Enable DMARC reports**.
4. DMARC Management will scan your zone for DMARC records. 

    1. If no record is found, Cloudflare will automatically invite you to add one that you can edit later. Select **Add** to continue.
    2. If there is a DMARC record in your zone, Cloudflare will add another `rua` entry to it. This additional `rua` tag has a Cloudflare email address and is needed for Cloudflare to be able to start processing DMARC reports on your behalf. <br /> Select **Next** to continue.

DMARC Management (beta) is now active. However, it may take up to 24 hours to receive your first DMARC report and to display this information in DMARC Management. 

{{<Aside type="note">}}SPF flattening is done automatically as needed when SPF records are changed by Cloudflare DMARC Management.{{</Aside>}}