---
title: 3 - Junk email and administrative quarantine
pcx_content_type: tutorial
weight: 3
meta:
    title: Junk email and administrative quarantine - Office 365
updated: 2023-01-12
---

# Deliver emails to the junk email folder and administrative quarantine

In this tutorial, you will learn how to deliver `SUSPICIOUS` and `BULK` messages to the users’s junk email folder, and `MALICIOUS`, `SPAM`, and `SPOOF` messages to the administrative quarantine (this requires an administrator to release the emails).

## Configure domains

{{<render file="_o365-use-case-configure-domain.md" withParameters="Do not check any dispositions.">}}

## Create quarantine policies

{{<render file="_o365-use-case-1-3-create-quarantine-policy.md">}}

## Configure quarantine notifications

{{<render file="_o365-use-case-configure-quarantine-notifications.md">}}

## Configure anti-spam policies

{{<render file="_o365-use-cases-antispam.md" withParameters="_UserNotifyAdminRelease_;;_UserNotifyAdminRelease_;;_UserNotifyAdminRelease_;;step7-spam.png">}}

## Create transport rules

{{<render file="_o365-use-case-transport-rules.md" withParameters="`Area 1 Deliver to Junk Email folder`;;`SUSPICIOUS`, `BULK`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_;;step4-rules.png;;`Area 1 User Quarantine Message`;;`MALICIOUS`, `UCE`, `SPOOF`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _9_;;step10-user-quarantine.png">}}