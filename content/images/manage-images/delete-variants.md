---
pcx_content_type: how-to
title: Delete variants
weight: 13
---

# Delete variants

You can delete variants via the Images dashboard or API. The only variant you cannot delete is public.

{{<Aside type="warning">}}

Deleting a variant is a global action that will affect other images that contain that variant.

{{</Aside>}}

## Delete variants via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Images** > **Variants**.
3. Find the variant you want to remove and select **Delete**.

## Delete variants via the API

Make a `DELETE` request to the delete variant endpoint.

```bash
curl --request DELETE https://api.cloudflare.com/client/v4/account/{account_id}/images/v1/variants/{variant_name} \
--header "Authorization: Bearer <API_TOKEN>"
``````

After the variant has been deleted, the response returns `"success": true.`