---
pcx_content_type: concept
title: Notifications
weight: 1
---

# Tunnel notifications

Administrators can receive an alert when Cloudflare Tunnels in an account change their health or deployment status. Notifications can be delivered via email, webhook, and third-party services.

## Manage notifications

Tunnel notifications are configured on the [Cloudflare dashboard](https://dash.cloudflare.com/). For more information, refer to [Create a Notification](/fundamentals/notifications/create-notifications/).

## Available notifications

### Tunnel creation or deletion event

Receive an alert when a new tunnel has been created or an existing tunnel has been deleted.

### Tunnel health alert

Receive an alert when a tunnel changes its health status.

| Health status | Description  |
| ------------- | ------------ |
| Healthy       | The tunnel is active and serving traffic through four connections to the Cloudflare global network. |
| Degraded      | The tunnel is active and serving traffic, but at least one individual connection has failed. Further degradation in [tunnel availability](/cloudflare-one/connections/connect-networks/install-and-setup/deploy-cloudflared-replicas/) could risk the tunnel going down and failing to serve traffic.|
| Down          | The tunnel cannot serve traffic as it has no connections to the Cloudflare global network.|
| Inactive      | This value is reserved for tunnels which have been created, but have never been run.|
