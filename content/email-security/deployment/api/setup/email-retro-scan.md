---
title: Email Retro Scan
pcx_content_type: how-to
weight: 5
---

# Email Retro Scan

Email Retro Scan allows you to scan up to 14 days of old messages in your Office 365 (O365) inboxes and check if your current email security solution missed any threats. Contact your account manager to enable this feature.

{{<render file="deployment/_o365-gcc.md">}}

## Scan for threats

To scan for threats in your Office 365 inbox:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Area 1** > **Retro Scan**.
3. Select **Generate Retro Scan report**.
4. Cloudflare needs authorization to access your O365 messages. Select **Authenticate with Microsoft**, and give Cloudflare the required permissions.
5. Back to Cloudflare dashboard, select **Grant mail access**. Then, select your account and give Cloudflare the required permissions.
6. Finally, select **Grant directory sync access**. Then, select your account and give Cloudflare the required permissions.
7. Select **Continue**.
8. In **Configure report**, choose one or more domains to scan.
9. Choose your current email security system, from **Current email security system**.
10. Select **Continue**.
11. Cloudflare will begin the task of analyzing all your emails for the chosen domains. This might take some time depending on the size of the inbox and number of domains chosen. You do not need to wait for the scan to complete. Cloudflare will send you an email alert when the scan is complete. If you decide to wait, select **View report** when the scan finishes.

## Analyze results

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Area 1** > **Retro Scan**.
3. Select **Scan report**. This tab shows the total number of emails scanned, a breakdown of the [threat types](/email-security/reference/dispositions-and-attributes/) found within the domains selected, the [top targeted employees](/email-security/email-configuration/enhanced-detections/business-email-compromise/), and the most common places where threats originate from.
4. To create an offline copy of the threat report, select **Download Report**.
5. Select **View detections** to inspect emails found by Retro Scan. You can filter emails by threat type (for example, malicious).