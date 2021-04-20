---
updated: 2021-03-23
category: 🛡️ Web Gateway
---

# Deploy Cloudflare's Secure Web Gateway

Cloudflare Gateway feaures two modes:

|Mode|On-Ramps|Description|
|---|---|---|
|**DNS filtering**|* Router or device resolver configuration <br />* Cloudflare WARP agent|A secure DNS recursive resolver built on top of the world's fastest DNS resolver, 1.1.1.1. Filter DNS queries from networks and devices|
|**HTTP filtering**|* Cloudflare WARP agent|A forward proxy that sends all traffic leaving a device through an encrypted Wiregaurd tunnel to Cloudflare's network. Inspect and filter HTTP traffic, including file control and virus scanning|

In both modes, Cloudflare Gateway filters traffic based on rules that you configure, including rules that can be applied based on user identity. Both deployment options log all events, including allowed queries and requests.

Cloudflare recommends a phased deployment of Cloudflare Gateway that begins with DNS filtering for networks, extends DNS filtering to roaming devices with the WARP agent, and then uses the WARP agent and a certificate provided by Cloudflare to inspect and filter HTTP traffic.

This guide walks through an end-to-end Gateway deployment that includes both modes. [Additional tutorials](https://developers.cloudflare.com/cloudflare-one/tutorials) are available for specific use cases.

**🗺️ This tutorial covers how to:**

1. Choose a Cloudflare for Teams plan
1. Configure DNS filtering policies for networks and roaming users
1. Deploy a lightweight agent for roaming users
1. Enroll users and devices into your account
1. Deploy HTTP filtering rules for roaming users in a phased rollout
1. Enable HTTP filtering globally

**⏲️ Time to complete: 45 minutes**

## Choose a Cloudflare for Teams plan

Both modes Cloudflare Gateway is available in [three Cloudflare for Teams plans](https://www.cloudflare.com/teams-pricing/). The **Free** plan includes DNS and HTTP filtering for up to 50 users at no cost. The **Standard** plan allows your organization to deploy Gateway to 51 or more users and adds additional logging, support, and filtering features. The Cloudflare for Teams **Enterprise** plan includes additional features and support options.

This deployment guide uses the **Free** plan. You do not need any additional Cloudflare subscriptions to use the Cloudflare for Teams **Free** plan.

Begin by navigating to `dash.teams.cloudflare.com` and signing in with your Cloudflare account. If you do not have a Cloudflare account, create one.

Choose **Cloudflare for Teams** and click **Get Started**.

![Choose plan](../static/secure-web-gateway/gw-rollout-guide/pick-teams-onboard.png)

Click **Next** to begin setting up your account.

![Welcome](../static/secure-web-gateway/gw-rollout-guide/welcome-to-teams.png)

Choose a name for your organization. This can be your company's name or an internal name for your team. End users in your organization will use this name to enroll into your account.

![Choose name](../static/secure-web-gateway/gw-rollout-guide/choose-name.png)

Next, select a Cloudflare for Teams plan. This tutorial uses the **Free** plan.

![Choose plan](../static/secure-web-gateway/gw-rollout-guide/free-bundle.png)

Click **Proceed to payment** and input payment details. Your card will not be charged on this plan.

![Payment](../static/secure-web-gateway/gw-rollout-guide/confirm-free.png)

## Configure a DNS filtering location

After selecting a plan, you can start configuring Cloudflare Gateway. Click **Add a location** to begin setting up DNS filtering for your account.

![Quick Start](../static/secure-web-gateway/gw-rollout-guide/quick-start.png)

Cloudflare Gateway will create a default location for your account. This location can represent romaing users and a network.

![Default Location](../static/secure-web-gateway/gw-rollout-guide/dns-filter-setup-location-start.png)

If you are on an office or home network, you can configure this location to represent your network by returning to this page and clicking **Add IP**.

![Default Location](../static/secure-web-gateway/gw-rollout-guide/dns-filter-add-ip.png)

Cloudflare Gateway will gather the IP address you are currently using and set that as the source IP for your location. You will then need to change the settings of your router to use Cloudflare Gateway's destination IP as the network's recursive resolver.

![Location List](../static/secure-web-gateway/gw-rollout-guide/dns-filter-location-list.png)

## Configure a DNS filtering policy

You can now create a DNS filtering policy that can apply to this location and others. Click on the `Policies` page in the `Gateway` section of the navigation bar. Click **Add a policy** to begin.

![Add Policy](../static/secure-web-gateway/gw-rollout-guide/dns-filter-policy-start.png)

You can control DNS filtering by security risks, content categories, as well as custom resolution rules. Name your policy and toggle the locations where it should be applied. Next, select the **Security risks** tab.

![Policy Overview](../static/secure-web-gateway/gw-rollout-guide/dns-filter-policy-overview.png)

In the **Security risks** tab, click **Block all** to block DNS queries to websites that Cloudflare has flagged as security risks. You can add additional content-based rules or custom rules. Click **Save** to save the policy.

![Policy Overview](../static/secure-web-gateway/gw-rollout-guide/dns-filter-sec-rules.png)

Once saved, the policy will apply to any DNS queries made from the source IP of the location to the destination IP of Cloudflare Gateway's recursive DNS resolver.

## Configure device policies

You can extend Cloudflare Gateway's DNS filtering to roaming devices in any location by configuring the Cloudflare for Teams agent. This agent can also enable the HTTP filtering policies described later in this tutorial. To begin, select `Devices` under `My Team` in the navigation bar.

![Device empty](../static/secure-web-gateway/gw-rollout-guide/device-empty.png)

In the first step, click **Create an enrollment policy**. This policy will determine who can enroll a device into your Cloudflare for Teams account. The default policy allows a user in your organization's email domain to enroll, for example anyone with a `@cloudflare.com` email domain.

You can customize the policy to:
* integrate your identity provider for login,
* allow additional users outside of your organization,
* limit who can login further based on identity provider groups.

![Device](../static/secure-web-gateway/gw-rollout-guide/device-create-policy.png)

Next, download the Cloudflare for Teams agent, called the WARP client, for your system. You can also deploy this agent using a device management platform.

![Device Download](../static/secure-web-gateway/gw-rollout-guide/device-download.png)

Once downloaded, you will need the team name that you configured during the initial setup. The UI provides the name here to copy. You do not need the Cloudflare root certificate at this stage to configure DNS filtering for roaming agents.

![Device Name](../static/secure-web-gateway/gw-rollout-guide/device-name.png)

## Enroll the Cloudflare for Teams agent for DNS filtering

You can use the Cloudflare for Teams agent to apply DNS filtering for a device on any network. The agent will configure the device to use the DNS-over-HTTPS hostname for the default location in your account. Any policies that apply to the default location will apply to the device and logs will be captured as well.

<Aside>

The following manual steps can be skipped for deployments to groups of end users using a managed device platform.

</Aside>

To begin, open the client on your machine. Click the gear icon.

![Open client](../static/secure-web-gateway/gw-rollout-guide/warp-start.png)

Click **Preferences**.

![Warp pref](../static/secure-web-gateway/gw-rollout-guide/warp-pref.png)

In the Preferences window, select the **Account** tab. Click **Login with Cloudflare for Teams**.

![Warp Acct](../static/secure-web-gateway/gw-rollout-guide/warp-acct.png)

Input your organization name and click **Done**.

![Org Name](../static/secure-web-gateway/gw-rollout-guide/warp-acct-name.png)

Enroll the device by inputting an email address that matches the device enrollment policy previously configured. Cloudflare will email you a code to complete enrollment. If you have configured an identity provider, you can click the identity provider to authenticate instead.

![Enroll](../static/secure-web-gateway/gw-rollout-guide/warp-enroll.png)

The enrollment will associate your device with your Cloudflare for Teams account and configure the DNS-over-HTTPS address to match your default location. To begin filtering DNS queries, click the gear icon again.

![Configure](../static/secure-web-gateway/gw-rollout-guide/warp-post-enroll.png)

Choose **Gateway with DoH** and toggle the setting to on.

![With DoH](../static/secure-web-gateway/gw-rollout-guide/warp-with-doh.png)

You can also view and revoke enrolled devices in the `Devices` page under `My Team`.

![Device view](../static/secure-web-gateway/gw-rollout-guide/device-view.png)

## Begin proxying all device traffic

You can begin securing all traffic leaving the device using the same agent. To get started, navigate to the `Policies` page in the `Gateway` section of the navigation bar and click **Settings**.

![Settings](../static/secure-web-gateway/gw-rollout-guide/settings-no-toggle.png)

Toggle **Proxy Settings** to allow devices to begin proxying all traffic through Cloudflare's network. Do not enable **TLS Decrypt** at this stage.

![Proxy Only](../static/secure-web-gateway/gw-rollout-guide/http-settings-proxy-on.png)

Next, return to the Cloudflare for Teams agent. Click the gear icon and switch from `Gateway with DoH` to `Gateway with WARP`. This setting can also be configured for automated deployments. Once enabled, all traffic leaving the device will be proxied through Cloudflare's network.

![WARP On](../static/secure-web-gateway/gw-rollout-guide/warp-with-gateway.png)

## Enable inspection

You can now begin inspecting HTTP traffic from enrolled devices.

First, [ensure that the Cloudflare root certificate is installed](/connections/connect-devices/warp/install-cloudflare-cert) on any enrolled device.

Next, [exempt sites that break when decrypted](/tutorials/do-not-decrypt) from the list of inspected resources.

Finally, return to the Settings page in the Cloudflare for Teams dashboard and enable **TLS Decrypt**.

![Inspect](../static/secure-web-gateway/gw-rollout-guide/http-settings-proxy-inspect.png)

Once enabled, Gateway will begin inspecting and logging all HTTP traffic from enrolled devices.

## Apply HTTP policies to a group of users

You can deploy in a phased rollout by creating security policies that only apply to a group of users in your organization. To begin, navigate to the `List` page in the `Configuration` sidebar.

Click **Create manual list** to create a list of early adopters in your organization. You can also upload a CSV of the users.

![Create List](../static/secure-web-gateway/gw-rollout-guide/list-create.png)

Add users by email address who should be in the early adopter group.

![Add Users](../static/secure-web-gateway/gw-rollout-guide/list-add-user.png)

Click **Save** to save the list.

![Save list](../static/secure-web-gateway/gw-rollout-guide/list-list.png)

You can now begin building HTTP policies that apply to this group of users only. All other users will have traffic proxied and inspected, but not filtered.

To begin, navigate to the **HTTP** tab in the `Policies` page of the Gateway section. Click **Create rule**.

![Create rule](../static/secure-web-gateway/gw-rollout-guide/http-create.png)

Click **Add a rule**.

![HTTP default](../static/secure-web-gateway/gw-rollout-guide/http-default.png)

This first rule will block security threats discovered in HTTP traffic. Select `Security Risks` from the Selector, choose `In` for the Operator, and click **All security risks** as the value.

![HTTP Security](../static/secure-web-gateway/gw-rollout-guide/http-security.png)

Next, click **+ Add Condition** to apply this rule to users in your early adopter group. Select `User Email` from the Selector, choose `in list` for the Operator, and click `Test Team` or the name of your early adopter list. Select `Block` for Action and click **Create rule**.

![HTTP User Security](../static/secure-web-gateway/gw-rollout-guide/http-user-security.png)

Your rule will now appear in the rule list.

![Rule List](../static/secure-web-gateway/gw-rollout-guide/http-added-security.png)

You can repeat this process to add a rule to block social media. Create a new rule and select `Application` from the Selector, `in` as the Operator, and in the value type in "Social Network" and choose the group that contains all catalogued networks or select or remove specific detinations.

![Social](../static/secure-web-gateway/gw-rollout-guide/http-block-social.png)

Repeate the identity-based rule, select `Block` as the Action and click **Create rule**.

![Social](../static/secure-web-gateway/gw-rollout-guide/http-block-social.png)

The rules will now appear in the rule list.

![All Rules](../static/secure-web-gateway/gw-rollout-guide/http-all-rules.png)

## Apply HTTP policies globally

Once you are comfortable with the results in the early adopter group, you can appy these policies globally by removing the identity-based selector in your rules.