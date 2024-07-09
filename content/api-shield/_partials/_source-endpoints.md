---
_build:
  publishResources: false
  render: never
  list: never
---

You must add Source Endpoints to Endpoint Management through established methods, including [uploading a schema](/api-shield/security/schema-validation/#add-validation-by-uploading-a-schema), via [API Discovery](/api-shield/security/api-discovery/), or by [adding manually](/api-shield/management-and-monitoring/#add-endpoints-manually), before creating a route.

To create a route, you will need the operation ID of the Source Endpoint. To find the operation ID in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Filter the endpoints to find your **Source Endpoint**.
4. Expand the row for your Source Endpoint and note the **operation ID** field.
5. Select the copy icon to copy the operation ID to your clipboard.