---
pcx_content_type: how-to
title: Device serial numbers
weight: 6
---

# Device serial numbers

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems     | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| --------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| macOS, Windows, Linux | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

Cloudflare Zero Trust allows you to build Zero Trust rules based on device serial numbers. You can create these rules so that access to applications is granted only to users connecting from company devices.

To create rules based on device serial numbers you'll need to create a list of numbers using the [Lists](/cloudflare-one/policies/filtering/lists/) functionality in the Zero Trust Dashboard.

{{<Aside header="Important">}}

Cloudflare Access relies on the WARP client to gather the serial number of a device attempting to reach an application.

In order for your users to be able to authenticate, you must [deploy the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) in proxy mode to your company devices. Users also must enroll into your organization's Cloudflare Zero Trust account.

{{</Aside>}}

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team > Lists**.

1.  Click **Create manual list** or **Upload CSV**. For larger teams, it is recommended to upload a CSV or use Cloudflare's API endpoint.

1.  Give your list a descriptive name, as this name will appear when configuring your Access policies.

    ![Create List](/cloudflare-one/static/zero-trust-security/corp-device/list-create.png)

1.  Set List Type to Serial Number.

1.  Input the serial numbers of the devices your team manages, or upload your CSV file.

    ![Add Serial Number](/cloudflare-one/static/zero-trust-security/corp-device/list-add-serial.png)

1.  Click **Save**.

Once saved, the serial number list will appear in your list view.

![List](/cloudflare-one/static/zero-trust-security/corp-device/list-saved.png)

Now you can create or update an existing Access policy to require that any device requesting access belongs to your list of serial numbers.

To do that:

1.  Navigate to **Access > Applications**.

1.  To add to an existing application, choose the specific resource from the **Applications** page in the Access section of the sidebar.

1.  Click **Edit**.

1.  Select the **Rules** tab and edit an existing rule. To add a new rule, click **Add a Rule**.

1.  Add a **Require** rule and choose _Device Posture - Serial Number List_ from the drop-down menu.

1.  Choose the list of devices to require and click **Save rule**.

Once saved, any device attempting to reach the application will need to connect from a device that uses Cloudflare WARP and presents a serial number in the list created.

## Determine the serial number

Operating systems display version numbers in different ways. This section covers how to retrieve the version number in each OS, in a format matching what the OS Version posture check expects.

{{<Aside type="note">}}

You must ensure the version is entered is a valid `x.x.x` SemVer. If the command below only returns a value of `x.x`, you must append a `.0` so the complete version follows the `x.x.0` format.

{{</Aside>}}

### On macOS

1.  Open a terminal window.
1.  Use the `system_profiler` command to check for the value of `SPHardwareDataTypeng` and retrieve the serial number.

```txt
system_profiler SPHardwareDataTypeng
```

### On Windows

1.  Open a Powershell window.
1.  Use the `Get-CimInstance` command to get the SerialNumber property of the `Win32_BIOS` class.

```txt
Get-CimInstance Win32_BIOS
```

### On Linux

1.  Open a Terminal Window
1.  Use the `dmidecode` command to get the version property `system-serial-number`.

```txt
sudo dmidecode -s system-serial-number
```
