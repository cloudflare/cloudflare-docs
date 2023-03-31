---
pcx_content_type: navigation
title: Configure WARP
weight: 7
---

# Configure WARP

You can configure WARP client settings to work alongside existing infrastructure and provide users with differential access to resources.

{{<Aside type="note" header="Managed deployments">}}
If you are deploying [WARP with device management software](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/), we recommend only supplying `organization` in your [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) and managing all other settings via the dashboard. Any settings you configure on the dashboard will be overridden by the local policy deployed by your management software. To ensure dashboard settings are applied as intended, remove the corresponding parameters from your managed deployment configuration.
{{</Aside>}}

{{<directory-listing>}}