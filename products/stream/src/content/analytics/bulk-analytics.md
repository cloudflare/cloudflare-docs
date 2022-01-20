---
title: Bulk analytics
pcx-content-type: reference
---
 
# Bulk analytics

 <Aside type='note'>

Currently, Stream Analytics are only available for video plays that use the Stream Player. If you are using a third-party player, you will not see analytics for video plays from third-party players.
  
 </Aside>

Stream has a GraphQL analytics API that can be used to get bulk analytics for all videos in your account with one HTTP request. If you are newer to GraphQL, refer to [Cloudflare GraphQL analytics for HTTP requests](https://developers.cloudflare.com/analytics/graphql-api/getting-started) for more detailed information on getting started with the Cloudflare GraphQL Analytics API.

## Metrics

View analytics are only collected when the Stream player is used. Review the [example](#example---view-count-and-minutes-viewed) below to retrieve the time viewed for videos on your account in a single query.

  - Number of views (number of times the video playback has been started)
  - Time viewed in seconds
  - Number of video buffering events
  - Number of times quality level has changed

## Filters

There is no limit on the number of filters per query.

  - Video UID
  - Date/time
  - Country
  - Device type
  - Device operating system
  - Device browser
  - Quality level (only for quality level metric)

## Example: View count and minutes viewed

Follow the procedure to get the view count and minutes viewed for the videos in your Stream account.

1. Make a query to `https://api.cloudflare.com/client/v4/graphql`.
1. Include your Cloudflare API token in the headers as show in the example below.

```
curl --request POST \
--url https://api.cloudflare.com/client/v4/graphql \
--header 'content-type: application/json' \
--header 'Authorization: Bearer $TOKEN' \
--data '{"query":"query {\n  viewer {\n    accounts(filter:{\n      accountTag:\"$ACCOUNT_ID\"\n\n    }) {\n      videoPlaybackEventsAdaptiveGroups(\n        filter: {\n          date_geq: \"2020-09-01\"\n          date_lt: \"2020-09-25\"\n        }\n        orderBy:[uid_ASC]\n        limit: 10000\n      ) {\n        count\n        sum {\n          timeViewedMinutes\n        }\n        dimensions{\n          uid\n        }\n      }\n    }\n  }\n}\n\n"}'
```

3. Change the `$ACCOUNT_ID` with your account ID and the date range.
4. The body of the query should contain the following GraphQL Query:

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

## Response

The response will look something like below. Things to remember:

 - Each object inside ``videoPlaybackEventsAdaptiveGroups`` represents one video.
 - The `uid` property represents the video uid.
 - The `count` property shows the view count for one video during the specified date range.
 - The `timeViewedMinutes` property shows the minutes viewed per video during the specified date range.
 - If a video did not have views in the date range specified, it is not included in the response.

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

## Pagination

GraphQL API supports seek pagination. Using filters, you can specify the last video UID so the response only includes data for videos after the last video UID.

To implement pagination:

  1. Call the first query without the `uid_gt` filter to get the first set of videos.
  1. Grab the last video ID from the response from the first query,
  1. Call the next query by specifying the `uid_gt` property and set it to the last video ID. This will return the next set of videos.

The query below will return data for two videos that follow video id `5646153f8dea17f44d542a42e76cfd`:

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

## Limitations

 - Only Cloudflare API keys can be used with the Stream GraphQL API. API tokens are not supported for Stream GraphQL at this time.
 - The maximum query interval in a single query is 31 days.
 - The maximum data retention period is 90 days.
