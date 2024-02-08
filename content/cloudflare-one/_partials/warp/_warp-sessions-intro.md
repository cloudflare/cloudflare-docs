---
_build:
  publishResources: false
  render: never
  list: never
---

When a user goes to a protected application or website, Cloudflare checks their WARP session duration against the configured session timeout. If the session has expired, the user will be prompted to re-authenticate with the identity provider (IdP) used to enroll in the WARP client. A user's WARP session duration resets to zero whenever they log in to the IdP, regardless of what triggered the authentication event.
