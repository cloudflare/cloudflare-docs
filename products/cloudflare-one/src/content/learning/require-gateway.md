---
order: 2
---

#  Enforce Gateway or WARP for Access

With Access, you can require that all traffic to specific applications is monitored by Cloudflare Gateway. With Gateway protecting and filtering all requests to your applications, you will be able to see all user traffic and activity in each of these applications, broken down by user and device.

Alternatively, you can require users to run WARP (Cloudflare's secure and modern VPN) in order to access an application. This ensures that all user traffic is encrypted and routed through Cloudflare.

You can choose to require Gateway or WARP by configuring dedicated actions within your Access policies.

The first step you need to take in order to require Gateway or WARP is to add a device posture integration.

To do that:

1. Log in to your [Teams dashboard](https://dash.teams.cloudflare.com/) and navigate to **Access > Authentication > Device Posture**.
1. Select **Gateway** if you’d like to require all traffic to flow through your Gateway instance. Select **WARP** if you’d like to require all traffic to flow through Cloudflare’s VPN.

![Device Posture](../static/documentation/device-posture.png)

You are now ready to start requiring Gateway or WARP for your Access applications.

1. On the Teams dashboard, navigate to **Access > Applications**.

1. Locate the application for which you want to require Gateway or WARP.

1. Click **Edit**.

1. To have an existing policy require Gateway or WARP, click **Edit** for that specific policy. Then, and add an **Include** or **Require** rule with the option *Gateway* selected. If you'd like to require WARP instead, select *WARP*.

 To create a new policy requiring Gateway or WARP, click **Add a rule**. Then, add an **Include** or **Require** rule with the option *Gateway* selected. If you'd like to require WARP instead, select *WARP*. 

1. Click **Save rule**.

Before granting access to the application, your policy will now check that the user is running your organization's Gateway configuration, or the WARP client, on their machine. 