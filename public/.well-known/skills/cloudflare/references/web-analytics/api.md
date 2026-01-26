## API Access (GraphQL)

While Web Analytics is primarily dashboard-based, Cloudflare provides GraphQL API access for advanced queries.

### Authentication

```bash
# API Token with "Web Analytics Read" permission
curl -X POST https://api.cloudflare.com/client/v4/graphql \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"query": "..."}'
```

### Example Queries

**Get page views by path:**

```graphql
query {
  viewer {
    accounts(filter: {accountTag: "YOUR_ACCOUNT_ID"}) {
      rumPageloadEventsAdaptiveGroups(
        filter: {
          date_geq: "2024-01-01"
          date_lt: "2024-01-31"
        }
        limit: 100
      ) {
        dimensions {
          blob1 # Page path
        }
        sum {
          visits
          pageViews
        }
        avg {
          sampleInterval
        }
      }
    }
  }
}
```

**Get Core Web Vitals:**

```graphql
query {
  viewer {
    accounts(filter: {accountTag: "YOUR_ACCOUNT_ID"}) {
    