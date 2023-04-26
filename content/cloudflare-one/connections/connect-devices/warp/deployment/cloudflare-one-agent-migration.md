---
pcx_content_type: how-to
title: Migrate to the Cloudflare One Agent
weight: 12
---

# Migrate to the Cloudflare One Agent

Cloudflare has started splitting the [Zero Trust WARP client](/cloudflare-one/connections/connect-devices/warp/) and the [consumer WARP client](/warp-client/) into two separate applications. Users who are logged in to a Zero Trust organization on the WARP client will need to migrate to the new Cloudflare One Agent. Users who are running the WARP client in consumer / 1.1.1.1 mode are not impacted by this change.

## macOS, Windows, and Linux

The Cloudflare One Agent for desktop is coming soon. No action is required at this time.

## iOS and Android

Starting on 2023-04-24, new Zero Trust features will be invested into the **Cloudflare One Agent** application. The **1.1.1.1** application will continue to support the current feature set until 2023-09-30.

### Migrate managed deployments

If you deployed the WARP client with an [MDM provider](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/), perform the migration as follows:

1. Uninstall the **1.1.1.1** application.
2. Update your MDM configuration with the new application ID:
    - For Android, the bundle ID is `com.cloudflare.coudflareoneagent`.
    - For iOS, the application ID is `?`.

    The other [WARP deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) you have configured remain the same.
3. Push the change to install the **Cloudflare One Agent**.

The user will need to re-authenticate to the new application.

### Migrate manual deployments

If you downloaded and installed the WARP client manually, perform the following steps on your device:

1. [Uninstall](/cloudflare-one/connections/connect-devices/warp/remove-warp/#ios-and-android) the **1.1.1.1** application.
2. [Download](/cloudflare-one/connections/connect-devices/warp/download-warp/) the **Cloudflare One Agent**.
3. [Re-enroll the device](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#ios-android-and-chromeos) in your Zero Trust organization.
4. Complete the authentication steps required by your organization.

The migration process is now complete.
