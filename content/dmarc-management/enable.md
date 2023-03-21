---
title: Enable DMARC Management
weight: 2
pcx_content_type: how-to
---

# Enable DMARC Management

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Email** > **DMARC Management**.
3. Select **Enable DMARC reports**.
4. DMARC Management will scan your zone for DMARC records. 
    
    1. If no record is found, Cloudflare will automatically invite you to add one that you can edit later. Select **Add** to continue.
    2. If there is a DMARC record in your zone, Cloudflare will add a `rua` entry to it. This is needed for Cloudflare to be able to start processing DMARC reports on your behalf. Select **Next** to continue.

    {{<Aside type="note">}}When DMARC Management finds a DMARC record in your zone, it adds another `rua` tag to it. This additional tag has a Cloudflare email address to properly process your DMARC reports.{{</Aside>}}


DMARC Management is now active. However, it may take up to 24 hours to receive your first DMARC report and to display this information in DMARC Management. 
