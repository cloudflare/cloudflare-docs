---
pcx_content_type: configuration
title: process
---

# process

{{<render file="_nodejs-compat-howto.md">}}

The [`process`](https://nodejs.org/dist/latest-v19.x/docs/api/process.html) module in Node.js provides a number of useful APIs related to the current process. Within a serverless environment like Workers, most of these APIs are not relevant or meaningful, but some are useful for cross-runtime compatibility. Within Workers, the following APIs are available:

```js
import {
  env,
  nextTick,
} from 'node:process';

env['FOO'] = 'bar';
console.log(env['FOO']); // Prints: bar

nextTick(() => {
  console.log('next tick');
});
```

## `process.env`

In the Node.js implementation of `process.env`, the `env` object is a copy of the environment variables at the time the process was started. In the Workers implementation, there is no process-level environment, so `env` is an empty object. You can still set and get values from `env`, and those will be globally persistent for all Workers running in the same isolate and context (for example, the same Workers entry point).

### Relationship to per-request `env` argument in `fetch()` handlers

Workers do have a concept of [environment variables](/workers/configuration/environment-variables/) that are applied on a per-Worker and per-request basis. These are not accessible automatically via the `process.env` API. It is possible to manually copy these values into `process.env` if you need to. Be aware, however, that setting any value on `process.env` will coerce that value into a string.

```js
import * as process from 'node:process';

export default {
  fetch(req, env) {
    // Set process.env.FOO to the value of env.FOO if process.env.FOO is not already set
    // and env.FOO is a string.
    process.env.FOO ??= (() => {
      if (typeof env.FOO === 'string') {
        return env.FOO;
      }
    })();
  }
};
```

It is strongly recommended that you *do not* replace the entire `process.env` object with the request `env` object. Doing so will cause you to lose any environment variables that were set previously and will cause unexpected behavior for other Workers running in the same isolate. Specifically, it would cause inconsistency with the `process.env` object when accessed via named imports.

```js
import * as process from 'node:process';
import { env } from 'node:process';

process.env === env; // true! they are the same object
process.env = {}; // replace the object! Do not do this!
process.env === env; // false! they are no longer the same object

// From this point forward, any changes to process.env will not be reflected in env,
// and vice versa!
```

## `process.nextTick()`

The Workers implementation of `process.nextTick()` is a wrapper for the standard Web Platform API [`queueMicrotask()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask).

Refer to the [Node.js documentation for `process`](https://nodejs.org/dist/latest-v19.x/docs/api/process.html) for more information.
