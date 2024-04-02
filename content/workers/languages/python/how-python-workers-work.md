---
pcx_content_type: content
title: How Python Workers Work
weight: 1
meta:
  title: How Python Workers Work
---

# How Python Workers Work

Workers written in Python are executed by [Pyodide](https://pyodide.org/en/stable/index.html). Pyodide is a port of [CPython](https://github.com/python) (the reference implementation of Python — commonly referred to as just "Python") to WebAssembly.

When you write a Python Worker, your code is interpreted directly by Pyodide, within a V8 isolate. Refer to [How Workers works](/workers/reference/how-workers-works/) to learn more.



## Local development lifecycle

```python
---
filename: index.py
---
from js import Response

async def on_fetch(request, env):
    return Response.new("Hello world!")
```

…with a wrangler.toml file that points to a .py file:

```toml
---
filename: wrangler.toml
---
name = "hello-world-python-worker"
main = "src/entry.py"
compatibility_date = "2024-04-01"
```

When you run `npx wrangler@latest dev` in local dev, the Workers runtime will:

1. Determine which version of Pyodide is required, based on your compatibility date
2. Create an isolate for your Worker, and automatically inject Pyodide
3. Serve your Python code using Pyodide

This all happens under the hood — there no extra toolchain or precompilation steps needed. The Python execution environment is provided directly by the Workers runtime, mirroring how Workers written in JavaScript already work.

## Deploying Python Workers