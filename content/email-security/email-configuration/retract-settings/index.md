---
title: Retract settings
pcx_content_type: navigation
weight: 5
---

# Retract settings

When you are using an [API setup](/email-security/deployment/api/) for Area 1, you cannot prevent mail from reaching a recipient's mailbox.

However — so long as you also have [**Journalling**](/email-security/deployment/api/setup/#journalling-setup) configured — you can set up **Message retraction** to take post-delivery actions against suspicious messages. These retractions happen through API integrations with Microsoft 365 and Google Workspaces (Gmail).

## Retraction options

Once you [set up retraction](#setup-guides), you can retract messages manually or set up automatic retractions.

### Manual retraction

To retract individual messages, locate the message in [Mail trace](/email-security/reporting/mailtrace/) and retract the message.

### Automatic retraction

You can also set up auto-retraction to automatically move messages matching certain dispositions to specific folders you within a user's mailbox.

To set up automatic retraction:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Retract Settings** > **Auto-Retract**.
4. Click **Edit**. 
5. For each disposition, choose which folder the message should be sent to:

    - **No Action**: Do not move the message.
    - **Junk Email**: Send the message to the junk or spam email folder.
    - **Trash**: Send the message to the trash or deleted items email folder.
    - **Soft Delete (User Recoverable)** (Microsoft only): Located within the user's **Deleted Items** folder and can be recovered by the user.
    - **Hard Delete (Admin Recoverable)** (Microsoft only): Completely removed from a user's inbox and cannot be recovered without using the [admin eDiscovery feature](https://docs.microsoft.com/en-us/microsoft-365/compliance/ediscovery?view=o365-worldwide&viewFallbackFrom=o365-worl).

6. Click **Update Auto-retract Settings**.

## Setup guides

For more details, refer to:

- [Retraction Guide for Gmail](/email-security/static/Gmail-Message-Retraction.pdf)
- [Retraction Guide for Office 365](/email-security/static/O365-Message-Retraction.pdf)
