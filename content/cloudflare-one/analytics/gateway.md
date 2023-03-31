---
pcx_content_type: concept
title: Gateway analytics
weight: 3
---

# Gateway analytics

To see the top Allowed and Blocked requests across all of your DNS locations, navigate to **Analytics** > **Gateway**. You can filter the data by selecting a specific location and/or time.

- **Requests** — This chart shows an overview of the number of requests made by end users within the time period you specify. It shows a breakdown of requests based on the decision Gateway took (either Allowed or Blocked).

- **Allowed requests** — This chart shows a breakdown of the five domains which received the highest number of Allowed requests. It also shows the five domains which received the lowest amount of Allowed requests. By clicking **View all** to the right of either section of the chart, you will see a list of highest 100 and lowest 100 domains ranked by number of Allowed requests.

- **Top blocked requests** — This chart shows a breakdown of the five domains which received the highest number of Blocked requests. It also shows the five domains which received the lowest number of Blocked requests. By clicking **View all** to the right of either section of the chart, you'll see a list of highest 100 and lowest 100 domains ranked by number of Blocked requests.

- **Requests by category** — The charts in this card show a breakdown of the **Top allowed categories** and the **Top blocked categories** based on the number of requests that Gateway classified as belonging to a content category.

## GraphQL queries

You can use the [GraphQL Analytics API](/analytics/graphql-api/) to query your Gateway Analytics data. For more information on the Gateway Analytics dataset, refer to the [available datasets](/analytics/graphql-api/features/data-sets/) table and use the [GraphiQL client](/analytics/graphql-api/getting-started/explore-graphql-schema/) to explore the schema.
