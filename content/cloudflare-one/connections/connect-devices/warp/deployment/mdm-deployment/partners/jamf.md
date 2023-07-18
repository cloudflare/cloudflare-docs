---
pcx_content_type: how-to
title: Jamf
weight: 2
meta:
  description: Learn how to deploy Cloudflare WARP using Jamf.
---

# Deploy WARP using Jamf

## macOS

### Prerequisites

- [Download the `Cloudflare_WARP.pkg` file](/cloudflare-one/connections/connect-devices/warp/download-warp/#macos)

- [Create a `plist` file](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/#create-plist-file)

### 1. Upload the WARP package

1. Log in to your [Jamf](https://www.jamf.com/) account.
2. Go to **Computer** > **All Settings** (gear icon).
3. Click **Computer Management** > **Packages** > **New**.
4. Upload the `Cloudflare_WARP.pkg` file.
   For the Display name, we recommend entering the version number of the package being uploaded.
5. Click **Save** to complete the upload.

### 2. Create the policy

1. Go to **Computers** > **Policies** > **+ New**.
2. Enter a Display name such as `Cloudflare WARP Client`.\
   For **Triggers**, our recommendation is to select _Startup_, _Login_, _Enrollment Complete_ and _Recurring Check-in_, but you can select the value that works best for your organization.
3. Click **Packages** > **Configure**.
4. Click **Add** next to the `Cloudflare_WARP.pkg` file you previously uploaded.
5. Click **Save**.

### 3. Add a Configuration Profile

1. Go to **Configuration Profiles** > **New**.
2. Enter a name for your new profile, such as `Cloudflare Zero Trust`.
3. Scroll through the options list and click **Application & Custom Settings** > **Configure**.
4. In **Preference Domain**, enter `com.cloudflare.warp`.
5. Upload your `plist` file and click **Save**.
6. Go to **Scope** to configure which devices in your organization will receive this profile.
7. Click **Save**.

Jamf is now configured to deploy the Cloudflare WARP client.

## iOS

The WARP client, known in the App Store as [1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627), allows for an automated install via Jamf.

### Prerequisites

Create an [XML file](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/#ios) with your custom deployment preferences.

### Configure Jamf for iOS

1. Log in to your [Jamf](https://www.jamf.com/) account.
2. Go to **Devices** > **Mobile Device Apps** > **+ New**.
3. Select _App store app or apps purchased in volume_ and click **Next**.
4. In the search box, enter `1.1.1.1: Faster Internet`. Click **Next**.
5. In the row for _1.1.1.1: Faster Internet by Cloudflare Inc._, click **Add**. To verify that it is the correct application, click [this App Store link](https://apps.apple.com/us/app/id1423538627).
6. Go to **Scope** and specify the devices in your organization that will receive the application.
7. Go to **App Configuration** and copy/paste your XML file.
8. Click **Save**.

Jamf is now configured to deploy the WARP client.
