---
pcx_content_type: content
title: Examples
meta:
  title: Python Worker Examples
---

# Examples

### Return a custom status code and/or response headers

```python
---
filename: src/entry.py
---
from js import Response, Headers

async def on_fetch(request, env):
  # Create a Headers object
  headers = Headers.new({"x-hello-from": "python-workers"}.items())
  # Return a response object with a status code and headers
  return Response.new("Hello world!", status=404, headers=headers)
```

### Parse an incoming request URL

```python
---
filename: src/entry.py
---
from js import Response, Headers
from urllib.parse import urlparse, parse_qs

async def on_fetch(request, env):
    # Parse the incoming request URL
    url = urlparse(request.url)
    # Parse the query parameters into a Python dictionary
    params = parse_qs(url.query)

    if "name" in params:
        greeting = "Hello there, {name}".format(name=params["name"][0])
        return Response.new(greeting)


    if url.path == "/favicon.ico":
      return Response.new("")

    return Response.new("Hello world!")
```

### Parse JSON from the incoming request

```python
---
filename: src/entry.py
---
from js import Response

async def on_fetch(request):
    name = (await request.json()).name
    return Response.new("Hello, {name}".format(name=name))
```

### Emit logs from your Python Worker

```python
---
filename: src/entry.py
---
# To use the JavaScript console APIs
from js import console
# To use the native Python logging
import logging

async def on_fetch(request):
    # Use the console APIs from JavaScript
    # https://developer.mozilla.org/en-US/docs/Web/API/console
    console.log("console.log from Python!")

    # Alternatively, use the native Python logger
    logger = logging.getLogger(__name__)

    # The default level is warning. We can change that to info.
    logging.basicConfig(level=logging.INFO)

    logger.error("error from Python!")
    logger.info("info log from Python!")

    # Or just use print()
    print("print() from Python!")

    return Response.new("We're testing logging!")
```

### Respond with JSON

```python
---
filename: src/entry.py
---
from js import Response
import json

async def on_fetch(request):
    # Use json.loads to serialize Python objects to JSON strings
    payload = json.dumps({"c": 0, "b": 0, "a": 0}, sort_keys=True) 

    headers = Headers.new({"content-type": "application/json"}.items())
    return Response.new(payload, headers=headers)
```

### Publish to a Queue

```python
---
filename: src/entry.py
---
from js import Response, Object
from pyodide.ffi import to_js as _to_js

# to_js converts between Python dictionaries and JavaScript Objects
def to_js(obj):
   return _to_js(obj, dict_converter=Object.fromEntries)

async def on_fetch(request, env):
    # Bindings are available on the 'env' parameter
    # https://developers.cloudflare.com/queues/ 

    # The default contentType is "json"
    # We can also pass plain text strings
    await env.QUEUE.send("hello", contentType="text")
    # Send a JSON payload
    await env.QUEUE.send(to_js({"hello": "world"}))

    # Return a response
    return Response.json(to_js({"write": "success"}))
```

## Next steps

* If you're new to Workers and Python, refer to the [get started](/workers/languages/python/) guide
* Learn more about [calling JavaScript methods and accessing JavaScript objects](/workers/languages/python/ffi/) from Python
* Understand the [supported packages and versions](/workers/languages/python/packages/) currently available to Python Workers.
