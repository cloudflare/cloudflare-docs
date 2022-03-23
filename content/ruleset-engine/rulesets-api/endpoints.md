---
title: Endpoints
pcx-content-type: reference
weight: 3
---

# Endpoints

For some operations, you can use specific endpoints provided by the Rulesets API for managing phase entry point rulesets. These endpoints include the phase name in the endpoint instead of the ruleset ID.

For example, instead of using the following endpoint:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">PUT /zones/&ltZONE_ID&gt/rulesets/&ltRULESET_ID&gt</span></div></span></span></span></code></pre>{{</raw>}}

You can use the following endpoint:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">PUT /zones/&ltZONE_ID&gt/rulesets/phases/&ltPHASE_NAME&gt/entrypoint</span></div></span></span></span></code></pre>{{</raw>}}

To invoke a Cloudflare Rulesets API operation, append the endpoint to the Cloudflare API base URL:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://api.cloudflare.com/client/v4</span></div></span></span></span></code></pre>{{</raw>}}

For authentication instructions, refer to [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://api.cloudflare.com/#getting-started-endpoints).

{{<Aside>}}

The Rulesets API endpoints require a value for `<ACCOUNT_ID>` or `<ZONE_ID>`.

To retrieve a list of accounts you have access to, use the [List Accounts](https://api.cloudflare.com/#accounts-list-accounts) operation. Note the IDs of the accounts you want to manage.

To retrieve a list of zones you have access to, use the [List Zones](https://api.cloudflare.com/#zone-list-zones) operation. Note the IDs of the zones you want to manage.

{{</Aside>}}

The Cloudflare Rulesets API supports the operations outlined below. Visit the associated links for API endpoints and examples.

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
      <td>
        <a href="/ruleset-engine/rulesets-api/view/#list-existing-rulesets">List existing rulesets</a>
      </td>
      <td>
        <code>GET</code>
      </td>
      <td>
        <p>Returns the list of existing rulesets at the account level or at the zone level.</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/ruleset-engine/rulesets-api/view/#view-a-specific-ruleset">View a specific ruleset</a>
      </td>
      <td>
        <code>GET</code>
      </td>
      <td>
        <p>Returns the properties of the most recent version of a specific ruleset.</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/ruleset-engine/rulesets-api/view/#list-all-versions-of-a-ruleset">
          List all versions of a ruleset
        </a>
      </td>
      <td>
        <code>GET</code>
      </td>
      <td>
        <p>Returns a list of all the versions of a ruleset.</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/ruleset-engine/rulesets-api/view/#view-a-specific-version-of-a-ruleset">
          View a specific version of a ruleset
        </a>
      </td>
      <td>
        <code>GET</code>
      </td>
      <td>
        <p>Returns the configuration of a specific version of a ruleset, including its rules.</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/ruleset-engine/rulesets-api/view/#list-rules-in-a-managed-ruleset-with-a-specific-tag">
          List rules in a Managed Ruleset with a specific tag
        </a>
      </td>
      <td>
        <code>GET</code>
      </td>
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
      <td>
        <a href="/ruleset-engine/rulesets-api/create/">Create ruleset</a>
      </td>
      <td>
        <code>POST</code>
      </td>
      <td>
        <p>Creates a new ruleset or a new phase entry point.</p>
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
      <td>
        <a href="/ruleset-engine/rulesets-api/update/">Update or deploy a ruleset</a>
      </td>
      <td>
        <code>PUT</code>
      </td>
      <td>
        <p>
          Updates the basic properties of a ruleset and the list of rules in the ruleset.
          <br />
          Allows you to configure the execution of Managed Rulesets.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/ruleset-engine/rulesets-api/add-rule/">Add rule to ruleset</a>
      </td>
      <td>
        <code>POST</code>
      </td>
      <td>
        <p>
          Adds a single rule to an existing ruleset.
          <br />
          Allows you to add a single rule without having to include all the existing ruleset rules
          in the request.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/ruleset-engine/rulesets-api/update-rule/">Update a rule in a ruleset</a>
      </td>
      <td>
        <code>PATCH</code>
      </td>
      <td>
        <p>
          Updates the definition of a single rule within a ruleset.
          <br />
          Allows you to change the order of a rule in a ruleset.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/ruleset-engine/rulesets-api/delete-rule/">Delete a rule in a ruleset</a>
      </td>
      <td>
        <code>DELETE</code>
      </td>
      <td>
        <p>Deletes a single rule in a ruleset.</p>
      </td>
    </tr>
  </tbody>
</table>

## Delete rulesets

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
      <td>
        <a href="/ruleset-engine/rulesets-api/delete/#delete-ruleset">Delete ruleset</a>
      </td>
      <td>
        <code>DELETE</code>
      </td>
      <td>
        <p>Deletes all the versions of a ruleset.</p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/ruleset-engine/rulesets-api/delete/#delete-ruleset-version">Delete ruleset version</a>
      </td>
      <td>
        <code>DELETE</code>
      </td>
      <td>
        <p>Deletes a specific version of a ruleset.</p>
      </td>
    </tr>
  </tbody>
</table>
