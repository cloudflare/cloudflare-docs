---
pcx_content_type: reference
title: GraphQL Analytics API
weight: 1
---

# GraphQL Analytics API

Stream provides analytics about both live video and video uploaded to Stream, via the GraphQL API described below, as well as in the [Stream dashboard](https://dash.cloudflare.com/?to=/:account/stream/analytics).

The Stream Analytics API uses the Cloudflare GraphQL Analytics API, which can be used across many Cloudflare products. For more about GraphQL, rate limits, filters, and sorting, refer to the [Cloudflare GraphQL Analytics API docs](analytics/graphql-api).

## Getting started

1. [Generate a Cloudflare API token](https://dash.cloudflare.com/profile/api-tokens) with the **Account Analytics** permission.
2. Use a GraphQL client of your choice to make your first query. [Postman](https://www.postman.com/) has a built-in GraphQL client which can help you run your first query and introspect the GraphQL schema to understand what is possible.

See the sections below for available metrics, dimensions, fields, and example queries.

## Server side analytics

Stream collects data about the number of minutes of video delivered to viewers for all live and on-demand videos played via HLS or DASH, regardless of whether or not you use the [Stream Player](/stream/viewing-videos/using-the-stream-player/).

### Filters and Dimensions

| Field               | Description                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| `date`              | Date                                                                                                     |
| `datetime`          | DateTime                                                                                                 |
| `uid`               | UID of the video                                                                                         |
| `clientCountryName` | ISO 3166 alpha2 country code from the client who viewed the video                                        |
| `creator`           | The [Creator ID](/stream/manage-video-library/creator-id/) associated with individual videos, if present |

Some filters, like `date`, can be used with operators, such as `gt` (greater than) and `lt` (less than), as shown in the example query below. For more advanced filtering options, see [filtering](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/).

### Metrics

| Node                                | Field           | Description                                |
| ----------------------------------- | --------------- | ------------------------------------------ |
| `streamMinutesViewedAdaptiveGroups` | `minutesViewed` | Minutes of video delivered                 |
| `streamMinutesViewedAdaptiveGroups` | `count`         | Number of times video playback has started |

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

## Client side analytics

Client-side analytics are collected by the Stream Player, in viewers' web browsers. This enables more detailed metrics that can be used to understand the quality of viewers' experience, including how often video playback stops due to buffering or how often the quality level switches during playback.

{{<Aside header="Client-side analytics are only available with the Stream Player">}}
Client-side analytics are only collected when the [Stream Player](/stream/viewing-videos/using-the-stream-player/) is used. If you use a different player, only server-side analytics will be available.
{{</Aside>}}

### Filters and Dimensions

| Field               | Description                                                       |
| ------------------- | ----------------------------------------------------------------- |
| `date`              | Date                                                              |
| `datetime`          | DateTime                                                          |
| `uid`               | UID of the video                                                  |
| `clientCountryName` | ISO 3166 alpha2 country code from the client who viewed the video |
| `deviceBrowser`     | Browser                                                           |
| `deviceOs`          | Device operating system                                           |
| `deviceType`        | Device type                                                       |

Some filters, like `date`, can be used with operators, such as `gt` (greater than) and `lt` (less than), as shown in the example query below. For more advanced filtering options, see [filtering](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/).

### Metrics

| Node                                | Field               | Description                                             |
| ----------------------------------- | ------------------- | ------------------------------------------------------- |
| `videoPlaybackEventsAdaptiveGroups` | `timeViewedMinutes` | Minutes of video viewed                                 |
| `videoPlaybackEventsAdaptiveGroups` | `count`             | Number of times video playback has started              |
| `videoBufferEventsAdaptiveGroups`   | `count`             | Number of times video playback stopped due to buffering |
| `videoQualityEventsAdaptiveGroups`  | `count`             | Number of times video quality changed during playback   |

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

#### About the response above:

- Each object inside `videoPlaybackEventsAdaptiveGroups` represents one video.
- `uid` represents the unique identifier for the video.
- `count` shows the view count for one video during the specified date range.
- `timeViewedMinutes` shows the minutes viewed per video during the specified date range.
- If a video did not have views in the date range specified, it will NOT be included in the response

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

1.  Call the first query without uid_gt filter to get the first set of videos
2.  Grab the last video UID from the response from the first query
3.  Call next query by specifying uid_gt property and set it to the last video UID. This will return the next set of videos

For more on pagination, refer to the [Cloudflare GraphQL Analytics API docs](/analytics/graphql-api/features/pagination/).

## Limitations

- The maximum query interval in a single query is 31 days
- The maximum data retention period is 90 days
