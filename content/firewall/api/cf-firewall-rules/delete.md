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

This example deletes firewall rules with IDs `{rule_id_1}` and `{rule_id_2}`.

```bash
---
header: Request
---
curl --request DELETE \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules?id={rule_id_1}&id={rule_id_2}" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
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

This example deletes the rule with ID `{rule_id}`.

```bash
---
header: Request
---
curl --request DELETE \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules/{rule_id}" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
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
