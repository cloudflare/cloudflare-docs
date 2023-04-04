---
pcx_content_type: reference
title: Waiting Room Analytics
weight: 8
---

# Waiting Room Analytics

Waiting Room Analytics gives you historical insights into the traffic going through your waiting room compared to your waiting room settings. Data is stored for the past 30 days.

Using Waiting Room Analytics, you can:

- Evaluate peak traffic flow through your waiting room and onto your site.
- Determine how long users spent in the waiting room.
- Use analytics to help calibrate your waiting room settings.

{{<Aside type="note">}}

Waiting Room Analytics in the Waiting Room dashboard will be rolled out gradually and available to all Business and Enterprise plans by the end of May, 2023. Waiting Room Analytics via GraphQL is available now to all Business and Enterprise plans.

{{</Aside>}}

## ​Dashboard Analytics

To access your waiting room’s analytics in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Traffic** > **Waiting Room**.
3. Expand the waiting room you would like to review metrics for, to display a preview of your waiting room analytics. The preview gives you insights into peak traffic through your waiting room over the last 24 hours including: Maximum active users, Maximum queued users and Typical time in queue for queued users.
4. Select **View More** under the Waiting Room Analytics section to see more historical analytics for your waiting room.
5. The time range for all of the metrics displayed defaults to the last 24 hours. To change the time range, select from the drop down. You can select any time range from the last 30 days that is a minimum of 30 minutes.

## Event Analytics

If your waiting room has a completed scheduled event, you can quickly access the event’s analytics by expanding the row for the waiting room you are interested in and selecting the event time. The link opens the analytics view for that waiting room, including information from the pre-queueing period to the end of the event.

To save this event information, you can either select **Download data** or **Print report**. If you delete the event, the time period link will no longer appear in your dashboard. If you edit the timing of the event, the time period link will update as well.

If you do not see a link to your event’s analytics, one of the following may have happened:

- Your event has not happened yet.
- Your event started more than 30 days ago.

## Metrics

These are metrics available in the Analytics dashboard and how they are calculated.

### Time in queue

Time in queue summary values give you an insight into the user experience by indicating how long queued users spent waiting to enter your application. It displays the time waited for the typical user, as well as for those who waited the longest, for the time period you have selected. These values are an indicator of the impact your waiting room settings combined with the traffic to your waiting room had on wait times.

If wait times are higher than you would like, and you feel comfortable doing so, you could consider taking any or all of the following actions:

- Increase `total_active_users` configured value.
- Increase `new_users_per_minute` configured value.
- Decrease `session_duration`.
- Disable session renewal.

{{<Aside type="note">}}

Note that wait times are only calculated for users who went from the waiting room to your origin.

{{</Aside>}}

### Time on origin

Time on origin summary values estimate how long users spent on the pages covered by your waiting room before leaving. For the time period selected, you will have access to the estimated time spent on origin for the typical user, as well as the time on origin for those who spend the most time on your site. Keep in mind that if your session renewal is disabled and there is no active queueing, users are issued a new waiting room session every `session_duration` minutes.  Therefore, these users may be staying for multiple sessions.  The time on origin for these users restarts each time a session expires.

The following are some takeaways you could have depending on the time on origin values.

You may want to increase session duration, giving users more time to make subrequests, and/or enable session renewal if:

- You have session renewal disabled.
- You have frequent, active queueing with long wait times.
- The typical time on origin is around 70% of your configured session duration.

These may be indicators that users need more time to complete their desired tasks on your site.

You may want to decrease session duration and/or disable session renewal if:

- Your top 5% time on origin is less than 70% of your configured session duration.
- You are seeing high queue times and do not want to increase traffic limits.

These may be indicators that users do not need as much time on your site and are taking up spots on your origin.

### Active users

The Active users chart is a time series chart that displays the maximum active users on any URLs covered by your waiting room as well as maximum queued users. These values are shown compared to your configured active user target threshold. 

To identify and hone in on peak traffic, select a longer time period, such as 30 days. Then, drag your cursor to the left and right of any time period you would like to check with more granularity to zoom in. You can zoom in until each bar represents a one minute interval. All other metrics on the page will update automatically to reflect the data behind the time period selected.

To check for more details about a particular moment in time, hover over a bar on the graph. This displays a tooltip which will indicate the following for the time period that bar represents:

- Maximum active users reached
- Maximum queued users reached
- Configured active user target values

### New users per minute

The New users per minute chart shows how many new users per minute passed through the waiting room to your origin compared to your configured New users per minute target threshold. Like the Active users chart, you can zoom in by highlighting to the left and right of the time period you are interested in, which will update the other chart as well as summary values. As you zoom out, each data point is averaged. Therefore, as you zoom in, values may fluctuate.

## ​​GraphQL Analytics

You can query your Waiting Room analytics data via GraphQL API. Waiting Room analytics provides near real-time visibility into your Waiting Room, allowing you to visualize the traffic to your application and how it is managed respecting the configured limits.

Here are some query examples to get started:

<details>
<summary>Fetch values for total active users and new users per minute over a certain period.</summary>
<div>

This is a simple query to fetch metrics values. You can filter the data with the zone tag and query the  `waitingRoomAnalyticsAdaptive` dataset. In this example, we have applied this query only on two metrics, but you can explore the schema and fetch the raw values from the GraphQL dataset without applying any aggregation methods.

```bash
---
header: Request
---
{
  viewer {
    zones(filter: {zoneTag: "example-zone"}) {
      waitingRoomAnalyticsAdaptive(limit: 3, filter: {datetime_gt: "2023-03-05T19:14:30Z", datetime_lt: "2023-03-07T19:13:00Z", waitingRoomId: "example-waiting-room-id"}) { 
        totalActiveUsers
          newUsersPerMinutes
      }
    }
  }
```

```json
---
header: Response
---
{
  "data": {
    "viewer": {
      "zones": [
        {
          "waitingRoomAnalyticsAdaptive": [
            {
              "newUsersPerMinute": 77,
              "totalActiveUsers": 1023
            },
            {
              "newUsersPerMinute": 113,
              "totalActiveUsers": 1009
            },
            {
              "newUsersPerMinute": 99,
              "totalActiveUsers": 927
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

</div>
</details>

<details>
<summary>Find the average of total active users and new users per minute over a certain period, and aggregate this data over a period of 15 minutes.</summary>
<div>

This query calculates the average of total active users and new users per minute. The time dimension in the query is 15 minutes, therefore the data is aggregated over 15 minutes for the selected time period.

```bash
---
header: Request
---
{
  viewer {
    zones(filter: {zoneTag: "example-zone"}) {
      waitingRoomAnalyticsAdaptiveGroups(limit: 10, filter: {datetime_geq: "2023-03-15T04:00:00Z", datetime_leq: "2023-03-15T04:45:00Z", waitingRoomId: "example-waiting-room-id"}, orderBy: [datetimeFifteenMinutes_ASC]) {
        avg {
          totalActiveUsers
          newUsersPerMinute
        }
        dimensions {
          datetimeFifteenMinutes
        }
      }
```

```json
---
header: Response
---
{
  "data": {
    "viewer": {
      "zones": [
        {
          "waitingRoomAnalyticsAdaptiveGroups": [
            {
              "avg": {
                "newUsersPerMinute": 119,
                "totalActiveUsers": 1180
              },
              "dimensions": {
                "datetimeFifteenMinutes": "2023-03-15T04:00:00Z"
              }
            },
            {
              "avg": {
                "newUsersPerMinute": 146,
                "totalActiveUsers": 961
              },
              "dimensions": {
                "datetimeFifteenMinutes": "2023-03-15T04:15:00Z"
              }
            },
            {
              "avg": {
                "newUsersPerMinute": 144,
                "totalActiveUsers": 1015
              },
              "dimensions": {
                "datetimeFifteenMinutes": "2023-03-15T04:30:00Z"
              }
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

</div>
</details>

<details>
<summary>Find the weighted averages of time on origin (50th percentile) and total time waited (90th percentile) for a certain period and aggregate this data over one hour.</summary>
<div>

This query calculates the weighted averages of the metrics for a certain period of time aggregated hourly.

```bash
---
header: Request
---
{
  viewer {
    zones(filter: {zoneTag: "example-zone"}) {
      waitingRoomAnalyticsAdaptiveGroups(limit: 10, filter: {datetime_geq: "2023-03-15T04:00:00Z", datetime_leq: "2023-03-15T04:45:00Z", waitingRoomId: "example-waiting-room-id"}, orderBy: [datetimeHour_ASC]) {
        avgWeighted {
          timeOnOriginP50
          totalTimeWaitedP90
        }
        dimensions {
          datetimeHour
        }
      }
```

```json
---
header: Response
---
{
  "data": {
    "viewer": {
      "zones": [
        {
          "waitingRoomAnalyticsAdaptiveGroups": [
            {
              "avgWeighted": {
                "timeOnOriginP50": 99.19,
                "totalTimeWaitedP90": 1625.63
              },
              "dimensions": {
                "datetimeHour": "2023-03-15T04:00:00Z"
              }
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

</div>
</details>

## Why is there no data for my waiting room?

If you are not seeing any historical data for your waiting room, one or more of the following may be true:

- Your waiting room was not receiving any traffic for the time period you are inspecting.
- Your waiting room was not enabled for the time period you are inspecting.
- You are using the Customer Metadata Boundary to restrict data to the EU region.