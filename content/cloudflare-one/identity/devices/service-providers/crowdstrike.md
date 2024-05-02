---
pcx_content_type: how-to
title: CrowdStrike
weight: 4
---

# CrowdStrike

{{<render file="posture/_service-provider-intro.md" withParameters="Crowdstrike">}}

## Prerequisites

Device posture with Crowdstrike requires:

- Falcon Enterprise plan or above
- Crowdstrike agent is deployed on the device.
- {{<render file="posture/_prereqs-warp-is-deployed.md" withParameters="[Service providers](/cloudflare-one/identity/devices/service-providers/)">}}

## Set up CrowdStrike as a service provider

### 1. Obtain CrowdStrike settings

The following CrowdStrike values are needed to set up the CrowdStrike posture check:

- Client ID
- Client Secret
- Base URL
- Customer ID

To retrieve those values:

1. Log in to your Falcon Dashboard.
2. Go to **Support and resources** > **API Clients and Keys**.
3. Select **Add new API client** and enter any name for the client.
4. Enable the **Read** API Scope for **Zero Trust Assessment**, **Hosts**, **Detections**, **Event Streams**, and **User Management**.
5. Select **Add**.
6. Copy the **Client ID**, **Client Secret**, and **Base URL** to a safe place.
7. Go to **Host setup and management** > **Sensor downloads** and copy your Customer ID.
8. Get an auth token from your CrowdStrike API endpoint:

   ```curl
   curl -X POST "<BASE_URL>/oauth2/token" \
       -H "accept: application/json" \
       -H "Content-Type: application/x-www-form-urlencoded" \
       -d "client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>"
   ```

   This POST request authorizes Cloudflare Zero Trust to [add CrowdStrike as a service provider](#2-add-crowdstrike-as-a-service-provider). For more information, refer to the Crowdstrike [auth token documentation](https://falcon.us-2.crowdstrike.com/documentation/93/oauth2-auth-token-apis).

### 2. Add CrowdStrike as a service provider

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **Device posture providers** and select **Add new**.
3. Select **CrowdStrike**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
5. Enter the **Client ID** and **Client secret** you noted down above.
6. Enter your **Rest API URL**.
7. Enter your **Customer ID**.
8. Choose a **Polling frequency** for how often Cloudflare Zero Trust should query CrowdStrike for information.
9. Select **Save**.

{{<render file="posture/_test-posture-provider.md">}}

### 3. Configure the posture check

{{<render file="posture/_configure-posture-check.md" withParameters="Crowdstrike">}}

## Device posture attributes

Device posture data is gathered from the [CrowdStrike Zero Trust Assessment APIs](https://falcon.us-2.crowdstrike.com/documentation/156/zero-trust-assessment-apis). To learn more about how scores are calculated, refer to the [CrowdStrike Zero Trust Assessment](https://falcon.us-2.crowdstrike.com/documentation/138/zero-trust-assessment) documentation.

| Selector      | Description         | Value        |
| ------------- | ------------------- | ------------ |
| OS            | OS signal score     | `1` to `100` |
| Overall       | Overall ZTA score   | `1` to `100` |
| Sensor config | Sensor signal score | `1` to `100` |
| Version       | ZTA score version   | `2.1.0`      |
| State         | Current online status of the device | _Online_, _Offline_, or _Unknown_ |
| Last seen     | Elapsed time since the device was last seen. Only returned if its state is `online` or `unknown`. | Less than 1 hour, 3 hours, 6 hours, 12 hours, 24 hours, 7 days, 30 days, or more than 30 days|
