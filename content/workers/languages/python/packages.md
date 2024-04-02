---
pcx_content_type: navigation
title: Packages
meta:
  title: Python packages supported in Cloudflare Workers
---

## Packages

To import a Python package, add the package name to the `requirements.txt` file within the same directory as your `wrangler.toml` configuration file.

For example, if your Worker depends on [FastAPI](https://fastapi.tiangolo.com/), you would add the following:

```
---
filename: requirements.txt
---
fastapi
ssl
```

### Package versioning

In the example above, you likely noticed that there is no explicit version of the Python package declared in `requirements.txt`.

In Workers, Python package versions are set via [Compatibility Dates](/workers/configuration/compatibility-dates/) and [Compatibility Flags](/workers/configuration/compatibility-dates//#compatibility-flags). Given a particular compatibility date, a specific version of the [Pyodide Python runtime](https://pyodide.org/en/stable/project/changelog.html) is provided to your Worker, providing a specific set of Python packages pinned to specific versions.

<!-- TODO — need section here that maps Pyodide releases to compatibility dates and flags, so that someone can understand, for a given compatibility date, which Pyodide version will be used, and which version of Python this includes, and which packages at which versions will be provided. -->

### Supported Packages

As of March 24, 2024, the following Python packages are supported in Workers:

- aiohttp: 3.9.3
- aiohttp-tests: 3.9.3
- aiosignal: 1.3.1
- annotated-types: 0.6.0
- annotated-types-tests: 0.6.0
- anyio: 4.2.0
- async-timeout: 4.0.3
- attrs: 23.2.0
- certifi: 2024.2.2
- charset-normalizer: 3.3.2
- distro: 1.9.0
- fastapi: 0.110.0
- frozenlist: 1.4.1
- h11: 0.14.0
- h11-tests: 0.14.0
- hashlib: 1.0.0
- httpcore: 1.0.4
- httpx: 0.27.0
- idna: 3.6
- jsonpatch: 1.33
- jsonpointer: 2.4
- langchain: 0.1.8
- langchain-core: 0.1.25
- langchain-openai: 0.0.6
- langsmith: 0.1.5
- lzma: 1.0.0
- micropip: 0.6.0
- multidict: 6.0.5
- numpy: 1.26.4
- numpy-tests: 1.26.4
- openai: 1.12.0
- openssl: 1.1.1n
- packaging: 23.2
- pydantic: 2.6.1
- pydantic-core: 2.16.2
- pydecimal: 1.0.0
- pydoc-data: 1.0.0
- pyyaml: 6.0.1
- regex: 2023.12.25
- regex-tests: 2023.12.25
- requests: 2.31.0
- six: 1.16.0
- sniffio: 1.3.0
- sniffio-tests: 1.3.0
- sqlite3: 1.0.0
- ssl: 1.0.0
- starlette: 0.36.3