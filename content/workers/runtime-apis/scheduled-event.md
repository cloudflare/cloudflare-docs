---
pcx-content-type: configuration
title: ScheduledEvent
---

# ScheduledEvent

## Background

A `ScheduledEvent` is the event type for scheduled requests to a Worker. It is the `Object` passed through as the `event` when a Worker is invoked by a Worker's [Cron Trigger](/workers/platform/cron-triggers/). `ScheduledEvent` is supported in Workers written with [Service Worker syntax](#syntax-service-worker) and [Module Worker syntax](#syntax-module-worker).

## Syntax: Service Worker

A `ScheduledEvent` can be handled in Workers functions written using the Service Worker syntax by attaching to the `scheduled` event with `addEventListener`:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">addEventListener</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'scheduled'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-parameter">event</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">waitUntil</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-function">handleScheduled</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">event</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Properties

{{<definitions>}}

- `event.cron` {{<type>}}string{{</type>}}

  - The value of the [Cron Trigger](/workers/platform/cron-triggers/) that started the `ScheduledEvent`.

- `event.type` {{<type>}}string{{</type>}}

  - The type of event. This will always return `"scheduled"`.

- `event.scheduledTime` {{<type>}}number{{</type>}}
  - The time the `ScheduledEvent` was scheduled to be executed in milliseconds since January 1, 1970, UTC. It can be parsed as {{<code>}}new Date(event.scheduledTime){{</code>}}

{{</definitions>}}

### Methods

When a Workers script is invoked by a [Cron Trigger](/workers/platform/cron-triggers/), the Workers runtime starts a `ScheduledEvent` which will be handled by the event listener registered for the type `"scheduled"`. The event handler can invoke the following methods of the `event` object to control what happens next:

{{<definitions>}}

- {{<code>}}event.waitUntil(promise{{<param-type>}}Promise{{</param-type>}}){{</code>}} {{<type>}}void{{</type>}}

  - Use this method to notify the runtime to wait for asynchronous tasks (for example, logging, analytics to third-party services, streaming and caching). The first `event.waitUntil` to fail will be observed and recorded as the status in the [Cron Trigger](/workers/platform/cron-triggers/) Past Events table. Otherwise, it will be reported as a Success.

{{</definitions>}}

## Syntax: Module Worker

A `ScheduledEvent` can be handled in Workers functions written using the Module Worker syntax by adding a `scheduled` function to your module's exported handlers:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">export</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">default</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">async</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">scheduled</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-parameter">event</span><span class="CodeBlock--token-parameter CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-parameter"> env</span><span class="CodeBlock--token-parameter CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-parameter"> ctx</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    ctx</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">waitUntil</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-function">doSomeTaskOnASchedule</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Properties

{{<definitions>}}

- `event.cron` {{<type>}}string{{</type>}}

  - The value of the [Cron Trigger](/workers/platform/cron-triggers/) that started the `ScheduledEvent`.

- `event.type` {{<type>}}string{{</type>}}

  - The type of event. This will always return `"scheduled"`.

- `event.scheduledTime` {{<type>}}number{{</type>}}

  - The time the `ScheduledEvent` was scheduled to be executed in milliseconds since January 1, 1970, UTC. It can be parsed as {{<code>}}new Date(event.scheduledTime){{</code>}}.

- `env` {{<type>}}object{{</type>}}

  - An object containing the bindings associated with your Module Worker, such as KV namespaces and Durable Objects.

- `ctx` {{<type>}}object{{</type>}}
  - An object containing the context associated with your Module Worker. Currently, this object just contains the `waitUntil` function.

{{</definitions>}}

### Methods

When a Workers script is invoked by a [Cron Trigger](/workers/platform/cron-triggers/), the Workers runtime starts a `ScheduledEvent` which will be handled by the `scheduled` function in your Workers Module class. The `ctx` argument represents the context your function runs in, and contains the following methods to control what happens next:

{{<definitions>}}

- {{<code>}}ctx.waitUntil(promise{{<param-type>}}Promise{{</param-type>}}){{</code>}} {{<type>}}void{{</type>}}

  - Use this method to notify the runtime to wait for asynchronous tasks (for example, logging, analytics to third-party services, streaming and caching). The first `ctx.waitUntil` to fail will be observed and recorded as the status in the [Cron Trigger](/workers/platform/cron-triggers/) Past Events table. Otherwise, it will be reported as a success.

{{</definitions>}}
