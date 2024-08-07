---
title: Manage parent permissions
pcx_content_type: how-to
weight: 3
---

# Manage parent permissions

{{<Aside type="warning" header="Area 1 has been renamed">}}

{{<render file="rename-area1-to-ces.md">}}

{{</Aside>}}

When you set up Cloud Email Security through a [partner](/email-security/partners/), that partner's account is the **parent** account to your **child** account.

Each child account can set the level of access allowed to their account from the parent. You may want to update this setting if you are receiving troubleshooting support from your parent account.

To update parent permissions:

1. Log in to the [Cloud Email Security dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Delegated Accounts**.
4. Select a permission level:

    - **No external account access**: Shuts off all access from the parent account (including Cloud Email Security).
    - **Allow external account view-only access** (default): Allows a parent user to view the customer's portal, including settings.
    - **Allow external account Super Admin access**: Allows a parent user to administer the customer account on their behalf. By selecting this option the customer is acknowledging consent for outside administration of their account.

5. Select **Save**.