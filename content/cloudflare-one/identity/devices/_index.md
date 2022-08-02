---
pcx_content_type: how-to
title: Device posture
weight: 4
meta:
  title: Device posture attributes
---

# Device posture attributes

With Cloudflare Zero Trust, you can configure Zero Trust policies that rely on additional signals from endpoint security providers to allow or deny connections to your applications.

When device posture checks are configured, users can only connect to a protected application if they have a managed or healthy device, as determined by the endpoint security provider associated to the Access policy regulating access to the protected application.

To enable one or more device posture attributes, navigate to **Settings* > **WARP Client** > **Device posture** on the [Zero Trust dashboard](https://dash.teams.cloudflare.com) and click **+Add new**.

## Available device posture attributes

{{<directory-listing>}}

## Verify device posture checks in the Zero Trust Dashboard

Before integrating a device posture check in a Gateway or Access policy, you should verify the Pass result and data from the device matches your expectations. To do that:

1.  On the Zero Trust Dashboard, navigate to **My Team** > **Devices**.
1.  Find the device that should be running the posture check and click **View**.
1.  Scroll down to `WARP client posture checks` and review the results.

{{<Aside type="note">}}

Clicking on a posture result will provide key information on what value was returned from the device and what the expected values were according to how your posture check was defined.

{{</Aside>}}

![Device posture results in dash](/cloudflare-one/static/documentation/identity/devices/device-posture-dash-result.png)

## Verify device posture checks in the WARP client

If you don't yet see a posture result in the Zero Trust dashboard, on desktop clients, you can verify which device posture checks are active on your devices. To do that:

1.  Open the WARP client.
1.  Go to **Settings** > **Advanced**.
1.  Click on **Device posture information**.

This will show a list of active device posture checks
