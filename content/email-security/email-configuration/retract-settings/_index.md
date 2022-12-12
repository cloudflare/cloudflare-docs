---
title: Retract settings
pcx_content_type: how-to
weight: 5
---

# Retract settings

When you are using an [API setup](/email-security/deployment/api/) for Area 1, you cannot prevent mail from reaching a recipient's mailbox.

However — so long as you also have [**Journalling**](/email-security/deployment/api/setup/#journalling-setup) configured — you can set up **Message retraction** to take post-delivery actions against suspicious messages. These retractions happen through API integrations with Microsoft 365 and Google Workspaces (Gmail).

## Retraction options

Once you set up retraction, you can retract messages manually or set up automatic retractions.

### Manual retraction

To retract individual messages, locate the message in [Mail trace](/email-security/reporting/mailtrace/) and retract the message. Refer to [Gmail](/email-security/email-configuration/retract-settings/gmail-retraction/) and [Office 365](/email-security/email-configuration/retract-settings/office365-retraction/) guides for detailed information on how to manually retract email messages.

### Automatic retraction

You can set up auto-retraction to automatically move messages matching certain dispositions to specific folders you within a user's mailbox. Refer to [Gmail](/email-security/email-configuration/retract-settings/gmail-retraction/) and [Office 365](/email-security/email-configuration/retract-settings/office365-retraction/) guides for detailed information on how to set up automatic retraction.