---
pcx_content_type: reference
title: Notification History
weight: 1
---

# Notification History

Notification History is a log of notifications that have been sent to your account via the Notifications service. Information contained in Notification History includes the notification itself, when the notification was sent, and who the notification was sent to.

## How to access Notification History

Currently, customers can access Notification History [via the Cloudflare API](/api/operations/notification-history-list-history). Using `GET`, customers can retrieve a list of history records for notifications sent to an account. The records are displayed for the last 30 or 90 days, based on type of plan.

The syntax is as follows:

```txt
GET accounts/:identifier/alerting/v3/history
```

Example:

```sh
$ curl -X GET "https://api.cloudflare.com/client/v4/accounts/9a7806061c88ada191ed06f989cc3dac/alerting/v3/history?page=1&per_page=25" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Content-Type: application/json"
```

## Availability

Notification History is available to all plans. The amount of history clients have access to depends on the the type of plan:

- **Free, Pro and Business**: History from the past 30 days.
- **Enterprise**: History from the past 90 days.

{{<Aside type="note" header="Note">}}

Customers will not be able to to access Notification History from before Oct 11, 2021.

{{</Aside>}}
