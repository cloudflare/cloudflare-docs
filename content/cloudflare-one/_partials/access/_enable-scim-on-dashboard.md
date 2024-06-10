---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

2. Locate the IdP you want to synchronize and select **Edit**.

3. Select $1.

4. (Optional) Enable the following settings:

- **Enable user deprovisioning**: [Revoke a user's active session](/cloudflare-one/identity/users/session-management/#per-user) when they are removed from the SCIM application in the IdP. This will invalidate all active Access sessions and prompt for reauthentication for any Gateway WARP session policies.
- **Remove user seat on deprovision**: [Remove a user's seat](/cloudflare-one/identity/users/seat-management/) from your Zero Trust account when they are removed from the SCIM application in the IdP.
- **Enable group membership change reauthentication**: [Revoke a user's active session](/cloudflare-one/identity/users/session-management/#per-user) when their group membership changes in the IdP. This will invalidate all active Access sessions and prompt for reauthentication for any Gateway WARP session policies. Access will read the user's updated group membership when they reauthenticate.

5. Select **Save**.

6. Copy the **SCIM Endpoint** and **SCIM Secret**. You will need to enter these values into the IdP.

The SCIM secret never expires, but you can manually regenerate the secret at any time.
