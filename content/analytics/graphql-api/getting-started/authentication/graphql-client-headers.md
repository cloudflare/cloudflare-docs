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
3. Select **Add Header** to configure authentication. You can use Cloudflare Analytics API token authentication (recommended) or Cloudflare API key authentication.
    - **Token authentication**:

      Enter **Authorization** in the **Header Name** field, and enter `Bearer {your-analytics-token}` in the **Header value** field, then select **Save**.

      ![Editing HTTP Headers](/images/analytics/GraphiQL-edit-http-headers-token.png)

    - **Key authentication**:

      Enter `X-AUTH-EMAIL` in the **Header name** field and your email address registered with Cloudflare in the **Header value** field, and select **Save**.<br>

      Select **Add Header** to add a second header. Enter `X-AUTH-KEY` in the **Header Name** field, and paste your Global API Key in the **Header value** field, then select **Save**.<br>

4. Select anywhere outside the **Edit HTTP Headers** window in GraphiQL to close it and return to the main GraphiQL display.
5. Enter `https://api.cloudflare.com/client/v4/graphql` in the **GraphQL Endpoint** field.
    ![Editing GraphQL Endpoint](/images/analytics/GraphiQL-response-pane.png)

{{<Aside type="note" header="Note">}}

The right-side response pane is empty when you enter your information correctly. An error displays when there are problems with your header credentials.

{{</Aside>}}

Now that you have configured authentication, you are ready to run queries using GraphiQL.
