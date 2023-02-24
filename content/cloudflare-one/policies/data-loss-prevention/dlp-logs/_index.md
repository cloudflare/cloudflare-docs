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

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Logs** > **Gateway** > **HTTP**.
2. Select **Filter**.
3. Choose an item under one of the following filters:
    * **DLP Profiles** shows the requests which matched a specific DLP profile.
    * **Policy** shows the requests which matched a specific DLP policy.

You can expand an individual row to view details about the request. To see the data that triggered the DLP policy, [configure payload logging](/cloudflare-one/policies/data-loss-prevention/dlp-logs/payload-logging/).
