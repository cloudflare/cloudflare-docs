---
pcx_content_type: reference
title: Fetch bulk analytics
---

# Fetch bulk analytics

Cloudflare Stream lets you fetch usage data in bulk using the GraphQL API. Stream's GraphQL API exposes two data sets:

- Client-side Metrics: Data collected from the Stream Player. If you use your own player, it will not be reflected in this data set.
- Server-side Metrics: Data collected from server-side logs and used for billing purposes.

For additional information on using GraphQL, refer to [Get started with GraphQL Analytics API](/analytics/graphql-api/getting-started/).

{{<Aside type="note">}}

**Prerequisite:** 
[Generate a Cloudflare API token](https://dash.cloudflare.com/profile/api-tokens) with the **Account Analytics** permission.

{{</Aside>}}

## Analytics in the dashboard

To view analytics data from the Cloudflare dashboard:

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Click **Stream** > **Analytics**.
3. From **Stream Analytics**, click **Add filter** to view data related to your filter.
4. After selecting your filters, click **Apply**.

You can also hover your cursor over interactive portions to view specific data points. 

## Client side analytics

Stream has a GraphQL analytics API that can be used to get bulk analytics for every video in your account with one HTTP request.

### Metrics

*   Number of views (number of times the video playback has been started)
*   Time viewed in seconds
*   Number of video buffering events
*   Number of times quality level has changed

### Filters

There is no limit on number of filters per query.

*   Video UID
*   Date/time
*   Country
*   CreatorID
*   Device type
*   Device operating system
*   Device browser
*   Quality level (only for quality level metric)

{{<Aside>}}

View analytics is collected only when the Stream player is used. If you use a third party player, view metrics will not appear as part of these metrics. Review the example below to retrieve the time viewed for videos on your account in a single query.

{{</Aside>}}

{{<Aside>}}

If you are newer to GraphQL, refer to [Cloudflare GraphQL analytics for HTTP requests](/analytics/graphql-api/getting-started/) for more detailed information getting started with the Cloudflare GraphQL Analytics API.

{{</Aside>}}

### Examples

#### Get the view count and minutes viewed for all videos in your Stream account

```graphql
---
header: GraphQL Request
---
query {
  viewer {
    accounts(filter:{
      accountTag:"<ACCOUNT_ID>"

    }) {
      videoPlaybackEventsAdaptiveGroups(
        filter: {
          date_geq: "2020-09-01"
          date_lt: "2020-09-25"
        }
        orderBy:[uid_ASC]
        limit: 1000
      ) {
        count
        sum {
          timeViewedMinutes
        }
        dimensions{
          uid
        }
      }
    }
  }
}
```

```json
---
header: GraphQL response
---
{
  "data": {
    "viewer": {
      "accounts": [
        {
          "videoPlaybackEventsAdaptiveGroups": [
            {
              "count": 5,
              "dimensions": {
                "uid": "35f58cd097b40b1264124d9easbd62249"
              },
              "sum": {
                "timeViewedMinutes": 0
              }
            },
            {
              "count": 0,
              "dimensions": {
                "uid": "5646153f8dea17f44dss542a42e76cfd04"
              },
              "sum": {
                "timeViewedMinutes": 0
              }
            },
            {
              "count": 2,
              "dimensions": {
                "uid": "764254b444dss68c63702e8545536dfb422"
              },
              "sum": {
                "timeViewedMinutes": 1225
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

About the response above:

*   Each object inside `videoPlaybackEventsAdaptiveGroups` represents one video.
*   `uid` represents the unique identifier for the video.
*   `count` shows the view count for one video during the specified date range.
*   `timeViewedMinutes` shows the minutes viewed per video during the specified date range.
*   If a video did not have views in the date range specified, it will NOT be included in the response

## Server side analytics

### Metrics

- Date and time an event occurred at Cloudflare's edge
- Media source for the minutes viewed
- Video UID
- ISO 3166 alpha2 country code from the client

### Filters

- `date`
- `datetime`
- `mediaType`
- `UID`
- `clientCountryName`

### Example

#### Get minutes viewed by country

```graphql
---
header: GraphQL request
---
query {
  viewer {
    accounts(filter:{
      accountTag:"<ACCOUNT_ID>"
    }) {
      streamMinutesViewedAdaptiveGroups(
        filter: {
          date_geq: "2022-03-01"
          date_lt: "2022-02-01"
        }
        orderBy:[sum_minutesViewed_DESC]
        limit: 100
      ) {
        sum {
          minutesViewed
        }
        dimensions{
          uid
          clientCountryName
        }
      }
    }
  }
}
```

```json
---
header: GraphQL response
---
{
    "data": {
        "viewer": {
            "accounts": [
                {
                    "streamMinutesViewedAdaptiveGroups": [
                        {
                            "dimensions": {
                                "clientCountryName": "US",
                                "uid": "73c514082b154945a753d0011e9d7525"
                            },
                            "sum": {
                                "minutesViewed": 2234
                            }
                        },
                        {
                            "dimensions": {
                                "clientCountryName": "CN",
                                "uid": "73c514082b154945a753d0011e9d7525"
                            },
                            "sum": {
                                "minutesViewed": 700
                            }
                        },
                        {
                            "dimensions": {
                                "clientCountryName": "IN",
                                "uid": "73c514082b154945a753d0011e9d7525"
                            },
                            "sum": {
                                "minutesViewed": 553
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

## Pagination

GraphQL API supports seek pagination: using filters, you can specify the last video UID so the response only includes data for videos after the last video UID.

The query below will return data for 2 videos that follow video UID `5646153f8dea17f44d542a42e76cfd`:

```graphql
---
header: GraphQL query
---
query {
  viewer {
    accounts(filter:{
      accountTag:"6c04ee5623f70a112c8f488e4c7a2409"

    }) {
      videoPlaybackEventsAdaptiveGroups(
        filter: {
          date_geq: "2020-09-01"
          date_lt: "2020-09-25"
          uid_gt:"5646153f8dea17f44d542a42e76cfd"
        }
        orderBy:[uid_ASC]
        limit: 2
      ) {
        count
        sum {
          timeViewedMinutes
        }
        dimensions{
          uid
        }
      }
    }
  }
}
```

Here are the steps to implementing pagination:

1.  Call the first query without uid\_gt filter to get the first set of videos
2.  Grab the last video UID from the response from the first query
3.  Call next query by specifying uid\_gt property and set it to the last video UID. This will return the next set of videos

## Limitations

*   Maximum query interval in a single query is 31 days
*   Maximum data retention period is 90 days
