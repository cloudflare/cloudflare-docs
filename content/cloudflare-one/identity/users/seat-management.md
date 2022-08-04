---
pcx_content_type: how-to
title: Seat management
weight: 4
---

# Manage user seats

When an end user authenticates to an application protected by Cloudflare Access or enrolls their device into Cloudflare Gateway, the user consumes one seat. The user continues to occupy that seat regardless of the number of applications accessed or login events. Once the total amount of seats in the subscription has been consumed, additional users who attempt to log in are blocked.

A user who authenticates will hold their seat until you remove the user from your account. You can remove a single user or all users at any time, and those users will immediately stop counting against your subscription.

## Remove a user

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team** > **Users**.

2. Search for and select the user you want to remove.

3. Click **Update Status** > **Remove users**.

If a user is removed, and then authenticates once more, they will count as a seat again.

## Remove inactive users

Cloudflare Zero Trust can automatically remove any user who does not log in to an Access application or register a Gateway connection within a specified time period (between 2 months and 1 year). These users will no longer count against your seat count.

To enable automatic removal of inactive users:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Account**.
2. Scroll down to **User Seat Expiration** and click **Edit**.
3. Select an inactivity time from the dropdown menu.
4. Click **Save**.

If a user is removed, and then authenticates once more, they will count as a seat again.
