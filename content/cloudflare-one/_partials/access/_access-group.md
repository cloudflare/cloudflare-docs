---
_build:
  publishResources: false
  render: never
  list: never
---

To create an Access group:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Access Groups**.
2. Select **Add a Group**.
3. Enter a name for the group (for example, `Lisbon-team`).
4. Specify as many rules as needed to define your user group. For example, the following rules define a team based in Lisbon, Portugal:

    | Rule type | Selector | Value |
    | ---- | -------- | -----------|
    | Include | Country | `Portugal` |
    | Require | Emails Ending In | `@team.com` |
5. Select **Save**.

{{</tab>}}

{{<tab label="api" no-code="true">}}

Send a `POST` request to the [`/access/groups`](/api/operations/access-groups-create-an-access-group) endpoint:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/access/groups \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "name": "Lisbon-team",
  "include": [
    {
      "geo": {
        "country_code": "PT"
      }
    }
  ],
  "exclude": [],
  "require": [
    {
      "email_domain": {
        "domain": "team.com"
      }
    }
  ],
  "is_default": false
}'
```

{{</tab>}}
{{</tabs>}}

You can now select this group in the Access policy builder.