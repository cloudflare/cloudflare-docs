---
pcx_content_type: how-to
title: JumpCloud
weight: 2
meta:
    description: Learn how to deploy Cloudflare WARP using JumpCloud.
---

# Deploy WARP using JumpCloud

## Windows

1. Log in to the [JumpCloud Admin Portal](https://console.jumpcloud.com).

2. Navigate to **Device Management** > **Software Management**.

3. Select the **Windows** tab, then click **(+)**.

    ![Configuring WARP in the JumpCloud **Windows** tab](/cloudflare-one/static/documentation/connections/jumpcloud.png)

4. In the **Software Name** field, enter a unique display name.

5. In the **Package ID** field, enter `warp`.

6. Select **Install this software**.

7. (Optional) Select **Keep software package up to date** to automatically update this app as updates become available.

8. (Optional) Select **Allow end users to delay updates for up to one week** to avoid updates during a busy time.

9. Click **save**.

10. Select the device(s) you want to deploy the app to:
    - **Single device**: Go to the **Devices** tab and select the target device.
    - **Device group**: Go to the **Device Groups** tab and select the target device group.

11. Click **save**.

12. Click **save** again.

Verify that Cloudflare WARP was installed by selecting the app and viewing the **Status** tab.

## macOS

1. Log in to the [JumpCloud Admin Portal](https://console.jumpcloud.com).

2. Navigate to **Device Management** > **Software Management**.

3. Select the **Apple** tab, then click **(+)**.

    ![Configuring WARP in the JumpCloud **Apple** tab](/cloudflare-one/static/documentation/connections/jumpcloud-mac.png)

4. In the **Software Description** field, enter a unique display name.

5. In the **Software Package URL**, enter the URL location of the `Cloudflare_WARP.pkg` file. If you do not already have the installer package, [download it here](/cloudflare-one/connections/connect-devices/warp/download-warp/#macos).

6. Select the device(s) you want to deploy the app to:
    - **Single device**: Go to the **Devices** tab and select the target device. To select all devices, select the checkbox next to **Type**.
    - **Device group**: Go to the **Device Groups** tab and select the target device group. To select all device groups, select the checkbox next to **Type**.

7. Click **save** to install the client.

Verify that Cloudflare WARP was installed by selecting the app and viewing the **Status** tab.
