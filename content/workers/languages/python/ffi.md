---
pcx_content_type: content
title: Foreign Function Interface (FFI)
meta:
  title: Work with JavaScript objects, methods, functions and globals from Python Workers
---

# Foreign Function Interface (FFI)

Via [Pyodide](https://pyodide.org/en/stable/), Python Workers provide a [Foreign Function Interface (FFI)](https://en.wikipedia.org/wiki/Foreign_function_interface) to JavaScript. This allows you to:

- Use [bindings](/workers/runtime-apis/bindings/) to resources on Cloudflare, including [Workers AI](/workers-ai/), [Vectorize](/vectorize/), [R2](/r2/), [KV](/kv/), [D1](/d1/), [Queues](/queues/), [Durable Objects](/durable-objects/), [Service Bindings](/workers/runtime-apis/bindings/service-bindings/) and more.
- Use JavaScript globals, like [`Request`](/workers/runtime-apis/request/), [`Response`](/workers/runtime-apis/response/), and [`fetch()`](/workers/runtime-apis/fetch/).
- Use the full feature set of Cloudflare Workers — if an API is accessible in JavaScript, you can also access it in a Python Worker, writing exclusively Python code.

The details of Pyodide's Foreign Function Interface are documented [here](https://pyodide.org/en/stable/usage/type-conversions.html), and Workers written in Python are able to take full advantage of this.

## Using Bindings from Python Workers

Bindings allow your Worker to interact with resources on the Cloudflare Developer Platform. When you declare a binding on your Worker, you grant it a specific capability, such as being able to read and write files to an [R2](/r2/) bucket.

For example, to accesss a [KV](/kv) namespace from a Python Worker, you would declare the following in your Worker's [`wrangler.toml`](/workers/wrangler/configuration/):

```toml
---
filename: wrangler.toml
---
main = "./src/index.py"
kv_namespaces = [
  { binding = "FOO", id = "<YOUR_KV_NAMESPACE_ID>" }
]
```

...and then call `.get()` on the binding object that is exposed on `env`:

```python
---
filename: index.py
---
from js import Response

async def on_fetch(request, env):
    await env.FOO.put("bar", "baz")
    bar = await env.FOO.get("bar")
    return Response.new(bar) # returns "baz"
```

Under the hood, `env` is actually a JavaScript object. When you call `.FOO`, you are accessing this property via a [`JsProxy`](https://pyodide.org/en/stable/usage/api/python-api/ffi.html#pyodide.ffi.JsProxy) — special proxy object that makes a JavaScript object behave like a Python object.

## Using JavaScript globals from Python Workers

When writing Workers in Python, you can access JavaScript globals by importing them from the `js` module. For example, note how `Response` is imported from `js` in the example below:

```python
---
filename: index.py
---
from js import Response

def on_fetch(request):
    return Response.new("Hello World!")
```

Refer to the [Python examples](/workers/languages/python/examples/) to learn how to call into JavaScript functions from Python, including `console.log` and logging, providing options to `Response`, and parsing JSON.
