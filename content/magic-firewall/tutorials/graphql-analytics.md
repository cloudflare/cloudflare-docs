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

1. From the Cloudflare dashboard, click **Firewall Rulesets** > **Magic Firewall**.
2. After the **Magic Firewall Rules** page displays, open your web browser's Developer Tools.
3. From the **Developer Tools** pane, switch to the **Network** tab.
4. From the **Network** tab, clear the network content.
5. Refresh the **Magic Firewall Rules** page to repopulate the **Network** tab with the HTTP request and response packets between the browser and Cloudflare API.
6. In the list of items, locate the three digit number with a **fetch** type. This will show you your Magic Firewalll rules.
7. Click the item and then click the **Response** tab. A list of all of your Magic Firewall rules and their descriptions display similar to the example below.

```bash
  {
    "id": "76a53b38cd9329ef632677g4525hi5929",
    "version": "69",
    "action": "block",
    "description": "Anonymizer test",
    "expression": "(ip.src in $cf.anonymizer)",
    "last_updated": "2022-01-17T22:41:45.60268Z",
    "ref": "76a53b38cd9329ef632677g4525hi5929",
    "enabled": true
  },
```

In the example above, the `id` value is the Magic Firewall rule ID.

## Explore GraphQL schema with Magic Firewall query example

In this section, you will run a test query to retrieve a five minute count of all configured Magic Firewall rules within five minute intervals. You can copy and paste the code below into GraphiQL.

For additional information about the Analytics schema, refer to [Explore the Analytics schema with GraphiQL](/analytics/graphql-api/getting-started/explore-graphql-schema/).

```graphql
query {
	viewer {
		accounts(filter: { accountTag: "<YOUR_ACCOUNT_ID>" }) {
			magicFirewallSamplesAdaptiveGroups(
				filter: { datetime_geq: "2022-01-05T11:00:00Z", datetime_leq: "2022-01-05T12:00:00Z" }
				limit: 2
				orderBy: [datetimeFiveMinute_DESC]
			) {
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
query {
	viewer {
		accounts(filter: { accountTag: "<ACCOUNT_ID>" }) {
			magicFirewallNetworkAnalyticsAdaptiveGroups(
				filter: {
					ruleId: "<RULE_ID>"
					datetime_geq: "2022-01-12T10:00:00Z"
					datetime_leq: "2022-01-12T11:00:00Z"
				}
				limit: 10
				orderBy: [avg_packetRateFiveMinutes_DESC]
			) {
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
