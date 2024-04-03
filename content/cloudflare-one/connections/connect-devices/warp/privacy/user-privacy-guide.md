---
pcx_content_type: reference
title: Data collected by your company
weight: 2
---

# Data collected by your company

When you enroll a device in Cloudflare Zero Trust, your company has access to certain information about your device and Internet browsing activity. This page provides a non-exhaustive list of the data visible to your company through Cloudflare WARP (Windows/macOS/Linux) and the Cloudflare One Agent app (iOS/Android). For more information, refer to your company's Acceptable Use Policy.

## Always visible

Basic device information is visible for all devices enrolled in Cloudflare Zero Trust.

| Data | Notes |
| ---- | ----- |
| Device name | |
| Device manufacturer |  |
| Device model | |
| Operating system and version | |
| IP address | Can also see public information associated with your IP address, such as the city, state, and country. |

### Always visible on Windows/macOS/Linux

The following device details are always visible on Windows, macOS, and Linux devices. This data is never visible on Android and iOS phones.

- Device serial number
- Installed certificates
- File paths and file names
- Device registry and event logs
- Running processes

## Might be visible

The following information may be visible to your company depending on what security policies they have configured.

For example, your company may have Data Loss Prevention (DLP) policies in place which scan your Internet traffic (including emails, Google drive, and more) for certain phrases or proprietary information. If a match is triggered, the matching content is encrypted and only visible to your company's IT department. Cloudflare cannot decrypt this data. For more information on how your company handles sensitive data, refer to your company's Employee Privacy Policy.

| Data | Notes |
| ---- | ----- |
| Browsing history | Can see the IP address, domain, and URL of visited websites. Examples of URLs that may be visible: <li> Google search results </br> `https://www.google.com/search?q=I+am+searching+for+this` </li>  <li> Google Maps search results </br> `https://www.google.com/maps/place/Anaheim,+CA/@33.833881,-118.0103029,11z`</li> <li> Youtube videos </br> `https://www.youtube.com/watch?v=xyz123` </li>  |
| Financial information | Subject to Data Loss Prevention policies. Examples of data that may be visible: <li> Credit card numbers when making an online purchase. </li> <li> Bank account numbers when you visit your bank's website. </li> |
| Social security numbers and national IDs| Subject to Data Loss Prevention policies.  |
| Emails | Can inspect email text for sensitive data. |
| Contents of files transferred over the Internet | Can inspect uploaded/downloaded files and files stored on cloud services. |
| Wi-Fi network | Only visible if you send logs to your IT admin. |
| Pictures and photos | Can see the names of photos sent to cloud services. Cannot see the actual photos. |
| Installed apps | **Windows/macOS/Linux:** Can check whether a specific app is installed. Cannot see a list of all apps that are installed. </br> **iOS/Android:** Cannot see what apps are installed. However, because almost all apps generate Internet traffic, that Internet traffic is visible.|

{{<Aside type="note" header="Android work profiles">}}

If you have a work profile on an Android mobile device, Cloudflare Zero Trust only sees Internet traffic from your work profile. If you do not have a work profile configured, all traffic is visible.

{{</Aside>}}

## Never visible

The following data is never visible to your company through Cloudflare Zero Trust.

- Passwords
- Phone call history
- Phone contacts
- Text (SMS) messages
- Contents of files stored locally on the device
- Precise GPS coordinates