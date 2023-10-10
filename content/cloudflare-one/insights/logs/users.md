---
pcx_content_type: how-to
title: User logs
weight: 1
---

# User logs

Cloudflare Zero Trust allows you to consult a comprehensive list of users who have authenticated to Cloudflare Zero Trust. For each user that logged in, you can see their name, their email address, and whether they’re actively utilizing a seat in both Access and Gateway.

To see your user list, go to **My Team** > **Users**.

## Revoke user sessions

Selecting the **Revoke** button next to a user will terminate all currently active sessions for that user, and revoke access to all their connected devices. If you want to prevent this user from logging in again, you need to manually remove this user from any existing policies that grant them access to your applications.

## View user details

Selecting the View button for any user will show you details for that user, such as:

- Their user details
- Devices they have connected to Cloudflare Zero Trust
- Their recent logins

Select **View all activity** to see a full list of the user’s login events.

## Workplace records

Wokplace records show the amount of unique sessions the user has initiated from a given country in the current billing period. To view workplace records:

1.  In the Users page, locate the user whose workplace records you want to see.

1.  Select **View**.

1.  In the **User details** section, under the **Most recent location** field, select the View all button.

To change the granularity with which workplace records are shown, adjust your [global session duration](/cloudflare-one/identity/users/session-management/#set-global-session-duration). An informative threshold can be **24 hours**.
