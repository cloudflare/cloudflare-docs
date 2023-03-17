---
title: Manage sources
weight: 3
pcx_content_type: how-to
---

# Manage sources

You can approve sources to send emails from your domain. If you mark a source as **approved**, that source will be added to your SPF record automatically. On the other hand, if you mark it as **unapproved**, it will be automatically deleted from your SPF record. When you feel confident that you have covered every source that is legitimately sending emails from your domain, Cloudflare can help you set your DMARC policy to **quarantine** or **reject**, so that potential targets stop receiving emails from impersonators.

Under **Top 10 Sources** you have access to lists of approved or unapproved sources sending email on your behalf, and how they fared relative to different policies. 

To approve or disallow a third party source:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Email** > **DMARC Management**.
3. Go to **Top 10 sources**.
4. Select the **Approved** or **Unapproved** columns depending on whether you want to check for sources that are approved or unapproved to send emails from your domain.
5. Find the third party you want to change, and select the three dots next to it.
6. Select **Mark as approved** or **Mark as unapproved**.
7. Confirm your choice.

{{<Aside type="note">}}
Sources in the unapproved list are not blocked from sending emails from your domain. Inbound email security solutions may block or quarantine those emails due to failing SPF, and setting a DMARC policy to reject will request receiving servers to reject messages from these unapproved senders. Refer to [DMARC.org](https://dmarc.org/) for more information.
{{</Aside>}}