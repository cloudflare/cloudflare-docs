---
pcx_content_type: content
title: Examples
meta:
  title: Python Worker Examples
---

# Examples

### Return a custom status code and/or response headers

```python
from js import Response, Headers

async def on_fetch(request, env):
  # Create a Headers object
  headers = Headers.new({"x-hello-from": "python-workers"}.items())
  # Return a response object with a status code and headers
  return Response.new("Hello world!", status=404, headers=headers)
```

### Parse an incoming request URL

```python
from js import Response, Headers
from urllib.parse import urlparse

async def on_fetch(request, env):
    # https://docs.python.org/3/library/urllib.parse.html#module-urllib.parse
    url = urlparse(request.url)

    if url.path == "/favicon.ico":
      return new Response("")

    return new Response("Hello world!")
```

### Parse JSON from the incoming request

What about `json.loads` as an alternative here?

```python
from js import Response

async def on_fetch(request):
    name = (await request.json()).name
    return Response.new("Hello, {name}".format(name=name))
```

### Emit logs from your Python Worker

```python
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
    logger.info("logger.info from Python!")

    # Or just use print()
    print("print() from Python!)

    return Response.new("We're testing logging!")
```


### Respond with JSON

TODO