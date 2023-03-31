---
pcx_content_type: how-to
title: DLP logs
weight: 5
layout: single
---

# DLP logs

DLP logs allow you to monitor the movement of sensitive data through your network. When an HTTP request matches a DLP policy, the request will appear in the [Gateway activity log](/cloudflare-one/analytics/logs/gateway-logs/).

Logs are enabled by default for both allowed and blocked requests. To change your logging preferences, go to **Settings** > **Network** > **Activity logging**.

## View DLP logs

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Logs** > **Gateway** > **HTTP**.
2. Select **Filter**.
3. Choose an item under one of the following filters:
   - **DLP Profiles** shows the requests which matched a specific DLP profile.
   - **Policy** shows the requests which matched a specific DLP policy.

You can expand an individual row to view details about the request. To see the data that triggered the DLP policy, [configure payload logging](/cloudflare-one/policies/data-loss-prevention/dlp-logs/payload-logging/).

{{<beta heading="h2">}}Report false positives{{</beta>}}

1. Select the log you want to report.
2. Select **Report DLP false positive** under **DLP details**.
3. The information to be sent to Cloudflare will appear. To confirm your report, select **Send report**.

Cloudflare will not respond directly to your report, but reporting false positives helps us improve our products. If you require technical assistance, reach out to [support](https://dash.cloudflare.com/?to=/:account/support).
