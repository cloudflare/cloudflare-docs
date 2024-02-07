---
updated: TODO
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Getting Started with Python Workers
---

# Getting Started with Python Workers

In this tutorial, we will explore how to use Python to develop APIs for 
instantaneous deployment on thousands of servers across Cloudflare's global
network.

{{<render file="_tutorials-before-you-start.md">}}

## Hello World!

Let's build our first Python worker. Create a new directory and create a new
Python file named `entry.py`.

```python
from js import Response

def fetch(request):
    return Response.new("Hello World!")
```

Now, we can run the worker locally using Wrangler.

```sh
wrangler dev entry.py
```

Similar to JavaScript workers, the main entry point for a Python worker is the
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

def fetch(request):
    return Response.new(hello("World"))
```

Once you edit `entry.py`, Wrangler should automatically detect the change and
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

async def fetch(request):
    name = (await request.json()).name
    return Response.new(hello(name))
```

Once we edit the `entry.py`, Wrangler should automatically restart the local
development server. Now, if we send a POST request with the appropriate body,
we should get a personalized message.

```sh
$ curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"name": "Python"}' http://localhost:8787
# Hello, Python!
```

## Using the `env` Parameter

In addition to the `request` parameter, the `env` parameter is also passed to
the Python `fetch` handler and can be used to access
[environment variables] (/workers/configuration/environment-variables),
[secrets](/workers/configuration/secrets),and
[bindings](/workers/configuration/bindings).

For instance, let's try setting an using an environment variable in a Python
worker. First, let's create a `wrangler.toml` file for our worker.

```toml
name = "hello-python-worker"
main = "entry.py"
compatibility_date = "2024-01-29"

[vars]
API_HOST = "example.com"
```

Now, let's update our `fetch` handler to make use of the new `API_HOSt`
environment variable.

```python
from js import Response

async def fetch(request, env):
    return Response.new(env.API_HOST)
```

Now, to make use of our `wrangler.toml` file, we can launch the worker using
simply:

```sh
wrangler dev
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

def fetch(request):
    arr = np.array([1, 2, 3])
    return Response.new(str(arr))
```

## Summary and Related Resources

We hope that this small guide demonstrates the full-featured support for Python
within Cloudflare workers.

If you want to get started building your own projects, review the existing list
of [Quickstart templates](https://developers.cloudflare.com/workers/get-started/quickstarts/). 