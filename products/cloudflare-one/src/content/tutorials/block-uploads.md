---
updated: 2020-11-28
category: 🛡️ Web Gateway
difficulty: Advanced
---

# Block file uploads to Google Drive

You can use Cloudflare Gateway and the Cloudflare WARP client application to prevent enrolled devices from uploading files to an unapproved cloud storage provider.

**🗺️ This tutorial covers how to:**

* Create a Gateway policy to block file uploads to a specific provider
* Enroll devices into a Cloudflare for Teams account where this rule will be enforced
* Log file type upload attempts

**⏲️Time to complete: ~45 minutes**

## Configure Cloudflare Gateway

Before you begin, you'll need to follow [these instructions](/setup) to set up Cloudflare Gateway in your account. To perform file type control, you will need one of the following subscriptions:

* Teams Standard
* Gateway

## Determine which devices can enroll

To block file types from corporate devices, those devices must run the Cloudflare WARP client and [be enrolled in your Teams account](/connections/connect-devices/warp). When devices enroll, users will be prompted to authenticate with your identity provider or a consumer identity service. You can also deploy via MDM.

First, you will need to determine which devices can enroll. To begin, you will need to enable Cloudflare Access for your account. Cloudflare Access provides the identity integration to enroll users. This feature of Cloudflare Access is available in the Teams Free plan or in the Gateway plan at no additional cost. Follow [these instructions](/setup) to add Access and integrate a free identity option or a specific provider.

Next, build a rule to decide which devices can enroll into your Gateway account. Navigate to the `Devices` page in the `My Teams` section of the sidebar.

![Device List](../static/secure-web-gateway/secure-dns-devices/device-page.png)

Click `Device Settings` to build the enrollment rule. In the policy, define who should be allowed to enroll a device and click `Save`.

![Enroll Rule](../static/secure-web-gateway/secure-dns-devices/enroll-rule.png)

## Enroll a device

You can use the WARP client to enroll a device into your security policies. Follow the [instructions](/connections/connect-devices/warp) to install the client depending on your device type. Cloudflare Gateway does not need a special version of the client.

Once installed, click the gear icon.

![WARP](../static/secure-web-gateway/secure-dns-devices/warp.png)

Under the `Account` tab, click `Login with Cloudflare for Teams`.

![Account View](../static/secure-web-gateway/secure-dns-devices/account-view.png)

Input your Cloudflare for Teams org name. You will have created this during the Cloudflare Access setup flow. You can find it under the `Authentication` tab in the `Access` section of the sidebar.

![Org Name](../static/secure-web-gateway/secure-dns-devices/org-name.png)

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to `Teams` mode. You can click the gear to toggle between DNS filtering or full proxy. In this use case, you must toggle to `Gateway with WARP`.

![Confirm WARP](../static/secure-web-gateway/block-uploads/with-warp.png)

## Configure the Cloudflare certificate

To inspect traffic, Cloudflare Gateway requires that a [certificate be installed](/connections/connect-devices/warp/install-cloudflare-cert) on enrolled devices. You can also distribute this certificate through an MDM provider. The example below follows a manual distribution flow.

Download the Cloudflare certificate provided in the [instructions here](/connections/connect-devices/warp/install-cloudflare-cert). You can also find the certificate in the Cloudflare for Teams dashboard. Navigate to the `Account` page in the `Settings` section of the sidebar and scroll to the bottom.

Next, follow [these instructions](/connections/connect-devices/warp/install-cloudflare-cert) to install the certificate on your system.

Once the certificate has been installed, you can configure Gateway to inspect HTTP traffic. To do so, navigate to the `Policies` page in the Gateway section. Click the **Settings** tab and toggle `Proxy Settings` to enabled.

![Add Policy](../static/secure-web-gateway/block-uploads/filter-toggle.png)

## Create a Gateway HTTP policy

Next, you can [build a policy](/policies/filtering/http-policies) that will block file uploads to Google Drive. Navigate to the `Policies` page. On the HTTP tab, click `Add a policy`.

![Add Policy](../static/secure-web-gateway/block-uploads/add-policy.png)

Uploading files to Google Drive consists of `POST` and `PUT` methods made to `clients6.google.com`. To block Google Drive uploads, block these methods to that host.

In the rule builder, add `Host is drive.google.com` and a second rule where `HTTP Method is POST`. Choose the Block action. Click `Save`.

![Block POST](../static/secure-web-gateway/block-uploads/block-post.png)

Add a second policy, replacing `POST` with `PUT`.

![Block PUT](../static/secure-web-gateway/block-uploads/block-put.png)

You should now see both policies in the `Policies` view.

![All Policies](../static/secure-web-gateway/block-uploads/all-policies.png)

<Aside>

Alternatively, you can block all POST and PUT methods to `google.com` subdomains in the event that the `clients6` subdomain changes. However, this may block other Google functionality.

</Aside>

## Test policy

You can test the policy by attempting to upload a file to Google Drive. Google Drive should return an error message when blocked.

![Block Action](../static/secure-web-gateway/block-uploads/block-result.png)

## View Logs

Once enabled, if a user attempts to upload a file you can view logs of the block.

Navigate to the `Logs` section of the sidebar and choose `Gateway`. Open the Filter action and select `Block` from the dropdown under `Decision`.

![Block Action](../static/secure-web-gateway/block-uploads/block-logs.png)

## Optional: Deploy via MDM

You can deploy the WARP client on corporate devices in a way that does not require users to configure the Org Name. To do so, [follow these instructions](https://developers.cloudflare.com/warp-client/teams).
