---
type: example
summary: Redirect a response based on the country code in the header of a visitor.
tags:
  - Originless
pcx_content_type: configuration
title: Country code redirect
weight: 1001
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
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
      return Response.redirect(url);
    } else {
      return fetch(request);
    }
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
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
      return Response.redirect(url);
    } else {
      return fetch(request);
    }
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}
