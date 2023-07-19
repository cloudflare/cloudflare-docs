---
pcx_content_type: reference
title: Delete variants
weight: 6
---

# Delete variants

You can delete variants via the Images dashboard or API. The only variant you cannot delete is `public`.

{{<Aside type="warning" header="Warning">}}

Deleting a variant is a global action that will affect other images that contain that variant.

{{</Aside>}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Images** > **Variants**.
3. Find the variant you want to remove and select **Delete**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

For detailed information on using the API, refer to the [API endpoint](/api/operations/cloudflare-images-variants-delete-a-variant) documentation.

The following example deletes a variant through an API call:

```bash
curl -X DELETE https://api.cloudflare.com/client/v4/account/<ACCOUNT_ID>/images/v1/variants/<VARIANT_NAME> \
--header 'Authorization: Bearer <API_TOKEN>'
```

You will receive a response similar to this:

```json
{
  "result": {},
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</tab>}}
{{</tabs>}}