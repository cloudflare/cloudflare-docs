---
title: Require Gateway
pcx_content_type: how-to
weight: 9
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

With Require Gateway, you can allow access to your applications only to devices enrolled in your organization's instance of Gateway. Unlike [Require WARP](/cloudflare-one/identity/devices/warp-client-checks/require-warp/), which will check for any WARP instance (including the consumer version), Require Gateway will only allow requests coming from devices whose traffic is filtered by your organization's Cloudflare Gateway configuration. This policy is best used when you want to protect company-owned assets by only allowing access to employees.

## 1. Enable the Gateway check

1. In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **WARP client checks** and select **Add new**.
3. Select **Gateway**.
4. Select **Save**.

You are now ready to start requiring Gateway for your Access applications.

## 2. Add the check to an Access policy

1. In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com), go to **Access > Applications**.

2. Locate the application for which you want to require Gateway.

3. Select **Edit**.

4. To have an existing policy require Gateway, select **Edit** for that specific policy. Then, add an **Include** or **Require** rule which uses the _Gateway_ selector.

5. Select **Save rule**.

Before granting access to the application, your policy will now check that the device is running the WARP client and enrolled in your Zero Trust organization.

Make sure you enabled Firewall Proxy in your Zero Trust Network settings and installed the Cloudflare Root CA-certificate on client devices with Cloudflare WARP installed before using the "require Gateway"-policy rule, otherwise your users will see a forbidden-error when accessing the application.
