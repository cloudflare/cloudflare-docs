---
_build:
  publishResources: false
  render: never
  list: never
---

For example, if Worker B implements the public method `add(a, b)`:

```toml
---
filename: wrangler.toml
---
name = "worker_b"
main = "./src/workerB.js"
```

```js
---
filename: src/workerB.js
---
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
  async fetch() { return new Response("Hello from Worker B"); }
  
  add(a, b) { return a + b; } 
}
```

Worker A can declare a [binding](/workers/runtime-apis/bindings) to Worker B:

```toml
---
filename: wrangler.toml
---
name = "worker_a"
main = "./src/workerA.js"
services = [
  { binding = "WORKER_B", service = "worker_b" }
]
```

Making it possible for Worker A to call the `add()` method from Worker B:

```js
---
filename: src/workerA.js
---
export default {
  async fetch(request, env) {
    const result = await env.WORKER_B.add(1, 2);
    return new Response(result);
  }
}
```