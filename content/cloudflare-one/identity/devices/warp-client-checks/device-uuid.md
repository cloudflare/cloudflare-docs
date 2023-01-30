---
pcx_content_type: how-to
title: Device UUID
weight: 3
---

# Device UUID

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Windows, macOS, Linux, iOS, Android, ChromeOS | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

Cloudflare Zero Trust allows you to build Zero Trust rules based on device UUIDs supplied in an MDM file. You can create these rules so that access to applications is granted only to users connecting from company devices.

## 1. Assign UUIDs to devices

1. Generate a unique identifier for each corporate device. For best practices on choosing UUIDs, refer to the [Android documentation](https://developer.android.com/training/articles/user-data-ids#best-practices-android-identifiers).
2. Enter the UUIDs into your MDM configuration file using the [`unique_client_id` key](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/#unique_client_id).

## 2. Create a list of UUIDs

To create rules based on device UUIDs, you first need to create a [Gateway List](/cloudflare-one/policies/filtering/lists/) of UUIDs.

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **My Team** > **Lists**.

2. Select **Create manual list** or **Upload CSV**. For larger teams, we recommend uploading a CSV or using Cloudflare's [API endpoint](https://developers.cloudflare.com/api/operations/zero-trust-lists-list-zero-trust-lists).

3. Give your list a descriptive name, as this name will appear when configuring your policies.

4. Set **List Type** to _Device IDs_.

5. Enter the UUIDs of the devices your team manages, or upload your CSV file.

6. Select **Save**.

## 3. Enable the posture check

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client**.

2. Scroll down to **WARP client checks** and select **Add new**.

3. Select **Unique Client ID**.

4. You will be prompted for the following information:
    - **Name**: Enter a unique name for this device posture check.
    - **Operating system**: Select the operating system of the device.
    - **List**: Select your [list of UUIDs](#2-create-a-list-of-uuids).

5. Select **Save**.

6. [Verify](/cloudflare-one/identity/devices/#2-verify-device-posture-checks) that the posture check is returning the expected results.

You can now create an Access or Gateway device posture policy that checks if the device presents a UUID on your list.
