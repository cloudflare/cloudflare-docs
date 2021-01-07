---
title: New account
order: 1
---

# Setup Cloudflare for Teams

If you do not have a Cloudflare for Teams account, [sign up here](https://dash.cloudflare.com/sign-up/teams).

If you already have a Cloudflare account, [login to the Teams dashboard here](https://dash.teams.cloudflare.com).

## New account setup

Browser Isolation is enabled through Gateway. Choose **Cloudflare Gateway** and then **Begin setup**.

### Choose Authentication domain

Please select a Cloudflare for Teams authentication domain. This domain will be used as your organization name in the WARP client during user and device enrollment.

### First location setup

This step is part of Gateway’s DNS filtering and is not necessary to use Browser Isolation. Select **Skip to Teams dash**.

## Setup a device enrollment policy

Device enrollment policies control who is able to connect to your Teams authentication domain via the WARP client. To configure your device enrollment policy select **My Team** then **Devices**.

On the **My Team \ Devices** page choose **Device settings**

Here you may scope who is able to enrol devices in Teams.

You may specify individual email addresses, or entire domain names. When finished, click **Save**

## Setup an isolation policy

Your Cloudflare for Teams account has now been created. Continue to [isolation policies](/administration/isolation-policies).

