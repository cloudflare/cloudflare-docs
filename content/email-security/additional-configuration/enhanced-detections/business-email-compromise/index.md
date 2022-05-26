---
title: Business email compromise (BEC)
pcx-content-type: concept
weight: 1
layout: single
---

# Business email compromise (BEC)

Attackers often try to impersonate executives within an organization when sending malicious emails (banking information, trade secrets, and more).

The **Business email compromise (BEC)** feature protects against these type of attacks by adding [an attribute](/email-security/reference/dispositions-and-attributes/#attributes) to any spoofed email messages matching these sensitive email addresses.

## Setup

You have several options for adding email addresses to BEC protection.

### Using the dashboard

Using the dashboard, you can add email addresses indivdually or upload a CSV file:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Enhanced Detections**.
4. Click **New Display Name**.
5. Enter an email address manually or upload a CSV file.

{{<Aside type="note">}}

The CSV file should be smaller than 150 KB, start with a header row of **Display_Name**, **Email**, and contain no additional fields.

{{</Aside>}}

### Integrating a directory

Area 1 also supports directory integration for Microsoft and Gmail:

- [Microsoft Directory Guide](/email-security/static/O365-Directory-Integration-Guide.pdf)
- [Gmail Directory Guide](#link-needed)