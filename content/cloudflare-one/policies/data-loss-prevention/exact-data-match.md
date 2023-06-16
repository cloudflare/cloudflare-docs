---
pcx_content_type: concept
title: Exact Data Match
weight: 3
layout: single
---

# Exact Data Match

Exact Data Match (EDM) allows you to scan your web traffic and SaaS applications for specific data defined in a custom dataset. This data can be sensitive information such as customer names, addresses, phone numbers, credit card numbers, and more.

All data in the uploaded spreadsheet is protected with a one-way hash.

## Create a dataset

### Specifications

Uploaded datasets can be a TXT or CSV file.

When converting from a spreadsheet, you must remove column names.

### Upload a dataset

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP datasets**.
2. Select **Create new dataset**.
3. Upload a dataset.
4. Select **Save**.

You can now add this dataset as an existing entry to a [custom DLP profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/#build-a-custom-profile).

### Manage datasets

Because they are encrypted, EDM datasets are read-only. To update a dataset, you must upload a new file.
