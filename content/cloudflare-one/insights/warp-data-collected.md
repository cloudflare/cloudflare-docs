---
pcx_content_type: reference
title: Data collected by your company
weight: 10
---

# Data collected by your company

When you enroll a device in Cloudflare Zero Trust, your company has access to certain information about your device and Internet browsing activity. This page provides a non-exhaustive list of the data visible to your company through Cloudflare WARP (Windows/macOS/Linux) and the Cloudflare One Agent app (iOS/Android). To learn more about what data your company collects, refer to your company's Acceptable Use Policy.

## Always visible

Basic device information is visible for all devices enrolled in Cloudflare Zero Trust.

- Device name
- Device model
- Operating system and version
- IP address

### Always visible on Windows/macOS/Linux

The following device details are always visible on Windows, macOS, and Linux devices. This data is never visible on Android and iOS phones.

- Device serial number
- Installed certificates
- File paths and file names
- Device registry and event logs
- Running processes

## Might be visible

The following information may be visible to your company depending on what security policies they have configured.

For example, your company may have Data Loss Prevention (DLP) policies in place which scan your emails, Google drive, and other Internet traffic for certain phrases or proprietary information. If a match is triggered, the matching content is visible to your company's IT department. Refer to your company's Employee Privacy Policy for information on how they handle sensitive data.

| Data | Notes |
| ---- | ----- |
| Browsing history | Can see the IP address, domain, and URL of visited websites. |
| Internet search history | Can see the URL of search results, for example `https://www.google.com/search?q=I+am+searching+for+this`.|
| Watched videos | Can see the URL of watched videos, for example `https://www.youtube.com/watch?v=xyz123`.|
| Google Maps history | Can see the exact location or directions searched, for example `https://www.google.com/maps/place/Anaheim,+CA/@33.833881,-118.0103029,11z`.|
| Geographic location | Can see public information associated with your IP address, such as the city, state, and country. Cannot see your exact GPS coordinates. |
| Credit card numbers | Can see billing information when making an online purchase. |
| Bank account | Can see account numbers and transaction activity when you visit your bank's website. |
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
