---
order: 3
---

# Block sites by host and URL

You can use Cloudflare Gateway and the Cloudflare WARP client application to block attempts to each hostnames or to block URL paths without blocking the rest of the hostname.

**🗺️ This tutorial covers how to:**

* Enroll devices into Gateway
* Create a Gateway policy to block URLs that contain a hostname
* Create a Gateway policy to block URLs that contain a URL path
* Review the block events in the Gateway logs

**⏲️Time to complete: 25 minutes**

## Configure Cloudflare Gateway

Before you begin, you'll need to follow [these instructions](https://developers.cloudflare.com/gateway/getting-started/onboarding-gateway) to set up Cloudflare Gateway in your account. To perform file type control, you will need one of the following subscriptions:

* Teams Standard
* Gateway

## Determine which devices can enroll

To block file types from corporate devices, those devices must run the Cloudflare WARP client and [be enrolled in your Teams account](https://developers.cloudflare.com/gateway/connecting-to-gateway). When devices enroll, users will be prompted to authenticate with your identity provider or a consumer identity service. You can also deploy via MDM.

First, you will need to determine which devices can enroll. To begin, you will need to enable Cloudflare Access for your account. Cloudflare Access provides the identity integration to enroll users. This feature of Cloudflare Access is available in the Teams Free plan or in the Gateway plan at no additional cost. Follow [these instructions](https://developers.cloudflare.com/access/getting-started/access-setup) to add Access and integrate a free identity option or a specific provider.

Next, build a rule to decide which devices can enroll into your Gateway account. Navigate to the `Devices` page in the `My Teams` section of the sidebar.

![Device List](../../static/secure-web-gateway/secure-dns-devices/device-page.png)

Click `Device Settings` to build the enrollment rule. In the policy, define who should be allowed to enroll a device and click `Save`.

![Enroll Rule](../../static/secure-web-gateway/secure-dns-devices/enroll-rule.png)

## Enroll a device

You can use the WARP client to enroll a device into your security policies. Follow the [instructions here](https://developers.cloudflare.com/warp-client/setting-up) to install the client depending on your device type. Cloudflare Gateway does not need a special version of the client.

Once installed, click the gear icon.

![WARP](../../static/secure-web-gateway/secure-dns-devices/warp.png)

Under the `Account` tab, click `Login with Cloudflare for Teams`.

![Account View](../../static/secure-web-gateway/secure-dns-devices/account-view.png)

Input your Cloudflare for Teams org name. You will have created this during the Cloudflare Access setup flow. You can find it under the `Authentication` tab in the `Access` section of the sidebar.

![Org Name](../../static/secure-web-gateway/secure-dns-devices/org-name.png)

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to `Teams` mode. You can click the gear to toggle between DNS filtering or full proxy. In this use case, you must toggle to `Gateway with WARP`.

![Confirm WARP](../../static/secure-web-gateway/block-uploads/with-warp.png)

## Configure the Cloudflare certificate

To inspect traffic, Cloudflare Gateway requires that a [certificate be installed](https://developers.cloudflare.com/gateway/connecting-to-gateway/install-cloudflare-cert) on enrolled devices. You can also distribute this certificate through an MDM provider. The example below follows a manual distribution flow.

Download the Cloudflare certificate provided in the [instructions here](https://developers.cloudflare.com/gateway/connecting-to-gateway/install-cloudflare-cert). You can also find the certificate in the Cloudflare for Teams dashboard. Navigate to the `Account` page in the `Settings` section of the sidebar and scroll to the bottom.

Next, follow [these instructions](https://developers.cloudflare.com/gateway/connecting-to-gateway/install-cloudflare-cert) to install the certificate on your system.

## Build a hostname policy

Once the certificate has been installed, you can configure Gateway to inspect HTTP traffic. To do so, navigate to the `Policies` page in the Gateway section. Scroll to the bottom and toggle `Proxy Settings` to enabled.

![Confirm WARP](../../static/secure-web-gateway/block-football/with-warp.png)

Click **Add a rule** to add a new HTTP policy. You can build rules that match an exact hostname or, like the example here, rules that use regular expressions to match for patterns.

The rule below uses the `matches regex` operator to block any subdomain that uses `espn.com` as the host. You can also build a rule with an `is` operator and input `espn.com` directly.

```
.*espn\.com
```

![Block ESPN](../../static/secure-web-gateway/block-football/block-espn-host.png)

Once you have clicked **Create rule** you should see it appear at the bottom of the rule list. Gateway enforces rules from top to bottom. If you had a rule with higher precedence (ranked higher in the list) that allowed ESPN, that rule would allow the user before this rule could block.

![Post ESPN](../../static/secure-web-gateway/block-football/post-espn.png)

## Build a URL policy

Some websites are organized by URL path, so blocking by host or subdomain is not sufficient. Instead, you must build rules for a specific URL path.

In the example below, `reddit.com` is a website where different areas of interest are grouped into a URL string that follows `/r/`. In this case, `CFB` is the section of Reddit that discusses college football.

Matching for this URL requires a regular expression rule.

```
/r/CFB
```

![Block CFB](../../static/secure-web-gateway/block-football/block-cfb-url.png)

Click **Create rule** and you should see it appear in your rule list.

![Block CFB](../../static/secure-web-gateway/block-football/post-cfb.png)

## Blocks

When users visit that section of Reddit (and any page within it), they will receive a block page. Any attempt to reach ESPN will also be blocked.

![Block Page](../../static/secure-web-gateway/block-football/block-page.png)

You can review the blog event in the HTTP logs. Navigate to the `Gateway` page in the `Logs` section of the Cloudflare for Teams dashboard. Filter for `Block` as the decision type.

![Block Log](../../static/secure-web-gateway/block-football/block-log.png)