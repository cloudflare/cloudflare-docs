---
pcx_content_type: configuration
title: Encoding
---

# Encoding

## TextEncoder

### Background

The `TextEncoder` takes a stream of code points as input and emits a stream of bytes. Encoding types passed to the constructor are ignored and a UTF-8 `TextEncoder` is created.

[`TextEncoder()`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/TextEncoder) returns a newly constructed `TextEncoder` that generates a byte stream with UTF-8 encoding. `TextEncoder` takes no parameters and throws no exceptions.

### Constructor

```js
let encoder = new TextEncoder();
```

### Properties

{{<definitions>}}

- `encoder.encoding` {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">}}DOMString{{</type-link>}} {{<prop-meta>}}read-only{{</prop-meta>}}
  - The name of the encoder as a string describing the method the `TextEncoder` uses (always `utf-8`).

{{</definitions>}}

### Methods

{{<definitions>}}

- {{<code>}}encode(input{{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">}}USVString{{</type-link>}}){{</code>}} : {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array">}}Uint8Array{{</type-link>}}

  - Encodes a string input.

{{</definitions>}}

---

## TextDecoder

### Background

The `TextDecoder` interface represents a UTF-8 decoder. Decoders take a stream of bytes as input and emit a stream of code points.

[`TextDecoder()`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder) returns a newly constructed `TextDecoder` that generates a code-point stream.

### Constructor

```js
let decoder = new TextDecoder();
```

### Properties

{{<definitions>}}

- `decoder.encoding` {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">}}DOMString{{</type-link>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  - The name of the decoder that describes the method the `TextDecoder` uses.

- `decoder.fatal` {{<type>}}boolean{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  - Indicates if the error mode is fatal.

- `decoder.ignoreBOM` {{<type>}}boolean{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}
  - Indicates if the byte-order marker is ignored.

{{</definitions>}}

### Methods

{{<definitions>}}

- `decode()` : {{<type-link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String">}}DOMString{{</type-link>}}
  - Decodes using the method specified in the `TextDecoder` object. Learn more at [MDN’s `TextDecoder` documentation](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/decode).

{{</definitions>}}
