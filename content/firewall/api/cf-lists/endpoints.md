---
title: Endpoints
pcx-content-type: reference
type: overview
weight: 496
layout: list
---

# Endpoints

{{<content-column>}}

To invoke a [Cloudflare Rules Lists API](https://api.cloudflare.com/#rules-lists-properties) operation, append the endpoint to the Cloudflare API base URL:

`https://api.cloudflare.com/client/v4/`

For authentication instructions, refer to [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For help with endpoints and pagination, refer to [Getting Started: Endpoints](https://api.cloudflare.com/#getting-started-endpoints).

{{<Aside type="warning" header="Important">}}

The Rules Lists API endpoints require a value for `<ACCOUNT_ID>`.

To retrieve a list of accounts to which you have access, use the [List Accounts](https://api.cloudflare.com/#accounts-list-accounts) operation and note the IDs of the accounts you want to manage.

{{</Aside>}}

The Cloudflare Rules Lists API supports the operations outlined below. Visit the associated links for examples.

{{</content-column>}}

## Manage lists

<table style="table-layout:fixed; width:100%;">
  <thead>
      <tr>
          <th style='width: 20%'>Operation</th>
          <th>Method & Endpoint</th>
          <th style='width: 30%'>Notes</th>
      </tr>
  </thead>
  <tbody>
      <tr>
        <td><a href='https://api.cloudflare.com/#rules-lists-create-list'>Create a List</a></td>
        <td><code class="InlineCode">POST accounts/{'<ACCOUNT_ID>'}/rules/lists</code></td>
        <td style='width:25%; word-wrap:break-word; white-space:normal'>Creates an empty list.</td>
      </tr>
      <tr>
        <td><a href='https://api.cloudflare.com/#rules-lists-list-lists'>List Lists</a></td>
        <td><code class="InlineCode">GET accounts/{'<ACCOUNT_ID>'}/rules/lists</code></td>
        <td style='width:25%; word-wrap:break-word; white-space:normal'>Fetch all lists for the account. (This request does not fetch the items in the lists.)</td>
      </tr>
      <tr>
        <td><a href='https://api.cloudflare.com/#rules-lists-get-list'>Get a List</a></td>
        <td><code class="InlineCode">GET accounts/{'<ACCOUNT_ID>'}/rules/lists/{'<LIST_ID>'}</code></td>
        <td style='width:25%; word-wrap:break-word; white-space:normal'>Fetches a list by its <code class="InlineCode">id</code>. (This request does not display the items in the list.)</td>
      </tr>
      <tr>
        <td><a href='https://api.cloudflare.com/#rules-lists-update-list'>Update a List</a></td>
        <td><code class="InlineCode">PUT accounts/{'<ACCOUNT_ID>'}/rules/lists/{'<LIST_ID>'}</code></td>
        <td style='width:25%; word-wrap:break-word; white-space:normal'>
            <p>Updates the <code class="InlineCode">description</code> of a list. You cannot edit the <code class="InlineCode">name</code> or <code class="InlineCode">kind</code>, and you cannot update items in a list.</p>
            <p>To update an item in a list, use the <a href='https://api.cloudflare.com/#rules-lists-replace-list-items'>Replace List Items</a> operation.</p>
        </td>
      </tr>
      <tr>
        <td><a href='https://api.cloudflare.com/#rules-lists-delete-list'>Delete a List</a></td>
        <td><code class="InlineCode">DELETE accounts/{'<ACCOUNT_ID>'}/rules/lists/{'<LIST_ID>'}</code></td>
        <td style='width:25%; word-wrap:break-word; white-space:normal'>Deletes the list, but only when no filters reference it. </td>
      </tr>
  </tbody>
</table>

## Manage items in a list

{{<content-column>}}

Nearly all the operations for managing items in a list are asynchronous. When you add or delete a large amount of items to or from a list, there may be a delay before the bulk operation is complete.

Asynchronous list operations return an `operation_id`, which you can use to monitor the status of an API operation. To monitor the status of an asynchronous operation, use the [Get Bulk Operation](https://api.cloudflare.com/#rules-lists-get-bulk-operation) endpoint and specify the ID of the operation you want to monitor.

When you make requests to a list while a bulk operation on that list is in progress, the requests are queued and processed in sequence (first in, first out). Requests for successful asynchronous operations return an `HTTP 201` status code.

{{</content-column>}}

<table style="table-layout:fixed; width:100%;">
  <thead>
      <tr>
          <th style="width: 20%">Operation</th>
          <th>Method & Endpoint</th>
          <th style='width: 30%'>Notes</th>
      </tr>
  </thead>
  <tbody>
      <tr>
        <td><a href='https://api.cloudflare.com/#rules-lists-list-list-items'>List Items</a></td>
          <td><code class="InlineCode">GET accounts/{'<ACCOUNT_ID>'}/rules/lists/{'<LIST_ID>'}/items</code></td>
          <td><p>Fetches all items in a list.</p>
              <p>Items are sorted in ascending order by IP address.</p>
              <p>CIDRs are sorted by IP address, then by the subnet mask.</p>
          </td>
      </tr>
      <tr>
        <td><a href='https://api.cloudflare.com/#rules-lists-get-list-item'>Get a List Item</a></td>
          <td><code class="InlineCode">GET accounts/{'<ACCOUNT_ID>'}/rules/lists/{'<LIST_ID>'}/items/{'<ITEM_ID>'}</code></td>
          <td><p>Fetches an item from a list by ID.</p>
          </td>
      </tr>
      <tr>
        <td><a href='https://api.cloudflare.com/#rules-lists-create-list-items'>Create List Items</a></td>
          <td><code class="InlineCode">POST accounts/{'<ACCOUNT_ID>'}/rules/lists/{'<LIST_ID>'}/items</code></td>
          <td>
            <p>Appends a new item or items to a list.</p>
            <p>Replaces entries that already exist in the list, does not delete any items.</p>
            <p>Overwrites the <code class="InlineCode">comment</code> of the original item.</p>
            <p>The response includes an <code class="InlineCode">operation_id</code>.</p>
          </td>
      </tr>
      <tr>
        <td><a href='https://api.cloudflare.com/#rules-lists-replace-list-items'>Replace List Items</a></td>
          <td><code class="InlineCode">PUT accounts/{'<ACCOUNT_ID>'}/rules/lists/{'<LIST_ID>'}/items</code></td>
          <td>
              <p>Deletes all current items in the list and replaces them with <code class="InlineCode">items</code>.</p>
              <p>When <code class="InlineCode">items</code> is empty, deletes <strong>all</strong> items in the list.</p>
              <p>The response includes an <code class="InlineCode">operation_id</code>.</p>
          </td>
      </tr>
      <tr>
        <td><a href='https://api.cloudflare.com/#rules-lists-delete-list-items'>Delete List Items</a></td>
          <td><code class="InlineCode">DELETE accounts/{'<ACCOUNT_ID>'}/rules/lists/{'<LIST_ID>'}/items</code></td>
          <td>
              <p>Deletes specified list items.</p>
              <p>The response includes an <code class="InlineCode">operation_id</code>.</p>
          </td>
      </tr>
  </tbody>
</table>
