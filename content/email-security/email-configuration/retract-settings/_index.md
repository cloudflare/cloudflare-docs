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

## Retraction metrics

Setting up retraction also gives you access to metrics regarding this feature. After logging in to your Area 1 dashboard, search for the **Retractions** card. Metrics for retractions include information such as:

- **Total retractions**: The total amount of retractions performed.
- **Success**: Shows the percentage of messages Area 1 was able to find and retract successfully.
- **Fail**: Shows the percentage of messages Area 1 was not successfully able to retract. Reasons for failure include:
    - The user has already deleted or marked the message as junk, either manually or via a mailbox filter.
    - The specific copy of the message being retracted was sent to a distribution list address that may not exist as a mailbox, and so retraction will fail. Separate copies of the message that are sent to each member of that distribution list will be retracted.
    - The retraction is not, or is no longer, authorized.
- **Unread/Read**: Refers to the state of the message at the time it was retracted. For automated retractions, Area 1 tries to perform retraction as quickly as possible so the user has no time to see or open the message. Manual retraction might happen at a later time, and so the messages are more likely to have already been read.
- **Auto/Manual**: Refers to the percentage of messages retracted through the auto/manual modes.

Selecting **View details** will perform a search for retracted emails for the selected time interval.