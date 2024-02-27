---
_build:
  publishResources: false
  render: never
  list: never
---

You can enforce WARP session timeouts on any Gateway Network and HTTP policy that has an Allow action. If you do not specify a session timeout, the WARP session will be unlimited by default.

{{<Aside type="note">}}
Session timeouts have no impact on Gateway DNS policies. DNS policies remain active even when a user needs to re-authenticate.
{{</Aside>}}

To configure a session timeout for a Gateway policy:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to either **Gateway** > **Firewall Policies** > **Network** or **Gateway** > **Firewall Policies** > **HTTP**.
2. Add a policy and select the _Allow_ action. Alternatively, choose any existing _Allow_ policy.
3. Under **Step 4 - Configure policy settings**, select **Edit** next to **Enforce WARP client session duration**.
4. Enter a session expiration time in `1h30m0s` format and save.
5. Save the policy.

Session checks are now enabled for the application protected by this policy. Users can continue to reach applications outside of the policy definition.
