---
_build:
  publishResources: false
  render: never
  list: never
---

 Next, configure how users will authenticate:
   1. Select the [**Identity providers**](/cloudflare-one/identity/idp-integration/) you want to enable for your application.
   2. (Optional) Turn on **Instant Auth** if you selected only one IdP and want users to skip the identity provider selection step.
   3. (Optional) Under **WARP authentication identity**, allow users to authentication with their WARP identity if they have already authenticated. For more details, refer to [WARP sessions](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-sessions/).
