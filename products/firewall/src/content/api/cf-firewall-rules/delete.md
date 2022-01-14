---
title: DELETE examples
pcx-content-type: reference
order: 435
---

# DELETE examples

- [Delete multiple rules](#delete-multiple-rules)
- [Delete a single rule](#delete-a-single-rule)

## Delete multiple rules

```txt
DELETE zones/<ZONE_ID>/firewall/rules
```

### Request

```bash
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules?id=<RULE_ID>" \
  -H "X-Auth-Email: <EMAIL>" \
  -H "X-Auth-Key: <API_KEY>"
```

<Aside type='note' header='Note'>

`DELETE` does not delete any filter related to the Firewall Rule. To delete the filter, you must call the `/filters` API.

</Aside>

### Response

```json
{
  "result": [],
  "success": true,
  "errors": null,
  "messages": null
}
```

## Delete a single rule

```txt
DELETE zones/<ZONE_ID>/firewall/rules/<RULE_ID>
```

### Request

```bash
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules/<RULE_ID>" \
  -H "X-Auth-Email: <EMAIL>" \
  -H "X-Auth-Key: <API_KEY>"
```

### Response

```json
{
  "result": null,
  "success": true,
  "errors": null,
  "messages": null
}
```
