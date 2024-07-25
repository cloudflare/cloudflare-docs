---
title: Setup
pcx_content_type: navigation
weight: 1
meta:
   title: Setup - API deployment
---

# API deployment setup

{{<Aside type="warning" header="Area 1 has been renamed">}}

{{<render file="rename-area1-to-ces.md">}}

{{</Aside>}}

When you first get started with Cloud Email Security (formerly Area 1), you will need to set up a way to connect your current mail environment with Cloud Email Security.

## BCC setup

Send messages to Cloud Email Security via BCC configurations within your email provider:

   - [Google Workspace BCC setup](/email-security/deployment/api/setup/gsuite-bcc-setup/)
   - [Microsoft Exchange BCC setup](/email-security/deployment/api/setup/exchange-bcc-setup/)

## Journaling setup

 Send messages to Cloud Email Security via a Journaling configuration within your email provider:

   - [Office 365 journaling setup](/email-security/deployment/api/setup/office365-journaling/)

## Microsoft Graph API

Send messages to Cloud Email Security via a Microsoft Graph API configuration within your email provider:
 
 - [Office 365 Microsoft Graph API setup](/email-security/deployment/api/setup/office365-graph-api/)

## Next steps

Regardless of your setup (BCC, journaling or MS Graph API), you may also want to set up either manual or automatic [retraction](/email-security/email-configuration/retract-settings/) to take post-delivery actions against suspicious messages.