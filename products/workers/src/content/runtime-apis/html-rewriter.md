# HTMLRewriter

## Background

The `HTMLRewriter` class allows developers to build comprehensive and expressive HTML parsers inside of a Cloudflare Workers application. It can be thought of as a jQuery-like experience directly inside of your Workers application. Leaning on a powerful JavaScript API to parse and transform HTML, `HTMLRewriter` allows developers to build deeply functional applications.

The `HTMLRewriter` class should be instantiated once in your Workers script, with a number of handlers attached using the `on` and `onDocument` functions.

--------------------------------

## Constructor

```js
new HTMLRewriter()
  .on("*", new ElementHandler())
  .onDocument(new DocumentHandler())
```

--------------------------------

## Global Types

Throughout the HTMLRewriter API, there are a few consistent types that many properties and methods use:

<Definitions>

- `Content` <Type>string</Type>

  - Content inserted in the output stream should be a string.

- `ContentOptions` <Type>Object</Type>

  - `{ html: Boolean }` Controls the way the HTMLRewriter treats inserted content. If the `html` boolean is set to true, content is treated as raw HTML. If the `html` boolean is set to false or not provided, content will be treated as text and proper HTML escaping will be applied to it.

</Definitions>

--------------------------------

## Handlers

There are two handler types that can be used with `HTMLRewriter`: _element handlers_ and _document handlers_.

### Element Handlers

An element handler responds to any incoming element, when attached using the `.on` function of an `HTMLRewriter` instance. The element handler should respond to `element`, `comments`, and `text`. The example processes `div` elements with an `ElementHandler` class.

```js
class ElementHandler {
  element(element) {
    // An incoming element, such as `div`
    console.log(`Incoming element: ${element.tagName}`)
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
  }
}

async function handleRequest(req) {
  const res = await fetch(req)

  return new HTMLRewriter().on("div", new ElementHandler()).transform(res)
}
```

### Document Handlers

A document handler represents the incoming HTML document. A number of functions can be defined on a document handler to query and manipulate a document’s `doctype`, `comments`, `text`, and `end`. Unlike an element handler, a document handler’s `doctype`, `comments`, `text`, and `end` functions are not scoped by a particular selector and called for all the content on the page including the content _outside_ of the top-level HTML tag:

```js
class DocumentHandler {
  doctype(doctype) {
    // An incoming doctype, such as <!DOCTYPE html>
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
  }

  end(end) {
    // The end of the document
  }
}
```

### Element

The `element` argument, used only in element handlers, is a representation of a DOM element. A number of methods exist on an element to query and manipulate it:

#### Properties

<Definitions>

- `tagName` <Type>string</Type>
  - The name of the tag, such as `"h1"` or `"div"`. This property can be assigned different values, to modify an element’s tag.

- `attributes` <Type>Iterator</Type> <PropMeta>read-only</PropMeta>
  - A `[name, value]` pair of the tag’s attributes.

- `removed` <Type>boolean</Type>
  - Indicates whether the element has been removed or replaced by one of the previous handlers.

- `namespaceURI` <Type>String</Type>
  - Represents the [namespace URI](https://infra.spec.whatwg.org/#namespaces) of an element.

</Definitions>

#### Methods

<Definitions>

- <Code>getAttribute(name<ParamType>string</ParamType>)</Code> <Type>string | null</Type>

  - Returns the value for a given attribute name on the element, or `null` if it isn’t found.

- <Code>hasAttribute(name<ParamType>string</ParamType>)</Code> <Type>boolean</Type>

  - Returns a boolean indicating whether an attribute exists on the element.

- <Code>setAttribute(name<ParamType>string</ParamType>, value<ParamType>string</ParamType>)</Code> <Type>Element</Type>

  - Sets an attribute to a provided value, creating the attribute if it doesn’t exist.

- <Code>removeAttribute(name<ParamType>string</ParamType>)</Code> <Type>Element</Type>

  - Removes the attribute.

- <Code>before(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Inserts content before the element.

- <Code>after(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Inserts content right after the element.

- <Code>prepend(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code><Type>Element</Type>

  - Inserts content right after the start tag of the element.

- <Code>append(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Inserts content right before the end tag of the element.

- <Code>replace(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Removes the element and inserts content in place of it.

- <Code>setInnerContent(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Replaces content of the element.

- <Code>remove(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Removes the element with all its content.

- <Code>removeAndKeepContent(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Removes the start tag and end tag of the element, but keeps its inner content intact.

</Definitions>

### Text chunks

Since we perform zero-copy streaming parsing, text chunks are not the same thing as text nodes in the lexical tree. A lexical tree text node can be represented by multiple chunks, as they arrive over the wire from the origin.

Consider the following markup: `<div>Hey. How are you?</div>`. It’s possible that the Workers script won’t receive the entire text node from the origin at once; instead, the `text` element handler will be invoked for each received part of the text node. For example, the handler might be invoked with “Hey. How ”, then “are you?”. When the last chunk arrives, the text’s `lastInTextNode` property will be set to `true`. Developers should make sure to concatenate these chunks together.

#### Properties

<Definitions>

- `removed` <Type>boolean</Type>
  - Indicates whether the element has been removed or replaced by one of the previous handlers.

- `text` <Type>string</Type> <PropMeta>read-only</PropMeta>
  - The text content of the chunk. Could be empty if the chunk is the last chunk of the text node.

- `lastInTextNode` <Type>boolean</Type> <PropMeta>read-only</PropMeta>
  - Specifies whether the chunk is the last chunk of the text node.

</Definitions>

#### Methods

<Definitions>

- <Code>before(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Inserts content before the element.

- <Code>after(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Inserts content right after the element.

- <Code>replace(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Removes the element and inserts content in place of it.

- <Code>remove()</Code> <Type>Element</Type>

  - Removes the element with all its content.

</Definitions>

### Comments

The `comments` function on an element handler allows developers to query and manipulate HTML comment tags.

```js
class ElementHandler {
  comments(comment) {
    // An incoming comment element, such as <!-- My comment -->
  }
}
```

#### Properties

<Definitions>

- `removed` <Type>boolean</Type>
  - Indicates whether the element has been removed or replaced by one of the previous handlers.

- `text` <Type>string</Type>
  - The text of the comment. This property can be assigned different values, to modify comment’s text.

</Definitions>

#### Methods

<Definitions>

- <Code>before(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Inserts content before the element.

- <Code>after(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Inserts content right after the element.

- <Code>replace(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>Element</Type>

  - Removes the element and inserts content in place of it.

- <Code>remove()</Code> <Type>Element</Type>

  - Removes the element with all its content.

</Definitions>

### Doctype

The `doctype` function on a document handler allows developers to query a document’s [doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype).

```js
class DocumentHandler {
  doctype(doctype) {
    // An incoming doctype element, such as
    // <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
  }
}
```

#### Properties

<Definitions>

- `name` <Type>string | null</Type> <PropMeta>read-only</PropMeta>
  - The doctype name.

- `publicId` <Type>string | null</Type> <PropMeta>read-only</PropMeta>
  - The quoted string in the doctype after the PUBLIC atom.

- `systemId` <Type>string | null</Type> <PropMeta>read-only</PropMeta>
  - The quoted string in the doctype after the SYSTEM atom or immediately after the `publicId`.

</Definitions>

### End

The `end` function on a document handler allows developers to append content to the end of a document.

```js
class DocumentHandler {
  end(end) {
    // The end of the document
  }
}
```

#### Methods

<Definitions>

- <Code>append(content<ParamType>Content</ParamType>, contentOptions<ParamType>ContentOptions</ParamType><PropMeta>optional</PropMeta>)</Code> <Type>DocumentEnd</Type>

  - Inserts content after the end of the document.

</Definitions>

--------------------------------

## Selectors

This is what selectors are and what they are used for.

<Definitions>

  - `*`
    - any element

  - `E`
    - any element of type E

  - `E:nth-child(n)`
    - an E element, the n-th child of its parent

  - `E:first-child`
    - an E element, first child of its parent

  - `E:nth-of-type(n)`
    - an E element, the n-th sibling of its type

  - `E:first-of-type`
    - an E element, first sibling of its type

  - `E:not(s)`
    - an E element that does not match either compound selectors

  - `E.warning`
    - an E element belonging to the class warning

  - `E#myid`
    - an E element with ID equal to myid.

  - `E[foo]`
    - an E element with a foo attribute

  - `E[foo="bar"]`
    - an E element whose foo attribute value is exactly equal to bar

  - `E[foo="bar" i]`
    - an E element whose foo attribute value is exactly equal to any (ASCII-range) case-permutation of bar

  - `E[foo="bar" s]`
    - an E element whose foo attribute value is exactly and case-sensitively equal to bar

  - `E[foo~="bar"]`
    - an E element whose foo attribute value is a list of whitespace-separated values, one of which is exactly equal to bar

  - `E[foo^="bar"]`
    -  an E element whose foo attribute value begins exactly with the string bar

  - `E[foo$="bar"]`
    - an E element whose foo attribute value ends exactly with the string bar

  - `E[foo*="bar"]`
    - an E element whose foo attribute value contains the substring bar

  - <Code>E[foo&#124;="en"]</Code>

    - an E element whose foo attribute value is a hyphen-separated list of values beginning with en

  - `E F`
    - an F element descendant of an E element

  - `E > F`
    - an F element child of an E element

</Definitions>

--------------------------------

## Errors

If a handler throws an exception, parsing is immediately halted, the transformed response body is errored with the thrown exception, and the untransformed response body is canceled (closed). If the transformed response body was already partially streamed back to the client, the client will see a truncated response.

```js
async function handle(request) {
  let oldResponse = await fetch(request)
  let newResponse = new HTMLRewriter()
    .on("*", {
      element(element) {
        throw new Error("A really bad error.")
      },
    })
    .transform(oldResponse)

  // At this point, an expression like `await newResponse.text()`
  // will throw `new Error("A really bad error.")`.
  // Thereafter, any use of `newResponse.body` will throw the same error,
  // and `oldResponse.body` will be closed.

  // Alternatively, this will produce a truncated response to the client:
  return newResponse
}
```

--------------------------------

## See also

- [Introducing `HTMLRewriter`](https://blog.cloudflare.com/introducing-htmlrewriter/)
- [Tutorial: Localize a Website](/tutorials/localize-a-website)
