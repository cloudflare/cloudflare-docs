---
pcx_content_type: concept
title: Exact Data Match
weight: 3
layout: single
---

# Exact Data Match

Exact Data Match (EDM) allows you to scan your web traffic and SaaS applications for specific data defined in a custom dataset, such as names, addresses, phone numbers, credit card numbers, and more.

All data in the uploaded spreadsheet is hashed before reaching Cloudflare. Traffic is compared to these hashes to detect matches.

## Prepare a dataset

To prepare a dataset for EDM, input your desired data to a single-column spreadsheet. Spreadsheets can contain a maximum of 1,000 cells and should not contain a title cell.

Accepted file formats for datasets include CSV and TXT.

## Upload a new dataset

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP datasets**.
2. Select **Create new dataset**.
3. Upload a dataset.
4. Select **Save**.

To use this dataset, add it as an existing entry to a [custom DLP profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/#build-a-custom-profile).

## Manage existing datasets

Because they are encrypted, EDM datasets are read-only. To update a dataset, you must upload a new file.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP datasets**.
2. Select the dataset you want to update.
3. Select **Upload new file** and choose your updated dataset.
4. Select **Save**.

Upon saving, your new dataset will replace your old one.
