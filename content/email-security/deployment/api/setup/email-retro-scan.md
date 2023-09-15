---
title: Email Retro Scan
pcx_content_type: how-to
weight: 5
---

# Cloudflare Email Retro Scan

Cloudflare Area 1 Retro Scan allows you to scan up to seven days of old messages in your Office 365 (O365) inboxes, and check if your current email security solution missed any threats.

## Scan for threats

To scan for threats in your Office 365 inbox:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Area 1**, and select **Generate Retro Scan report**.
3. Cloudflare needs authorization to access your O365 messages. Select **Authorize Mail Access** and **Authorize Directory Synchronization**. This is needed so Cloudflare can read your emails and your Microsoft Active Directory. This last authorization allows us to understand which users are in the organization, as well as which groups they belong to.
4. Select **Next** to continue.
5. In **Scan parameters**, choose one or more domains to scan.
6. Choose your email security system, from **Current email security system**.
7. Select **Initiate Retro Scan**.
8. Cloudflare will begin the task of analyzing all your emails for the domains chosen. This might take some time depending on the size of the inbox and number of domains chosen. Cloudflare will send you an email alert when the scan is complete. If you decide to wait, select **View report** when the scan is complete.

## Analyze results

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Area 1** > **Retro Scan**.
3. Select **Scan report**. This tab shows the total number of emails scanned, a breakdown of the [threat types](/email-security/reference/dispositions-and-attributes/) found within the domains selected, the [top targeted employees](/email-security/email-configuration/enhanced-detections/business-email-compromise/), and the most common places where threats originate from.
4. To create an offline copy of the threat report, select **Download Report**.
5. Select **View detections** to inspect emails found by Retro Scan. You can filter emails by threat type (for example, malicious).