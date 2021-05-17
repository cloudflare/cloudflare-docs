---
title: Authentication
order: 10
---

# Authentication

Cloudflare separates service configuration by zone. When there are multiple accounts, each with many zones, it is important to restrict GraphQL Analytics API access to only those account and zone resources that are relevant for the task at hand.

To secure access to your GraphQL Analytics data, use a Cloudflare API key or token to authenticate an API request.

This table outlines the differences between Cloudflare API keys and tokens:

<TableWrap>

<table>
  <thead>
      <tr>
          <th>Authentication Method</th>
          <th>Description</th>
      </tr>
  </thead>
  <tbody>
      <tr>
        <td><a href='https://developers.cloudflare.com/api/tokens/create'>API Tokens</a></td>
        <td>Cloudflare recommends API Tokens as the preferred way to interact with Cloudflare APIs. You can configure the scope of tokens to limit access to account and zone resources, and you can define the Cloudflare APIs to which the token authorizes access.</td>
      </tr>
      <tr>
        <td><a href='https://developers.cloudflare.com/api/keys'>API Keys</a></td>
        <td><p>Unique to each Cloudflare user and used only for authentication. API keys do not authorize access to accounts or zones.</p>
        <p>Use the Global API Key for authentication. Only use the Origin CA Key when you create origin certificates through the API.</p></td>
      </tr>
  </tbody>
</table>

</TableWrap>

To create and configure GraphQL Analytics API tokens, see [_Configure an Analytics API token_](/graphql-api/getting-started/authentication/api-token-auth/).

To find and retrieve API keys, as well as edit HTTP headers for authentication in GraphiQL, see [_Authenticate with a Cloudflare API key_](/graphql-api/getting-started/authentication/api-key-auth/).
