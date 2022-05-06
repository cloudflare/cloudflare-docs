---
title: Gateway
pcx-content-type: how-to
weight: 2
meta:
  title: Require Gateway
---

# Require Gateway

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/#warp-client-modes) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems       | WARP with Gateway                                                                         | All plans                                                     |

</div>
</details>

With Require Gateway you can allow access to your applications only to devices enrolled in your organization's instance of Gateway. Unlike [Require WARP](/cloudflare-one/identity/devices/require-warp/), which will check for any WARP instance (including the consumer version), Require Gateway will only allow requests coming from devices whose traffic is filtered by your organization's Cloudflare Gateway configuration. This policy is best used when you want to protect company-owned assets by only allowing access to employees.

The process involves two steps:

1.  Setting up **Require Gateway** as a device posture check.
1.  Adding the check to new or existing [Access policies](/cloudflare-one/policies/access/) to enforce the check for one or more of your applications.

## Set up a device posture check

1.  On your [Zero Trust dashboard](https://dash.teams.cloudflare.com/), navigate to **My Team > Devices > Device Posture**.

    ![Device Posture](/cloudflare-one/static/documentation/identity/devices/device-posture.png)

1.  Select **Gateway**.

1.  Click **Save**.

You are now ready to start requiring Gateway for your Access applications.

## Add the check to a Zero Trust policy

1.  On the Zero Trust dashboard, navigate to **Access > Applications**.

1.  Locate the application for which you want to require Gateway.

1.  Click **Edit**.

1.  To have an existing policy require Gateway, click **Edit** for that specific policy. Then, add an **Include** or **Require** rule with the option _Gateway_ selected.

1.  Click **Save rule**.

Before granting access to the application, your policy will now check that the user is running your organization's Gateway configuration, or the WARP client, on their machine.
