---
title: Endpoints
pcx_content_type: reference
weight: 2
layout: wide
---

# Endpoints

{{<content-column>}}

To invoke a [Lists API](/api/operations/lists-get-lists) operation, append the endpoint to the Cloudflare API base URL:

`https://api.cloudflare.com/client/v4/`

For authentication instructions, refer to [Cloudflare's API: Getting Started](/fundamentals/api/get-started/).

For help with making API calls and paginating results, refer to [Make API calls](/fundamentals/api/how-to/make-api-calls/).

{{<Aside type="note">}}

The Lists API endpoints require a value for `{account_id}`.

To retrieve a list of accounts to which you have access, use the [List Accounts](/api/operations/accounts-list-accounts) operation and note the IDs of the accounts you want to manage.

{{</Aside>}}

The Lists API supports the operations outlined below. Visit the associated links for examples.

{{</content-column>}}

## Manage lists

<table style="table-layout:fixed; width:100%;">
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
        {{<markdown>}}[Create a list](/api/operations/lists-create-a-list){{</markdown>}}
      </td>
      <td>
        <code class="InlineCode">POST accounts/{account_id}/rules/lists</code>
      </td>
      <td style="width:25%; word-wrap:break-word; white-space:normal">Creates an empty list.</td>
    </tr>
    <tr>
      <td>
        {{<markdown>}}[Get lists](/api/operations/lists-get-lists){{</markdown>}}
      </td>
      <td>
        <code class="InlineCode">GET accounts/{account_id}/rules/lists</code>
      </td>
      <td style="width:25%; word-wrap:break-word; white-space:normal">
        Fetch all lists for the account. (This request does not fetch the items in the lists.)
      </td>
    </tr>
    <tr>
      <td>
        {{<markdown>}}[Get a list](/api/operations/lists-get-a-list){{</markdown>}}
      </td>
      <td>
        <code class="InlineCode">
          GET accounts/{account_id}/rules/lists/{list_id}
        </code>
      </td>
      <td style="width:25%; word-wrap:break-word; white-space:normal">
        Fetches a list by its ID. (This request does not display the
        items in the list.)
      </td>
    </tr>
    <tr>
      <td>
        {{<markdown>}}[Update a list](/api/operations/lists-update-a-list){{</markdown>}}
      </td>
      <td>
        <code class="InlineCode">
          PUT accounts/{account_id}/rules/lists/{list_id}
        </code>
      </td>
      <td style="width:25%; word-wrap:break-word; white-space:normal">
        <p>
          Updates the <code class="InlineCode">description</code> of a list. You cannot edit the <code class="InlineCode">name</code> or <code class="InlineCode">kind</code>, and you cannot update items in a list.
        </p>
        {{<markdown>}}To update an item in a list, use the [Update all list items](/api/operations/lists-update-all-list-items) operation.{{</markdown>}}
        </p>
      </td>
    </tr>
    <tr>
      <td>
        {{<markdown>}}[Delete a list](/api/operations/lists-delete-a-list){{</markdown>}}
      </td>
      <td>
        <code class="InlineCode">
          DELETE accounts/{account_id}/rules/lists/{list_id}
        </code>
      </td>
      <td style="width:25%; word-wrap:break-word; white-space:normal">
        Deletes the list, but only when no filters reference it.
      </td>
    </tr>
  </tbody>
</table>

## Manage items in a list

{{<content-column>}}

Nearly all the operations for managing items in a list are asynchronous. When you add or delete a large amount of items to or from a list, there may be a delay before the bulk operation is complete.

Asynchronous list operations return an `operation_id`, which you can use to monitor the status of an API operation. To monitor the status of an asynchronous operation, use the [Get bulk operation status](/api/operations/lists-get-bulk-operation-status) endpoint and specify the ID of the operation you want to monitor.

When you make requests to a list while a bulk operation on that list is in progress, the requests are queued and processed in sequence (first in, first out). Requests for successful asynchronous operations return an `HTTP 201` status code.

{{</content-column>}}

<table style="table-layout:fixed; width:100%;">
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
        {{<markdown>}}[Get list items](/api/operations/lists-get-list-items){{</markdown>}}
      </td>
      <td>
        <code class="InlineCode">
          GET accounts/{account_id}/rules/lists/{list_id}/items[?search={query}]
        </code>
      </td>
      <td>
        <p>Fetches items in a list (all items, by default).</p>
        <p>Items are sorted in ascending order.</p>
        <p>In the case of IP lists, CIDRs are sorted by IP address, then by the subnet mask.</p>
        <p>{{<markdown>}}To filter returned items, use the optional `search` query string parameter. For more information, refer to the [Get list items](/api/operations/lists-get-list-items) API operation.{{</markdown>}}
      </td>
    </tr>
    <tr>
      <td>
        {{<markdown>}}[Get a list item](/api/operations/lists-get-a-list-item){{</markdown>}}
      </td>
      <td>
        <code class="InlineCode">
          GET accounts/{account_id}/rules/lists/{list_id}/items/{item_id}
        </code>
      </td>
      <td>
        <p>Fetches an item from a list by ID.</p>
      </td>
    </tr>
    <tr>
      <td>
        {{<markdown>}}[Create list items](/api/operations/lists-create-list-items){{</markdown>}}
      </td>
      <td>
        <code class="InlineCode">
          POST accounts/{account_id}/rules/lists/{list_id}/items
        </code>
      </td>
      <td>
        <p>Appends a new item or items to a list.</p>
        <p>Replaces entries that already exist in the list, does not delete any items.</p>
        <p>
          Overwrites the <code class="InlineCode">comment</code> of the original item.
        </p>
        <p>
          The response includes an <code class="InlineCode">operation_id</code>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        {{<markdown>}}[Update all list items](/api/operations/lists-update-all-list-items){{</markdown>}}
      </td>
      <td>
        <code class="InlineCode">
          PUT accounts/{account_id}/rules/lists/{list_id}/items
        </code>
      </td>
      <td>
        <p>
          Deletes all current items in the list and replaces them with <code class="InlineCode">items</code>.
        </p>
        <p>
          When <code class="InlineCode">items</code> is empty, deletes <strong>all</strong> items in
          the list.
        </p>
        <p>
          The response includes an <code class="InlineCode">operation_id</code>.
        </p>
      </td>
    </tr>
    <tr>
      <td>
        {{<markdown>}}[Delete list items](/api/operations/lists-delete-list-items){{</markdown>}}
      </td>
      <td>
        <code class="InlineCode">
          DELETE accounts/{account_id}/rules/lists/{list_id}/items
        </code>
      </td>
      <td>
        <p>Deletes specified list items.</p>
        <p>
          The response includes an <code class="InlineCode">operation_id</code>.
        </p>
      </td>
    </tr>
  </tbody>
</table>
