---
pcx_content_type: reference
title: Cloudflare Ray ID
---

# Cloudflare Ray ID

A **Cloudflare Ray ID** is a unique identifier given to every request that goes through Cloudflare.

Ray IDs are particularly useful when evaluating Firewall Events for patterns or false positives or more generally understanding your application traffic.

## Look up Ray IDs

### Firewall events

All customers can view Ray IDs and associated information — IP address, user agent, ASN, etc. — by looking through the [Activity Log](/waf/analytics/) of their Firewall Analytics.

![Example list of events in the Activity log, with one of the events expanded to show its details](/waf/static/analytics-activity-log.png)

Additionally, you can [add filters](/waf/analytics/paid-plans/#adjusting-displayed-data) to look for specific Ray IDs.

![Example of adding a new filter in Firewall Analytics for the Allow action](/waf/static/analytics-add-filter-free.png)

### Logs

Enterprise customers can enable Ray ID as a field in their [Cloudflare Logs](/logs/).

### Server logs

For more details about sending Ray IDs to your server logs, refer to [the `CF-Ray` header](/fundamentals/get-started/reference/http-request-headers/#cf-ray).