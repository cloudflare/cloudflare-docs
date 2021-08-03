---
order: 5
pcx-content-type: reference
---

# Configure WARP settings

<Aside type="note">

If you are deploying WARP via MDM, see the following list of parameters instead. Any settings you configure on the Teams Dashboard will be overridden by an MDM deployment. To ensure Dashboard settings are applied as intended, remove the corresponding parameters from your MDM deployment.

</Aside>

To manage WARP settings and device connectivity preferences, navigate to **Settings** > **Devices** on the Teams Dashboard.

## Admin override

When the toggle is enabled, users will be able to make changes to the WARP client configuration if they have a one-time password. When the toggle is disabled, no one-time passwords are generated, and the users will not be able to change the client's configuration.

## Device enrollment rules

Cloudflare for Teams allows you to establish which users in your organization can enroll new devices or revoke access to connected devices. To do that, you can create a device enrollment rule on the Teams Dashboard:

1. Click **Manage** in the **Device enrollment rules** card.
1. In the rule builder, configure a rule to define who can enroll or revoke devices.
1. Click **Save**.

## Captive portal detection

Captive Portal detection is the ability for the WARP client to detect a third-party onboarding flow before Internet access is obtained. This is most frequent in places such as airports, cafes, and hotels. 

When the toggle is enabled, the WARP client will automatically turn off when it detects a captive portal, and it will automatically turn on after the amount of time you specify in the card.

## Mode switch

When the toggle is enabled, users have the option to turn off the [Gateway with WARP](/connections/connect-devices/warp#gateway-with-warp-default) mode and switch to [Gateway with DoH mode](/connections/connect-devices/warp#gateway-with-doh). When the toggle is disabled, end users will not be able to switch between WARP modes.

---

## Enable Proxy

1. Navigate to **Settings** > **Network**.
1. Scroll down to **L7 Firewall**.
1. Set the **Proxy** switch to *Enabled*.
