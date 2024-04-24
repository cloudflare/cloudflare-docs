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

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async scheduled(event, env, ctx) {
    // Write code for updating your API
    switch (event.cron) {
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
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
interface Env {}
export default {
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    // Write code for updating your API
    switch (controller.cron) {
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
  },
};
```

{{</tab>}}
{{</tabs>}}

## Test Cron Triggers using Wrangler

The recommended way of testing Cron Triggers is using Wrangler.

Cron Triggers can be tested using Wrangler by passing in the `--test-scheduled` flag to [`wrangler dev`](/workers/wrangler/commands/#dev). This will expose a `/__scheduled` route which can be used to test using a HTTP request. To simulate different cron patterns, a `cron` query parameter can be passed in.

```sh
$ npx wrangler dev --test-scheduled

$ curl "http://localhost:8787/__scheduled?cron=*%2F3+*+*+*+*"
```
