---
type: example
summary: Rewrite responses returned to Google AI. This is helpful for publishers who want to avoid Generative AI in search.
tags:
  - HTMLRewriter
  - AI
languages:
  - JavaScript
  - TypeScript
pcx_content_type: configuration
title: Rewrite responses to Google AI
weight: 1001
layout: example
---

{{<render file="_google-ai-preamble.md" productFolder="waf">}}

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class DivTransformer {
  element(element) {
    // Check if the div has the class 'hide-from-ai'
    if (element.hasAttribute('class')) {
      const className = element.getAttribute('class')
      if (className.includes('hide-from-ai')) {
        // Replace the text content of the div
        element.setInnerContent('Text redacted from AI crawler')
      }
    }
  }
}

async function handleRequest(request) {
  // Fetch the original response
  const response = await fetch(request)
  // Check if the response is HTML
  const contentType = response.headers.get('content-type') || ''
  const userAgent = request.headers.get("User-Agent") || "";
  if (contentType.includes('text/html') && userAgent.includes("Google-Extended")) {
    // Use HTMLRewriter to transform the response
    return new HTMLRewriter()
      .on('div', new DivTransformer())
      .transform(response)
  } else {
    // If the response is not HTML, return it unmodified
    return response
  }
}
```

{{</tab>}}
{{<tab label="ts">}}

```ts
addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});

class DivTransformer {
  element(element: Element) {
    // Check if the div has the class 'hide-from-ai'
    if (element.hasAttribute('class')) {
      const className = element.getAttribute('class');
      if (className && className.includes('hide-from-ai')) {
        // Replace the text content of the div
        element.setInnerContent('Text redacted from AI crawler');
      }
    }
  }
}

async function handleRequest(request: Request): Promise<Response> {
  // Fetch the original response
  const response = await fetch(request);
  // Check if the response is HTML
  const contentType = response.headers.get('content-type') || '';
  const userAgent = request.headers.get("User-Agent") || "";
  if (contentType.includes('text/html') && userAgent.includes("Google-Extended")) {
    // Use HTMLRewriter to transform the response
    return new HTMLRewriter()
      .on('div', new DivTransformer())
      .transform(response);
  } else {
    // If the response is not HTML, return it unmodified
    return response;
  }
} satisfies ExportedHandler;
```

{{</tab>}}
{{</tabs>}}