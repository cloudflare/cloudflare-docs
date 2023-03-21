---
title: Channel and Alliance Partners
pcx_content_type: navigation
weight: 7
---

# Channel and Alliance Partners

Area 1 Channel and Alliance partners have the option to set up accounts for themselves and their customers.

## Create accounts

Start by creating parent and child accounts.

### Create a parent account

Parent accounts are treated as containers with no services provisioned. User accounts created at the parent level will allow them to access any child account. 

{{<Aside type="note">}}This is only required for administrators that manage multiple accounts. For ex: MSSP managing multiple customer accounts.{{</Aside>}}

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. In **Delegated Accounts**, select **Create New Customer**.
4. **Customer Name** is the name used for the parent account, and could be the name of a sub-team or other useful one, like `Area 1 Security - Parent` or `Area 1 Security - Customers`.
5. In **Account Type**, select _Parent_.
6. For the **Admin User Information** fields, fill out with the information for the person who will be performing administrative duties for this account.
7. Select **Save**.

Your newly created account should show up in the list. If not, refresh the page.

### Create a child account.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. In **Delegated Accounts**, select the parent account where you want to create a child account.
4. Select **Create New customer**.
5. For **Customer Name**, fill out the name for the child account.
6. In the **Account Type**, select _Advantage_.
7. For the **Admin User Information** fields, fill out with the information for the person who will be performing administrative duties for this account.
8. Scroll down to the **Email Traffic Related Information** section, and enter the appropriate information. Pay close attention to correctly identify and mention the **Number of email users** — that is, the total number of users protected by the service.
9. Select **Save**.

## Create users and assign permissions

You can create users at both the parent and child account level. Users created at parent level will have access to all its child accounts. Users created at child level will only have access to the assigned child Account. Child accounts can limit or disable delegated access from the parent. If you modify the Delegated Access controls, make sure you create an admin account in the child first.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. In **Users and Actions** > **Users and Permissions** select **Add user**.
4. Fill the information required, such as email address and name.
5. In **Permission**, select the appropriate permissions for the account.
6. Select **Send invitation** to email the user and create their credentials to log in to the Area 1 dashboard.
