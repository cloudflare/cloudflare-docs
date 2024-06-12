---
pcx_content_type: how-to
title: SentinelOne
weight: 4
meta:
   title: SentinelOne - Posture checks
---

# SentinelOne

Cloudflare Zero Trust can integrate with SentinelOne to require that users connect to certain applications from managed devices. Our service-to-service posture check identifies devices based on their serial numbers.

## Prerequisites

- SentinelOne agent is deployed on the device.
- {{<render file="posture/_prereqs-warp-is-deployed.md" withParameters="[Service providers](/cloudflare-one/identity/devices/service-providers/)">}}

## Set up SentinelOne as a service provider

### 1. Obtain SentinelOne settings

The following SentinelOne values are needed to set up the SentinelOne posture check:

- API Token
- REST API URL

To retrieve those values:

1. Log in to your SentinelOne Dashboard.
2. Go to **Settings** > **Users** > **Create new Service User**.
3. Select **Create New Service User**.
4. Enter a **Name** and **Expiration Date** and select **Next**.
5. Set **Scope of Access** to _Viewer_.
6. Select **Create User**. SentinelOne will generate an API Token for this user.
7. Copy the **API Token** to a safe location.
8. Select **Close**.
9. Copy the **Rest API URL** from your browser's address bar (for example, `https://<S1-DOMAIN>.sentinelone.net`).

### 2. Add SentinelOne as a service provider

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **Device posture providers** and select **Add new**.
3. Select **SentinelOne**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
5. In **Client Secret**, enter your **API Token**.
6. In **Rest API URL**, enter `https://<S1-DOMAIN>.sentinelone.net`.
7. Choose a **Polling frequency** for how often Cloudflare Zero Trust should query SentinelOne for information.
8. Select **Save**.

{{<render file="posture/_test-posture-provider.md">}}

### 3. Configure the posture check

{{<render file="posture/_configure-posture-check.md" withParameters="SentinelOne">}}

## Device posture attributes

Device posture data is gathered from the SentinelOne Management APIs. For more information, refer to `https://<S1-DOMAIN>.sentinelone.net/api-doc/overview`.

| Selector       | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| Infected       | Whether the device is infected                                        |
| Active Threats | Number of active threats on the device                                |
| Is Active      | Whether the SentinelOne Agent is active                               |
| Network status | Whether the SentinelOne Agent is connected to the SentinelOne service |

### Detect user risk behavior

SentinelOne provides endpoint detection and response (EDR) signals to determine [user risk score](/cloudflare-one/insights/risk-score/). User risk scores allow you to detect users that present security risks to your organization. For more information, refer to [Predefined risk behaviors](/cloudflare-one/insights/risk-score/#predefined-risk-behaviors).
