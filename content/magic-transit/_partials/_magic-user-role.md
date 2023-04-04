---
_build:
  publishResources: false
  render: never
  list: never
---

# Magic user roles

You can determine which users have, or do not have, configuration edit access for Magic products, including Magic Transit, Magic WAN, and Magic Firewall.

For example, if you have multiple Cloudflare products managed by different teams on the same account, you may want to provide select users with edit access and other users with read-only access.

## Assign permissions

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. From your Account Home, go to **Manage Account** > **Members**.
3. Under **Members**, enter an existing user's name and select **Search**.
4. Expand the menu at the end of the user row.
5. From the list, locate **Network Services (Magic)**.
6. Select one of two options:
    - **Network Services (Magic)** – Enables users to view and edit Magic configurations.
    - **Network Services (Magic, Read-Only)** – Enables users to view but not modify Magic configurations.