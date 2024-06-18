---
type: example
summary: Redirect a response based on the country code in the header of a visitor.
tags:
  - Redirects
  - Geolocation
languages:
  - JavaScript
  - TypeScript
  - Python
preview:
  - true
pcx_content_type: example
title: Country code redirect
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
---
playground: true
---
export default {
  async fetch(request) {
    /**
     * A map of the URLs to redirect to
     * @param {Object} countryMap
     */
    const countryMap = {
      US: "https://example.com/us",
      EU: "https://example.com/eu",
    };

    // Use the cf object to obtain the country of the request
    // more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
    const country = request.cf.country;

    if (country != null && country in countryMap) {
      const url = countryMap[country];
      // Remove this logging statement from your final output.
      console.log(`Based on ${country}-based request, your user would go to ${url}.` )
      return Response.redirect(url);
    } else {
      return fetch("https://example.com", request);
    }
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    /**
     * A map of the URLs to redirect to
     * @param {Object} countryMap
     */
    const countryMap = {
      US: "https://example.com/us",
      EU: "https://example.com/eu",
    };

    // Use the cf object to obtain the country of the request
    // more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
    const country = request.cf.country;

    if (country != null && country in countryMap) {
      const url = countryMap[country];
      return Response.redirect(url);
    } else {
      return fetch(request);
    }
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, fetch

async def on_fetch(request):
    countries = {
        "US": "https://example.com/us",
        "EU": "https://example.com/eu",
    }

    # Use the cf object to obtain the country of the request
    # more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
    country = request.cf.country

    if country and country in countries:
        url = countries[country]
        return Response.redirect(url)

    return fetch("https://example.com", request)
```

{{</tab>}}
{{</tabs>}}
