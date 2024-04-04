---
pcx_content_type: content
title: FastAPI
meta:
  title: FastAPI
---

# FastAPI

The FastAPI package is supported in Python Workers.

FastAPI applications use a protocol called the [Asynchronous Server Gateway Interface (ASGI)](https://asgi.readthedocs.io/en/latest/). This means that FastAPI never reads from or writes to a socket itself. An ASGI application expects to be hooked up to an ASGI server, typically [uvicorn](https://www.uvicorn.org/). The ASGI server handles all of the raw sockets on the application’s behalf.

The Workers runtime provides [an ASGI server](https://github.com/cloudflare/workerd/blob/main/src/pyodide/internal/asgi.py) directly to your Python Worker, which lets you use FastAPI in Python Workers.

## Get Started

{{<render file="_python-workers-beta-packages.md" productFolder="workers">}}

Clone the `cloudflare/python-workers-examples` repository and run the FastAPI example:

```bash
git clone https://github.com/cloudflare/python-workers-examples
cd 03-fastapi
npx wrangler@latest dev
```

### Example code

```python
---
filename: index.py
---
from fastapi import FastAPI, Request
from pydantic import BaseModel

async def on_fetch(request, env):
    import asgi

    return await asgi.fetch(app, request, env)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

@app.get("/env")
async def root(req: Request):
    env = req.scope["env"]
    return {"message": "Here is an example of getting an environment variable: " + env.MESSAGE}

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

@app.post("/items/")
async def create_item(item: Item):
    return item

@app.put("/items/{item_id}")
async def create_item(item_id: int, item: Item, q: str | None = None):
    result = {"item_id": item_id, **item.dict()}
    if q:
        result.update({"q": q})
    return result

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```