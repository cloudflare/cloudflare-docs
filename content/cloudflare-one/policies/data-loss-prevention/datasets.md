---
pcx_content_type: concept
title: DLP datasets
weight: 3
---

# DLP datasets

Cloudflare DLP can scan your web traffic and SaaS applications for specific data defined in a custom dataset. Sensitive data can be hashed before reaching Cloudflare and redacted from matches in [payload logs](/cloudflare-one/policies/data-loss-prevention/dlp-policies/payload-logging/).

## DLP dataset types

### Exact Data Match

Exact Data Match (EDM) protects sensitive information, such as names, addresses, phone numbers, and credit card numbers.

All data in uploaded EDM datasets is encrypted before reaching Cloudflare. To detect matches, Cloudflare hashes traffic and compares it to hashes from your dataset. Matched data will be redacted in payload logs.

### Custom Wordlist

Custom Wordlist (CWL) protects non-sensitive data, such as intellectual property and SKU numbers.

Cloudflare stores data from CWL datasets within DLP. Plaintext matches appear in payload logs.

## Use DLP datasets

### Prepare a dataset

To prepare a dataset for DLP, add your desired data to a single-column spreadsheet. Each line must be at least six characters long. Entries do not require trailing or final commas. Title cells may result in false positives and should not be included. 

For compatibility, save your file in either `.csv` or `.txt` format with LF (`\n`) newline characters. DLP does not support CRLF (`\r\n`) newline characters.

For information on dataset limits, refer to [Account limits](/cloudflare-one/account-limits/#data-loss-prevention-dlp).

### Upload a new dataset

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP datasets**.
2. Select **Create new dataset**.
3. Upload your dataset.
4. Choose whether your dataset will be an **Exact Data Match dataset** (hashed) or a **Custom Wordlist dataset** (cleartext).
5. Select **Save**.

To use this dataset, add it as an existing entry to a [custom DLP profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/#build-a-custom-profile).

### Manage existing datasets

Uploaded DLP datasets are read-only. To update a dataset, you must upload a new file to replace the original.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP datasets**.
2. Select the dataset you want to update.
3. Select **Upload new file** and choose your updated dataset.
4. Select **Save**.

Your new dataset will replace the original dataset.
