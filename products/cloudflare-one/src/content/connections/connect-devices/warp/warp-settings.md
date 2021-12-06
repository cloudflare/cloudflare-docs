---
order: 6
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

<Aside type='note'>
  
This feature needs the <b>Switch Locked</b> feature to be set to <b>True</b>. You can enable the feature via MDM or under <b>Settings</b> > <b>Devices</b> on the Teams dashboard.

</Aside>

When this toggle is **enabled**, you can provide end users with an one-time password that will allow them to toggle off the WARP client in case they need to work around a temporary network issue (for example, an incompatible public Wi-Fi, or a firewall at a customer site blocking the connection). 

When the toggle is **disabled**, one-time passwords will not be generated, and end users will not be able to toggle the client off when **Switch Locked* is true.

You can also set a timeout to define how long the WARP client is allowed to be paused once the end user disables it. Once the time is up, the WARP client will automatically reconnect. 

When you want to allow a user to disable the WARP client:

1. Log in to the Teams Dashboard and ensure the **Admin override** toggle is enabled. 
1. Retrieve the 7-digit override code for their device by navigating to **My Team** > **Devices** > **Connected devices**, clicking on **View** for the desired device, and scrolling down to **User details**.
1. Copy the code and share it with the end user for them to enter on their device.

Users will then need to open the WARP client on their devices, navigate to **Preferences** > **Advanced** > **Enter code**, and enter the override code in the pop-up window. The WARP client will now show as `Disconnected` and will mention the time when it will automatically reconnect.


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

## Integrated experiences

Cloudflare for Teams allows you to perform one-click actions to accelerate Office 365 traffic. Navigate to **Settings** > **Network** on the Teams dash and either:

* **Create a Do Not Inspect policy** that bypasses inspection for Office 365 traffic. This policy uses the [domains and IP address specified by Microsoft for Office 365](https://docs.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-ip-web-service), and in addition to that, it uses our own Cloudflare’s intelligence to determine which traffic is part of this app type. 
* **Exclude Office 365 Traffic** by adding your application’s IP address as a split tunnel entry. This uses the [IP addresses specified by Microsoft for Office 365](https://docs.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-ip-web-service).
