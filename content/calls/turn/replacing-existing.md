---
pcx_content_type: get-started
title: Replacing existing TURN servers
weight: 18
---

# Replacing existing large TURN server deployments

If you are a existing TURN provider but would like to switch to providing Cloudflare Calls TURN for your customers, there is a few considerations.

## Benefits

Cloudflare Calls TURN service can reduce tangible and untangible costs associated with TURN servers:
- Server costs (AWS EC2 etc)
- Bandwidth costs (Egress, load balancing etc)
- Time and effort to set up a TURN process and maintenance of server
- Scaling the servers up and down
- Maintain the TURN server with security and feature updates
- Maintain high availability

## Recommendations

### Separate environments with TURN keys

When using Cloudflare Calls TURN service at scale, consider separating environments such as "testing", "staging" or "production" with TURN keys. You can create up to 1,000 TURN keys in your account, which can be used to generate end user credentials.

There is no limit to how many end-user credentials you can create with a paticular TURN key.

### Tag users with custom identifiers

Cloudflare Calls TURN service lets you tag each credential with a custom identifier as you generate a credential like below:

```bash
---
highlight: [4]
---
curl https://rtc.live.cloudflare.com/v1/turn/keys/$TURN_KEY_ID/credentials/generate \
--header "Authorization: Bearer $TURN_KEY_API_TOKEN" \
--header "Content-Type: application/json" \
--data '{"ttl": 864000, "customIdentifier": "user4523958"}'
```

Use this field to aggregate usage for a specific user or group of users and collect analytics.

### Monitor usage

You can monitor account wide usage with the [GraphQL analytics API](/calls/turn/analytics/). This is useful for keeping track of overall usage for billing purposes, watching for unexpected changes. You can get timerseries data from TURN analytics with various filters in place.

### Monitor for credential abuse

If you share TURN credentials with end users, credential abuse is possible. You can monitor for abuse by tagging each credential with custom identifiers and monitoring for top custom identifiers in your application via the [GraphQL analytics API](/calls/turn/analytics/).

## How to bill end users for their TURN usage

When billing for TURN usage in your application, it's crucial to understand and account for adaptive sampling in TURN analytics. This system employs adaptive sampling to efficiently handle large datasets while maintaining accuracy.

The sampling process in TURN analytics works on two levels:

- At data collection: Usage data points may be sampled if they are generated too quickly.
- At query time: Additional sampling may occur if the query is too complex or covers a large time range.

To ensure accurate billing, write a single query that sums TURN usage per customer per time period, returning a single value. Avoid using queries that list usage for multiple customers simultaneously.


By following these guidelines and understanding how TURN analytics handles sampling, you can ensure more accurate billing for your end users based on their TURN usage.

{{<Aside type="note">}}

Cloudflare Calls only bills for traffic from Cloudflare's servers to your client, called `egressBytes`.

{{</Aside>}}


### Example queries


{{<Aside type="warning" header="Incorrect approach example">}}

Querying TURN usage for multiple customers in a single query can lead to inaccurate results. This is because the usage pattern of one customer could affect the sampling rate applied to another customer's data, potentially skewing the results.

{{</Aside>}}

```
---
header: Incorrect query for billing
---
query{
  viewer {
    usage: accounts(filter: { accountTag: "8846293bd06d1af8c106d89ec1454fe6" }) {
        callsTurnUsageAdaptiveGroups(
          filter: {
          datetimeMinute_gt: "2024-07-15T02:07:07Z"
          datetimeMinute_lt: "2024-08-10T02:07:05Z"
        }
          limit: 100
          orderBy: [customIdentifier_ASC]
        ) {
          dimensions {
            customIdentifier
          }
          sum {
            egressBytes
          }
        }
      }
    }
  }
```

Below is a query that queries usage only for a single customer.

```
---
header: Correct query for billing
---
query{
  viewer {
    usage: accounts(filter: { accountTag: "8846293bd06d1af8c106d89ec1454fe6" }) {
        callsTurnUsageAdaptiveGroups(
          filter: {
          datetimeMinute_gt: "2024-07-15T02:07:07Z"
          datetimeMinute_lt: "2024-08-10T02:07:05Z"
          customIdentifier: "myCustomer1111"
        }
          limit: 1
          orderBy: [customIdentifier_ASC]
        ) {
          dimensions {
            customIdentifier
          }
          sum {
            egressBytes
          }
        }
      }
    }
  }

```