---
title: Manage sources
weight: 4
pcx_content_type: how-to
---

# Manage sources

You can approve sources to send emails from your domain: 
- If you mark a source as **Approved**, Cloudflare will include the IP ranges for that source in your SPF record and flatten as needed.
- If you mark a source as **Unapproved**, Cloudflare it will delete the IP ranges for that source from your SPF record.

When you feel confident that you have covered every source that is legitimately sending emails from your domain, Cloudflare can help you set your DMARC policy to **quarantine** or **reject**, so that potential targets stop receiving emails from impersonators.

To approve or disallow a third party source:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Email** > **DMARC Management**.
3. Go to **Top 10 sources** > **View all**.
4. Select the **Approved** or **Unapproved** tabs depending on whether you want to check for sources that are approved or unapproved to send emails from your domain.
5. Find the third party you want to change, and select the three dots next to it.
6. Select **Mark as approved** or **Mark as unapproved**.
7. Confirm your choice.

{{<Aside type="note">}}
Sources in the unapproved list are not blocked from sending emails from your domain. Inbound email security solutions may block or quarantine those emails due to failing SPF, and setting a DMARC policy to reject will request receiving servers to reject messages from these unapproved senders. Refer to [DMARC.org](https://dmarc.org/) for more information.
{{</Aside>}}