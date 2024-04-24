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
3. Select **Computer Management** > **Packages** > **New**.
4. Upload the `Cloudflare_WARP_<VERSION>.pkg` file.
   For the Display name, we recommend entering the version number of the package being uploaded.
5. Select **Save** to complete the upload.

### 2. Create the policy

1. Go to **Computers** > **Policies** > **+ New**.
2. Enter a Display name such as `Cloudflare WARP Client`.\
   For **Triggers**, our recommendation is to select _Startup_, _Login_, _Enrollment Complete_ and _Recurring Check-in_, but you can select the value that works best for your organization.
3. Select **Packages** > **Configure**.
4. Select **Add** next to the `Cloudflare_WARP_<VERSION>.pkg` file you previously uploaded.
5. Select **Save**.

### 3. Add a Configuration Profile

1. Go to **Configuration Profiles** > **New**.
2. Enter a name for your new profile, such as `Cloudflare Zero Trust`.
3. Scroll through the options list and select **Application & Custom Settings** > **Configure**.
4. In **Preference Domain**, enter `com.cloudflare.warp`.
5. Upload your `plist` file and select **Save**.
6. Go to **Scope** to configure which devices in your organization will receive this profile.
7. Select **Save**.

Jamf is now configured to deploy the Cloudflare WARP client.

## iOS

The Cloudflare One Agent allows for an automated install via Jamf.

### Prerequisites

Create an [XML file](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/#ios) with your custom deployment preferences.

### Configure Jamf for iOS

1. Log in to your [Jamf](https://www.jamf.com/) account.
2. Go to **Devices** > **Mobile Device Apps** > **+ New**.
3. Select _App store app or apps purchased in volume_ and select **Next**.
4. In the search box, enter `Cloudflare One Agent`. Select **Next**.
5. In the row for _Cloudflare One Agent by Cloudflare Inc._, select **Add**. To verify that it is the correct application, view it in the [App Store](https://apps.apple.com/us/app/cloudflare-one-agent/id6443476492).
6. Go to **Scope** and specify the devices in your organization that will receive the application.
7. Go to **App Configuration** and copy/paste your XML file.
8. Select **Save**.

Jamf is now configured to deploy the Cloudflare One Agent.
