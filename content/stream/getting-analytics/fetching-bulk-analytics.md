---
pcx-content-type: reference
title: Fetching bulk analytics
---

# Fetching bulk analytics

Cloudflare Stream lets you fetch usage data in bulk using the GraphQL API. Stream's GraphQL API exposes two data sets:

- Client-side Metrics: Data collected from the Stream Player. If you use your own player, it will not be reflected in this data set.
- Server-side Metrics: Data collected from server-side logs and used for billing purposes.

For additional information on using GraphQL, refer to [Get started with GraphQL Analytics API](/analytics/graphql-api/getting-started/).

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

Here is how you would get the view count and minutes viewed for the videos in your Stream account:

1.  Make a query to https://api.cloudflare.com/client/v4/graphql
2.  Include your Cloudflare API token in the headers (see cURL example included on this page)
3.  It is important that you change the $ACCOUNT\_ID with your account ID and the date range
4.  The body of the query should contain the following GraphQL Query:

```javascript
query {
  viewer {
    accounts(filter:{
      accountTag:"$ACCOUNT_ID"

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

Here is the exact cURL request:

```bash
curl --request POST \
--url https://api.cloudflare.com/client/v4/graphql \
--header 'content-type: application/json' \
--header 'Authorization: Bearer $TOKEN' \
--data '{"query":"query {\n  viewer {\n    accounts(filter:{\n      accountTag:\"$ACCOUNT_ID\"\n\n    }) {\n      videoPlaybackEventsAdaptiveGroups(\n        filter: {\n          date_geq: \"2020-09-01\"\n          date_lt: \"2020-09-25\"\n        }\n        orderBy:[uid_ASC]\n        limit: 10000\n      ) {\n        count\n        sum {\n          timeViewedMinutes\n        }\n        dimensions{\n          uid\n        }\n      }\n    }\n  }\n}\n\n"}'
```

### Response

The response will look something like below. Things to remember:

*   Each object inside videoPlaybackEventsAdaptiveGroups represents one video
*   uid property represents the video uid
*   count property shows the view count for one video during the specified date range
*   timeViewedMinutes property shows the minutes viewed per video during the specified date range
*   If a video did not have views in the date range specified, it will NOT be included in the response

```javascript
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
                "uid": "39a24fb20aa2617a483582f5ggb6b0d5e9"
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
              "count": 0,
              "dimensions": {
                "uid": "6cc90238ffd28e1861ba2aaf1030f6d4db"
              },
              "sum": {
                "timeViewedMinutes": 1
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
            },
            {
              "count": 1,
              "dimensions": {
                "uid": "a8d47920ds8c6e8d1cgffc425e6c9120ef76"
              },
              "sum": {
                "timeViewedMinutes": 0
              }
            },
            {
              "count": 2,
              "dimensions": {
                "uid": "cc707cacc9bc86cb8fbab0021d749389"
              },
              "sum": {
                "timeViewedMinutes": 1
              }
            },
            {
              "count": 1,
              "dimensions": {
                "uid": "e81376fee97b3115dc1c3f82fb2be79e"
              },
              "sum": {
                "timeViewedMinutes": 0
              }
            },
            {
              "count": 241,
              "dimensions": {
                "uid": "fcfa5c97795ba90251cbbae1880a0e18"
              },
              "sum": {
                "timeViewedMinutes": 101
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

## Server side analytics

### Metrics

- Date and time an event occurred at Cloudflare's edge
- Media source for the minutes viewed
- Video ID
- ISO 3166 alpha2 country code from the client

### Filters

- `date`
- `datetime`
- `mediaType`
- `UID`
- `clientCountryName`

### Example

Here is the exact cURL request:

```bash
curl --request POST \
--url https://api.cloudflare.com/client/v4/graphql \
--header 'content-type: application/json' \
--header 'Authorization: Bearer $TOKEN' \
--data '{"query":"query {\n  viewer {\n    accounts(filter:{\n      accountTag:\"$ACCOUNT_ID\"\n\n    }) {\n      streamMinutesViewedAdaptiveGroups(\n        filter: {\n          date_lt: \"2022-03-01\"\n          date_gt: \"2022-02-01\"\n        }\n        orderBy:[sum_minutesViewed_DESC]\n        limit: 10\n      ) {\n             sum {\n          minutesViewed\n        }\n        dimensions{\n          uid\n          clientCountryName\n        }\n      }\n    }\n  }\n}\n\n"}'
```

### Response

```graphql
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

The query below will return data for 2 videos that follow video id `5646153f8dea17f44d542a42e76cfd`:

```javascript
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
2.  Grab the last video ID from the response from the first query
3.  Call next query by specifying uid\_gt property and set it to the last video ID. This will return the next set of videos

## Limitations

*   Only Cloudflare API keys, not API tokens can be used with the Stream GraphQL API for now
*   Maximum query interval in a single query is 31 days
*   Maximum data retention period is 90 days
