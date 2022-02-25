---
pcx-content-type: how-to
title: Device serial numbers
weight: 6
---

# Device serial numbers

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | WARP with Gateway | All plans |

</div>
</details>

Cloudflare Zero Trust allows you to build Zero Trust rules based on device serial numbers. You can create these rules so that access to applications is granted only to users connecting from company devices.

To create rules based on device serial numbers you'll need to create a list of numbers using the [Lists](/cloudflare-one/policies/lists/) functionality in the Zero Trust Dashboard.

{{<Aside header="Important">}}

Cloudflare Access relies on the WARP client to gather the serial number of a device attempting to reach an application.

In order for your users to be able to authenticate, you must [deploy the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) in proxy mode to your company devices. Users also must enroll into your organization's Cloudflare Zero Trust account.

{{</Aside>}}

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team > Lists**.

2.  Click **Create manual list** or **Upload CSV**. For larger teams, it is recommended to upload a CSV or use Cloudflare's API endpoint.

3.  Give your list a descriptive name, as this name will appear when configuring your Access policies.

    ![Create List](/cloudflare-one/static/zero-trust-security/corp-device/list-create.png)

4.  Set List Type to Serial Number.

5.  Input the serial numbers of the devices your team manages, or upload your CSV file.

    ![Add Serial Number](/cloudflare-one/static/zero-trust-security/corp-device/list-add-serial.png)

6.  Click **Save**.

Once saved, the serial number list will appear in your list view.

![List](/cloudflare-one/static/zero-trust-security/corp-device/list-saved.png)

Now you can create or update an existing Access policy to require that any device requesting access belongs to your list of serial numbers.

To do that:

1.  Navigate to **Access > Applications**.

2.  To add to an existing application, choose the specific resource from the **Applications** page in the Access section of the sidebar.

3.  Click **Edit**.

4.  Select the **Rules** tab and edit an existing rule. To add a new rule, click **Add a Rule**.

5.  Add a **Require** rule and choose *Device Posture - Serial Number List* from the drop-down menu.

6.  Choose the list of devices to require and click **Save rule**.

Once saved, any device attempting to reach the application will need to connect from a device that uses Cloudflare WARP and presents a serial number in the list created.
