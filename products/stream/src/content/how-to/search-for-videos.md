---
title: Search for videos
pcx-content-type: how-to
---

# Search for videos

You can search for videos by name with the Stream API by adding a `search` query parameter to the endpoint listed below.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-videos-list-videos">List videos</a>
   </td>
   <td><Code>GET</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream?search=puppy" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json"
```
