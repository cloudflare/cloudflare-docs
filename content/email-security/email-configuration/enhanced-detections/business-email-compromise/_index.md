---
title: Business email compromise (BEC)
pcx_content_type: concept
weight: 1
layout: single
---

# Business email compromise (BEC)

Attackers often try to impersonate executives within an organization when sending malicious emails (with requests about banking information, trade secrets, etc.).

The **Business email compromise (BEC)** feature protects against these attacks by adding [an attribute](/email-security/reference/dispositions-and-attributes/#attributes) to any spoofed email messages matching these sensitive email addresses.

## Setup

You have several options for adding email addresses to BEC protection.

### Using the dashboard

Using the dashboard, you can add email addresses indivdually or upload a CSV file:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Enhanced Detections**.
4. Select **New Display Name**.
5. Enter an email address manually or upload a CSV file.

#### CSV uploads

You can also upload a CSV file of multiple email addresses. The CSV file must be smaller than 150 KB, start with a header row of all required values, and contain no additional fields.

An example file would look like this:

```txt
Display_Name, Email
Star Phish, star@nophish.com
Phish Ee, phishee@nophish.com
```

### Integrating a directory

If you want your BEC contacts automatically synced, Area 1 also supports directory integration for Microsoft and Gmail. Refer to [Office 365 directory guide](/email-security/email-configuration/enhanced-detections/business-email-compromise/o365-directory-guide/) and [Google Workspaces directory integration](/email-security/email-configuration/enhanced-detections/business-email-compromise/gworkspaces-directory-guide/) for more information.