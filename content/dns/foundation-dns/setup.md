---
pcx_content_type: how-to
title: Setup
weight: 3
---

# Set up advanced nameservers

Advanced nameservers included with [Foundation DNS](/dns/foundation-dns/) are an opt-in configuration.

Having advanced namservers configured is a requirement for you to have access to the new [GraphQL DNS analytics](/dns/foundation-dns/graphql-analytics/).

## Enable on a zone

To enable advanced nameservers on an existing zone:

1. Opt for advanced nameservers on your zone:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **DNS** > **Records**.
3. In the **Cloudflare nameservers** card, enable **Advanced nameservers**.
4. After you refresh the page, the card will display the values for your advanced nameservers `NS` records.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Use the [Update DNS Settings](/api/operations/dns-settings-for-a-zone-update-dns-settings) endpoint to send a PATCH request like the following:

```bash
curl --request PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_settings' \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "foundation_dns": true
}'
```

The response body will contain your assigned namservers in the `nameservers` object. You will use these nameservers in the next step.

{{</tab>}}
{{</tabs>}}

2. Update the authoritative nameservers at your registrar. This step depends on whether you are using [Cloudflare Registrar](/registrar/):
    - If you are using Cloudflare Registrar, [contact Cloudflare Support](/support/contacting-cloudflare-support/) to have your nameservers updated.
    - If you are using a different registrar or if your zone is delegated to a parent zone, [manually update your nameservers](/dns/nameservers/update-nameservers/#specific-processes).

{{<Aside type="warning">}}
Make sure the values for your assigned nameservers are copied exactly.
{{</Aside>}}