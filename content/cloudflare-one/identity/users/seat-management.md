---
pcx_content_type: how-to
title: Seat management
weight: 4
---

# Manage user seats

Cloudflare Zero Trust subscriptions consist of seats that active users in your account consume. Active users are added to Zero Trust through any authentication event.

The amount of user seats available in your Zero Trust account depends on the amount of users you purchase. If you want to increase the number of seats available, you will have to purchase more users. Learn more about adding and removing seats from your account in the [Zero Trust FAQ](/cloudflare-one/faq/teams-getting-started-faq/#how-do-i-change-my-subscription-plan).

## What constitutes an authentication event

For Access, this is any Cloudflare Access authentication event, like a login to the [App Launcher](/cloudflare-one/applications/app-launcher/) or an application. For Gateway, this means any Cloudflare WARP authentication event, like enrolling a device to your ZT organization.

If either one of these events occurs, that user’s identity is added as an Active user to Zero Trust and consumes one seat.

The user then continues to occupy and consume a single seat regardless of the number of applications accessed or login events. Once the total amount of seats in the subscription has been consumed, additional users who attempt to log in are blocked.

A user who authenticates will hold their seat until you [remove the user](#remove-a-user) from your account. By default, inactive users will not be [automatically removed](#enable-seat-expiration) from your account. You can remove a single user or all users at any time, and those users will immediately stop counting against your subscription.

## Revoke vs remove a user

When you revoke a user, this action will terminate active sessions, but will not remove the user’s consumption of an active seat. On the other hand, removing a user will end their active session and free up one seat from your account.

## Check number of Active Users

You can check for the number of active users in [Zero Trust](https://one.dash.cloudflare.com) home.

## Remove a user

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **My Team** > **Users**.
2. Select the checkbox next to an **Active** user.
3. Select **Action** > **Remove users**.

The user will now show as **Inactive** and will no longer occupy a seat. If a user is removed, and then authenticates once more, they will count as a seat again.

## Enable seat expiration

Cloudflare Zero Trust can automatically remove any user who does not log in to an Access application or who does not trigger a device enrollment event within a specified time period (between 2 months and 1 year). These users will no longer count against your seat count.

To enable user seat expiration:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Account**.
2. Scroll down to **User Seat Expiration** and select **Edit**.
3. Select an inactivity time from the dropdown menu.
4. Select **Save**.

If a user is removed, and then authenticates once more, they will count as a seat again.

Refer to the FAQ to [learn more](/cloudflare-one/faq/teams-getting-started-faq/#removing-users) about the consequences of removing a user for Access and Gateway.

## Delete a user record

There is currently no way to delete or archive a user record. You can [remove a user](#remove-a-user) from a seat, but their user record will remain in Zero Trust. 
