---
title: GraphQL Analytics
pcx_content_type: tutorial
weight: 1
meta:
  title: GraphQL Analytics
---

# GraphQL Analytics

Use the GraphQL Analytics API to review data for Magic Firewall network traffic related to your configured firewall rules.

Before you begin, you must have an [API token](/analytics/graphql-api/getting-started/authentication/). For additional help getting started with GraphQL Analytics, refer to [GraphQL Analytics API](/analytics/graphql-api/).

## Obtain Cloudflare Account ID and Magic Firewall rule ID

To construct a Magic Firewall GraphQL query for an object, you will need a Cloudflare Account ID and the rule ID for each firewall rule.

### Obtain your Cloudflare Account ID

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. From the **Accounts** page, click your account.

In your browser's address bar, the URL should show `https://dash.cloudflare.com/` followed by a hex string. The hex string is your Cloudflare Account ID.

### Obtain the rule ID for a firewall rule

1. From the Cloudflare dashboard, click **Application Security** > **Magic Firewall**.
2. Locate the rule you need the rule ID for from the list and click **Edit**.
3. From the **Edit Rule** page, locate the **Rule ID** and select the copy button.
4. Select **Cancel** to return to the **Magic Firewall** page.

## Explore GraphQL schema with Magic Firewall query example

In this section, you will run a test query to retrieve a five minute count of all configured Magic Firewall rules within five minute intervals. You can copy and paste the code below into GraphiQL.

For additional information about the Analytics schema, refer to [Explore the Analytics schema with GraphiQL](/analytics/graphql-api/getting-started/explore-graphql-schema/).

```graphql
query {
  viewer {
    accounts(filter: {accountTag: "<YOUR_ACCOUNT_ID>"}) {
      magicFirewallSamplesAdaptiveGroups(
        filter: {datetime_geq: "2022-01-05T11:00:00Z",
          datetime_leq: "2022-01-05T12:00:00Z"},
        limit: 2,
        orderBy: [datetimeFiveMinute_DESC])
      {
        sum {
          bits
          packets
        }
        dimensions {
          datetimeFiveMinute
          ruleId
        }
      }
    }
  }
}
```

## Example query for Magic Firewall

### Obtain analytics for a specific rule

Use the example below to display the total number of packets and bits for the top ten suspected malicious traffic streams within the last hour. After receiving the results, you can sort by packet rates with a five minute average.

For each stream, display the:

- Source and destination IP addresses
- Ingress Cloudflare data centers that received it
- Total traffic volume in bits and packets received within the hour
- Actions taken by the firewall rule

```graphql
query{
    viewer {
      accounts(filter: {accountTag: "<ACCOUNT_ID>"}) {
        magicFirewallNetworkAnalyticsAdaptiveGroups(
        filter: {
            ruleId: "<RULE_ID>",
            datetime_geq: "2022-01-12T10:00:00Z",
            datetime_leq: "2022-01-12T11:00:00Z"
  }
        limit: 10,
        orderBy: [avg_packetRateFiveMinutes_DESC])
        {
            sum {
              bits
              packets
            }
            dimensions {
              coloCity
              ipDestinationAddress
              ipSourceAddress
              outcome
            }
        }
    }
}
}
```
