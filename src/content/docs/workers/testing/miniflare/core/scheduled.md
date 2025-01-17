---
order: 1
title: "⏰ Scheduled Events"
---

- [`ScheduledEvent` Reference](/workers/runtime-apis/handlers/scheduled/)

## Cron Triggers

`scheduled` events are automatically dispatched according to the specified cron
triggers:

```js
const mf = new Miniflare({
	crons: ["15 * * * *", "45 * * * *"],
});
```

## HTTP Triggers

Because waiting for cron triggers is annoying, you can also make HTTP requests
to `/cdn-cgi/mf/scheduled` to trigger `scheduled` events:

```sh
$ curl "http://localhost:8787/cdn-cgi/mf/scheduled"
```

To simulate different values of `scheduledTime` and `cron` in the dispatched
event, use the `time` and `cron` query parameters:

```sh
$ curl "http://localhost:8787/cdn-cgi/mf/scheduled?time=1000"
$ curl "http://localhost:8787/cdn-cgi/mf/scheduled?cron=*+*+*+*+*"
```

## Dispatching Events

When using the API, the `getWorker` function can be used to dispatch
`scheduled` events to your Worker. This can be used for testing responses. It
takes optional `scheduledTime` and `cron` parameters, which default to the
current time and the empty string respectively. It will return a promise which
resolves to an array containing data returned by all waited promises:

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	script: `
  export default {
    async scheduled(controller, env, ctx) {
      const lastScheduledController = controller;
      if (controller.cron === "* * * * *") controller.noRetry();
    }
  }
  `,
});

const worker = await mf.getWorker();

let scheduledResult = await worker.scheduled({
	cron: "* * * * *",
});
console.log(scheduledResult); // { outcome: 'ok', noRetry: true }

scheduledResult = await worker.scheduled({
	scheduledTime: new Date(1000),
	cron: "30 * * * *",
});

console.log(scheduledResult); // { outcome: 'ok', noRetry: false }
```
