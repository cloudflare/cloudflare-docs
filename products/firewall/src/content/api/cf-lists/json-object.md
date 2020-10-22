---
title: JSON object
order: 490
---

# JSON object

## Rules List object structure and properties

A fully populated rules list JSON object has the following structure:

```json
{
  "id": "2c0fc9fa937b11eaa1b71c4d701ab86e",
  "name": "allowed_ips",
  "description": "List of allowed IPs description.",
  "kind": "ip",
  "num_items": 10,
  "num_referencing_filters": 2,
  "created_on": "2020-01-01T08:00:00Z",
  "modified_on": "2020-01-10T14:00:00Z"
}
```

The rules list JSON object properties are defined as follows:

<TableWrap>
  <table style="width: 100%;">
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Value</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody style="vertical-align:top">
        <tr>
            <td><code class="InlineCode">id</code></td>
            <td>Unique ID of the list.</td>
            <td>String</td>
            <td>UUID 32 characters, read-only</td>
        </tr>
        <tr>
            <td><code class="InlineCode">name</code></td>
            <td>The name of the list.</td>
            <td>
                String
            </td>
            <td>
              <p>Required. Maximum length is 50 characters.</p>
              <p>Only alphanumeric characters and underscore (`_`) are valid.</p>
              <p>A valid name satisfies this regular expression: <code class="InlineCode">^[a-zA-Z0-9_]+$</code>.</p>
            </td>
        </tr>
        <tr>
            <td><code class="InlineCode">description</code></td>
            <td>Description of list.</td>
            <td>String</td>
            <td>Optional, 500-character limit</td>
        </tr>
        <tr>
            <td><code class="InlineCode">kind</code></td>
            <td>The type of data in the list.</td>
            <td>String</td>
            <td>Required, valid values: <code class="InlineCode">ip</code></td>
        </tr>
        <tr>
            <td><code class="InlineCode">num_items</code></td>
            <td>Number of items in the list</td>
            <td>Number</td>
            <td>Read-only</td>
        </tr>
        <tr>
            <td><code class="InlineCode">num_referencing_filters</code></td>
            <td>The number of filters that reference this List</td>
            <td>Number</td>
            <td>Read-only</td>
        </tr>
        <tr>
            <td><code class="InlineCode">created_on</code></td>
            <td>The RFC 3339 timestamp the list was created</td>
            <td>String</td>
            <td>Read-only</td>
        </tr>
        <tr>
            <td><code class="InlineCode">modified_on</code></td>
            <td>The RFC 3339 timestamp the list was last modified</td>
            <td>String</td>
            <td>Read-only</td>
        </tr>
    </tbody>
  </table>
</TableWrap>

## List item object structure and properties

A fully populated rules list item JSON object has the following structure:

```json
{
  "id": "7c5dae5552338874e5053f2534d2767a",
  "ip": "10.0.0.1/32",
  "comment": "CF DNS server",
  "created_on": "2014-01-01T05:20:00.12345Z",
  "modified_on": "2014-01-01T05:20:00.12345Z"
}
```

The JSON object properties for a rules list item are defined as follows:

<TableWrap>
  <table style="width: 100%;">
    <thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Value</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody style="vertical-align:top">
        <tr>
            <td><code class="InlineCode">id</code></td>
            <td>Cloudflare-generated list identifier</td>
            <td>String</td>
            <td>Read-only, 32-character <a href="https://tools.ietf.org/html/rfc4122">UUIDv4</a></td>
        </tr>
        <tr>
            <td><code class="InlineCode">ip</code></td>
            <td>IP address or CIDR range</td>
            <td>String</td>
            <td>
              <p>Required. All of the following can appear in the same list:
                <ul>
                    <li>IPv4 address</li>
                    <li>IPv6(up to /64) address</li>
                    <li>IPv4 ranges as /32 through /2 CIDRs</li>
                    <li>IPv6 ranges as /64 through /4 CIDRs</li>
                </ul>
              </p>
            </td>
        </tr>
        <tr>
            <td><code class="InlineCode">comment</code></td>
            <td>Description of list item.</td>
            <td>String</td>
            <td>Optional, 500-character limit</td>
        </tr>
        <tr>
            <td><code class="InlineCode">created_on</code></td>
            <td>The RFC 3339 timestamp the list was created.</td>
            <td>String</td>
            <td>Read only</td>
        </tr>
        <tr>
            <td><code class="InlineCode">modified_on</code></td>
            <td>The RFC 3339 timestamp the item was last modified.</td>
            <td>String</td>
            <td>Read only</td>
        </tr>
    </tbody>
  </table>
</TableWrap>

For a detailed specification, see the [Cloudflare Lists API](https://api.cloudflare.com/#rules-lists-properties) documentation.
