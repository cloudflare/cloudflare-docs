---
pcx_content_type: concept
title: Logpush alerts and analytics
weight: 45
---

# Logpush alerts and analytics

Logpush jobs may fail for a few reasons, for instance because the destination is unreachable, because of a change in permissions at the customers’ origin, or because a Logpush job did not complete at least one successful push in the last 24 hour. 

With analytics and alerting, you can monitor your Logpush job health and find out for yourself when a job fails. You can get alerted and you can also get analytics about your Logpush jobs health via GraphQL.

Alerts are sent via the [Cloudflare Notifications](/fundamentals/notifications/) system. They can be sent via email or webhook. When subscribed to job disablement notification, you will receive at most one alert per job per 24 hours. The notification email contains the job ID and destination configuration.

## Enable alerts 

You can add an alert for **Failing Logpush Job Disabled** via the **Notifications** section of the dashboard. Note that alerts can be configured at the account level and apply to all jobs within an account.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Navigate to **Notifications**.
3. Next, select **Add**.
4. Select the alert **Failing Logpush Job Disabled**.
5. Configure the alert: choose a name, add a description (optional), select the notification services, Webhooks and enter the email where you want to be notified.
6. Select **Save**.

When you complete these steps, you will receive an email alert if your Logpush job is disabled.

## Enable Logpush health analytics

Customers can query Logpush job health metrics via the [GraphQL API](/analytics/graphql-api/). The name of the dataset is `logpushHealthAdaptiveGroups` and the schema can be explored using the [GraphQL API](/analytics/graphql-api/getting-started/explore-graphql-schema/).

Here is a query to get the count of how many times jobs pushing to S3 failed.

```json
query
{
  viewer
  {
    zones(filter: { zoneTag: $zoneTag})
    {
      logpushHealthAdaptiveGroups(filter: {
        datetime_gt:"2022-08-15T00:00:00Z",
        destinationType:"s3",
        status_neq:200
      }, 
      limit:10)
      {
        count,
        dimensions {
          jobId,
          status,
          destinationType
        }
      }
    }
  }
}
```