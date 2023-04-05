---
pcx_content_type: concept
title: Integration profiles
weight: 4
---

# Integration profiles

{{<Aside type="note">}}
Integration profiles require [Cloudflare CASB](/cloudflare-one/applications/scan-apps/).
{{</Aside>}}

Cloudflare DLP integration profiles enable data loss prevention support for third-party data classification providers. Data classification information is retrieved from the third-party platform and populated into a DLP Profile. You can then enable detection entries in the profile and create a DLP policy to allow or block matching data.

Detection entries in integration profiles are managed by the third-party platform and cannot be manually added, edited, or deleted within Cloudflare DLP.

## Microsoft Information Protection (MIP) sensitivity labels

Microsoft provides [MIP sensitivity labels](https://learn.microsoft.com/en-us/microsoft-365/compliance/sensitivity-labels?view=o365-worldwide) to classify and protect sensitive data.

### Setup

To add MIP sensitivity labels to a DLP Profile, simply integrate your Microsoft account with [Cloudflare CASB](/cloudflare-one/applications/scan-apps/casb-integrations/microsoft-365/). A new integration profile will appear under **DLP** > **DLP Profiles**. The profile is named **MIP Sensitivity Labels** followed by the name of the CASB integration.

MIP sensitivity labels can also be added to a [custom DLP profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/#build-a-custom-profile) as an existing entry.

### Syncing

Allow 24 hours for label additions and edits in your Microsoft account to propagate to Cloudflare DLP. At this time, deletions in your Microsoft account will not delete entries in your Cloudflare DLP Profile.
