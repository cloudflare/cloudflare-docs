---
pcx_content_type: navigation
title: Python
meta:
  title: Write Cloudflare Workers in Python
  description: Write Workers in 100% Python
weight: 3
---

{{<heading-pill style="beta">}}Python{{</heading-pill>}}

Cloudflare Workers provides first-class support for Python, including support for:

- The majority of Python's [Standard library](/workers/languages/python/stdlib/)
- All [bindings](/workers/runtime-apis/bindings/), including [Workers AI](/workers-ai/), [Vectorize](/vectorize), [R2](/r2), [KV](/kv), [D1](/d1), [Queues](/queues/), [Durable Objects](/durable-objects/), [Service Bindings](/workers/runtime-apis/bindings/service-bindings/) and more.
- [Environment Variables](/workers/configuration/environment-variables/), and [Secrets](/workers/configuration/secrets/)
- A robust [foreign function interface (FFI)](/workers/languages/python/ffi) that lets you use JavaScript objects and functions directly from Python — including all [Runtime APIs](/workers/runtime-apis/)
- [Built-in packages](/workers/languages/python/packages), including [FastAPI](https://fastapi.tiangolo.com/), [Langchain](https://pypi.org/project/langchain/), [httpx](https://www.python-httpx.org/) and more.

{{<Aside type="note" header="Python Workers are in open beta.">}}
You can currently only use the [built-in packages](/workers/languages/python/packages) in local development. Support for deploying packages with a `requirements.txt` file is coming soon.

You must add the `python_workers` compatibility flag to your Worker, while Python Workers are in open beta.

We'd love your feedback. Join the #python-workers channel in the [Cloudflare Developers Discord](https://discord.cloudflare.com/) and let us know what you'd like to see next.
{{</Aside>}}

## Get started

```bash
git clone https://github.com/cloudflare/python-workers-examples
cd python-workers-examples/01-hello
npx wrangler@latest dev
```

A Python Worker can be as simple as three lines of code:

```python
---
filename: src/entry.py
---
from js import Response

def on_fetch(request):
    return Response.new("Hello World!")
```

Similar to Workers written in [JavaScript](/workers/languages/javascript), [TypeScript](/workers/languages/typescript), or [Rust](/workers/languages/rust/), the main entry point for a Python worker is the [`fetch` handler](/workers/runtime-apis/handlers/fetch). In a Python Worker, this handler is named `on_fetch`.

To run a Python Worker locally, you use [Wrangler](/workers/wrangler/), the CLI for Cloudflare Workers:

```bash
npx wrangler@latest dev
```

To deploy a Python Worker to Cloudflare, run [`wrangler deploy`](/workers/wrangler/commands/#deploy):

```bash
npx wrangler@latest deploy
```

## Modules

Python workers can be split across multiple files. Let's create a new Python file, called `src/hello.py`:

```python
---
filename: src/hello.py
---
def hello(name):
    return "Hello, " + name + "!"
```

Now, we can modify `src/entry.py` to make use of the new module.

```python
---
filename: src/entry.py
---
from hello import hello
from js import Response

def on_fetch(request):
    return Response.new(hello("World"))
```

Once you edit `src/entry.py`, Wrangler will automatically detect the change and
reload your Worker.

## The `Request` Interface

The `request` parameter passed to your `fetch` handler is a JavaScript Request object, exposed via the foreign function interface, allowing you to access it directly from your Python code.

Let's try editing the worker to accept a POST request. We know from the
[documentation for `Request`](/workers/runtime-apis/request) that we can call
`await request.json()` within an `async` function to parse the request body as
JSON. In a Python Worker, you would write:

```python
---
filename: src/entry.py
---
from js import Response
from hello import hello

async def on_fetch(request):
    name = (await request.json()).name
    return Response.new(hello(name))
```

Once you edit the `src/entry.py`, Wrangler should automatically restart the local
development server. Now, if you send a POST request with the appropriate body,
your Worker should respond with a personalized message.

```bash
$ curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"name": "Python"}' http://localhost:8787
# Hello, Python!
```

## The `env` Parameter

In addition to the `request` parameter, the `env` parameter is also passed to
the Python `fetch` handler and can be used to access
[environment variables](/workers/configuration/environment-variables/),
[secrets](/workers/configuration/secrets/),and
[bindings](/workers/runtime-apis/bindings/).

For example, let's try setting and using an environment variable in a Python
Worker. First, add the environment variable to your Worker's `wrangler.toml`:

```toml
---
filename: wrangler.toml
---
name = "hello-python-worker"
main = "src/entry.py"
compatibility_flags = ["python_workers"]
compatibility_date = "2024-03-20"

[vars]
API_HOST = "example.com"
```

Then, you can access the `API_HOST` environment variable via the `env` parameter:

```python
---
filename: src/entry.py
---
from js import Response

async def on_fetch(request, env):
    return Response.new(env.API_HOST)
```

## Further Reading

- Understand which parts of the [Python Standard Library](/workers/languages/python/stdlib) are supported in Python Workers.
- Learn about Python Workers' [foreign function interface (FFI)](/workers/languages/python/ffi), and how to use it to work with [bindings](/workers/runtime-apis/bindings) and [Runtime APIs](/workers/runtime-apis/).
- Explore the [Built-in Python packages](/workers/languages/python/packages) that the Workers runtime provides.
