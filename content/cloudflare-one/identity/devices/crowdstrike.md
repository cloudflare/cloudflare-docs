---
order: 3
pcx-content-type: how-to
hidden: true
---

# CrowdStrike

Device posture with CrowdStrike requires the CrowdStrike agent and the Cloudflare WARP client to be deployed on your devices. For this integration to function, our service-to-service posture check relies on the **serial\_number** being the same in both clients. Follow the instructions below to set up he integration.

## Obtain CrowdStrike Settings

The following CrowdStrike values are needed to set up the CrowdStrike posture check:

*   API ClientID
*   API Client Secret
*   Base API URL
*   Customer ID

To retrieve those values:

1.  Log in to your Falcon Dashboard.
2.  Navigate to **Support** > **API Clients and Keys**.
3.  Add a new API client and ensure at least the Zero Trust Assessment API Scope is enabled.
4.  Copy the Client ID and Client Secret to a safe place.
5.  Navigate to **Hosts** > **Sensor Downloads** and note down your Customer ID.
6.  Determine your Cloud Environment API endpoint by following the instructions [here](https://falcon.us-2.crowdstrike.com/documentation/93/oauth2-auth-token-apis). This becomes your Base API URL. As an example:
    *   US-1: `https://api.crowdstrike.com`
    *   US-2: `https://api.us-2.crowdstrike.com`
    *   etc.

## Configure the provider on the Zero Trust dashboard

1.  Go to **Settings** > **Devices** > **Device posture providers** and click **Add new**.
2.  Select **CrowdStrike**.
3.  Give your provider a name. This name will be used throughout the dashboard to reference this connection.
4.  Enter the Client ID and Client Secret you noted down above.
5.  Enter your Rest API URL.
6.  Enter your Customer ID.
7.  Select a **polling frequency** for how often Cloudflare Zero Trust should query CrowdStrike for information.
8.  Click **Save**.
9.  Click **Test Provider** to ensure the values have been entered correctly.

## ZTA Score

This information is gathered from the [CrowdStrike Zero Trust Assessment APIs](https://falcon.us-2.crowdstrike.com/documentation/156/zero-trust-assessment-apis).
