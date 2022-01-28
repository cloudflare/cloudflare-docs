---
order: 3
pcx-content-type: how-to
title: Device posture
---

# Device posture attributes

With Cloudflare Zero Trust, you can configure Zero Trust policies that rely on additional signals from endpoint security providers to allow or deny connections to your applications. 

When device posture checks are configured, users can only connect to a protected application if they have a managed or healthy device, as determined by the endpoint security provider associated to the Access policy regulating access to the protected application.

To enable one or more device posture attributes, navigate to **My Team** > **Devices** > **Device posture** on the [Zero Trust dashboard](https://dash.teams.cloudflare.com) and click **+Add**.

<Aside>

When setting up new device posture checks, we recommend first testing them without setting certificate thumbprint or SHA256 checksum values. 

</Aside>

## Available device posture attributes

<DirectoryListing path="/identity/devices"/>

## Verify device posture checks in the WARP client

On desktop clients, you can always verify which device posture checks are active on your devices. To do that:

1. Open the WARP client.
1. Go to **Settings** > **Advanced**.
1. Click on **Device posture information**.

This will show a list of active device posture checks.

   ![Device posture attributes](../../static/documentation/identity/devices/device-posture-client-ui.png)
