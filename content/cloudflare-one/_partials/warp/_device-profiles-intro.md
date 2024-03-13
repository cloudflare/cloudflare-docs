---
_build:
  publishResources: false
  render: never
  list: never
---

A device profile defines [WARP client settings](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/) for a specific set of devices in your organization. You can create multiple profiles and apply different settings based on the user's identity, the device's location, and other criteria.

For example, users in one identity provider group (signifying a specific office location) might have different routes that need to be excluded from their WARP tunnel, or some device types (like Linux) might need different DNS settings to accommodate local development services.