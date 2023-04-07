---
type: example
summary: Examine the contents of a Headers object by logging to console with a Map.
tags:
  - Debugging
pcx_content_type: configuration
title: Logging headers to console
weight: 1001
layout: example
---

{{<tabs labels="js/esm | ts/esm">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request) {
    console.log(new Map(request.headers));
    return new Response("Hello world");
  },
};
```

{{</tab>}}
{{<tab label="ts/esm">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    console.log(new Map(request.headers));
    return new Response("Hello world");
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}

---

{{<content-column>}}

## Console-logging headers

Use a `Map` if you need to log a `Headers` object to the console:

```js
console.log(new Map(request.headers));
```

Use the `spread` operator if you need to quickly stringify a `Headers` object:

```js
let requestHeaders = JSON.stringify([...request.headers]);
```

Or use ES2019 `Object.fromEntries` to convert it to an object:

```js
let requestHeaders = Object.fromEntries(request.headers);
```

### The problem

When debugging Workers, examine the headers on a request or response. A common mistake is to try to log headers to the developer console via code like this:

```js
console.log(request.headers);
```

Or this:

```js
console.log(`Request headers: ${JSON.stringify(request.headers)}`);
```

Both attempts result in what appears to be an empty object — the string `"{}"` — even though calling `request.headers.has("Your-Header-Name")` might return true. This is the same behavior that browsers implement.

The reason this happens is because [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) objects do not store headers in enumerable JavaScript properties, so the developer console and JSON stringifier do not know how to read the names and values of the headers. It is not actually an empty object, but rather an opaque object.

`Headers` objects are iterable, which you can take advantage of to develop a couple of quick one-liners for debug-printing headers.

### Pass headers through a Map

The first common idiom for making Headers `console.log()`-friendly is to construct a `Map` object from the `Headers` object and log the `Map` object.

```js
console.log(new Map(request.headers));
```

This works because:

- `Map` objects can be constructed from iterables, like `Headers`.

- The `Map` object does store its entries in enumerable JavaScript properties, so the developer console can see into it.

### Spread headers into an array

The `Map` approach works for simple calls to `console.log()`. If you need to stringify your headers, you will discover that stringifying a `Map` yields nothing more than `[object Map]`.

Even though a `Map` stores its data in enumerable properties, those properties are [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)-keyed. Because of this, `JSON.stringify()` will [ignore Symbol-keyed properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#symbols_and_json.stringify) and you will receive an empty `{}`.

Instead, you can take advantage of the iterability of the `Headers` object in a new way by applying the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (`...`) to it.

```js
let requestHeaders = JSON.stringify([...request.headers], null, 2);
console.log(`Request headers: ${requestHeaders}`);
```

### Convert headers into an object with Object.fromEntries (ES2019)

[ES2019 provides `Object.fromEntries`](https://github.com/tc39/proposal-object-from-entries), so it is a simple call to convert the headers into an object:

```js
let headersObject = Object.fromEntries(request.headers);
let requestHeaders = JSON.stringify(headersObject, null, 2);
console.log(`Request headers: ${requestHeaders}`);
```

This results in something like:

```js
Request headers: {
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "accept-encoding": "gzip",
  "accept-language": "en-US,en;q=0.9",
  "cf-ipcountry": "US",
  // ...
}"
```

{{</content-column>}}
