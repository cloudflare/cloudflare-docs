---
order: 2
title: WARP
pcx-content-type: how-to
---

# Require WARP

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/connections/connect-devices/warp#warp-client-modes) | [Teams plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| All systems | WARP with Gateway | All plans | 

</div>
</details>

<Aside type="note">

This device posture attribute will check for all versions of WARP, including the consumer version. 

</Aside>

Cloudflare for Teams enables you to restrict access to your applications to devices running the Cloudflare WARP client. This allows you to flexibly ensure that a user's traffic is secure and encrypted before allowing access to a resource protected behind Teams.

The process involves two steps:

1. Setting up **Require WARP** as a device posture check.
1. Adding the check to new or existing [Zero Trust policies](/policies/zero-trust) to enforce the check for one or more of your applications.

## Set up a device posture check

1. On your [Teams dashboard](https://dash.teams.cloudflare.com/), navigate to **My Team > Devices > Device Posture**.

    ![Device Posture](../../static/documentation/identity/devices/device-posture.png)

1. Select **WARP**. 

1. Click **Save**.

You are now ready to start requiring WARP for your Access applications.

## Add the check to a Zero Trust policy

1. On the Teams dashboard, navigate to **Access > Applications**.

1. Locate the application for which you want to require WARP.

1. Click **Edit**.

1. To have an existing policy require WARP, click **Edit** for that specific policy. Then, add an **Include** or **Require** rule with the option *WARP* selected.

1. Click **Save rule**.

Before granting access to the application, your policy will now check that the user is running the WARP client on their machine. 
