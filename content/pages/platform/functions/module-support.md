---
pcx_content_type: reference
title: Module support
weight: 13
---

## Module support

Pages Functions provide support for several module types, much like [Workers](https://blog.cloudflare.com/workers-javascript-modules/). This means that you can import and use external modules such as WebAssembly (Wasm), `text` and `binary` files inside your Functions code.

This guide will instruct you on how to use these different module types inside your Pages Functions.

### ECMAScript Modules

ECMAScript modules (or in short ES Modules) is the official, [standardized](https://tc39.es/ecma262/#sec-modules) module system for JavaScript. It is the recommended mechanism for writing modular and reusable JavaScript code. 

[ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) are defined by the use of `import` and `export` statements. Below is an example of a script written in ES Modules format, and a Pages Function that imports that module:

```js
---
filename: src/greeting.ts
---
export function greeting(name: string): string {
  return `Hello ${name}!`;
}
```

```js
---
filename: functions/hello.ts
---
import { greeting } from "../src/greeting.ts";

export async function onRequest(context) {
    return new Response(`${greeting("Pages Functions")}`);
}
```

### WebAssembly Modules

[WebAssembly](https://webassembly.org/) (or Wasm) is a low-level language that provides programming languages such as C++ or Rust with a compilation target so that they can run on the web. The distributable, loadable, and executable unit of code in WebAssembly is called a [module](https://webassembly.github.io/spec/core/syntax/modules.html).

Below is a basic example of how you can import Wasm Modules inside your Pages Functions code:

```js
---
filename: functions/meaning-of-life.ts
---
import addModule from "add.wasm";

export async function onRequest() {
	const addInstance = await WebAssembly.instantiate(addModule);
	return new Response(
		`The meaning of life is ${addInstance.exports.add(20, 1)}`
	);
}
```

### Text Modules

Text Modules are a non-standardized means of importing resources such as HTML files as a `String`.

To import the below HTML file into your Pages Functions code:

```html
---
filename: index.html
---
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello Pages Functions!</h1>
  </body>
</html>
```

Use the following script:

```js
---
filename: functions/hey.ts
---
import html from "../index.html";

export async function onRequest() {
	return new Response(
		html,
    {
      headers: { "Content-Type": "text/html" }
    }
	);
}
```


### Binary Modules

Binary Modules are a non-standardized way of importing binary data such as images as an `ArrayBuffer`.

Below is a basic example of how you can import the data from a binary file inside your Pages Functions code:

```js
---
filename: functions/data.ts
---
import data from "../my-data.bin";

export async function onRequest() {
	return new Response(
		data,
    {
      headers: { "Content-Type": "application/octet-stream" }
    }
	);
}
```