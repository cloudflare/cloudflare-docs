---
pcx_content_type: troubleshooting
title: Delete all DNS records
meta:
    description: Learn how to bulk delete DNS records in Cloudflare with a script so you can start from zero instead of using the quick scan results.
---

# Bulk delete all DNS records

When you connect your domain to Cloudflare, the [DNS records quick scan](/dns/zone-setups/reference/dns-quick-scan/) may automatically add several records to your zone.

If you realize most of them are not applicable and want to bulk delete DNS records, follow the steps below. This method assumes you are familiar with [API calls fundamentals](/fundamentals/api/).

1. Make sure you have [an API token](/fundamentals/api/get-started/create-token/) that allows you to edit DNS for your zone.
2. Get your [zone ID](/fundamentals/setup/find-account-and-zone-ids/).
3. Run the following script, replacing `<ZONE_ID>` and `<API_TOKEN>` with the values you got from the previous steps.

{{<Aside type="warning">}}
This script uses [jq](https://jqlang.github.io/jq/) to format `JSON` outputs for readability. Refer to [Make API calls](/fundamentals/api/how-to/make-api-calls/) for details.
{{</Aside>}}

```bash
zoneid=<ZONE_ID>
bearer=<API_TOKEN>
curl --silent "https://api.cloudflare.com/client/v4/zones/$zoneid/dns_records?per_page=50000" \
--header "Authorization: Bearer $bearer" \
| jq --raw-output '.result[].id' | while read id
do
  curl --silent --request DELETE "https://api.cloudflare.com/client/v4/zones/$zoneid/dns_records/$id" \
--header "Authorization: Bearer $bearer"
done
```