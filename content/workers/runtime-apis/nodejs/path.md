---
pcx_content_type: configuration
title: path
---

# path

{{<render file="_nodejs-compat-howto.md">}}

The [`node:path`](https://nodejs.org/api/path.html) module provides utilities for working with file and directory paths. The `node:path` module can be accessed using:

```js
import path from "node:path"
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'
```

{{<Aside type="note">}}
In the Workers implementation of `path`, the [path.win32](https://nodejs.org/api/path.html#windows-vs-posix) variants of the path API are not implemented, and will throw an exception.
{{</Aside>}}

Refer to the [Node.js documentation for `path`](https://nodejs.org/api/path.html) for more information.
