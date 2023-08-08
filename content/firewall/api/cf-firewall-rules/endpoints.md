---
pcx_content_type: reference
title: Endpoints
weight: 2
layout: list
---

# Endpoints

{{<content-column>}}

To invoke a Cloudflare Firewall Rules API operation, append the endpoint to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4/
```

For authentication instructions, refer to [Getting Started: Requests](/fundamentals/api/) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](/fundamentals/api/).

{{<Aside type="note">}}

The Firewall Rules API endpoints require a value for `<ZONE_ID>`.

To retrieve a list of zones associated with your account, use the [List Zones](/api/operations/zones-get) operation and note the zone ID associated with the domain whose firewall rules you want to manage.

{{</Aside>}}

The Cloudflare Firewall Rules API supports the operations outlined below. Visit the pages in this section for examples.

{{</content-column>}}

<table style="table-layout:fixed; width:100%">
  <thead>
    <tr>
      <th style="width: 20%">Operation</th>
      <th>Method & Endpoint</th>
      <th style="width: 30%">Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="/api/operations/firewall-rules-create-firewall-rules">
          Create firewall rules
        </a>
      </td>
      <td>
        <code class="InlineCode">POST&nbsp;zones/&lt;ZONE_ID&gt;/firewall/rules</code>
      </td>
      <td>Handled as a single transaction. If there is an error, the entire operation fails.</td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/firewall-rules-list-firewall-rules">
          List firewall rules
        </a>
      </td>
      <td>
        <code class="InlineCode">GET&nbsp;zones/&lt;ZONE_ID&gt;/firewall/rules</code>
      </td>
      <td>
        Lists all current firewall rules. Results return paginated with 25 items per page by default. Use optional parameters to narrow results.
      </td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/firewall-rules-get-a-firewall-rule">
          Get a firewall rule
        </a>
      </td>
      <td>
        <code class="InlineCode">
          GET&nbsp;zones/&lt;ZONE_ID&gt;/firewall/rules/&lt;RULE_ID&gt;
        </code>
      </td>
      <td>Retrieve a single firewall rule by ID.</td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/firewall-rules-update-firewall-rules">
          Update firewall rules
        </a>
      </td>
      <td>
        <code class="InlineCode">PUT&nbsp;zones/&lt;ZONE_ID&gt;/firewall/rules</code>
      </td>
      <td>
        Handled as a single transaction. All rules must exist for operation to succeed. If there is
        an error, the entire operation fails.
      </td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/firewall-rules-update-a-firewall-rule">
          Update a firewall rule
        </a>
      </td>
      <td>
        <code class="InlineCode">
          PUT&nbsp;zones/&lt;ZONE_ID&gt;/firewall/rules/&lt;RULE_ID&gt;
        </code>
      </td>
      <td>Update a single firewall rule by ID.</td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/firewall-rules-delete-firewall-rules">
          Delete firewall rules
        </a>
      </td>
      <td>
        <code class="InlineCode">DELETE&nbsp;zones/&lt;ZONE_ID&gt;/firewall/rules</code>
      </td>
      <td>
        <p>Delete existing firewall rules. Must specify list of firewall rule IDs.</p>
        <p>
          Empty requests result in no deletion. Returns HTTP status code 200 if a specified rule
          does not exist.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        <a href="/api/operations/firewall-rules-delete-a-firewall-rule">
          Delete a firewall rule
        </a>
      </td>
      <td>
        <code class="InlineCode">
          DELETE&nbsp;zones/&lt;ZONE_ID&gt;/firewall/rules/&lt;RULE_ID&gt;
        </code>
      </td>
      <td>
        <p>Delete a firewall rule by ID.</p>
      </td>
    </tr>
  </tbody>
</table>
