---
_build:
  publishResources: false
  render: never
  list: never
---

## Create a list from a CSV file

Here is a [sample CSV file](/cloudflare-one/static/list-test.csv) of URLs that you can use for testing. When formatting the CSV:

- Each line should be a single entry.
- Trailing whitespaces are not allowed.
- CRLF (Windows) and LF (Unix) line endings are valid.

To upload the list to Zero Trust:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **My Team** > **Lists**.
2. Select **Upload CSV**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Drag and drop a file into the **CSV file** window, or select a file.
5. Select **Create**.

You can now use this list in the policy builder by choosing the _in list_ operator.

## Create a list manually

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **My Team** > **Lists**.
2. Select **Create manual list**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Enter your list element manually into the **Add entry** field and select **Add**.
5. Select **Save**.

{{</tab>}}

{{<tab label="api" no-code="true">}}

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/gateway/lists \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "description": "Private application IPs",
  "items": [{"value": "10.226.0.177/32"},{"value": "10.226.1.177/32"}],
  "name": "Corporate IP list",
  "type": "IP"
}'
```

{{</tab>}}
{{</tabs>}}

You can now use this list in the policy builder by choosing the _in list_ operator.