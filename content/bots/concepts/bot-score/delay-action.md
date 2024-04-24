---
pcx_content_type: how-to
title: Delay action
---

# Delay action

Customers with a Bot Management and a [Workers](/workers/) subscription can use the template below to introduce a delay to requests that are likely from bots. 

The template sets a minimum and maximum delay, and delays requests where the bot score is less than 30 and the URI path starts with `/exampleURI`.

```js
---
header: Workers template
---

// Configurable Variables
const PATH_START = '/exampleURI';
const DELAY_FROM = 5; // in seconds
const DELAY_TO = 10; // in seconds

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let url = new URL(request.url);
  let botScore = request.cf.botManagement.score

  
  if (url.pathname.startsWith(PATH_START) && botScore < 30) { 
    // Random delay between DELAY_FROM and DELAY_TO seconds
    const delay = Math.floor(Math.random() * (DELAY_TO - DELAY_FROM + 1)) + DELAY_FROM;
    await new Promise(resolve => setTimeout(resolve, delay * 1000));

    // Fetch the original request
    return fetch(request);
  }
  else {
    // Fetch the original request without delay
    return fetch(request);
  }
}
```