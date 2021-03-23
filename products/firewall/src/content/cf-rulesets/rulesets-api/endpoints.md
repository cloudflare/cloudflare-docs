---
title: Endpoints
alwaysopen: true
order: 782
---

# Endpoints

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

The Rulesets API provides specific endpoints for updating the rulesets of Phases so that you do not need to know the ruleset ID of the Phase beforehand. Instead, use the Phase name directly in the API endpoint.

For example, instead of using the following endpoint:

```bash
PUT https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}
```

You can use the following endpoint:

```bash
PUT https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint
```

For authentication instructions, see [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, see [Getting Started: Endpoints](https://api.cloudflare.com/#getting-started-endpoints).

<Aside>

The Rulesets endpoints require a value for `{account_id}`.

To retrieve a list of accounts you have access to, use the [List Accounts](https://api.cloudflare.com/#accounts-list-accounts) operation. Note the IDs of the accounts you want to manage.

</Aside>

The Cloudflare Rulesets API supports the operations outlined below. Visit the associated links for examples.

## List and view rulesets

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>Verb</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody style="vertical-align:top">
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/view/#list-existing-rulesets">List existing rulesets</a></td>
      <td><code>GET</code></td>
      <td>
        <p>Returns the list of existing rulesets at the account level or at the zone level.</p>
      </td>
    </tr>
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/view/#view-a-specific-ruleset">View a specific ruleset</a></td>
      <td><code>GET</code></td>
      <td>
        <p>Returns the properties of the most recent version of a specific ruleset.</p>
      </td>
    </tr>
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/view/#list-all-versions-of-a-ruleset">List all versions of a ruleset</a></td>
      <td><code>GET</code></td>
      <td>
        <p>Returns a list of all the versions of a ruleset.</p>
      </td>
    </tr>
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/view/#view-a-specific-version-of-a-ruleset">View a specific version of a ruleset</a></td>
      <td><code>GET</code></td>
      <td>
        <p>Returns the configuration of a specific version of a ruleset, including its rules.</p>
      </td>
    </tr>
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/view/#list-rules-in-a-managed-ruleset-with-a-specific-tag">List rules in a Managed Ruleset with a specific tag</a></td>
      <td><code>GET</code></td>
      <td>
        <p>Returns a list of all the rules in a Managed Ruleset tagged with a specific tag.</p>
      </td>
    </tr>
  </tbody>
</table>

## Update and deploy rulesets

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>Verb</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody style="vertical-align:top">
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/update/#update-a-ruleset">Update or deploy a ruleset</a></td>
      <td><code>PUT</code></td>
      <td>
        <p>Updates the basic properties of a ruleset and the list of rules in the ruleset.<br/>Allows you to deploy Managed Rulesets.</p>
      </td>
    </tr>
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/update/#update-a-rule-in-a-ruleset">Update a rule in a ruleset</a></td>
      <td><code>PATCH</code></td>
      <td>
        <p>Updates the definition of a single rule within a ruleset.<br/>Allows you to change the order of a rule in a ruleset.</p>
      </td>
    </tr>
  </tbody>
</table>

## Create a custom ruleset

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>Verb</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody style="vertical-align:top">
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/create">Create a custom ruleset</a></td>
      <td><code>POST</code></td>
      <td>
        <p>Creates a new custom ruleset.</p>
      </td>
    </tr>
  </tbody>
</table>