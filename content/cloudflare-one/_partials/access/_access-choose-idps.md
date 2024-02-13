---
_build:
  publishResources: false
  render: never
  list: never
---

 Next, configure how users will authenticate:
   1. Select the [**Identity providers**](/cloudflare-one/identity/idp-integration/) you want to enable for your application.
   2. (Recommended) If you only enabled one identity provider, turn on **Instant Auth**. End users will skip the [Access login page](/cloudflare-one/applications/custom-pages/#login-page) (where they select an identity provider) and go directly to your SSO login.
   3. (Optional) Under **WARP authentication identity**, allow users to authenticate to the application using their [WARP session identity](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-sessions/).
