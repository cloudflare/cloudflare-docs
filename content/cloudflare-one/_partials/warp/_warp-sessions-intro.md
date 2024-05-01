---
_build:
  publishResources: false
  render: never
  list: never
---

When a user goes to a protected application or website, Cloudflare checks their WARP session duration against the configured session timeout. If the session has expired, the user will be prompted to re-authenticate with the identity provider (IdP) used to enroll in the WARP client.

<div class="small-img">

![WARP client prompts user to re-authenticate session.](/images/cloudflare-one/connections/warp-reauthenticate-session.png)

</div>

A user's WARP session duration resets to zero whenever they re-authenticate with the IdP, regardless of what triggered the authentication event.
