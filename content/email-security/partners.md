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

### Create a user at parent account level

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/) with a parent account.
2. Go to **Settings** (the gear icon).
3. In **Users and Actions** > **Users and Permissions** select **Add user**.
4. Fill the information required, such as email address and name.
5. In **Permission**, select the appropriate permissions for the account.
6. Select **Send invitation** to email the user and create their credentials to log in to the Area 1 dashboard.

### Create a user at child account level

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/) with a child account.
2. Go to **Settings** (the gear icon).
3. In **Users and Actions** > **Users and Permissions** select **Add user**.
4. Fill the information required, such as email address and name.
5. In **Permission**, select the appropriate permissions for the account.
6. Select **Send invitation** to email the user and create their credentials to log in to the Area 1 dashboard.

### Permissions and delegated permissions

You can delegate the following account permissions for users of parent accounts:

- **Read-only**: Can enter child accounts but is prevented from making any changes to settings, regardless of the customer account settings.
- **Read-write**: Can enter child accounts and make changes on behalf of the customer.

### Control parent access

Child accounts can set the level of access parent accounts have:

- **No external account access**: Prevents all access from the parent account (including Area 1).
- **Allow external account view-only access** (Default): Allows a parent user to view the customer's portal, including settings.
- **Allow external account admin access**: Allows a parent user to administer the customer account on their behalf. By selecting this option, the customer is acknowledging consent for outside administration of their account.

To manage permissions:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/) with a child account.
2. Select **Settings** (the gear icon).
3. Go to **Delegated Accounts** > **Manage Permissions**, and choose one of the permissions.

## Escalation contacts

You should add escalation contacts so Area 1 can send notifications regarding detection events and critical service related issues. Area 1 highly recommends that contacts have both phone and email contacts.

To set up escalation contacts:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/) with a child account.
2. Select **Settings** (the gear icon).
3. Go to **Subscriptions** > **Escalation Contacts**.
4. Select **Add Contact** and fill out the name, email and phone fields.
5. Chose the type of event for which you would like to receive updates for.
6. Select **Save**.

## Status alerts

Subscribe to incident status alerts [from Area 1](https://status.area1security.com/).

## Domains setup (inline/API)

Refer to the [setup options](/email-security/deployment/) for Area 1 to learn about the best way of deploying Area 1 in your organization. You can choose between two main setup architectures: inline and API.

With an [inline deployment](/email-security/deployment/inline/), Area 1 evaluates email messages before they reach a user’s inbox. When you choose an [API deployment](/email-security/deployment/api/), email messages only reach Area 1 after they have already reached a user’s inbox.

## Classification actions

Area 1 recommends that you quarantine `Malicious` and `SPAM` dispositions. You can configure this directly in [Office 365](/email-security/deployment/inline/setup/office-365-area1-mx/) and [Gsuite](/email-security/deployment/inline/setup/gsuite-area1-mx/), or [Area 1](/email-security/email-configuration/domains-and-routing/domains/)

## Message retraction

You can configure message retraction to take post-delivery actions against suspicious email messages. You can retract messages manually or automatically. Refer to [Retract settings](/email-configuration/retract-settings/) for more information.