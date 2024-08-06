---
pcx_content_type: reference
title: Notification History
weight: 5
---

# Notification History

Notification History is a log of notifications that have been sent to your account via the Notifications service. Information contained in Notification History includes the notification itself, when the notification was sent, and who the notification was sent to.

## How to access Notification History

Currently, customers can access Notification History [via the Cloudflare API](/api/operations/notification-history-list-history). Using `GET`, customers can retrieve a list of history records for notifications sent to an account. The records are displayed for the last 30 or 90 days, based on the type of plan.

```txt
---
header: Syntax
---
GET accounts/{account_id}/alerting/v3/history
```

```bash
---
header: Example
---
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/alerting/v3/history?page=1&per_page=25" \
--header "Authorization: Bearer <API_TOKEN>"
```

## Availability

Notification History is available on all plans. The amount of history clients have access to depends on the type of plan:

- **Free, Pro, and Business**: History from the past 30 days.
- **Enterprise**: History from the past 90 days.

{{<Aside type="note">}}
Customers will not be able to access Notification History from before 2021-10-11.
{{</Aside>}}
