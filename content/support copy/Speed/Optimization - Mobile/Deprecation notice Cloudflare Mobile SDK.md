---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360054452251-Deprecation-notice-Cloudflare-Mobile-SDK
title: Deprecation notice Cloudflare Mobile SDK
---

# Deprecation notice: Cloudflare Mobile SDK



## Cloudflare shutting down Mobile SDK Portal 22 Feb 2021

We are deprecating Cloudflare's Mobile SDK. You will no longer be able to log into the portal or view stats about your mobile app after 22 Feb, 2021.

We know that you have placed a great deal of trust in us by including the Mobile SDK in your app, and we do not take this decision lightly. We built the Mobile SDK to help you with two things: make your app as fast as possible with Acceleration mode, and to understand performance with Metrics Mode.

However, we have decided to pause development of our in-house ASAP protocol so we could focus all of our efforts on QUIC, an industry standard. Since disabling Acceleration Mode, we no longer have enough interest in the Mobile SDK to continue maintaining Metrics Mode. We encourage you to try another product for measuring mobile performance like [Firebase Performance Monitoring](https://firebase.google.com/products/performance).

While your mobile app will continue working with the SDK even after the portal is removed, we encourage you to remove the Mobile SDK as soon as possible.
