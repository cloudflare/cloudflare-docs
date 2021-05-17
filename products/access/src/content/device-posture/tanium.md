---
order: 10
---

# Tanium

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Cloudflare Access can use endpoint data from Tanium™ to determine if a request should be allowed to reach a protected resource. You will need an active Tanium™ Core Platform deployment that runs version 7.2 or later.

## Tanium configuration

Tanium's Endpoint Identity feature can share information about a device that is attempting to authenticate through Cloudflare Access, including patch status, management status, and vulnerabilities score.

First, configure your Tanium deployment using the [step-by-step documentation](https://docs.tanium.com/endpoint_identity/endpoint_identity/userguide.html) provided. Once complete, return to the Cloudflare for Teams dashboard to integrate with your Cloudflare Access account.

## Cloudflare Access configuration

Cloudflare Access relies on a secure exchange between a user's browser and the Tanium agent to read data from the Tanium client. When users attempt to connect to a resource protected by Access with a Tanium rule, Cloudflare Access will validate the user's identity and the browser will also connect to the Tanium agent before making a decision to grant access.

> The integration does not support Safari currently.

### Integrating Tanium Identity

Integrate your Tanium deployment with Cloudflare Access using public keys generated in the Tanium documentation above.

1. Navigate to the `Authentication` component of the **Access** section of the Cloudflare for Teams dashboard.
1. Select the `Device Posture` tab and click on `Tanium` from the list of providers.
    ![Configuring Access Policy](../static/tanium/add-posture.png)
1. Select `Tanium` from the list of providers.
    ![Configuring Access Policy](../static/tanium/select-tanium.png)
1. In the next screen, give the Tanium integration a name. This can be "Tanium" or can be more specific.
        ![Configuring Access Policy](../static/tanium/add-tanium.png)
1. Input `17472` for the port value; this is the default port used by the Tanium endpoints to communicate inbound and outbound with Cloudflare Access. You may need to modify it to reflect your organization's deployment.
1. Input the public certificate generated in the documentation above. Adding the certificate allows Cloudflare to validate that the response from the Tanium agent is valid.

### Building rules with Tanium endpoint signal

With Tanium integrated, you can build policies that enforce decisions using signal from the endpoint. Cloudflare Access currently gathers two signals that can be used in rules.

|Signal|Value|Description|
|---|---|---|
|Managed|Boolean|Validates that the device is managed in your organization's Tanium account.|

1. Navigate to the `Applications` component of the **Access** section of the Cloudflare for Teams dashboard.
1. Create a new Application or edit an existing application.
1. Build a policy that contains a rule with an `Allow` action that includes identity. For example, a rule that allows users to connect if they are members of your team's email domain.
1. Add an additional rule that contains a `Require` action that includes Device Posture and choose Tanium. The Tanium rule will require that the device connecting is managed in your Tanium deployment and has checked into the Tanium server in the last 7 days.
1. Save the rule.

The rule above will only allow users who are part of your team's email domain and running the Tanium agent to connect to the protected resource.