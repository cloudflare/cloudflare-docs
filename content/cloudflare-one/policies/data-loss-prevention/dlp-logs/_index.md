---
pcx_content_type: how-to
title: View DLP logs
weight: 3
---

# View DLP logs

When an HTTP request matches a DLP policy, the request will appear in the [Gateway Activity log](/cloudflare-one/analytics/logs/gateway-logs/#http-logs).

To view DLP logs:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **Network**.
2. Verify that **Activity logging** is turned on, and check that **Gateway HTTP logs** is set to capture traffic.
3. Next, go to **Logs** > **Gateway** > **HTTP**.
4. Select **Filter**.
5. Choose an item under one of the following filters:
    * **DLP Profiles** - shows the requests which matched a specific DLP profile.
    * **Policy** - shows the requests which matched a specific DLP policy.

You can expand an individual row to view details about the request.