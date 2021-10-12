---
order: 0
pcx-content-type: concept
title: WARP
---

# Connect devices with the WARP client

The Cloudflare WARP client allows you to protect corporate devices by securely and privately sending traffic from those devices to Cloudflare's edge, where Cloudflare Gateway can apply advanced web filtering. The WARP client also makes it possible to apply advanced Zero Trust policies that check for a device's health before it connects to corporate applications.

Downloading and deploying the WARP client to your devices enhances the protection Cloudflare for Teams can provide to your users and data, wherever they are.

Here are a few ways in which the WARP client provides in-depth protection for your organization:

* **WARP lets you enforce security policies anywhere**.  
    With the WARP client deployed in the Gateway with WARP mode, Gateway policies are not location-dependent — they can be enforced anywhere.

* **WARP lets you enforce HTTP filtering and user-based policies**.  
    Download and install the WARP client to enable Gateway features such as [Anti-Virus scanning](/policies/filtering/http-policies/antivirus-scanning), [HTTP filtering](/policies/filtering/http-policies), [Browser Isolation](/policies/filtering/http-policies#isolate), and [identity-based policies](/policies/filtering/network-policies).

* **WARP lets you have in-depth, application-specific insights**.  
    With WARP installed on your corporate devices, you can populate the [Teams Shadow IT Discovery](/analytics/access) page with visibility down to the application and user level. This makes it easy to discover, analyze, and take action on any shadow IT your users may be using every day. 

* **WARP allows you to build rich device posture rules.**  
    The WARP client provides advanced Zero Trust protection by making it possible to check for [device posture](/identity/devices). By setting up device posture checks, you can build Zero Trust policies that check for a device's location, disk encryption status, OS version, and more.

The WARP client can be configured in three modes.

## WARP client modes

<Aside type="note">

**Proxy mode** can only be used by applications/operating systems that support SOCKS5/HTTPS proxy communication. 

</Aside>

### Gateway with WARP (default)

This mode is best suited for organizations that want to use advanced firewall/proxy functionalities and enforce device posture rules.  

| DNS filtering | HTTP filtering | Features enabled |
| ------------- | -------------- | ---------------- | 
| Yes | Yes | DNS policies, HTTP policies, Browser Isolation, identity-based policies, AV scanning, DLP, device posture |

### Gateway with DoH

This mode is best suited for organizations that only want to apply DNS filtering to outbound traffic from their company devices.  

| DNS filtering | HTTP filtering | Features enabled |
| ------------- | -------------- | ---------------- | 
| Yes | No | DNS policies |

### Proxy mode

This mode is best suited for organizations that want to filter traffic directed to specific applications. 

| DNS filtering | HTTP filtering | Features enabled |
| ------------- | -------------- | ---------------- | 
| No | Yes | HTTP policies, Browser Isolation, identity-based policies, AV scanning, DLP for traffic sent through localhost proxy|

Cloudflare WARP is [available](/connections/connect-devices/warp/download-warp) for iOS, Android, ChromeOS, Mac, Linux, and Windows.
