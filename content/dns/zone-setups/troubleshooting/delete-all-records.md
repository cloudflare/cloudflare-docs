---
pcx_content_type: troubleshooting
title: Delete all DNS records
meta:
    description: Learn how to delete all your DNS records in Cloudflare with a script so you can start from zero instead of using the quick scan results.
---

# Delete all DNS records

When you connect your domain to Cloudflare, the [DNS records quick scan](/dns/zone-setups/reference/dns-quick-scan/) may automatically add several records to your zone.

If you realize most of them are not applicable and want to delete all DNS records and start from zero, you can use the following script:

{{<Aside type="warning">}}
This method assumes you are familiar with [API calls fundamentals](/fundamentals/api/how-to/make-api-calls/).
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