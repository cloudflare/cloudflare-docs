---
updated: 2020-12-20
category: 🛡️ Web Gateway
difficulty: Advanced
---

# Block sites for specific users

You can use Cloudflare Gateway and the Cloudflare WARP client application to block attempts to reach hostnames or to block URL paths without blocking the rest of the hostname. You can build these rules [globally for your entire organization](/tutorials/block-football) or for specific users.

**🗺️ This tutorial covers how to:**

* Enroll devices into Gateway
* Create a Gateway policy to block URLs that contain a hostname for certain users
* Review the block events in the Gateway logs

**⏲️Time to complete: 25 minutes**

## Add Cloudflare Gateway

Before you begin, you'll need to follow [these instructions](/setup) to set up Cloudflare Gateway in your account. Cloudflare Gateway operates in two modes:

* DNS filtering
* Proxy (HTTP filtering)

The proxy mode in Gateway requires a Gateway Standard or Cloudflare for Teams Standard [plan](https://www.cloudflare.com/teams-pricing/).

To filter all Internet-bound traffic in the proxy mode, devices must install and enroll the Cloudflare for Teams WARP client. The WARP client will send all Internet traffic to a Cloudflare data center near the user where it can be filtered and logged before reaching the rest of the Internet.

Building a rule in Access to enforce Gateway connections requires the use of the WARP client and its configuration to proxy Internet traffic to Cloudflare.

## Determine which devices can enroll

To proxy traffic through Gateway, devices must run the Cloudflare WARP client and [be enrolled in your Teams account](/connections/connect-devices/warp/device-enrollment). When devices enroll, users will be prompted to authenticate with your identity provider or a consumer identity service. You can also deploy the client and its configurations [via a device management platform](/connections/connect-devices/warp/deployment) like JAMF or InTune.

First, determine which devices can enroll based on user identity. If you have already integrated your identity provider when setting up Cloudflare Access you can reuse that integration. If you have not set up an identity provider, follow [these instructions](/identity/idp-integration) to add Access and integrate a free identity option or a specific provider.

Next, build a rule to decide which devices can enroll into your Gateway account. Navigate to the `Devices` page in the `My Teams` section of the sidebar.

![Device List](../static/secure-web-gateway/secure-dns-devices/device-page.png)

Click `Device Settings` to build the enrollment rule. In the policy, define who should be allowed to enroll a device and click `Save`.

![Enroll Rule](../static/secure-web-gateway/secure-dns-devices/enroll-rule.png)

## Enroll a device

Follow the [instructions here](/connections/connect-devices/warp) to install the WARP client depending on your device type. Cloudflare Gateway does not need a special version of the client.

Once installed, click the gear icon.

![WARP](../static/secure-web-gateway/secure-dns-devices/warp.png)

Under the `Account` tab, click `Login with Cloudflare for Teams`.

![Account View](../static/secure-web-gateway/secure-dns-devices/account-view.png)

Input your Cloudflare for Teams org name. You will have created this during the Cloudflare Access setup flow. You can find it under the `Authentication` tab in the `Access` section of the sidebar.

![Org Name](../static/secure-web-gateway/secure-dns-devices/org-name.png)

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to `Teams` mode. You can click the gear to toggle between DNS filtering or full proxy. In this use case, you must toggle to `Gateway with WARP`. These settings can be configured globally for an organization through a device management platform.

![Confirm WARP](../static/secure-web-gateway/block-uploads/with-warp.png)

## Configure the Cloudflare certificate

To inspect traffic, Cloudflare Gateway requires that a [certificate be installed](/connections/connect-devices/warp/install-cloudflare-cert) on enrolled devices. You can also distribute this certificate through an MDM provider. The example below follows a manual distribution flow.

Download the Cloudflare certificate provided in the [instructions here](/connections/connect-devices/warp/install-cloudflare-cert). You can also find the certificate in the Cloudflare for Teams dashboard. Navigate to the `Account` page in the `Settings` section of the sidebar and scroll to the bottom.

Next, follow [these instructions](/connections/connect-devices/warp/install-cloudflare-cert#add-the-certificate-to-your-system) to install the certificate on your system.

Once the certificate has been installed, you can configure Gateway to inspect HTTP traffic. To do so, navigate to the `Policies` page in the Gateway section. Click the **Settings** tab and toggle `Proxy Settings` to enabled.

![Add Policy](../static/secure-web-gateway/block-uploads/filter-toggle.png)

## Build a hostname policy

Click **Add a rule** to add a new HTTP policy. You can build rules that match an exact hostname or, like the example here, rules that use regular expressions to match for patterns.

![Add Rule](../static/secure-web-gateway/block-football/add-rule-sam.png)

The rule below uses the `matches regex` operator to block any subdomain that uses `espn.com` as the host. You can also build a rule with an `is` operator and input `espn.com` directly.

```
.*espn\.com
```

![Block ESPN](../static/secure-web-gateway/block-football/block-espn-host-sam.png)

You can also build rules by user group (including name or ID).

Once you have clicked **Create rule** you should see it appear at the bottom of the rule list. Gateway enforces rules from top to bottom. If you had a rule with higher precedence (ranked higher in the list) that allowed ESPN, that rule would allow the user before this rule could block.

![Post ESPN](../static/secure-web-gateway/block-football/post-espn-sam.png)

## Blocks

When users visit that section of Reddit (and any page within it), they will receive a block page. Any attempt to reach ESPN will also be blocked.

![Block Page](../static/secure-web-gateway/block-football/block-page.png)

You can review the blog event in the HTTP logs. Navigate to the `Gateway` page in the `Logs` section of the Cloudflare for Teams dashboard. Filter for `Block` as the decision type. The block logs will also list the user who made the request.

![Block Log](../static/secure-web-gateway/block-football/block-log.png)
