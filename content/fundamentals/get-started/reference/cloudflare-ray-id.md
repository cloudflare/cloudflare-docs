---
pcx_content_type: reference
title: Cloudflare Ray ID
---

# Cloudflare Ray ID

A **Cloudflare Ray ID** is an identifier given to every request that goes through Cloudflare.

Ray IDs are particularly useful when evaluating Security Events for patterns or false positives or more generally understanding your application traffic.

{{<Aside type="warning">}}
Ray IDs are not guaranteed to be unique for every request. In some situations, different requests may have the same Ray ID.
{{</Aside>}}

## Look up Ray IDs

### Security events

All customers can view Ray IDs and associated information — IP address, user agent, ASN, etc. — by looking through the [Activity Log](/waf/security-events/) in Security Events.

![Example list of events in the Activity log, with one of the events expanded to show its details](/images/waf/events-activity-log.png)

Additionally, you can [add filters](/waf/security-events/paid-plans/#adjusting-displayed-data) to look for specific Ray IDs.

![Example of adding a new filter in Security Events for the Allow action](/images/waf/events-add-filter-free.png)

Please note that Security Events may use sampled data to improve performance. If sampled data is applied to your search, you might not see all events, and filters might not return the expected results. To display more events, select a smaller timeframe.

### Logs

Enterprise customers can enable Ray ID as a field in their [Cloudflare Logs](/logs/).

### Server logs

For more details about sending Ray IDs to your server logs, refer to the [CF-Ray](/fundamentals/get-started/reference/http-request-headers/#cf-ray) header.
