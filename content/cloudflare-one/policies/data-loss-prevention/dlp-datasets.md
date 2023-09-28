---
pcx_content_type: concept
title: DLP datasets
weight: 3
layout: single
---

{{<heading-pill style="beta">}}DLP datasets{{</heading-pill>}}

Cloudflare DLP can scan your web traffic and SaaS applications for specific data defined in a custom dataset.

## DLP dataset types

### Exact Data Match

Exact Data Match (EDM) protects sensitive information, such as names, addresses, phone numbers, and credit card numbers.

All data in uploaded EDM datasets is encrypted before reaching Cloudflare. To detect matches, Cloudflare hashes traffic and compares it to hashes from your dataset. Data will not appear in payload logs.

### Custom Wordlist

Custom Wordlist (CWL) protects non-sensitive data, such as intellectual property and SKU numbers.

Cloudflare stores data in CWL datsets and reveals matches in plaintext in payload logs.

## Use DLP datasets

### Prepare a dataset

To prepare a dataset for DLP, add your desired data to a single-column spreadsheet. Custom wordlists can have up to 200 keywords in a single column each. EDM spreadsheets can contain a maximum of 100,000 cells.

Cells must be at least six characters long. Title cells may result in false positives and should not be included.

Accepted file formats include CSV and TXT.

### Upload a new dataset

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP datasets**.
2. Select **Create new dataset**.
3. Upload your dataset.
4. Choose whether your dataset will be an **Exact Data Match dataset** (hashed) or a **Custom Wordlist dataset** (plaintext).
5. Select **Save**.

To use this dataset, add it as an existing entry to a [custom DLP profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/#build-a-custom-profile).

### Manage existing datasets

Uploaded DLP datasets are read-only. To update a dataset, you must upload a new file.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP datasets**.
2. Select the dataset you want to update.
3. Select **Upload new file** and choose your updated dataset.
4. Select **Save**.

Your new dataset will replace the original dataset.
