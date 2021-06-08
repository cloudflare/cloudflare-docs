---
updated: 2020-12-20
category: 🛡️ Web Gateway
difficulty: Advanced
---

# Block sites for specific users

You can use Cloudflare Gateway and the Cloudflare WARP client application to block attempts to reach hostnames or to block URL paths without blocking the rest of the hostname. You can build these rules [globally for your entire organization](/tutorials/block-football) or for specific users.

**🗺️ This tutorial covers how to:**

* Create a Gateway policy to block URLs that contain a hostname for a specific set of users
* Enroll devices into Gateway
* Review the block events in the Gateway logs

**⏲️Time to complete:**

35 minutes

## Before you start
1. [Add Gateway to your account](/setup)

---

## Build a hostname policy

To begin, navigate to the `Gateway` section of the Cloudflare for Teams dashboard and click on `Policies`. Select the `HTTP tab`. By default, Cloudflare Gateway create a rule that [skips inspection](/policies/filtering/http-policies#do-not-inspect) for applications that break when traffic is decrypted. You can remove this rule, but it will likely cause certain applications to break for end users.

![Policy Start](../static/secure-web-gateway/block-football/policy-start.png)

Click **Create a policy** to add a new HTTP policy. Give the policy a name and description.

Next, create a rule to block any subdomain that uses a particular host. This example uses `espn.com` as the host. The rule below uses the `matches regex` operator to block any subdomain that uses `espn.com` as the host.

```
.*espn\.com
```

![Block ESPN](../static/secure-web-gateway/block-football/block-espn.png)

Next, click **+ Add condition** to apply this rule to a specific user or group of users. This example uses the user email address. You can also build rules using your identity provider's directory groups.

![Block ESPN](../static/secure-web-gateway/block-football/block-espn-sam.png)

You can now select **Block** as the action. You can add optional text to present to the user in the block page.

![Block Action](../static/secure-web-gateway/block-football/block-espn-action.png)

Click **Create policy** to save the rule.

![ESPN List](../static/secure-web-gateway/block-football/after-block-espn.png)

## Integrate your identity provider

The HTTP filtering policy created will apply to any HTTP requests sent from configured locations or enrolled devices. You can begin to [enroll devices](/connections/connect-devices/warp/deployment) by determining which users are allowed to enroll.

Navigate to the `Configuration` section of the Cloudflare for Teams dashboard and select `Authentication`. Cloudflare for Teams will automatically create a "One-time PIN" option which will rely on your user's emails. You can begin using the one-time PIN option immediately or you can integrate your corporate [identity provider](/identity/idp-integration) as well.

## Determine which devices can enroll

Next, build a rule to decide which devices can enroll in your account. Navigate to the `Devices` page in the `My Teams` section of the sidebar.

![Device List](../static/secure-web-gateway/secure-dns-devices/device-list.png)

Click **Manage enrollment rules** to build the enrollment Next, click **Add a rule** to begin.

![Add Device Rule](../static/secure-web-gateway/secure-dns-devices/add-device-rule.png)

You can determine who is allowed to enroll using criteria including Access groups, groups from your identity provider, email domain, or named users. This example allows any user with a `@cloudflare.com` account to enroll.

![Device List](../static/secure-web-gateway/secure-dns-devices/device-enroll.png)

Return to the top of the page and click **Add rule**.

On the next page, click **Save rules** to conclude.

![Device List](../static/secure-web-gateway/secure-dns-devices/save-rules.png)

## Configure the Cloudflare certificate

To inspect traffic, Cloudflare Gateway requires that a [certificate be installed](/connections/connect-devices/warp/install-cloudflare-cert) on enrolled devices. You can also distribute this certificate through an MDM provider. The example below describes the manual distribution flow.

Download the Cloudflare certificate provided in the [instructions here](/connections/connect-devices/warp/install-cloudflare-cert). You can also find the certificate in the Cloudflare for Teams dashboard - navigate to the `Account` page in the `Settings` section of the sidebar and scroll to the bottom.

Next, follow [these instructions](/connections/connect-devices/warp/install-cloudflare-cert) to install the certificate on your system.

## Enable the Cloudflare proxy

Once the certificate has been installed, you can configure Gateway to inspect HTTP traffic. To do so, visit the `Settings` tab in the `Policies` page. Toggle `Proxy Settings` to **Enabled**. This will tell Cloudflare to begin proxying any traffic from enrolled devices, except the traffic excluded using the [split tunnel](/connections/connect-devices/warp/exclude-traffic) settings.

![Policy Start](../static/secure-web-gateway/block-football/enable-proxy.png)

Next, enable TLS decryption. This will tell Cloudflare to begin decrypting traffic for inspection from enrolled devices, except the traffic excluded from inspection.

![Policy Start](../static/secure-web-gateway/block-football/enable-decrypt.png)

## Enroll a device

Follow the [instructions](/connections/connect-devices/warp/deployment) to install the WARP client depending on your device type. Cloudflare Gateway does not need a special version of the client.

Once installed, click the gear icon.

![WARP](../static/secure-web-gateway/secure-dns-devices/warp.png)

Under the `Account` tab, click `Login with Cloudflare for Teams`.

![Account View](../static/secure-web-gateway/secure-dns-devices/account-view.png)

Input your Cloudflare for Teams org name. You will have created this during the Cloudflare Access setup flow. You can find it under the `Authentication` tab in the `Access` section of the sidebar.

![Org Name](../static/secure-web-gateway/secure-dns-devices/org-name.png)

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to `Teams` mode. You can click the gear to toggle between DNS filtering or full proxy. In this use case, you must toggle to `Gateway with WARP`. These settings can be configured globally for an organization through a device management platform.

![Confirm WARP](../static/secure-web-gateway/block-football/warp-mode.png)

## Confirm blocks

When users visit that section of Reddit (and any page within it), they will see a block page. Any attempt to reach ESPN will also be blocked.

You can review the blog event in the HTTP logs. Navigate to the `Gateway` page in the `Logs` section of the Cloudflare for Teams dashboard. Filter for `Block` as the decision type.

![Block Log](../static/secure-web-gateway/block-football/block-log.png)
