---
pcx-content-type: configuration
title: addEventListener
weight: 3
---

# addEventListener

## Background

The `addEventListener` function defines triggers for a Worker script to execute. There are currently two types of event listeners - `"fetch"` listeners which are sent a [`FetchEvent`](/workers/runtime-apis/fetch-event/) and `"scheduled"` listeners which are sent a [`ScheduledEvent`](/workers/runtime-apis/scheduled-event/).

## Syntax

{{<definitions>}}

- {{<code>}}addEventListener(type, listener){{</code>}} {{<type>}}void{{</type>}}

  - If multiple `"fetch"` listeners are registered, when one does not call [`event.respondWith()`](/workers/runtime-apis/fetch-event/#methods), the runtime delivers the event to the next registered listener.
  - A `"fetch"` listener and a `"scheduled"` listener can be registered in the same script.
  - A script can have only one `"scheduled"` listener.

{{</definitions>}}

### Properties

{{<definitions>}}

- `type` {{<type>}}string{{</type>}}

  - The only types supported are `"fetch"` and `"scheduled"`.

- `listener` {{<type>}}function{{</type>}}

  - The function to handle incoming events to the Worker script. The listener is passed a single argument:

  - `event` {{<type>}}FetchEvent{{</type>}} or {{<type>}}ScheduledEvent{{</type>}}

    - The events dispatched to a Worker. Refer to [`FetchEvent`](/workers/runtime-apis/fetch-event/) or [`ScheduledEvent`](/workers/runtime-apis/scheduled-event/).

{{</definitions>}}

## Examples

### Fetch Listener
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">addEventListener</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'fetch'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-parameter">event</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">respondWith</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">Response</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'Hello world'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Scheduled Listener
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">addEventListener</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'scheduled'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-parameter">event</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">waitUntil</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-function">handleScheduled</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">event</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
