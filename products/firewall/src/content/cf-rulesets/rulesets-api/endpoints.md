---
title: Endpoints
alwaysopen: true
order: 782
---

# Endpoints

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

To invoke a Cloudflare Rulesets API operation, append the endpoint to the Cloudflare API base URL:

```bash
https://api.cloudflare.com/client/v4/

```

For authentication instructions, see [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, see [Getting Started: Endpoints](https://api.cloudflare.com/#getting-started-endpoints).

<Aside>

The Rulesets endpoints require a value for {account_id}.

To retrieve a list of accounts you have access to, use the [List Accounts](https://api.cloudflare.com/#accounts-list-accounts) operation. Note the IDs of the accounts you want to manage.

</Aside>

The Cloudflare Rulesets API supports the operations outlined below. Visit the associated links for examples.

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>Method & Endpoint</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody style="vertical-align:top">
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/get/#list-rulesets">List Rulesets</a></td>
      <td><code>GET&nbsp;accounts/{'{account_id}'}/rulesets</code></td>
      <td>
        <p>Returns the latest version of all rulesets owned by the account and any managed rulesets the account is entitled to execute.</p>
      </td>
    </tr>
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/get/#get-ruleset">Get Ruleset</a></td>
      <td><code>GET&nbsp;accounts/{'{account_id}'}/rulesets/{'{ruleset_id}'}</code></td>
      <td>
        <p>Returns the latest version of a ruleset with the specified ruleset ID.</p>
      </td>
    </tr>
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/post">Create a root Ruleset</a></td>
      <td><code>POST&nbsp;accounts/{'{account_id}'}/rulesets</code></td>
      <td>
        <p>Creates a new root ruleset. An account can only have one root ruleset.</p>
      </td>
    </tr>
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/put">Update Ruleset</a></td>
      <td><code>PUT&nbsp;accounts/{'{account_id}'}/rulesets/{'{root_ruleset_id}'}</code></td>
      <td>
        <p>Creates a new version of an existing root ruleset.</p>
      </td>
    </tr>
  </tbody>
</table>