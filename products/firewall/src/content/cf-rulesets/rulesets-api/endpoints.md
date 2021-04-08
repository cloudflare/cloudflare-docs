---
title: Endpoints
alwaysopen: true
order: 782
---

# Endpoints

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

For some operations, you can use specific endpoints provided by the Rulesets API for managing the rulesets of Phases. These endpoints include the Phase name in the endpoint instead of the ruleset ID.

For example, instead of using the following endpoint:

```bash
PUT /zones/{zone-id}/rulesets/{ruleset-id}
```

You can use the following endpoint:

```bash
PUT /zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint
```

To invoke a Cloudflare Rulesets API operation, append the endpoint to the Cloudflare API base URL:

```bash
https://api.cloudflare.com/client/v4/
```

For authentication instructions, see [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, see [Getting Started: Endpoints](https://api.cloudflare.com/#getting-started-endpoints).

<Aside>

The Rulesets endpoints require a value for `{account_id}` or for `{zone-id}`.

To retrieve a list of accounts you have access to, use the [List Accounts](https://api.cloudflare.com/#accounts-list-accounts) operation. Note the IDs of the accounts you want to manage.

To retrieve a list of zones you have access to, use the [List Zones](https://api.cloudflare.com/#zone-list-zones) operation. Note the IDs of the zones you want to manage.

</Aside>

The Cloudflare Rulesets API supports the operations outlined below. Visit the associated links for examples.

## List and view rulesets

<table>
  <thead>
    <tr>
      <th>Operation</th>
      <th>Method</th>
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
        <p>Returns a list of all the rules in a Managed Ruleset with a specific tag.</p>
      </td>
    </tr>
  </tbody>
</table>

## Create rulesets

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
      <td><a href="/cf-rulesets/rulesets-api/create">Create ruleset</a></td>
      <td><code>POST</code></td>
      <td>
        <p>Creates a new ruleset.</p>
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
      <td><a href="/cf-rulesets/rulesets-api/update">Update or deploy a ruleset</a></td>
      <td><code>PUT</code></td>
      <td>
        <p>Updates the basic properties of a ruleset and the list of rules in the ruleset.<br/>Allows you to deploy Managed Rulesets.</p>
      </td>
    </tr>
    <tr>
      <td><a href="/cf-rulesets/rulesets-api/update-rule">Update a rule in a ruleset</a></td>
      <td><code>PATCH</code></td>
      <td>
        <p>Updates the definition of a single rule within a ruleset.<br/>Allows you to change the order of a rule in a ruleset.</p>
      </td>
    </tr>
  </tbody>
</table>
