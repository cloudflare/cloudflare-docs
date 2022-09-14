---
type: example
summary: Set multiple Cron Triggers on three different schedules.
tags:
  - Middleware
pcx_content_type: configuration
title: Multiple Cron Triggers
weight: 1001
layout: example
---

```js
addEventListener("scheduled", (event) => {
  event.waitUntil(triggerEvent(event));
});

async function triggerEvent(event) {
  // Write code for updating your API
  switch (event.cron) {
    // You can set up to three schedules maximum.
    case "*/3 * * * *":
      // Every three minutes
      await updateAPI();
      break;
    case "*/10 * * * *":
      // Every ten minutes
      await updateAPI2();
      break;
    case "*/45 * * * *":
      // Every forty-five minutes
      await updateAPI3();
      break;
  }
  console.log("cron processed");
}
```

## Testing Cron Triggers using Wrangler

The recommended way of testing Cron Triggers is using `Wrangler`.

Cron triggers can be tested using Wrangler by passing in the `--test-scheduled` flag to `wrangler dev`. This will expose a `/__scheduled` route which can be used to test using a http request. To simulate different cron patterns, a `cron` query parameter can be passed in.

```sh
$ wrangler dev --test-scheduled

$ curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
```
