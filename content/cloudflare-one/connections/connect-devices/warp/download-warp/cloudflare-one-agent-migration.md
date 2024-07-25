---
pcx_content_type: how-to
title: Migrate 1.1.1.1 app
weight: 12
---

# Migrate 1.1.1.1 to the Cloudflare One Agent

Users can connect to Cloudflare Zero Trust services through an agent that runs on their device. Cloudflare previously bundled that functionality into the [WARP client](/warp-client/), an application that also provides privacy-focused DNS and VPN services for consumers (known as 1.1.1.1 w/ WARP). Supporting both enterprise and consumer functionality in the same application allowed us to build Zero Trust upon the same foundation used by millions of consumers across the globe, but has limited the pace at which changes could be released. As a result, we are launching a dedicated Cloudflare One Agent that replaces the WARP client for Zero Trust deployments.

The Cloudflare One Agent supports all existing Zero Trust functionality. The underlying connection technology remains the same, and improvements made to performance and reliability based on feedback from 1.1.1.1 w/ WARP users will continue to be built into the Cloudflare One Agent.

## macOS, Windows, and Linux

No action is required for desktop clients at this time. The existing Cloudflare WARP client will continue to support both Zero Trust and 1.1.1.1 functionality.

## iOS and Android

Zero Trust users must migrate from the 1.1.1.1 app to the Cloudflare One Agent app by 2023-12-31.

Organizations can migrate their teams with minimal disruption in one of two modes: [manually](#migrate-manual-deployments) or via a [managed endpoint solution](#migrate-managed-deployments).

### Migration impact

- New Zero Trust features will only be released to the Cloudflare One Agent.
- The 1.1.1.1 app will continue to support the current feature set (and any security updates) through 2023-12-31.
- All Zero Trust functionality will be removed from 1.1.1.1 app versions released after 2023-12-31. Zero Trust will continue to work on 1.1.1.1 app versions released prior to 2023-12-31.

### Migrate manual deployments

If you downloaded and installed the 1.1.1.1 app manually, here are the recommended migration steps:

{{<tabs labels="Android | iOS">}}
{{<tab label="android" no-code="true">}}

1. Update the **1.1.1.1** app to version 6.29 or above. The update ensures that 1.1.1.1 can [co-exist](#what-to-do-with-the-old-app) with the new Cloudflare One Agent app.
2. If you have enabled [TLS decryption](/cloudflare-one/policies/gateway/http-policies/tls-decryption/), ensure that you have a [Do Not Inspect policy](/cloudflare-one/policies/gateway/initial-setup/http/#bypass-inspection-for-incompatible-applications) in place for the following applications:
    - _Google Services (Do Not Inspect)_
    - _Google Play Store (Do Not Inspect)_
    - _Google (Do Not Inspect)_
    - _Google Drive (Do Not Inspect)_
    - _Google Chat (Do Not Inspect)_
    - _Google Meet (Do Not Inspect)_

    This prevents certificate pinning issues when performing the Android migration.

3. Follow [these instructions](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#ios-android-and-chromeos) to install and enroll the Cloudflare One Agent.

{{</tab>}}
{{<tab label="ios" no-code="true">}}

1. Update the **1.1.1.1** app to version 6.22 or above. The update ensures that 1.1.1.1 can [co-exist](#what-to-do-with-the-old-app) with the new Cloudflare One Agent app.
2. [Download](/cloudflare-one/connections/connect-devices/warp/download-warp/#ios) the **Cloudflare One Agent** app.
3. Launch the Cloudflare One Agent app. All settings from 1.1.1.1 will automatically migrate over to the Cloudflare One Agent. The user does not need to reauthenticate.

{{</tab>}}
{{</tabs>}}

If you enrolled the Cloudflare One Agent in the same Zero Trust organization as 1.1.1.1, you will be automatically logged out of Zero Trust on 1.1.1.1. The 1.1.1.1 app will revert to consumer mode, and the **Login with Cloudflare Zero Trust**  button on the old app will redirect to the new app.

If you enrolled the Cloudflare One Agent in a different Zero Trust organization, you will remain logged into your other Zero Trust organization on 1.1.1.1.

#### What to do with the old app

While both 1.1.1.1 and Cloudflare One Agent can exist on the device, iOS and Android will only allow one of these applications to connect at a time.

To access your company's resources, you must use the Cloudflare One Agent app.

You can use the 1.1.1.1 app for personal browsing. When connected to 1.1.1.1 w/ WARP, your traffic will be encrypted and privately routed via Cloudflare's network, and your employer will not be able to see any of your browsing activity. To learn more about consumer WARP services, refer to [WARP client](/warp-client/).

If you do not wish to use the old 1.1.1.1 app for personal browsing, you may [uninstall](/cloudflare-one/connections/connect-devices/warp/remove-warp/#ios-and-android) it.

### Migrate managed deployments

If you deployed the 1.1.1.1 app with an [MDM provider](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/), perform the migration as follows:

{{<tabs labels="Android | iOS">}}
{{<tab label="android" no-code="true">}}

1. Using your MDM tool, update the **1.1.1.1** app to version 6.29 or above. The update ensures that 1.1.1.1 can co-exist with the new Cloudflare One Agent app during the migration.

2. Add the **Cloudflare One Agent** app from the Google Play store. Its application ID is `com.cloudflare.cloudflareoneagent`.

3. Copy your [MDM deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/#android) for the **1.1.1.1** app.

4. Paste the MDM deployment parameters into the **Cloudflare One Agent** app configuration. Make sure that you do not accidentally overwrite the application ID (`com.cloudflare.cloudflareoneagent`).

5. Using your MDM tool, install the **Cloudflare One Agent** on your devices.

6. On Android, the user will need to [re-authenticate](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#ios-android-and-chromeos) to the new application, following the same onboarding steps they went through initially.

{{</tab>}}
{{<tab label="ios" no-code="true">}}

1. Using your MDM tool, update the **1.1.1.1** app to version 6.22 or above. The update ensures that 1.1.1.1 can co-exist with the new Cloudflare One Agent app during the migration.

2. Add the **Cloudflare One Agent** app from the App store. Its application ID is `com.cloudflare.cloudflareoneagent`.

3. Copy your [MDM deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/#android) for the **1.1.1.1** app.

4. Paste the MDM deployment parameters into the **Cloudflare One Agent** app configuration. Make sure that you do not accidentally overwrite the application ID (`com.cloudflare.cloudflareoneagent`).

5. Using your MDM tool, install the **Cloudflare One Agent** on your devices.

On iOS, the user does not need to re-authenticate — registration data from the 1.1.1.1 app is automatically migrated to the new Cloudflare One Agent app.

{{</tab>}}
{{</tabs>}}

Once users have enrolled, the migration process is complete. The 1.1.1.1 app will revert to [consumer mode](#what-to-do-with-the-old-app) and ignore the existing MDM configuration profile. If you do not wish to keep the 1.1.1.1 app, you may uninstall it and delete its MDM configuration.

### Verify migration

To check whether a user has migrated, go to **My Team** > **Devices**. A device enrolled through the Cloudflare One Agent will appear as a new device with a new device ID. Their old 1.1.1.1 registration will remain as an inactive device.
