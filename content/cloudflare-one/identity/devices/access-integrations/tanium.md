---
pcx_content_type: how-to
title: Tanium
weight: 4
meta:
   title: Integrate Tanium with Access
---

# Tanium

Cloudflare Access can use endpoint data from [Tanium™](https://www.tanium.com/) to determine if a request should be allowed to reach a protected resource. When users attempt to connect to a resource protected by Access with a Tanium rule, Cloudflare Access will validate the user's identity, and the browser will connect to the Tanium agent before making a decision to grant access.

{{<Aside type="warning" header="Gateway device posture limitation">}}

The Tanium integration cannot be used with [Gateway device posture policies](/cloudflare-one/identity/devices/).

{{</Aside>}}

## Prerequisites

- Tanium Core Platform version 7.2 or later
- {{<render file="posture/_prereqs-warp-is-deployed.md" withParameters="[Access integrations](/cloudflare-one/identity/devices/access-integrations/)">}}

## Integrate Tanium with Cloudflare Access

{{<Aside type="note">}}

The integration does not currently support Safari.

{{</Aside>}}

1. Configure your Tanium deployment using the [step-by-step documentation](https://docs.tanium.com/endpoint_identity/endpoint_identity/userguide.html) provided. You will need the public key to integrate your Tanium deployment with Cloudflare Access.

2. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.

3. Scroll down to **WARP client checks** and select **Add new**.

4. Select **Tanium** from the list of providers.

5. Enter any **Name** for the integration.

6. For **Port**, enter `17472`.

   This is the default port used by the Tanium endpoints to communicate inbound and outbound with Cloudflare Access. You may need to modify it to reflect your organization's deployment.

7. Input the public certificate generated in Step 1.

   Adding the certificate allows Cloudflare to validate that the response from the Tanium agent is valid.

You can now build [Access policies](/cloudflare-one/policies/access/) that check [device posture signals](#tanium-endpoint-signals) from the Tanium endpoint.

## Example Access policy

This example will only grant access to users who are part of your team's email domain and running the Tanium agent.

| Action | Rule type | Selector                | Value       |
| ------ | --------- | ----------------------- | ----------- |
| Allow  | Include   | Emails Ending in        | `@team.com` |
|        | Require   | Device Posture - Tanium | `Managed`   |

The Tanium rule will require that the device connecting is managed in your Tanium deployment and has checked into the Tanium server in the last 7 days.

## Tanium endpoint signals

| Signal  | Value   | Description                                                                 |
| ------- | ------- | --------------------------------------------------------------------------- |
| Managed | Boolean | Validates that the device is managed in your organization's Tanium account. |
