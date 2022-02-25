---
updated: 2020-12-20
category: 🔐 Zero Trust
difficulty: Medium
pcx-content-type: tutorial
title: Require Gateway connections
---

# Require Gateway connections

You can build rules in Cloudflare Access that require users to connect through your organization's Cloudflare Gateway configuration before they reach on-premise applications or login to [SaaS applications](https://blog.cloudflare.com/cloudflare-access-for-saas/).

**🗺️ This tutorial covers how to:**

*   Add Cloudflare Gateway to your Zero Trust account
*   Enroll devices in Cloudflare Gateway
*   View enrolled devices
*   Build a rule in Access to require Cloudflare Gateway

**⏲️Time to complete:**

40 minutes

***

## Add Cloudflare Gateway

Cloudflare Gateway operates in two modes:

*   DNS filtering
*   Proxy (HTTP filtering)

The proxy mode in Gateway requires a Gateway Standard or Cloudflare Zero Trust Standard [plan](https://www.cloudflare.com/teams-pricing/).

To filter all Internet-bound traffic in the proxy mode, devices must install and enroll the Zero Trust WARP client. The WARP client will send all Internet traffic to a Cloudflare data center near the user where it can be filtered and logged before reaching the rest of the Internet.

Building a rule in Access to enforce Gateway connections requires the use of the WARP client and its configuration to proxy Internet traffic to Cloudflare.

## Determine which devices can enroll

Next, build a rule to decide which devices can enroll in your account.

1.  Navigate to **Settings > Devices > Device enrollment**.

2.  Click **Manage**.

3.  Click **Add a rule**.

    ![Device Enrollment](/cloudflare-one/static/secure-web-gateway/block-football/device-enrollment-add-rule.png)

    Determine who is allowed to enroll by using criteria including Access groups, groups from your identity provider, email domain, or named users. This example allows any user with a `@cloudflare.com` account to enroll.

    ![Allow Cloudflare users](/cloudflare-one/static/secure-web-gateway/block-football/allow-cf-users.png)

4.  Click **Save**.

Your rule will now be visible under the **Device enrollment rules** list.

## Configure the Cloudflare certificate

To inspect traffic, Cloudflare Gateway requires that a [certificate be installed](/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/) on enrolled devices. You can also distribute this certificate through an MDM provider. The example below describes the manual distribution flow.

To download the Cloudflare certificate:

*   Follow the link provided in [these instructions](/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/).
*   Find the certificate in the Zero Trust Dashboard, by navigating to **Settings > Devices > Certificates**.

## Enable the Cloudflare proxy

Once the certificate has been installed, you can configure Gateway to inspect HTTP traffic. To do so, navigate to **Settings > Network**. Toggle **Proxy** to *Enabled*. This will tell Cloudflare to begin proxying any traffic from enrolled devices, except the traffic excluded using the [split tunnel](/cloudflare-one/connections/connect-devices/warp/exclude-traffic/) settings.

Next, enable TLS decryption. This will tell Cloudflare to begin decrypting traffic for inspection from enrolled devices, except the traffic excluded from inspection.

![Policy settings](/cloudflare-one/static/secure-web-gateway/block-football/enable-proxy-decrypt.png)

## Enroll a device

1.  Follow the [instructions](/cloudflare-one/connections/connect-devices/warp/deployment/) to install the WARP client depending on your device type. Cloudflare Gateway does not need a special version of the client.

2.  Once the client is installed, click the gear icon.

    ![WARP](/cloudflare-one/static/secure-web-gateway/secure-dns-devices/warp.png)

3.  Under the **Account** tab, click **Login with Cloudflare for Teams**.

    ![Account View](/cloudflare-one/static/secure-web-gateway/secure-dns-devices/account-view.png)

4.  Input your [team name](/cloudflare-one/glossary/#team-name). You can find it on the Zero Trust Dashboard under **Settings > General**.

    ![Team Name](/cloudflare-one/static/secure-web-gateway/secure-dns-devices/org-name.png)

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to `Teams` mode. You can click the gear to toggle between DNS filtering or full proxy. In this use case, you must toggle to `Gateway with WARP`. These settings can be configured globally for an organization through a device management platform.

![Confirm WARP](/cloudflare-one/static/secure-web-gateway/block-football/warp-mode.png)

## Build a device posture rule

You can now build rules in Cloudflare Access applications that require users connecting to those applications do so through Cloudflare Gateway. This can help protect your applications by only allowing devices which are blocked from reaching malware on the Internet. Additionally, you can ensure that you do not miss logs of SaaS application activity by requiring users who login to those SaaS applications only do so through Cloudflare Gateway.

To add a `Require Gateway` rule:

1.  Navigate to **My Team** > **Devices**.
2.  In the **Device posture** tab, click **+ Add** in the **WARP client checks** card.
3.  Select `Gateway` from the options listed.
4.  Click **Save** on the next screen.

You can now build rules with your organization's Cloudflare Gateway configuration.

## Build an Access policy

To build Access policies that require Gateway:

1.  Navigate to **Access**> **Applications**.

2.  Edit an existing application or add a new one.

3.  In the application of your choice, edit an existing rule or add a new one.

4.  In the rule builder view, click **+ Add require** and select `Gateway` from both drop-down menus.

    ![Add Policy](/cloudflare-one/static/zero-trust-security/require-swg/require-gateway.png)

5.  Save the rule and the application.

Requests and logins to the application will now require the user to go through Cloudflare Gateway.

You can avoid adding the `Require Gateway` rule to each application manually by creating an `Access Group` which includes the `Require` rule, similar to [the configuration of country rules](/cloudflare-one/tutorials/country-rules/). Add that `Access Group` to applications and the Gateway requirement will be enforced.
