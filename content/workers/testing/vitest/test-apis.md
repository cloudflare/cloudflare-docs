---
title: Test APIs
pcx_content_type: reference
weight: 5
---

# Test APIs

The Workers Vitest integration provides runtime helpers for writing tests in the `cloudflare:test` module. This module can only be imported from within test files run by the Workers Vitest integration.

## `cloudflare:test` module definition

{{<definitions>}}

- {{<code>}}env: {{<type>}}import("cloudflare:test").ProvidedEnv{{</type>}}{{</code>}}

  - 2nd argument passed to modules-format exported handlers. Contains bindings configured in top-level `miniflare` pool options. To configure the type of this value, use an ambient module type:

    <br>

    ```ts
    ---
    filename: env.d.ts
    ---
    declare module "cloudflare:test" {
      interface ProvidedEnv {
        NAMESPACE: KVNamespace;
      }
      // ...or if you have an existing `Env` type...
      interface ProvidedEnv extends Env {}
    }
    ```

- {{<code>}}SELF: {{<type>}}Fetcher{{</type>}}{{</code>}}

  - [Service binding](/workers/runtime-apis/service-bindings/) to the default export defined in the `main` Worker. Use this to write integration tests against your Worker. Note this `main` Worker runs in the same isolate/context as tests so any global mocks will apply to it too.

- {{<code>}}fetchMock: {{<type>}}import("undici").MockAgent{{</type>}}{{</code>}}

  - Declarative interface for mocking outbound `fetch()` requests. Deactivated by default and reset before running each test file. Refer to [`undici`'s `MockAgent` documentation](https://undici.nodejs.org/#/docs/api/MockAgent) for more information. Note this only mocks `fetch()` requests for the current test runner worker. Auxiliary workers should mock `fetch()`es using the Miniflare `fetchMock`/`outboundService` options.

    <br>

    ```ts
    ---
    filename: index.spec.js
    ---
    import { fetchMock } from "cloudflare:test";
    import { beforeAll, afterEach, it, expect } from "vitest";

    beforeAll(() => {
      // Enable outbound request mocking...
      fetchMock.activate();
      // ...and throw errors if an outbound request isn't mocked
      fetchMock.disableNetConnect();
    });
    // Ensure we matched every mock we defined
    afterEach(() => fetchMock.assertNoPendingInterceptors());

    it("mocks requests", async () => {
      // Mock the first request to `https://example.com`
      fetchMock
        .get("https://example.com")
        .intercept({ path: "/" })
        .reply(200, "body");

      const response = await fetch("https://example.com/");
      expect(await response.text()).toBe("body");
    });
    ```

{{</definitions>}}

### Events

{{<definitions>}}

- {{<code>}}createExecutionContext(): {{<type>}}ExecutionContext{{</type>}}{{</code>}}

  - Creates an instance of `ExecutionContext` for use as the 3rd argument to modules-format exported handlers.

- {{<code>}}waitOnExecutionContext(ctx:{{<param-type>}}ExecutionContext{{</param-type>}}): {{<type>}}Promise\<void>{{</type>}}{{</code>}}

  - Waits for all `ExecutionContext#waitUntil()`ed `Promise`s to settle. Only accepts instances of `ExecutionContext` returned by `createExecutionContext()`.

    <br>

    ```ts
    ---
    filename: index.spec.js
    ---
    import { env, createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
    import { it, expect } from "vitest";
    import worker from "./index.mjs";

    it("calls fetch handler", async () => {
      const request = new Request("https://example.com");
      const ctx = createExecutionContext();
      const response = await worker.fetch(request, env, ctx);
      await waitOnExecutionContext(ctx);
      expect(await response.text()).toMatchInlineSnapshot(...);
    });
    ```

- {{<code>}}createScheduledController(options?:{{<param-type>}}FetcherScheduledOptions{{</param-type>}}): {{<type>}}ScheduledController{{</type>}}{{</code>}}

  - Creates an instance of `ScheduledController` for use as the 1st argument to modules-format `scheduled()` exported handlers.

    <br>

    ```ts
    ---
    filename: index.spec.js
    ---
    import { env, createScheduledController, createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
    import { it, expect } from "vitest";
    import worker from "./index.mjs";

    it("calls scheduled handler", async () => {
      const ctrl = createScheduledController({
        scheduledTime: new Date(1000),
        cron: "30 * * * *"
      });
      const ctx = createExecutionContext();
      await worker.scheduled(ctrl, env, ctx);
      await waitOnExecutionContext(ctx);
    });
    ```

- {{<code>}}createMessageBatch(queueName:{{<param-type>}}string{{</param-type>}}, messages:{{<param-type>}}ServiceBindingQueueMessage[]{{</param-type>}}): {{<type>}}MessageBatch{{</type>}}{{</code>}}

  - Creates an instance of `MessageBatch` for use as the 1st argument to modules-format `queue()` exported handlers.

- {{<code>}}getQueueResult(batch:{{<param-type>}}MessageBatch{{</param-type>}}, ctx:{{<param-type>}}ExecutionContext{{</param-type>}}): {{<type>}}Promise\<FetcherQueueResult>{{</type>}}{{</code>}}

  - Gets the acknowledged/retry state of messages in the `MessageBatch`, and waits for all `ExecutionContext#waitUntil()`ed `Promise`s to settle. Only accepts instances of `MessageBatch` returned by `createMessageBatch()`, and instances of `ExecutionContext` returned by `createExecutionContext()`.

    <br>

    ```ts
    ---
    filename: index.spec.js
    ---
    import { env, createMessageBatch, createExecutionContext, getQueueResult } from "cloudflare:test";
    import { it, expect } from "vitest";
    import worker from "./index.mjs";

    it("calls queue handler", async () => {
      const batch = createMessageBatch("my-queue", [
        {
          id: "message-1",
          timestamp: new Date(1000),
          body: "body-1"
        }
      ]);
      const ctx = createExecutionContext();
      await worker.queue(batch, env, ctx);
      const result = await getQueueResult(batch, ctx);
      expect(result.retryAll).toBe(false);
      expect(result.ackAll).toBe(false);
      expect(result.explicitRetries).toStrictEqual([]);
      expect(result.explicitAcks).toStrictEqual(["message-1"]);
    });
    ```

{{</definitions>}}

### Durable Objects

{{<definitions>}}

- {{<code>}}runInDurableObject\<O extends DurableObject, R>(stub:{{<param-type>}}DurableObjectStub{{</param-type>}}, callback:{{<param-type>}}(instance: O, state: DurableObjectState) => R | Promise\<R>{{</param-type>}}): {{<type>}}Promise\<R>{{</type>}}{{</code>}}

  - Runs `callback` inside the Durable Object pointed-to by `stub`'s context. Conceptually, this temporarily replaces your Durable Object's `fetch()` handler with `callback`, then sends a request to it, returning the result. This can be used to call/spy-on Durable Object instance methods or seed/get persisted data. Note this can only be used with `stub`s pointing to Durable Objects defined in the `main` worker.

    <br>

    ```ts
    ---
    filename: index.ts
    ---
    export class Counter {
      constructor(readonly state: DurableObjectState) {}

      async fetch(request: Request): Promise<Response> {
        let count = (await this.state.storage.get<number>("count")) ?? 0;
        void this.state.storage.put("count", ++count);
        return new Response(count.toString());
    	}
    }
    ```

    ```ts
    ---
    filename: index.spec.ts
    ---
    import { env, runInDurableObject } from "cloudflare:test";
    import { it, expect } from "vitest";
    import { Counter } from "./index.ts";

    it("increments count", async () => {
      const id = env.COUNTER.newUniqueId();
      const stub = env.COUNTER.get(id);
      let response = await stub.fetch("https://example.com");
      expect(await response.text()).toBe("1");

      response = await runInDurableObject(stub, async (instance: Counter, state) => {
        expect(instance).toBeInstanceOf(Counter);
        expect(await state.storage.get<number>("count")).toBe(1);

        const request = new Request("https://example.com");
        return instance.fetch(request);
      });
      expect(await response.text()).toBe("2");
    });
    ```

- {{<code>}}runDurableObjectAlarm(stub:{{<param-type>}}DurableObjectStub{{</param-type>}}): {{<type>}}Promise\<boolean>{{</type>}}{{</code>}}

  - Immediately runs and removes the Durable Object pointed-to by `stub`'s alarm if one is scheduled. Returns `true` if an alarm ran, and `false` otherwise. Note this can only be used with `stub`s pointing to Durable Objects defined in the `main` worker.

- {{<code>}}listDurableObjectIds(namespace:{{<param-type>}}DurableObjectNamespace{{</param-type>}}): {{<type>}}Promise\<DurableObjectId[]>{{</type>}}{{</code>}}

  - Gets the IDs of all objects that have been created in the `namespace`. Respects `isolatedStorage` if enabled, meaning objects created in a different test won't be returned.

    <br>

    ```ts
    ---
    filename: index.spec.js
    ---
    import { env, listDurableObjectIds } from "cloudflare:test";
    import { it, expect } from "vitest";

    it("increments count", async () => {
      const id = env.COUNTER.newUniqueId();
      const stub = env.COUNTER.get(id);
      const response = await stub.fetch("https://example.com");
      expect(await response.text()).toBe("1");

      const ids = await listDurableObjectIds(env.COUNTER);
      expect(ids.length).toBe(1);
      expect(ids[0].equals(id)).toBe(true);
    });
    ```

{{</definitions>}}