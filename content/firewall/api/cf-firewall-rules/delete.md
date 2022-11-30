---
title: DELETE examples
pcx_content_type: reference
weight: 6
---

# DELETE examples

{{<Aside type="note" header="Note">}}

The `DELETE` operation does not delete any filter related to the firewall rule. To delete the filter, use the [Filters API](/firewall/api/cf-filters/).

{{</Aside>}}

## Delete multiple rules

This example deletes firewall rules with IDs `<RULE_ID_1>` and `<RULE_ID_2>`.

```bash
---
header: Request
---
curl -X DELETE \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules?id=<RULE_ID_1>&id=<RULE_ID_2>" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>"
```

```json
---
header: Response
---
{
  "result": [
    {
      "id": "<RULE_ID_1>"
    },
    {
      "id": "<RULE_ID_2>"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Delete a single rule

This example deletes the rule with ID `<RULE_ID>`.

```bash
---
header: Request
---
curl -X DELETE \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules/<RULE_ID>" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>"
```

```json
---
header: Response
---
{
  "result": [
    {
      "id": "<RULE_ID>"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```
