---
title: DELETE examples
pcx-content-type: reference
order: 435
---

# DELETE examples

- [Delete multiple rules](#delete-multiple-rules)
- [Delete a single rule](#delete-a-single-rule)

<Aside type='note' header='Note'>

`DELETE` does not delete any filter related to the Firewall Rule. To delete the filter, use the [Filters API](/api/cf-filters/delete).

</Aside>

## Delete multiple rules

```txt
DELETE zones/<ZONE_ID>/firewall/rules
```

```bash
---
header: Request
---
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules?id=<RULE_ID>" \
  -H "X-Auth-Email: <EMAIL>" \
  -H "X-Auth-Key: <API_KEY>"
```

```json
---
header: Response
---
{
  "result": [],
  "success": true,
  "errors": null,
  "messages": null
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
  "result": null,
  "success": true,
  "errors": null,
  "messages": null
}
```
