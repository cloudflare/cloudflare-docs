---
title: Known issues
order: 6
---

# Android SDK release notes & known issues

## Known issues

None at this time.

## Release notes

### Version 3.0.1

- Fix a potential error when POST request using URLConnection calls connect() method
- Support Android 10

### Version 3.0.0

- Stability and performance improvements
- OkHttp3 compability improvement: certificate pinning, caching, cookie handling, redirection
- URLConnection compatibility improvement: caching, cookie handling, redirection
- Improved metrics correctness
- Compatibility mode: if you have an issues with SDK, you may try a compatibility mode with `CFMobile-Opt: compat=true` in the request header of okhttp3 or URLConnection. It will disable some of advanced internal working to have a better compatibility.

### Version 2.1.0

- Ability to capture current view controller name to bucketize requests per view controller.
- Enhanced support of networks with smaller MTU such as VPN.
- Stability and performance improvements.

### Version 2.0.4

- Fixed a logging issue

### Version 2.0.3

- Fixed a compatibility issue with third party SDK requests

### Version 2.0.2

- Fixed an SDK memory leak

### Version 2.0.1

- Fixed a metric send frequency issue with 2.0.0

### Version 2.0.0

- Performance improvements and bug fixes

### Version 1.2.3

- Fixed an OkHttp3 compatibility issue with Certificate Pinning
- Fixed an uncommon URLConnection metrics error where the request start was not tracked

### Version 1.2.0

- GA release
