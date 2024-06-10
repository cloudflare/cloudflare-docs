---
title: SIEM integration
pcx_content_type: integration-guide
weight: 3
meta:
    description: SIEM integrations allow you to view message-level information outside of the dashboard and create your own custom reports.
updated: 2022-07-14
---

# SIEM integration

{{<Aside type="warning" header="Area 1 has been renamed">}}

{{<render file="rename-area1-to-ces.md">}}

{{</Aside>}}

With a bit of configuration, you can also bring Cloud Email Security (formerly Area 1) data into your {{<glossary-tooltip term_id="SIEM">}}Security Information and Event Management (SIEM){{</glossary-tooltip>}} tools to view message-level information outside of the dashboard and create your own custom reports.

## Connect a SIEM tool

The following steps are required to connect your SIEM tool.

### 1. Set up your SIEM tool

For help setting up the proper configuration in your SIEM tool, refer to the following guides:

{{<directory-listing showDescriptions=true >}}

### 2. Create a webhook

Refer to [Alert webhooks](/email-security/email-configuration/domains-and-routing/alert-webhooks/) to learn how to create a webhook and send data into your SIEM tool.