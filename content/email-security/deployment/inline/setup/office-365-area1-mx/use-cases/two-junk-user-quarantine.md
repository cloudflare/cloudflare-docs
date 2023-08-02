---
title: 2 - Junk email and user managed quarantine
pcx_content_type: tutorial
weight: 2
meta:
    title: Junk email and user managed quarantine - Office 365
updated: 2023-01-12
---

# Deliver emails to the junk email folder and user managed quarantine

In this tutorial, you will learn how to deliver `SUSPICIOUS` and `BULK` messages to the user’s junk folder, and `SPAM` and `SPOOF` messages to the user managed quarantine.

## Configure domains

{{<render file="_o365-use-case-configure-domain.md" withParameters="Only `MALICIOUS` should be checked.">}}

## Create quarantine policies

{{<render file="_o365-use-case-2-4-create-quarantine-policy.md">}}

## Configure quarantine notifications

{{<render file="_o365-use-case-configure-quarantine-notifications.md">}}

## Configure anti-spam policies

{{<render file="_o365-use-cases-antispam.md" withParameters="_UserNotifyUserRelease_;;_UserNotifyAdminRelease_;;_UserNotifyAdminRelease_;;case2-step7-spam.png">}}

## Create transport rules

{{<render file="_o365-use-case-transport-rules.md" withParameters="`Area 1 Deliver to Junk Email folder`;;`SUSPICIOUS`, `BULK`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_;;step4-rules.png;;`Area 1 User Quarantine Message`;;`UCE`, `SPOOF`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _9_;;step10-user-quarantine.png">}}