---
title: 5 - Junk email folder and administrative quarantine
pcx_content_type: tutorial
weight: 5
meta:
    title: Deliver emails to the junk email folder - Office 365
updated: 2023-01-12
---

# Deliver emails to the junk email folder and administrative quarantine

In this tutorial, you will learn to deliver `SUSPICIOUS` and `BULK` messages to the user’s junk email folder, and `MALICIOUS`, `SPAM`, and `SPOOF` messages to the Administrative Quarantine (this requires an administrator to release the emails).

## Configure domains

{{<render file="_o365-use-case-configure-domain.md" withParameters="Do not check any dispositions.">}}

## Configure anti-spam policies

{{<render file="_o365-use-cases-antispam.md" withParameters="_AdminOnlyAccessPolicy_;;_AdminOnlyAccessPolicy_;;_AdminOnlyAccessPolicy_;;step7-adminonly-case5.png">}}

## Create transport rules

{{<render file="_o365-use-case-transport-rules.md" withParameters="`Area 1 Deliver to Junk Email folder`;;`SUSPICIOUS`, `BULK`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_;;step4-rules.png;;`Area 1 Admin Managed Host Quarantine`;; `MALICIOUS`, `UCE`, `SPOOF`;;_Redirect the message to_ > _hosted quarantine_;;step10-hosted-quarantine-case5.png">}}