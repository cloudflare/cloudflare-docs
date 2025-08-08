---
name: "Enable Node.js HTTP client modules"
sort_date: "2025-08-15"
enable_date: "2025-08-15"
enable_flag: "enable_nodejs_http_modules"
disable_flag: "disable_nodejs_http_modules"
---

When you enable the `enable_nodejs_http_modules` compatibility flag and the [`nodejs_compat`](/workers/runtime-apis/nodejs/)
flag is also enabled, the `node:http` and `node:https` modules become available for import. These modules provide
client-side HTTP functionality for making outbound requests, but do not include Node.js HTTP server methods.

```js
import * as http from "node:http";
import * as https from "node:https";

// Make HTTP requests using Node.js APIs
const options = {
  hostname: 'api.example.com',
  port: 443,
  path: '/data',
  method: 'GET'
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.end();
```

This enables compatibility with Node.js libraries and existing code that use the standard `node:http` and `node:https`
APIs for making HTTP requests. The available functionality includes:

- `http.request()` and `https.request()` for making HTTP/HTTPS requests
- `http.get()` and `https.get()` for making GET requests
- Request and response objects with standard Node.js APIs
- Support for standard HTTP methods, headers, and options

Server-side functionality such as `http.createServer()`, `http.Server`, and related server methods are not available,
as Workers handle incoming requests through the [fetch event handler](/workers/runtime-apis/fetch/).
