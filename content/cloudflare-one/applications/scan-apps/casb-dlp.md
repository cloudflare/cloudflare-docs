---
pcx_content_type: concept
title: Scan for sensitive data
weight: 5
layout: single
---

# Scan SaaS applications with DLP

{{<Aside type="note">}}

Requires Cloudflare CASB and Cloudflare DLP.

{{</Aside>}}

You can use [Cloudflare Data Loss Prevention (DLP)](/cloudflare-one/policies/data-loss-prevention/) to discover if files stored in your SaaS application contain sensitive data.
To perform DLP scans in a SaaS app, first configure a DLP profile with the data patterns you want to detect, then enable those profiles in a CASB integration.

## Configure a DLP profile

Refer to the [DLP documentation](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/).

## Enable DLP scans in CASB

### Add a new integration

1. In the [Zero Trust dashboard](https://one.dash.cloudflare.com/), go to **CASB** > **Integrations**.
2. Select **Add integration** and choose a [supported integration](#supported-integrations).
3. During the setup process, you will be prompted to select DLP profiles for the integration.
4. Select **Save integration**.

CASB will scan every publicly accessible file in the integration for text that matches the DLP profile. The initial scan may take up to a few hours to complete.

### Modify an existing integration

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **CASB** > **Integrations**.
2. Choose a [supported integration](#supported-integrations) and select **Configure**.
3. Under **DLP profiles**, select the profiles that you want the integration to scan for.
4. Select **Save integration**.

If you enable a DLP profile from the **Manage integrations** page, CASB will only scan publicly accessible files that have had a modification event since enabling the DLP profile. Modification events include changes to the following attributes:

- Contents of the file
- Name of the file
- Visibility of the file (only if changed to publicly accessible)
- Owner of the file
- Location of the file (for example, moved to a different folder)

In order to scan historical data, you must enable the DLP profile during the [integration setup flow](#add-a-new-integration).

## Supported integrations

- [Google Workspace](/cloudflare-one/applications/scan-apps/casb-integrations/google-workspace/)

## Limitations

DLP will only scan:
- Files that are visible to anyone on the Internet.
- [Text-based files](/cloudflare-one/policies/data-loss-prevention/#supported-file-types) such as documents, spreadsheets, and PDFs. Images are not supported.
- Files ≤ 100 MB.
