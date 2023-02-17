---
pcx_content_type: reference
title: Integration Profiles
weight: 1
---

# Integration Profiles

Cloudflare One DLP integration profiles enable data loss prevention support for third-party data classification providers. Data classification information is retrieved from the third-party platform and populated into a DLP Profile. The profile can they be used for DLP scanning.

Entries in integration profiles are managed by the third-part platform and cannot be manually added, edited, or deleted within Cloudflare DLP. 

## Microsoft Information Protection (MIP) Sensitivity Labels

Microsoft provides [MIP sensitivity labels](https://learn.microsoft.com/en-us/microsoft-365/compliance/sensitivity-labels?view=o365-worldwide) to classify and protect sensitive data. 

### Prerequisite

MIP label support requires a [CASB Microsoft Integration](https://developers.cloudflare.com/cloudflare-one/applications/scan-apps/casb-integrations/microsoft-365/)

### Setup

To add the labels to a DLP profile, first integrate your Microsoft account with [Cloudflare CASB](https://developers.cloudflare.com/cloudflare-one/applications/scan-apps/). You will be prompted to provide a name for the integration during setup. If you have Information Protection labels configured, Cloudflare will automatically retrieve the labels from your account.

Once integrated, a new Integration profile is available within Cloudflare DLP. The profile is named "MIP Sensitivity Labels" followed by your integration name. If you integrate with multiple Microsoft accounts, the name designates the labels origian account.

Enable the desired entries in the profile to utilize them in DLP scanning.

### Syncing

Allow 24 hours for label additions and edits in your Microsoft account to propagate to Cloudflare DLP. At this time, deletions in your Microsoft account will not delete entries in your Cloudflare DLP Profile.