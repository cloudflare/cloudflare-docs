---
updated: 2021-03-09
category: 🛡️ Web Gateway
difficulty: Advanced
pcx_content_type: tutorial
title: Block file uploads to Google Drive
---

# Block file uploads to Google Drive

You can use Cloudflare Gateway and the Cloudflare WARP client application to prevent enrolled devices from uploading files to an unapproved cloud storage provider.

**This tutorial covers how to:**

- Create a Gateway policy to block file uploads to a specific provider
- Enroll devices into a Zero Trust account where this rule will be enforced
- Log file type upload attempts

**Time to complete:**

10 minutes

## Create a Gateway HTTP policy

You can [build a policy](/cloudflare-one/policies/filtering/http-policies/) that will block file uploads to Google Drive. Navigate to the `Policies` page. On the HTTP tab, click `Create a policy`.

Name the policy and provide an optional description.

Cloudflare curates a constantly-updating list of the hostnames, URLs, and endpoints used by common applications. In this example, "Google Drive" list contains the destinations used by Google Drive.

In the rule builder, select "Application" in the **Selector** field, "in" in the **Operator** field, and under "File Sharing" select "Google Drive" in the **Value** field.

![Selecting Google Drive in the Value field dropdown menu.](/cloudflare-one/static/secure-web-gateway/block-uploads/select-google-drive.png)

Next, click **+ Add Condition** and choose "Upload Mime Type" and "matches regex". Under value, input `.*` - this will match against files of any type being uploaded.

![Example of field settings that will match against files of any type being uploaded.](/cloudflare-one/static/secure-web-gateway/block-uploads/upload-mime-type.png)

Scroll to **Action** and choose "Block". Click **Create rule** to save the rule.

## Exempt some users

You can allow certain users to upload to Google Drive, while blocking all others, by adding a second policy and modifying the order of rule operations in Gateway.

Create a new policy and include the first two values from the previous policy. Add a third condition and input the value of user identity that should be allowed to upload. Select `Allow` for the action and save the rule.

Next, modify the existing rule order by dragging each rule into the desired order.

## Integrate your identity provider

The HTTP filtering policy created will apply to any HTTP requests sent from configured locations or enrolled devices. You can begin to [enroll devices](/cloudflare-one/connections/connect-devices/warp/deployment/) by determining which users are allowed to enroll.

Navigate to the `Settings` section of Zero Trust and select `Authentication`. Cloudflare Zero Trust will automatically create a "One-time PIN" option which will rely on your user's emails. You can begin using the one-time PIN option immediately or you can also integrate your corporate [identity provider](/cloudflare-one/identity/idp-integration/).

## Determine which devices can enroll

Next, build a rule to decide which devices can enroll in your account.

1.  Navigate to **Settings > Devices > Device enrollment**.

1.  Click **Manage**.

1.  Click **Add a rule**.

    Determine who is allowed to enroll by using criteria including Access groups, groups from your identity provider, email domain, or named users. For example, you can include emails ending in `@cloudflare.com` so that any user with a `@cloudflare.com` account may enroll.

1.  Click **Save**.

Your rule will now be visible under the **Device enrollment rules** list.

## Configure the Cloudflare certificate

To inspect traffic, Cloudflare Gateway requires that a [certificate be installed](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on enrolled devices. You can also distribute this certificate through an MDM provider. The example below describes the manual distribution flow.

To download the Cloudflare certificate:

- Follow the link provided in [these instructions](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/).
- Find the certificate in Zero Trust, by navigating to **Settings > Devices > Certificates**.

## Enable the Cloudflare proxy

Once the certificate has been installed, you can configure Gateway to inspect HTTP traffic. To do so, navigate to **Settings > Network**. Toggle **Proxy** to _Enabled_. This will tell Cloudflare to begin proxying any traffic from enrolled devices, except the traffic excluded using the [split tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/) settings.

Next, enable TLS decryption. This will tell Cloudflare to begin decrypting traffic for inspection from enrolled devices, except the traffic excluded from inspection.

## Enroll a device

1.  Follow the [instructions](/cloudflare-one/connections/connect-devices/warp/deployment/) to install the WARP client depending on your device type. Cloudflare Gateway does not need a special version of the client.

1.  Once the client is installed, click the gear icon.

    ![Accessing the WARP configuration menu from a desktop.](/cloudflare-one/static/secure-web-gateway/secure-dns-devices/warp.png)

1.  Under the **Account** tab, click **Login with Cloudflare for Teams**.

1.  Input your [team name](/cloudflare-one/glossary/#team-name). You can find it in Zero Trust under **Settings > General**.

    ![Team name used to configure the WARP app on a desktop device.](/cloudflare-one/static/secure-web-gateway/secure-dns-devices/org-name.png)

The user will be prompted to login with the identity provider configured in Cloudflare Access. Once authenticated, the client will update to `Teams` mode. You can click the gear to toggle between DNS filtering or full proxy. In this use case, you must toggle to `Gateway with WARP`. These settings can be configured globally for an organization through a device management platform.

![Gateway with WARP enabled in the Teams workflow.](/cloudflare-one/static/secure-web-gateway/block-football/warp-mode.png)

## Test policy

You can test the policy by attempting to upload a file to Google Drive. Google Drive should return an error message when blocked.
