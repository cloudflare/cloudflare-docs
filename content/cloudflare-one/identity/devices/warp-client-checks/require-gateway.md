---
title: Require Gateway
pcx_content_type: how-to
weight: 9
meta:
  title: Require Gateway
---

# Require Gateway

{{<details header="Feature availability">}}

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems       | WARP with Gateway                                                                                 | All plans                                                     |

</div>
</details>

With Require Gateway, you can allow access to your applications only to devices enrolled in your organization's instance of Gateway. Unlike [Require WARP](/cloudflare-one/identity/devices/warp-client-checks/require-warp/), which will check for any WARP instance (including the consumer version), Require Gateway will only allow requests coming from devices whose traffic is filtered by your organization's Cloudflare Gateway configuration. This policy is best used when you want to protect company-owned assets by only allowing access to employees.

## Enable the Gateway check

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.

2. In **WARP client checks**, select **Add new**.

3. Select **Gateway**, then select **Save**.

## Add the check to an Access policy

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.

2. Select the application for which you want to require Gateway, then select **Configure**.

3. To create a new Access policy, select **Add a policy**. To require Gateway for an existing policy, select a policy, then select **Configure**.

4. Add an Include or Require rule which uses the Gateway selector. Select **Save policy**.

Before granting access to the application, your policy will now check that the device is running the WARP client and enrolled in your Zero Trust organization.
