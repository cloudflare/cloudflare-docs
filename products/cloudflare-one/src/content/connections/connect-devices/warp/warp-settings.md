---
order: 5
pcx-content-type: reference
---

# WARP settings

<Aside type="note">

If you are deploying [WARP in Managed mode](/connections/connect-devices/warp/deployment/mdm-deployment), refer to this [list of parameters](/connections/connect-devices/warp/deployment/mdm-deployment/parameters) instead. Any settings you configure on the Teams Dashboard will be overridden by an MDM deployment. To ensure Dashboard settings are applied as intended, remove the corresponding parameters from your MDM deployment.

</Aside>

To manage WARP settings and device connectivity preferences, navigate to **Settings** > **Devices** on the Teams Dashboard.

## Admin override

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/connections/connect-devices/warp#warp-client-modes) | [Teams plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | Any mode | All plans | 

</div>
</details>

When the toggle is enabled, users will be able to make changes to the WARP client configuration if they have a one-time password. When the toggle is disabled, no one-time passwords are generated, and the users will not be able to change the client's configuration.

## Device enrollment permissions

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/connections/connect-devices/warp#warp-client-modes) | [Teams plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| All systems | Any mode | All plans | 

</div>
</details>

Cloudflare for Teams allows you to establish which users in your organization can enroll new devices or revoke access to connected devices. To do that, you can create a device enrollment rule on the Teams Dashboard:

1. Navigate to **Settings** > **Devices**.
1. In the **Device enrollment permissions** card, click **Manage**.
1. In the rule builder, configure one or more rules to define who can enroll or revoke devices.
1. Set a session duration. Once the session expires, users will be asked to log in when attempting to connect a device. 
1. Click **Save**.

## Captive portal detection

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/connections/connect-devices/warp#warp-client-modes) | [Teams plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows | WARP with Gateway | All plans | 

</div>
</details>

Captive Portal detection is the ability for the WARP client to detect a third-party onboarding flow before Internet access is obtained. This is most frequent in places such as airports, cafes, and hotels. 

When the toggle is enabled, the WARP client will automatically turn off when it detects a captive portal, and it will automatically turn on after the amount of time you specify in the card.

## Mode switch

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/connections/connect-devices/warp#warp-client-modes) | [Teams plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | WARP with Gateway | All plans | 

</div>
</details>

When the toggle is enabled, users have the option to turn off the [Gateway with WARP](/connections/connect-devices/warp#gateway-with-warp-default) mode and switch to [Gateway with DoH mode](/connections/connect-devices/warp#gateway-with-doh). When the toggle is disabled, end users will not be able to switch between WARP modes.

---

## Enable Proxy

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [Teams plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | --------- | ---- |
| macOS, Windows, Linux | All plans | 

</div>
</details>

1. Navigate to **Settings** > **Network**.
1. Scroll down to **L7 Firewall**.
1. Set the **Proxy** switch to *Enabled*.
