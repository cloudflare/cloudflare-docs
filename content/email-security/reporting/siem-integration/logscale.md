
## Webhook examples

### Crowdstrike Falcon LogScale

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** > **Domains & Routing** > **Alert Webhooks**.
4. Select **New Webhook**.
5. In an **App Type**, select **SIEM**.
6. Choose _Crowdstrike_ from the dropdown, and paste your ingest token into the **Auth Code** section
7. In Target, paste following URL: `https://cloud.community.humio.com/api/v1/ingest/hec/raw`
8. Select **Publish Webhook**.