---
title: Query Parameters and Cached Responses
order: 15
---

# Query parameters and cached responses

Query parameters often signal the presence of dynamic content. As a result, if query parameters are found in the URL, APO bypasses the cache and attempts to get a new version of the page from the origin by default. Because query parameters are also often used for marketing attribution, like UTMs, quick loading times are especially important for users. 

APO serves cached content as long as the query parameters in the URL are one of the following: 

- `utm_source`
- `utm_campaign`
- `utm_medium`
- `utm_expid`
- `utm_term`
- `utm_content`
- `fb_action_ids`
- `fb_action_types`
- `fb_source`
- `fbclid`
- `_ga`
- `gclid`
- `age-verified`
- `ao_noptimize`
- `usqp`
- `cn-reloaded`
- `klaviyo`
- `amp`

To add a query parameter to our allow list, [create a post in the community](https://community.cloudflare.com/) for consideration.