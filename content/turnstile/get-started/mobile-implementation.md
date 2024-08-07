---
title: Mobile implementation
pcx_content_type: concept
weight: 5
---

# Mobile implementation

Turnstile is designed to run in a standard browser environment, which includes mobile devices.

On native mobile applications, Turnstile can be used with web views. This applies to all mobile development frameworks and platforms, such as React Native, Swift for iOS, and Kotlin for Android, among others.

When using pre-clearance with Turnstile, ensure that it is executed in the same environment where challenges are expected to occur which pre-clearance will be issued for. This includes the same browser or device configuration. If Turnstile is executed in a different environment, the clearance cookie may be rendered invalid, resulting in failed challenges.

Any modifications to the environment, such as user agent settings, CSP configurations, or domain allowlisting, can disrupt the successful completion of Turnstile challenges. To ensure compatibility, it is recommended to start with a default, unmodified environment and gradually introduce changes, validating Turnstile’s functionality after each adjustment.
