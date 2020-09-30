# Encoding

## TextEncoder

### Background

The TextEncoder takes a stream of code points as input and emits a stream of bytes. Encoding types passed to the constructor are ignored and a UTF-8 TextEncoder is created.

[`TextEncoder()`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/TextEncoder) returns a newly constructed `TextEncoder` that generates a byte stream with UTF-8 encoding. `TextEncoder` takes no parameters and throws no exceptions.

### Constructor

```js
let encoder = new TextEncoder()
```

### Properties

<Definitions>

- `encoding` <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/DOMString">DOMString</TypeLink> <PropMeta>read-only</PropMeta>
  - The name of the encoder as a string describing the method the `TextEncoder` uses (always `utf-8`).

</Definitions>

### Methods

<Definitions>

- <Code>encode(input<TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/USVString">USVString</TypeLink>)</Code> <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Typed_arrays/Uint8Array">Uint8Array</TypeLink>

  - Encodes a string input.

</Definitions>

--------------------------------

## TextDecoder

### Background

The **TextDecoder** interface represents a UTF-8 decoder. Decoders take a stream of bytes as input and emit a stream of code points.

[`TextDecoder()`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder) returns a newly constructed `TextDecoder` that generates a code-point stream.

### Constructor
```js
let decoder = new TextDecoder()
```

### Properties

<Definitions>

- `encoding` <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/DOMString">DOMString</TypeLink> <PropMeta>read-only</PropMeta>
  - The name of the decoder that describes the method the `TextDecoder` uses.

- `fatal` <Type>boolean</Type> <PropMeta>read-only</PropMeta>
  - Indicates if the error mode is fatal.

- `ignoreBOM` <Type>boolean</Type> <PropMeta>read-only</PropMeta>
  - Indicates if the byte-order marker is ignored.

</Definitions>

### Methods

<Definitions>

- `decode()` <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/DOMString">DOMString</TypeLink>
  - Decodes using the method specified in the `TextDecoder` object. Learn more at [MDN’s TextDecoder docs](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/decode).

</Definitions>
