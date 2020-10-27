---
title: For Teams
order: 1
---

# Cloudflare for Teams

Cloudflare for Teams organizations are able to use the client to enforce policies and controls on their employees devices anywhere on the planet. A highlight of what you can do with the clients

## Modes

* **Encrypt all user traffic** Regardless of your users’ location, all traffic from their device is encrypted with WARP and sent privately to the nearest WARP endpoint. This keeps your users and your organizations protected from whomever may be snooping. Used in conjunction with Cloudflare Access, your applications are within 10ms of wherever your user is located. If you still used a traditional VPN on top of Access to encrypt users’ traffic, that is no longer needed.

* **WARP+** Our premium Warp+ service for customers who want additional speed benefits. Any Teams customer who deploys the Teams client applications will automatically receive the premium speed benefits of WARP+.

* **Gateway Device Roaming** Enforce Cloudflare Gateway policies anywhere your users roam on any operating system supported by the Cloudflare WARP client.

* **L7 Firewall and user based policies** Allows your organization to enforce device authentication to your Teams account enabling you to build user specific policies and force all traffic through the firewall.

* **Device and User auditing**  Administrators can audit specific user and device traffic. Used in conjunction with logpush, this will allow your organization to do detailed level tracing in case of a breach or audit. (Available with Enterprise Teams plan only)

If you are unfamiliar with Teams, visit our [Cloudflare for Teams](https://www.cloudflare.com/teams/) page to learn more.

## Next Steps
1. [Setup Cloudflare Access](https://developers.cloudflare.com/access/getting-started)
    * Make a note of the auth domain you create during this step
1. In your Cloudflare for Teams Dash, under 'My Teams' navigate to the Devices page and create access policies in Device Settings for users who can connect their clients to your organization
1. [Setup Cloudflare Gateway](https://developers.cloudflare.com/gateway/getting-startedoarding-gateway/) policies for your organization
    * Make a note of the DoH Subdomain unique ID created with your policy
1. Create a Device Registration policy to determine which users can log into teams and register a device.
1. Verify your devices meet the Cloudflare WARP [installations requirements](/setting-up/requirements)
1. Follow the instructions for deployment:
    * [Windows](/teams/Windows-Teams/)
    * [macOS](/teams/macOS-Teams/)
    * [iOS](/teams/iOS-Teams/)
    * [Android](/teams/android-Teams/)
