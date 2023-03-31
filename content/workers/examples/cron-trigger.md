---
type: example
summary: Set a Cron Trigger for your Worker.
tags:
  - Middleware
pcx_content_type: configuration
title: Setting Cron Triggers
weight: 1001
layout: example
---

{{<tabs labels="js/esm | ts/esm">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async scheduled(controller, env, ctx) {
    console.log("cron processed");
  },
};
```

{{</tab>}}
{{<tab label="ts/esm">}}

```ts
const handler: ExportedHandler = {
  async scheduled(controller, env, ctx) {
    console.log("cron processed");
  },
};
export default handler;
```

{{</tab>}}
{{</tabs>}}

## Test Cron Triggers using Wrangler

The recommended way of testing Cron Triggers is using Wrangler.

Cron Triggers can be tested using Wrangler by passing in the `--test-scheduled` flag to [`wrangler dev`](/workers/wrangler/commands/#dev). This will expose a `/__scheduled` route which can be used to test using a HTTP request. To simulate different cron patterns, a `cron` query parameter can be passed in.

```sh
$ wrangler dev --test-scheduled

$ curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
```

## Setting Cron Triggers in Wrangler

If you are deploying with Wrangler, set the cron syntax (once per hour as shown below) by adding this to your `wrangler.toml` file:

```toml
name = "worker"

# ...

[triggers]
crons = ["0 * * * *"]
```

You also can set a different Cron Trigger for each environment in your `wrangler.toml`. You need to put the `[triggers]` table under your chosen environment. For example:

```toml
[env.dev.triggers]
crons = ["0 * * * *"]
```
