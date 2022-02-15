---
order: 40
pcx-content-type: how-to
---

# Configure GraphQL client endpoint and HTTP headers

1. Launch [GraphiQL](https://electronjs.org/apps/graphiql).
1. Click **Edit HTTP Headers**.
   ![Click Edit HTTP Headers](../../../static/images/GraphiQL-edit-http-headers.png)
   The **Edit HTTP Headers** window appears.
   ![Edit HTTP Headers Window](../../../static/images/GraphiQL-edit-http-headers-window.png)
1. Click **Add Header**.
   ![Click Add Header](../../../static/images/GraphiQL-add-header.png)
1. Enter `X-AUTH-EMAIL` in the **Header name** field and your email address registered with Cloudflare in the **Header value** field, and click **Save**.
1. To configure authentication, click **Add Header**. You can use Cloudflare Analytics API token authentication (recommended) or Cloudflare API key authentication.
   * **Token authentication**:
   Enter **Authorization** in the **Header Name** field, and enter `Bearer {your-analytics-token}` in the **Header value** field, then click **Save**.
   ![HTTP Headers](../../../static/images/GraphiQL-edit-http-headers-token.png)
   * **Key authentication**:
   Enter `X-AUTH-KEY` in the **Header Name** field, and paste your Global API Key in the **Header value** field, then click **Save**.
   ![HTTP Headers](../../../static/images/GraphiQL-edit-http-headers-complete.png)
1. Click anywhere outside the **Edit HTTP Headers** window in GraphiQL to close it and return to the main GraphiQL display.
1. Enter `https://api.cloudflare.com/client/v4/graphql` in the **GraphQL Endpoint** field
   ![Edit GraphQL Endpoint](../../../static/images/GraphiQL-response-pane.png)

<Aside type='note' header='Note'>

The right-side response pane is empty when you enter your information correctly. An error displays when there are problems with your header credentials.

</Aside>

Now that you have configured authentication with a Cloudflare API key, you are ready to run queries using GraphiQL.