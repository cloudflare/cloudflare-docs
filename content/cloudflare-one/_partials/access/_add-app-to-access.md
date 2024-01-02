---
_build:
  publishResources: false
  render: never
  list: never
---

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.

2. Select **Add an application**.

3. Select **Self-hosted**.

4. Enter any name for the application.

5. Choose a **Session Duration**. The session duration determines the minimum frequency for which a user will be prompted to authenticate with the configured IdP. If you want users to re-authenticate every time they reach your application, select _No duration, expires immediately_.

6. In **Application domain**, enter the domains that will represent the application.

   - Domains must belong to an active zone in your Cloudflare account. You can either select a domain from the dropdown or enter a [custom domain](/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/) that you control.
   - You can use [wildcards](/cloudflare-one/policies/access/app-paths/) to protect multiple parts of an application that share a root path.

7. (Optional) Configure [App Launcher settings](/cloudflare-one/applications/app-launcher/) for the application.

8. {{<render file="access/_access-block-page.md">}}

9. {{<render file="access/_access-choose-idps.md">}}

10. Select **Next**.
