---
pcx_content_type: FAQ
title: Threshold Recommendations
weight: 1
layout: list
---
# Threshold Recommendations FAQ

### Why are my API endpoints not found by API Discovery?

In most cases, this is due to the system not observing enough valid requests over a continuous period.

API Discovery only looks at requests that satisfy all of the following criteria:

1. Requests must send the session identifier or identifiers (**HTTP header** or **Cookie**) that have been configured for the zone.
2. Requests must return 2XX response codes from the edge.
3. Requests must come from humans (i.e. Worker requests are ignored at this point).
4. At least 500 requests are made to the discovered endpoint within a 10 day period.

### Why do I not receive threshold recommendations for my discovered API endpoints?

Thresholds can only be recommended for endpoints that receive sufficient levels of traffic that meet the following criteria: 

* Only requests with the same criteria as API Discovery are considered. 
* If traffic has been erratic or intermittent to this endpoint, the threshold might not show up. Cloudflare needs endpoints to receive sufficient valid traffic in any 24-hour period in the last 7 days or since the initial discovery of the endpoint to make statistically safe threshold suggestions.
* Cloudflare also requires at least 50 distinct sessions to have accessed the endpoint in any 24-hour period in the last 7 days or since the initial discovery of the endpoint.

If you don't receive threshold recommendations for a discovered endpoint, you will see one of the following error codes: 

**`404 response`**: We have not seen sufficient valid traffic for this zone to generate recommendations.

**`551 response`**: We have successfully generated recommendations at some point in the past, but we have not seen sufficient *recent* valid traffic to provide up-to-date recommendations.

### Does this work for JDCloud customers?
Not currently.

### What version of OpenAPI specification do you support?
The importing [(Schema Validation)](/api-shield/security/schema-validation/) and exporting [(API Discovery)](/api-shield/security/api-discovery/) of OpenAPI schemas from our product to customers is done using **OpenAPI v3.0**. Any specifications using patched versions (3.0.x) are compatible as well. 