---
pcx_content_type: how-to
title: Configure GraphQL client endpoint and HTTP headers
weight: 41
---

# Configure GraphQL client endpoint and HTTP headers

1. Launch [GraphiQL](https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/).
2. Select **Edit HTTP Headers**.
    ![Clicking Edit HTTP Headers](/images/analytics/GraphiQL-edit-http-headers.png)
    The **Edit HTTP Headers** window appears.
    ![Editing HTTP Headers Window](/images/analytics/GraphiQL-edit-http-headers-window.png)
3. Select **Add Header**.
    ![Clicking Add Header](/images/analytics/GraphiQL-add-header.png)
4. Enter `X-AUTH-EMAIL` in the **Header name** field and your email address registered with Cloudflare in the **Header value** field, and select **Save**.
5. To configure authentication, select **Add Header**. You can use Cloudflare Analytics API token authentication (recommended) or Cloudflare API key authentication.
    - **Token authentication**:
      Enter **Authorization** in the **Header Name** field, and enter `Bearer {your-analytics-token}` in the **Header value** field, then select **Save**.
      ![Editing HTTP Headers](/images/analytics/GraphiQL-edit-http-headers-token.png)
    - **Key authentication**:
      Enter `X-AUTH-KEY` in the **Header Name** field, and paste your Global API Key in the **Header value** field, then select **Save**.
6. Select anywhere outside the **Edit HTTP Headers** window in GraphiQL to close it and return to the main GraphiQL display.
7. Enter `https://api.cloudflare.com/client/v4/graphql` in the **GraphQL Endpoint** field
    ![Editing GraphQL Endpoint](/images/analytics/GraphiQL-response-pane.png)

{{<Aside type="note" header="Note">}}

The right-side response pane is empty when you enter your information correctly. An error displays when there are problems with your header credentials.

{{</Aside>}}

Now that you have configured authentication with a Cloudflare API key, you are ready to run queries using GraphiQL.
