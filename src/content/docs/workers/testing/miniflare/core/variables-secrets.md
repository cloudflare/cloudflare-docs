---
order: 2
title: "🔑 Variables and Secrets"
---

## Bindings

Variable and secrets are bound as follows:

```js
const mf = new Miniflare({
	bindings: {
		KEY1: "value1",
		KEY2: "value2",
	},
});
```

## Text and Data Blobs

Text and data blobs can be loaded from files. File contents will be read and
bound as `string`s and `ArrayBuffer`s respectively.

```js
const mf = new Miniflare({
	textBlobBindings: { TEXT: "text.txt" },
	dataBlobBindings: { DATA: "data.bin" },
});
```

## Globals

Injecting arbitrary globals is not supported by [workerd](https://github.com/cloudflare/workerd). If you're using a service Worker, bindings will be injected as globals, but these must be JSON-serialisable.
