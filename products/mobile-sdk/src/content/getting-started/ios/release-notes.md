---
title: Known issues
---

# iOS SDK release notes & known issues

## Known issues

### Version 3.1.0 and 3.0.0 ##

- In certain cases, packet reordering could cause an app to crash and it is recommended to update
  the SDK to v3.1.1 or later.

### Version 2.0.1 or earlier ##

- A rare race condition in SDK could cause an app to crash and the bug is fixed in SDK v2.0.2.

## Release notes

### Version 5.0.0

- Code restructuring to decrease overall SDK disk footprint and improve performance.

### Version 3.3.0

- Support for iOS13.

### Version 3.2.0

- Supports Bot Security features for orange clouded domains.

### Version 3.1.1

- Bug fixes and performance improvements.

### Version 3.1.0

- Support for iOS 12.
- Make minimum deployment target to iOS 9.

### Version 3.0.0

- Stability and performance improvements.

### Version 2.1.0

- Ability to capture current view controller name to bucketize requests per view controller.
- Enhanced support of networks with smaller MTU such as VPN.
- Stability and performance improvements.

### Version 2.0.2

- Fixed an issue with calling non thread-safe function.

### Version 2.0.1

- Fixed an issue with nil session configuration object.

### Version 2.0.0

- Performance improvements and bug fixes.

### Version 1.2.1

- Fixed an issue with request redirects.
- Fixed other minor bugs.

### Version 1.2.0

- GA release
