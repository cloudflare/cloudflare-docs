---
title: Retract settings
pcx_content_type: how-to
weight: 5
---

# Retract settings

When you are using an [API setup](/email-security/deployment/api/) for Area 1, you cannot prevent mail from reaching a recipient's mailbox.

However — so long as you also have [journaling](/email-security/deployment/api/setup/#journaling-setup), [BCC](/email-security/deployment/api/setup/#bcc-setup) or [MS Graph](/email-security/deployment/api/setup/office365-graph-api/) configured — you can set up message retraction to take post-delivery actions against suspicious messages. These retractions happen through API integrations with Microsoft 365 and Google Workspaces (Gmail).

## Retraction options

Once you set up retraction, you can retract messages manually or set up automatic retractions to move messages matching certain dispositions to specific folders within a user’s mailbox. Refer to [Gmail](/email-security/email-configuration/retract-settings/gmail-retraction/) and [Office 365](/email-security/email-configuration/retract-settings/office365-retraction/) guides for detailed information regarding these options.