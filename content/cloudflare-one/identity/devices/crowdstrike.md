---
pcx_content_type: how-to
title: CrowdStrike
weight: 4
---

# CrowdStrike

Device posture with CrowdStrike requires the CrowdStrike agent and the Cloudflare WARP client to be deployed on your devices. For this integration to function, our service-to-service posture check relies on the **serial_number** being the same in both clients. Follow the instructions below to set up he integration.

## Obtain CrowdStrike Settings

The following CrowdStrike values are needed to set up the CrowdStrike posture check:

- API ClientID
- API Client Secret
- Base API URL
- Customer ID

To retrieve those values:

1.  Log in to your Falcon Dashboard.
1.  Navigate to **Support** > **API Clients and Keys**.
1.  Add a new API client and ensure that `Zero Trust Assessment` and `Hosts` read API Scope is enabled.
1.  Copy the Client ID and Client Secret to a safe place.
1.  Navigate to **Hosts** > **Sensor Downloads** and note down your Customer ID.
1.  Determine your Cloud Environment API endpoint by following the instructions [here](https://falcon.us-2.crowdstrike.com/documentation/93/oauth2-auth-token-apis). This becomes your Base API URL. As an example:
    - US-1: `https://api.crowdstrike.com`
    - US-2: `https://api.us-2.crowdstrike.com`
    - etc.

## Configure the provider on the Zero Trust dashboard

1.  Go to **Settings** > **Devices** > **Device posture providers** and click **Add new**.
1.  Select **CrowdStrike**.
1.  Give your provider a name. This name will be used throughout the dashboard to reference this connection.
1.  Enter the Client ID and Client Secret you noted down above.
1.  Enter your Rest API URL.
1.  Enter your Customer ID.
1.  Select a **polling frequency** for how often Cloudflare Zero Trust should query CrowdStrike for information.
1.  Click **Save**.
1.  Click **Test Provider** to ensure the values have been entered correctly.

## ZTA Score

This information is gathered from the [CrowdStrike Zero Trust Assessment APIs](https://falcon.us-2.crowdstrike.com/documentation/156/zero-trust-assessment-apis).
