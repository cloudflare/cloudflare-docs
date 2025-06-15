---
order: 1
title: 📌 Durable Objects
---

- [Durable Objects Reference](/durable-objects/api/)
- [Using Durable Objects](/durable-objects/)

## Objects

Specify Durable Objects to add to your environment as follows:

```js
const mf = new Miniflare({
	modules: true,
	script: `
  export class Object1 {
    async fetch(request) {
      ...
    }
  }
  export default {
    fetch(request) {
      ...
    }
  }
  `,
	durableObjects: {
		// Note Object1 is exported from main (string) script
		OBJECT1: "Object1",
	},
});
```

## Persistence

By default, Durable Object data is stored in memory. It will persist between
reloads, but not different `Miniflare` instances. To enable persistence to the
file system, specify the Durable Object persistence option:

```js
const mf = new Miniflare({
	durableObjectsPersist: true, // Defaults to ./.mf/do
	durableObjectsPersist: "./data", // Custom path
});
```

## Manipulating Outside Workers

For testing, it can be useful to make requests to your Durable Objects from
outside a worker. You can do this with the `getDurableObjectNamespace` method.

```js {28,29,30,31,32}
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	durableObjects: { TEST_OBJECT: "TestObject" },
	script: `
  export class TestObject {
    constructor(state) {
      this.storage = state.storage;
    }

    async fetch(request) {
      const url = new URL(request.url);
      if (url.pathname === "/put") await this.storage.put("key", 1);
      return new Response((await this.storage.get("key")).toString());
    }
  }

  export default {
    async fetch(request, env) {
      const stub = env.TEST_OBJECT.get(env.TEST_OBJECT.idFromName("test"));
      return stub.fetch(request);
    }
  }
  `,
});

const ns = await mf.getDurableObjectNamespace("TEST_OBJECT");
const id = ns.idFromName("test");
const stub = ns.get(id);
const doRes = await stub.fetch("http://localhost:8787/put");
console.log(await doRes.text()); // "1"

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // "1"
```

## Using a Class Exported by Another Script

Miniflare supports the `script_name` option for accessing Durable Objects
exported by other scripts. This requires mounting the other worker as described
in [🔌 Multiple Workers](/workers/testing/miniflare/core/multiple-workers).
