---
pcx-content-type: how-to
title: Tanium
weight: 4
---

# Tanium

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems          | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| -------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Any OS supported by Tanium | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

Cloudflare Access can use endpoint data from [Tanium™](https://www.tanium.com/) to determine if a request should be allowed to reach a protected resource.

## Tanium Configuration

Tanium's Endpoint Identity feature can share information about a device that is attempting to authenticate through Cloudflare Access, including patch status, management status, and vulnerabilities score.

First, configure your Tanium deployment using the [step-by-step documentation](https://docs.tanium.com/endpoint_identity/endpoint_identity/userguide.html) provided.

Once complete, return to the Zero Trust dashboard to integrate with your Cloudflare Access account.

## Cloudflare Access Configuration

Cloudflare Access relies on a secure exchange between a user's browser and the Tanium agent to read data from the Tanium client. When users attempt to connect to a resource protected by Access with a Tanium rule, Cloudflare Access will validate the user's identity, and the browser will connect to the Tanium agent before making a decision to grant access.

{{<Aside>}}

The integration does not currently support Safari.

{{</Aside>}}

## Integrating Tanium Identity

{{<table-wrap>}}

| Requirements                                                                             |
| ---------------------------------------------------------------------------------------- |
| You will need an active Tanium™ Core Platform deployment that runs version 7.2 or later. |

{{</table-wrap>}}

Integrate your Tanium deployment with Cloudflare Access using public keys generated in the Tanium step-by-step documentation linked above.

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team > Devices**.

1.  Select the **Device posture** tab.

    ![Configuring Zero Trust Policy](/cloudflare-one/static/documentation/identity/devices/add-device-posture.png)

1.  Click _+Add_ to start configuring the Tanium integration.

1.  Select **Tanium** from the list of providers.

    ![Configuring Zero Trust Policy](/cloudflare-one/static/documentation/identity/devices/add-posture-tanium.png)

1.  In the next screen, give a name to the Tanium integration. _Tanium_ will work, or, if you prefer, you can choose a more specific name.

    ![Configuring Zero Trust Policy](/cloudflare-one/static/documentation/identity/devices/tanium-setup.png)

1.  Input `17472` for the port value.

This is the default port used by the Tanium endpoints to communicate inbound and outbound with Cloudflare Access. You may need to modify it to reflect your organization's deployment.

1.  Input the public certificate generated in the Tanium step-by-step documentation above.

Adding the certificate allows Cloudflare to validate that the response from the Tanium agent is valid.

## Building policy rules with Tanium endpoint signal

With Tanium integrated, you can build policies that enforce decisions using signal from the endpoint.

| Signal  | Value   | Description                                                                 |
| ------- | ------- | --------------------------------------------------------------------------- |
| Managed | Boolean | Validates that the device is managed in your organization's Tanium account. |

1.  On the Zero Trust dashboard, navigate to **Access > Applications**.

1.  [Create a new application](/cloudflare-one/applications/) or edit an existing application.

1.  [Build a policy](/cloudflare-one/policies/access/policy-management/) that contains a rule with an Allow action that includes identity.

    For example, a rule that allows users to connect if they are members of your team's email domain.

1.  Add an additional rule that contains a Require action that includes Device Posture and choose Tanium.

    The Tanium rule will require that the device connecting is managed in your Tanium deployment and has checked into the Tanium server in the last 7 days.

1.  Save the rule.

The rule above will only allow users who are part of your team's email domain and running the Tanium agent to connect to the protected resource.
