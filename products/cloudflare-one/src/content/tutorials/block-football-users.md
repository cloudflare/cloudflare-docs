---
updated: 2020-12-20
category: 🛡️ Web Gateway
difficulty: Advanced
pcx-content-type: tutorial
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

To begin, navigate to the `Gateway` section of the Zero Trust dashboard and click on `Policies`. Select the `HTTP tab`. By default, Cloudflare Gateway create a rule that [skips inspection](/policies/filtering/http-policies#do-not-inspect) for applications that break when traffic is decrypted. You can remove this rule, but it will likely cause certain applications to break for end users.

Click **Create a policy** to add a new HTTP policy. Give the policy a name and description.

Next, create a rule to block any subdomain that uses a particular host. This example uses `espn.com` as the host. The rule below uses the `matches regex` operator to block any subdomain that uses `espn.com` as the host.

```
.*espn\.com
```

![Block ESPN](../static/secure-web-gateway/block-football/block-espn.png)

Next, click **+ Add condition** to apply this rule to a specific user or group of users. This example uses the user email address. You can also build rules using your identity provider's directory groups.

![Block ESPN](../static/secure-web-gateway/block-football/block-espn-sam.png)

You can now select **Block** as the action. You can add optional text to present to the user in the block page.

Next, click **Create policy** to save the rule.

![ESPN List](../static/secure-web-gateway/block-football/after-block-espn.png)

## Integrate your identity provider

The HTTP filtering policy created will apply to any HTTP requests sent from configured locations or enrolled devices. You can begin to [enroll devices](/connections/connect-devices/warp/deployment) by determining which users are allowed to enroll.

Navigate to the `Configuration` section of the Zero Trust dashboard and select `Authentication`. Cloudflare Zero Trust will automatically create a "One-time PIN" option which will rely on your user's emails. You can begin using the one-time PIN option immediately or you can integrate your corporate [identity provider](/identity/idp-integration) as well.

## Determine which devices can enroll

Next, build a rule to decide which devices can enroll in your account. 

1. Navigate to **Settings > Devices > Device enrollment**.

1. Click **Manage**.

1. Click **Add a rule**.

    ![Device Enrollment](../static/secure-web-gateway/block-football/device-enrollment-add-rule.png)

    Determine who is allowed to enroll by using criteria including Access groups, groups from your identity provider, email domain, or named users. This example allows any user with a `@cloudflare.com` account to enroll.

    ![Allow Cloudflare users](../static/secure-web-gateway/block-football/allow-cf-users.png)

1. Click **Save**.

Your rule will now be visible under the **Device enrollment rules** list.

## Configure the Cloudflare certificate

To inspect traffic, Cloudflare Gateway requires that a [certificate be installed](/connections/connect-devices/warp/install-cloudflare-cert) on enrolled devices. You can also distribute this certificate through an MDM provider. The example below describes the manual distribution flow.

To download the Cloudflare certificate:
* Follow the link provided in [these instructions](/connections/connect-devices/warp/install-cloudflare-cert), or
* Find the certificate in the Zero Trust Dashboard, by navigating to **Settings > Devices > Certificates**.

Next, follow [these instructions](/connections/connect-devices/warp/install-cloudflare-cert) to install the certificate on your system.

## Enable the Cloudflare proxy

Once the certificate has been installed, you can configure Gateway to inspect HTTP traffic. To do so, navigate to **Settings > Network**. Toggle **Proxy** to *Enabled*. This will tell Cloudflare to begin proxying any traffic from enrolled devices, except the traffic excluded using the [split tunnel](/connections/connect-devices/warp/exclude-traffic) settings.

Next, enable TLS decryption. This will tell Cloudflare to begin decrypting traffic for inspection from enrolled devices, except the traffic excluded from inspection.

![Policy settings](../static/secure-web-gateway/block-football/enable-proxy-decrypt.png)

## Enroll a device

1. Follow the [instructions](/connections/connect-devices/warp/deployment) to install the WARP client depending on your device type. Cloudflare Gateway does not need a special version of the client.

1. Once the client is installed, click the gear icon.

    ![WARP](../static/secure-web-gateway/secure-dns-devices/warp.png)

1. Under the **Account** tab, click **Login with Cloudflare Zero Trust**.

    ![Account View](../static/secure-web-gateway/secure-dns-devices/account-view.png)

1. Input your [team name](/glossary#team-name). You can find it on the Zero Trust Dashboard under **Settings > General**.

    ![Team Name](../static/secure-web-gateway/secure-dns-devices/org-name.png)

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to `Teams` mode. You can click the gear to toggle between DNS filtering or full proxy. In this use case, you must toggle to `Gateway with WARP`. These settings can be configured globally for an organization through a device management platform.

![Confirm WARP](../static/secure-web-gateway/block-football/warp-mode.png)

## Confirm blocks

When users visit that section of Reddit (and any page within it), they will see a block page. Any attempt to reach ESPN will also be blocked.

You can review the blog event in the HTTP logs. Navigate to the `Gateway` page in the `Logs` section of the Zero Trust dashboard. Filter for `Block` as the decision type.

![Block Log](../static/secure-web-gateway/block-football/block-log.png)
