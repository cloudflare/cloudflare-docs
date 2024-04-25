---
pcx_content_type: concept
title: Update WARP
weight: 6
---

# Update WARP

This guide covers best practices for updating the WARP client.

## When to update WARP

Cloudflare recommends keeping your WARP deployment as up-to-date as possible. If you run into issues that require troubleshooting or support tickets, one of the first requested actions by our support team will be to update your clients to the latest version.

We also recognize that there is a cost associated for a business to go through an update cycle, potentially related to change management, QA version testing, and other critical activities for software updates. For customers with limited software update cycles, we recommend updating the client on a quarterly basis if possible. This will address ongoing bug fixes, performance improvements, and new feature development at a reasonable cadence. If quarterly updates are not possible, we recommend a minimum of twice a year update cycles.

### Release schedule

Cloudflare does not operate on a major-release upgrade cycle; all releases for the WARP client are incremental. With this in mind, you should choose which releases make the most sense for your business.

Cloudflare publishes release notes for WARP in the official [download repositories](/cloudflare-one/connections/connect-devices/warp/download-warp/). You can look at the release notes to determine whether there is an explicit reason for updating to the latest release.

### Support lifecycle

Cloudflare supports WARP client versions for at least one year from release. After one year, WARP clients could potentially be unable to connect. Cloudflare will make every effort to communicate in advance through emails and in dash notifications if such a breaking change will occur.

## How to update WARP

### Windows, macOS, and Linux

#### Managed devices

JAMF, InTune, and other MDM tools perform software updates by installing a new binary file. If you deployed WARP using a [device management tool](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/), the update procedure will look exactly the same as your initial installation. To update WARP, simply push the [latest binary file](/cloudflare-one/connections/connect-devices/warp/download-warp/) with the same deployment parameters. End users will not be signed out of their client, and they will not have to manually engage with the update.

#### Unmanaged devices

If your users have local administration rights on their device, you can allow them to update WARP on their own via the WARP GUI. [**Allow updates**](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#allow-updates) is usually disabled on managed devices, as it can introduce version consistency control issues if WARP versions are centrally managed by IT.

### iOS, Android, and ChromeOS

The iOS App Store and Google Play store can automatically push automatic updates to devices which have auto update enabled. We recommend using this method to keep the Cloudflare One Agent up-to-date on your mobile devices (managed or unmanaged).

## Test before updates

Most issues that occur after an update are due to compatibility issues between WARP and third party security software. Before rolling out an update to your organization, be sure to test the new WARP release alongside your other software.

To deploy an update incrementally:

1. Install the latest version of WARP on a single device.
2. Verify connectivity in your Gateway logs, and verify that your third party software still works as expected.
3. Deploy the update to a few more devices that represent a broad set of configurations within your organization. For example, you could include devices from a variety of departments such as Engineering, Human Resources, and IT.
4. Verify connectivity for these devices.
5. Once everything is working, deploy the update to the rest of your organization.
