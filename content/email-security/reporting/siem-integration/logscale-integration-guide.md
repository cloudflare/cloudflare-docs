---
title: LogScale
pcx_content_type: tutorial
meta:
    description: Falcon LogScale integration guide
updated: 2023-08-04
---
# Crowdstrike Falcon LogScale

For this tutorial, you will need a working Falcon LogScale account. You will also need to create a new Ingest Token in your LogScale account. Ingest Tokens identify repositories and are used to configure data ingestion to your repository. Refer to [Falcon LogScale documentation](https://library.humio.com/falcon-logscale-cloud/ingesting-data-tokens.html) for more information.

After creating your Ingest Token:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** > **Domains & Routing** > **Alert Webhooks**.
4. Select **New Webhook**.
5. In an **App Type**, select **SIEM**.
6. Choose _Crowdstrike_ from the dropdown, and paste your Ingest Token into the **Auth Code** section.
7. In Target, paste the URL `https://cloud.community.humio.com/api/v1/ingest/hec/raw`.
8. Select **Publish Webhook**.