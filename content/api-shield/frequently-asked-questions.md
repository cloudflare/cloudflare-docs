---
pcx_content_type: faq
title: FAQs
weight: 7
layout: list
---
# Frequently Asked Questions

## Why are my API endpoints not found by API Discovery?

In most cases, this is due to the system not observing enough valid requests over a continuous period.

API Discovery only looks at requests that satisfy all of the following criteria:

1. Requests must send the session identifiers (**HTTP header** or **Cookie**) that have been configured for the zone.
2. Requests must return `2XX` response codes from the edge.
3. Requests must not come directly from Cloudflare Workers.
4. At least 500 requests are made to the discovered endpoint within a 10 day period.

Endpoints discovered using session identifiers will be labeled as such in the dashboard.

## How does Cloudflare calculate the recommended rate limit for my endpoint?

Cloudflare uses both the volume and frequency of traffic to guide your recommended rate. We calculate the recommended rate value throughout the day, and the new calculation may equal the existing recommendation due to similar traffic profiles existing on your API. When we recalculate, we look at requests that happened in the last 24 hours.

You can view the `P50`/`95`/`99` of your request count for more details under an endpoint’s expanded view.

## Will I be able to access an endpoint’s data after I delete it?

No. Cloudflare will stop tracking performance data when you delete an endpoint and its previous data will not be stored. This means that if you save this endpoint again, the metrics will start tracking from the point that you save it.

## Why do I still see my endpoint in Discovery after I’ve added it to Endpoint Management?

Your endpoints will continue to appear in Discovery after being added to Endpoint Management for the immediate future. In a future release, we plan to differentiate between endpoints that are in Discovery that have not yet been added to Endpoint Management.

## Why do I not receive threshold recommendations for my discovered API endpoints?

Thresholds can only be recommended for endpoints that receive sufficient levels of traffic that meet the following criteria: 

* Only requests with the same criteria as API Discovery are considered. 
* If traffic has been erratic or intermittent to this endpoint, the threshold might not show up. Cloudflare needs endpoints to receive sufficient valid traffic in any 24-hour period in the last 7 days or since the initial discovery of the endpoint to make statistically safe threshold suggestions.
* Cloudflare also requires at least 50 distinct sessions to have accessed the endpoint in any 24-hour period in the last 7 days or since the initial discovery of the endpoint.

If you do not receive threshold recommendations for a discovered endpoint, you will see one of the following error codes: 

* `404 response`: Cloudflare has not seen sufficient valid traffic for this zone to generate recommendations.

* `551 response`: Cloudflare has successfully generated recommendations at some point in the past, but we have not seen sufficient recent valid traffic to provide up-to-date recommendations.

## Does this work for JDCloud customers?

Not currently.

## What version of OpenAPI specification do you support?

The importing [(Schema Validation)](/api-shield/security/schema-validation/) and exporting [(API Discovery)](/api-shield/security/api-discovery/) of OpenAPI schemas from our product to customers is done using **OpenAPI v3.0**. Any specifications using patched versions (3.0.x) are compatible as well. 