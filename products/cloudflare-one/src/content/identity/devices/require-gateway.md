---
order: 2
title: Gateway
pcx-content-type: how-to
---

# Require Gateway

Cloudflare for Teams allows you to restrict access to your applications to devices whose traffic is filtered by your organization's Cloudflare Gateway configuration. Unlike [Require WARP](/identity/devices/require-warp), which will check for any WARP instance (including the consumer version), this check will allow only requests coming from devices whose network traffic is monitored by your organizaition's instance of Gateway. This policy is best used when you want to protect company-owned assets by only allowing employees to connect.

The process involves two steps:

1. Setting up **Require Gateway** as a device posture check.
1. Adding the check to new or existing [Zero Trust policies](/policies/zero-trust) to enforce the check for one or more of your applications.

## Set up a device posture check

1. On your [Teams dashboard](https://dash.teams.cloudflare.com/), navigate to **My Team > Devices > Device Posture**.

    ![Device Posture](../../static/documentation/identity/devices/device-posture.png)

1. Select **Gateway**. 

1. Click **Save**.


You are now ready to start requiring Gateway for your Access applications.

## Add the check to a Zero Trust policy

1. On the Teams dashboard, navigate to **Access > Applications**.

1. Locate the application for which you want to require Gateway.

1. Click **Edit**.

1. To have an existing policy require Gateway, click **Edit** for that specific policy. Then, add an **Include** or **Require** rule with the option *Gateway* selected.

1. Click **Save rule**.

Before granting access to the application, your policy will now check that the user is running your organization's Gateway configuration, or the WARP client, on their machine. 
