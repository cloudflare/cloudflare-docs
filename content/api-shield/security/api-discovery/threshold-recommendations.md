---
pcx_content_type: FAQ
title: Threshold Recommendations
weight: 1
layout: list
---
# Threshold Recommendations FAQ

### Why are my API endpoints not found by API Discovery?

In most cases, this is due to the system not being able to observe enough valid requests continuously. 

API Discovery only looks at requests that satisfy all of the following criteria:

1. Requests must send the session identifiers (**HTTP header** or **Cookie**) that is configured for the zone.
2. Requests must return 2XX response codes from the edge.
3. Requests must come from eyeballs (i.e. Worker requests are ignored at this point).
4. At least 500 requests are made to the discovered endpoint within a 10 day period* (*This number could be subject to change*).

### Why do I not get threshold recommendations for my discovered API endpoints?

`404 response`: We have never seen sufficient valid traffic for this zone to generate recommendations.

`551 response`: We have successfully generated recommendations at some point in the past, but we have not seen sufficient *recent* valid traffic to provide up-to-date recommendations.

Thresholds are only guaranteed to be recommended for endpoints that receive sufficient valid traffic. 

* Only requests with the same criteria as API Discovery are considered. 
* If traffic has been erratic or intermittent to this endpoint, the threshold might not show up. Cloudflare needs endpoints to receive sufficient valid traffic in any 24-hour period in the last 7 days or since the initial discovery of the endpoint to make statistically safe threshold suggestions.
* Cloudflare also requires at least 50 distinct sessions to have accessed the endpoint in any 24-hour period in the last 7 days or since the initial discovery of the endpoint.

### Why do I get the error "API Threshold Recommendations Expired (Code: 551)"?

In most cases, this means that our systems have not seen any recent valid request data. This prevents the system from calculating threshold recommendations.

### Does this work for JDCloud customers?
Not currently.

### What version of OpenAPI specification do you support?
The importing and exporting of OpenAPI schemas from our product is done with **OpenAPI v3.0**. Any specifications using patched versions (3.0.x) are compatible as well.