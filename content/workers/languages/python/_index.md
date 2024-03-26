---
pcx_content_type: navigation
title: Python
meta:
  title: Write Cloudflare Workers in Python
weight: 3
---

{{<heading-pill style="beta">}}Python{{</heading-pill>}}

Cloudflare Workers provides first-class support for Python, including:

- [Built-in packages](/workers/languages/python/packages)
- Importing pure Python wheels from [PyPI](https://pypi.org/) with [micropip](https://github.com/pyodide/micropip), by adding them to `requirements.txt`
- [FastAPI](https://fastapi.tiangolo.com/) compatibility, to build APIs in idiomatic Python
- [Langchain](https://pypi.org/project/langchain/) compatibility, to build LLM-powered apps easily
- Bindings, Environment Variables, and Secrets
- Support for [bindings](/workers/configuration/bindings/) to [Workers AI](/workers-ai/), [Vectorize](/vectorize), [R2](/r2), [KV](/kv), [D1](/d1) and more

Python Workers are currently in open beta, and we'd love your feedback. Join the [#python-workers channel](https://discord.com/channels/595317990191398933/1212830987495669781) in the Cloudflare Discord community and let us know what you'd like to see next.

## Get started

<!-- Run the following command in your terminal to create your first Python Worker: -->

<!-- TODO: cloudflare/workers-sdk/issues/5120 -->
<!-- ```bash
npm create cloudflare@latest -- --template cloudflare/workers-sdk/templates/python
``` -->

```bash
git clone https://github.com/garrettgu10/python-workers-demos.git
cd hello
npx wrangler@latest dev
```

A Python Worker can be as simple as three lines of code:

```python
from js import Response

def on_fetch(request):
    return Response.new("Hello World!")
```

To run a Python Worker locally, you use [Wrangler](/workers/wrangler/), the CLI for Cloudflare Workers.

```bash
npx wrangler@latest dev
```

Similar to Workers written in JavaScript or TypeScript, the main entry point for a Python worker is the
[`fetch` handler](/workers/runtime-apis/handlers/fetch). You'll notice that
the code looks very similar to a "Hello World" worker written in JavaScript.
In fact, if you have experience developing JavaScript workers, you should feel
right at home, since most of the functionality you're used to is still here.

## Using Modules

Python workers can also be split across multiple files. Let's create a new
Python file, called `hello.py`.

```python
def hello(name):
    return "Hello, " + name + "!"
```

Now, we can modify `entry.py` to make use of the new module.

```python
from hello import hello
from js import Response

def on_fetch(request):
    return Response.new(hello("World"))
```

Once you edit `entry.py`, Wrangler will automatically detect the change and
reload the worker.

## Using the `Request` Interface

The `request` parameter passed to your `fetch` handler can be used in very much
the same way as it's used in JavaScript.

Let's try editing the worker to accept a POST request. We know from the
[documentation](/workers/runtime-apis/request) that we can call
`await request.json()` within an `async` function to parse the request body as
JSON. This same functionality we're used to using within JavaScript is also
available to Python workers!

```python
from js import Response
from hello import hello

async def on_fetch(request):
    name = (await request.json()).name
    return Response.new(hello(name))
```

Once we edit the `entry.py`, Wrangler should automatically restart the local
development server. Now, if we send a POST request with the appropriate body,
we should get a personalized message.

```bash
$ curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"name": "Python"}' http://localhost:8787
# Hello, Python!
```

## Using the `env` Parameter

In addition to the `request` parameter, the `env` parameter is also passed to
the Python `fetch` handler and can be used to access
[environment variables](/workers/configuration/environment-variables),
[secrets](/workers/configuration/secrets),and
[bindings](/workers/configuration/bindings).

For instance, let's try setting and using an environment variable in a Python
worker. First, let's create a `wrangler.toml` file for our worker.

```toml
name = "hello-python-worker"
main = "entry.py"
compatibility_flags = ["python_workers"]
compatibility_date = "2024-03-20"

[vars]
API_HOST = "example.com"
```

Now, let's update our `fetch` handler to make use of the new `API_HOST`
environment variable.

```python
from js import Response

async def on_fetch(request, env):
    return Response.new(env.API_HOST)
```

Now, to make use of our `wrangler.toml` file, we can launch the worker using
simply:

```bash
$ wrangler dev
```

In another terminal window:

```bash
$ curl http://localhost:8787
# example.com
```

## Using Python Packages

Python workers support a variety of packages, including pure Python packages
with wheels on PyPI and
[packages built in Pyodide](https://pyodide.org/en/stable/usage/packages-in-pyodide.html).

First, let's make a `requirements.txt` file and specify our required packages.

```
numpy
```

Now, we can simply import and use the package within our Python worker!

```python
from js import Response
import numpy as np

def on_fetch(request):
    arr = np.array([1, 2, 3])
    return Response.new(str(arr))
```

