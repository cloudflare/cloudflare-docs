---
pcx_content_type: tutorial
title: Test a waiting room
weight: 9
---

# Test a waiting room

Follow this tutorial to test your waiting room behavior in response to load. To accurately simulate traffic through your waiting room with a load test, run your test script or planner for a period of time longer than a minute, ideally more than 2-3 minutes. You can run a load test using a variety of tools including [loader.io](http://loader.io), [jmeter](http://jmeter.apache.org), and [postman.com](http://postman.com). You can also write a plain shell script to simulate user requests (each representing a distinct user).

{{<Aside type="warning" header="Warning:">}}
This tutorial uses an open-sourced load testing tool that is not created or supported by Cloudflare.
{{</Aside>}}

---

## Before you begin

Before you start this tutorial, ensure you have:

- All the [prerequisites](/waiting-room/#prerequisites) completed.
- For this tutorial, we will use an open source tool from Apache, [JMeter](https://jmeter.apache.org/). You can download the binary from [JMeter's website](https://jmeter.apache.org/download_jmeter.cgi). 

---

## 1. Download sample script

First, download the [sample](https://github.com/yj7o5/cf-waiting-room-testing/blob/main/plan.jmx) JMeter plan (configuration file) from GitHub.

This sample plan simulates 200 active users visiting the site, slowly ramping up traffic within the first minute and then maintaining 200 active users for the next three minutes. The test plan for this tutorial follows the setup outlined in the next steps.

## 2. Run sample plan

In order to run our test plan click on the **play** button to get the test started which should take roughly around 3-4 minutes.

![Navigation bar](/waiting-room/static/navigation.png)

- Each simulated user has the following attributes:

  - Contains a Cookie jar for cookies persistence
  - Repeats for 20 times

    - Makes a request to the origin site with waiting room enabled
    - Logs request details
    - Pauses for 10 seconds before refreshing the page to make another request to the origin site

![User attributes](/waiting-room/static/user-attributes.png)

Per the plan above, each [Thread Group](https://jmeter.apache.org/usermanual/test_plan.html#thread_group) performs the above action once and the user traffic ramps up within the first minute and keeps a sustained traffic for the next three minutes before users leave the site. You can send more or less traffic than what is being sent in this example by updating these properties.

![Visualizing number of threads](/waiting-room/static/threads.png)

## 3. Analyze results

To analyze the results of your test, you can query Waiting Room Analytics (Beta) via Cloudflare’s GraphQL API to see Total Active Users and Queued Users for each minute of your load test. 



<details>
  <summary>Example Curl Statement</summary>
  <div>

```bash
echo '{
  "operationName": "UsersQueuedOverTimeQuery",
  "variables": {
    "filter": {
      "datetime_geq": "2022-10-17T15:34:00Z",
      "datetime_leq": "2022-10-17T15:40:00Z",
      "waitingRoomId": "<YOUR_WAITING_ROOM_ID>"
    },
    "zoneId": "<YOUR_ZONE_ID>"
  },
  "query": "query UsersQueuedOverTimeQuery($zoneId: string, $filter: ZoneWaitingRoomAnalyticsAdaptiveGroupsFilter_InputObject) {\n  viewer {\n    zones(filter: {zoneTag: $zoneId}) {\n      timeseries: waitingRoomAnalyticsAdaptiveGroups(limit: 5000, filter: $filter, orderBy: [datetimeMinute_ASC]) {\n        avg {\n          totalActiveUsers\n          totalActiveUsersConfig\n          totalQueuedUsers\n          __typename\n        }\n        max {\n          totalQueuedUsers\n          totalActiveUsers\n          totalActiveUsersConfig\n          __typename\n        }\n        min {\n          totalActiveUsersConfig\n          __typename\n        }\n        dimensions {\n          ts: datetimeMinute\n          __typename\n        }\n        __typename\n      }\n      total: waitingRoomAnalyticsAdaptiveGroups(limit: 1, filter: $filter) {\n        max {\n          totalQueuedUsers\n          totalActiveUsers\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
}' | tr -d '\n' | curl \
  -X POST \
```

</div>
</details>

From our test, we see the following results (these are extracted from results of the query for readability):

- 15:35:00 UTC              
  - `"totalActiveUsers": 137,`
  - `"totalActiveUsersConfig": 300,`
  - `"totalQueuedUsers": 0`

- 15:36:00 UTC
  - `"totalActiveUsers": 200,`
  - `"totalActiveUsersConfig": 300,`
  - `"totalQueuedUsers": 0`

- 15:37:00 UTC
  - `"totalActiveUsers": 200,`
  - `"totalActiveUsersConfig": 300,`
  - `"totalQueuedUsers": 0`

- 15:38:00 UTC
  - `"totalActiveUsers": 200,`
  - `"totalActiveUsersConfig": 300,`
  - `"totalQueuedUsers": 0`

The first minute mark, 15:35:00 UTC, shows 137 active users past the waiting room. This is because our traffic was set to gradually ramp up within the first minute and the test did not start exactly at the minute mark. When data was aggregated for the following minute, 15:36:00 UTC, the waiting room reported the total 200 users active we expected to see on the site as each “user” made subrequests. The active user count remained stable at 200 as long as it received subrequests from the traffic sent by the load test.

{{<Aside type="note" header="Note:">}}

Please obtain your API Token from the dashboard. Make sure your API Token grants access to the “Analytics” resource. For more on how to get the API Token please follow the guide [here](/analytics/graphql-api/getting-started/authentication/api-token-auth/).
{{</Aside>}}