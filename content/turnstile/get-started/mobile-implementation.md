---
title: Mobile implementation
pcx_content_type: concept
weight: 5
---

# Mobile implementation

Turnstile is designed to run in a standard browser environment, which includes mobile devices.

On native mobile applications, Turnstile can be used with web views. This applies to all mobile development frameworks and platforms, such as React Native, Swift for iOS, and Kotlin for Android, among others.

When using pre-clearance with Turnstile, make sure it is executed in the same environment where the challenges will occur, including the same browser or device configuration. If pre-clearance is done in a different environment, the clearance cookie may become invalid, leading to failed challenges.

Any modifications to the environment, such as the User Agent, Content Security Policy settings, or domain allowlisting, can disrupt the successful completion of Turnstile challenges. To ensure compatibility, it is recommended to start with a default, unmodified environment and gradually introduce changes, validating Turnstile’s functionality after each adjustment.
