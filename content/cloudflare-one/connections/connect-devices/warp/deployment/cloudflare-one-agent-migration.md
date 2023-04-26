---
pcx_content_type: how-to
title: Migrate to the Cloudflare One Agent
weight: 12
---

# Migrate to the Cloudflare One Agent

Cloudflare is moving Zero Trust functionality out of the WARP client and into a new application called the Cloudflare One Agent.  This change will allow Cloudflare to release new features to the [consumer client](/warp-client/) without impacting the stability of the [Zero Trust enterprise client](/cloudflare-one/connections/connect-devices/warp/).  The Cloudflare One Agent will continue to share the same core platform and global network as the consumer WARP client.

## macOS, Windows, and Linux

The Cloudflare One Agent for desktop is coming at a later date. No action is required at this time.

## iOS and Android

Users enrolled in a Zero Trust organization will need to migrate from the 1.1.1.1 app to the Cloudflare One Agent by 2023-09-30.

### Migration impact
- New Zero Trust features will be added to the Cloudflare One Agent.
- 1.1.1.1 will continue to support the current feature set until 2023-09-30.
- After 2023-09-30, all Zero Trust functionality will be removed from 1.1.1.1.

### Migrate managed deployments

If you deployed the WARP client with an [MDM provider](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/), perform the migration as follows:

1. Update your MDM configuration to uninstall the **1.1.1.1** application.

    While both 1.1.1.1 and Cloudflare One Agent can exist on the device, iOS and Android will only allow one of these applications to run at a time.

2. Update your MDM configuration to deploy the new application ID: `com.cloudflare.cloudflareoneagent`.

    The other [WARP deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) you have configured remain the same.

3. Push the change to remove 1.1.1.1 and install Cloudflare One Agent.

The user will need to re-authenticate to the new application.

### Migrate manual deployments

If you downloaded and installed the WARP client manually, perform the following steps on your device:

1. [Uninstall](/cloudflare-one/connections/connect-devices/warp/remove-warp/#ios-and-android) the **1.1.1.1** application.
2. [Download](/cloudflare-one/connections/connect-devices/warp/download-warp/) the **Cloudflare One Agent**.
3. [Re-enroll the device](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#ios-android-and-chromeos) in your Zero Trust organization.
4. Complete the authentication steps required by your organization.

Once you have enrolled, the migration process is complete.
