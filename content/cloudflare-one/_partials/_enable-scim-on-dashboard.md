---
_build:
  publishResources: false
  render: never
  list: never
---

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Authentication**.

2. Locate the IdP you want to synchronize and select **Edit**.

3. Enable **Support groups**.

4. Select **Enable SCIM**.

5. (Optional) Enable the following settings:
  - **Enable user deprovisioning**: [Revoke a user's active session](/cloudflare-one/identity/users/session-management/#per-user) when they are removed from the SCIM application in the IdP.
  - **Remove user seat on deprovision**: [Remove a user's seat](/cloudflare-one/identity/users/seat-management/)  from your Zero Trust account when they are removed from the SCIM application in the IdP.
  - **Enable group membership change reauthentication**: [Revoke a user's active session](/cloudflare-one/identity/users/session-management/#per-user) when their group membership changes in the IdP. This will revoke all active Access sessions and prompt for reauthentication for any Gateway WARP session policies. Access will read the user's updated group membership when they reauthenticate.

6. Select **Save**.

7. Copy the **SCIM Endpoint** and **SCIM Secret**. You will need to enter these values into the IdP.
