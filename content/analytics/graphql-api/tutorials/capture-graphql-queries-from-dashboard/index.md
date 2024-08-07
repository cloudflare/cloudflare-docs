---
pcx_content_type: how-to
title: Capture GraphQL queries with Chrome DevTools
---

# Capture GraphQL queries with Chrome DevTools

Using [Chrome DevTools](https://developer.chrome.com/docs/devtools), you can capture the queries running behind the Cloudflare Dashboard analytics. In this example, we will focus on the Network Analytics dataset, but the same process can be applied to any other analytics available in your dashboard.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Analytics & Logs** and select the **Network Analytics** dashboard or any other analytics dashboard you are interested in seeing the GraphQL queries in.

![Analytics tab](/images/analytics/analytics-tab.png)

3. Open the [Chrome Developer Tools](https://developer.chrome.com/docs/devtools) and select **Inspect**.

![Chrome developer tools](/images/analytics/chrome-developer-tools.png)

4. Select the **Network** tab in the Developer Tools panel.
5. In the filter bar, type `graphql` to filter out the GraphQL requests. If no requests appear, try reloading the page. As the page reloads, several network requests will populate the **Network** tab. Look for requests that contain `graphql` in the name.

![Type graphql in the search field](/images/analytics/search-field.png)

6. Select one of the GraphQL requests to open its details and go to the **Payload** tab. There you will find the GraphQL query. Select the query line and then **Copy value** to capture the query.

![Copy query value](/images/analytics/copy-value.png)

7. If you want to capture a new query, adjust the filters in the **Network analytics** dashboard and a new query will appear in the GraphQL requests. 

![Create a new query](/images/analytics/new-query.png)

You can now use this query as the basis for your API call. Refer to the [Get started](/analytics/graphql-api/getting-started/) section for more information.