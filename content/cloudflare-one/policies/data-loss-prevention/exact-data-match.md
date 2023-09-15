---
pcx_content_type: concept
title: Exact Data Match
weight: 3
layout: single
---

{{<beta>}}Exact Data Match{{</beta>}}

Exact Data Match (EDM) allows you to scan your web traffic and SaaS applications for specific data defined in a custom dataset, such as names, addresses, phone numbers, credit card numbers, and more.

All data in uploaded datasets is encrypted before reaching Cloudflare. To detect matches, Cloudflare hashes traffic and compares it to hashes from your dataset.

## Prepare a dataset

To prepare a dataset for EDM, add your desired data to a single-column spreadsheet. Spreadsheets can contain a maximum of 100,000 cells.

Cells must be at least six characters long. Title cells may result in false positives and should not be included.

Accepted file formats include CSV and TXT.

## Upload a new dataset

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP datasets**.
2. Select **Create new dataset**.
3. Upload your dataset.
4. Select **Save**.

To use this dataset, add it as an existing entry to a [custom DLP profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/#build-a-custom-profile).

## Manage existing datasets

Uploaded EDM datasets are encrypted and read-only. To update a dataset, you must upload a new file.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP datasets**.
2. Select the dataset you want to update.
3. Select **Upload new file** and choose your updated dataset.
4. Select **Save**.

Your new dataset will replace the original dataset.
