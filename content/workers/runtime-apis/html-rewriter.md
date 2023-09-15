---
pcx_content_type: configuration
title: HTMLRewriter
---

# HTMLRewriter

## Background

The `HTMLRewriter` class allows developers to build comprehensive and expressive HTML parsers inside of a Cloudflare Workers application. It can be thought of as a jQuery-like experience directly inside of your Workers application. Leaning on a powerful JavaScript API to parse and transform HTML, `HTMLRewriter` allows developers to build deeply functional applications.

The `HTMLRewriter` class should be instantiated once in your Workers script, with a number of handlers attached using the `on` and `onDocument` functions.

---

## Constructor

```js
new HTMLRewriter().on('*', new ElementHandler()).onDocument(new DocumentHandler());
```

---

## Global types

Throughout the `HTMLRewriter` API, there are a few consistent types that many properties and methods use:

{{<definitions>}}

- `Content` {{<type>}}string{{</type>}}

  - Content inserted in the output stream should be a string.

- `ContentOptions` {{<type>}}Object{{</type>}}

  - `{ html: Boolean }` Controls the way the HTMLRewriter treats inserted content. If the `html` boolean is set to true, content is treated as raw HTML. If the `html` boolean is set to false or not provided, content will be treated as text and proper HTML escaping will be applied to it.

{{</definitions>}}

---

## Handlers

There are two handler types that can be used with `HTMLRewriter`: element handlers and document handlers.

### Element Handlers

An element handler responds to any incoming element, when attached using the `.on` function of an `HTMLRewriter` instance. The element handler should respond to `element`, `comments`, and `text`. The example processes `div` elements with an `ElementHandler` class.

```js
class ElementHandler {
  element(element) {
    // An incoming element, such as `div`
    console.log(`Incoming element: ${element.tagName}`);
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
  }
}

async function handleRequest(req) {
  const res = await fetch(req);

  return new HTMLRewriter().on('div', new ElementHandler()).transform(res);
}
```

### Document Handlers

A document handler represents the incoming HTML document. A number of functions can be defined on a document handler to query and manipulate a document’s `doctype`, `comments`, `text`, and `end`. Unlike an element handler, a document handler’s `doctype`, `comments`, `text`, and `end` functions are not scoped by a particular selector. A document handler's functions are called for all the content on the page including the content outside of the top-level HTML tag:

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

#### Async Handlers

All functions defined on both element and document handlers can return either `void` or a `Promise<void>`. Making your handler function `async` allows you to access external resources such as an API via fetch, Workers KV, Durable Objects, or the cache.

```js
class UserElementHandler {
  async element(element) {
    let response = await fetch(new Request('/user'));

    // fill in user info using response
  }
}

async function handleRequest(req) {
  const res = await fetch(req);

  // run the user element handler via HTMLRewriter on a div with ID `user_info`
  return new HTMLRewriter().on('div#user_info', new UserElementHandler()).transform(res);
}
```

### Element

The `element` argument, used only in element handlers, is a representation of a DOM element. A number of methods exist on an element to query and manipulate it:

#### Properties

{{<definitions>}}

- `tagName` {{<type>}}string{{</type>}}

  - The name of the tag, such as `"h1"` or `"div"`. This property can be assigned different values, to modify an element’s tag.

- `attributes` {{<type>}}Iterator{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  - A `[name, value]` pair of the tag’s attributes.

- `removed` {{<type>}}boolean{{</type>}}

  - Indicates whether the element has been removed or replaced by one of the previous handlers.

- `namespaceURI` {{<type>}}String{{</type>}}
  - Represents the [namespace URI](https://infra.spec.whatwg.org/#namespaces) of an element.

{{</definitions>}}

#### Methods

{{<definitions>}}

- {{<code>}}getAttribute(name{{<param-type>}}string{{</param-type>}}){{</code>}} : {{<type>}}string | null{{</type>}}

  - Returns the value for a given attribute name on the element, or `null` if it is not found.

- {{<code>}}hasAttribute(name{{<param-type>}}string{{</param-type>}}){{</code>}} : {{<type>}}boolean{{</type>}}

  - Returns a boolean indicating whether an attribute exists on the element.

- {{<code>}}setAttribute(name{{<param-type>}}string{{</param-type>}}, value{{<param-type>}}string{{</param-type>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Sets an attribute to a provided value, creating the attribute if it does not exist.

- {{<code>}}removeAttribute(name{{<param-type>}}string{{</param-type>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Removes the attribute.

- {{<code>}}before(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Inserts content before the element.

  {{<render file="_content_and_contentoptions.md">}}

- {{<code>}}after(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Inserts content right after the element.

- {{<code>}}prepend(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Inserts content right after the start tag of the element.

- {{<code>}}append(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Inserts content right before the end tag of the element.

- {{<code>}}replace(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Removes the element and inserts content in place of it.

- {{<code>}}setInnerContent(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Replaces content of the element.

- {{<code>}}remove(){{</code>}} : {{<type>}}Element{{</type>}}

  - Removes the element with all its content.

- {{<code>}}removeAndKeepContent(){{</code>}} : {{<type>}}Element{{</type>}}

  - Removes the start tag and end tag of the element but keeps its inner content intact.

- {{<code>}}onEndTag(handler{{<param-type>}}Function<void>{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Registers a handler that is invoked when the end tag of the element is reached.

{{</definitions>}}

### EndTag

The `endTag` argument, used only in handlers registered with `element.onEndTag`, is a limited representation of a DOM element.

#### Properties

{{<definitions>}}

- `name` {{<type>}}string{{</type>}}

  - The name of the tag, such as `"h1"` or `"div"`. This property can be assigned different values, to modify an element’s tag.

{{</definitions>}}

#### Methods

{{<definitions>}}

- {{<code>}}before(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}EndTag{{</type>}}

  - Inserts content right before the end tag.

- {{<code>}}after(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}EndTag{{</type>}}

  - Inserts content right after the end tag.

  {{<render file="_content_and_contentoptions.md">}}

- {{<code>}}remove(){{</code>}} : {{<type>}}EndTag{{</type>}}

  - Removes the element with all its content.

{{</definitions>}}

### Text chunks

Since Cloudflare performs zero-copy streaming parsing, text chunks are not the same thing as text nodes in the lexical tree. A lexical tree text node can be represented by multiple chunks, as they arrive over the wire from the origin.

Consider the following markup: `<div>Hey. How are you?</div>`. It is possible that the Workers script will not receive the entire text node from the origin at once; instead, the `text` element handler will be invoked for each received part of the text node. For example, the handler might be invoked with `“Hey. How ”,` then `“are you?”`. When the last chunk arrives, the text’s `lastInTextNode` property will be set to `true`. Developers should make sure to concatenate these chunks together.

#### Properties

{{<definitions>}}

- `removed` {{<type>}}boolean{{</type>}}

  - Indicates whether the element has been removed or replaced by one of the previous handlers.

- `text` {{<type>}}string{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  - The text content of the chunk. Could be empty if the chunk is the last chunk of the text node.

- `lastInTextNode` {{<type>}}boolean{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}
  - Specifies whether the chunk is the last chunk of the text node.

{{</definitions>}}

#### Methods

{{<definitions>}}

- {{<code>}}before(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Inserts content before the element.

  {{<render file="_content_and_contentoptions.md">}}

- {{<code>}}after(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Inserts content right after the element.

- {{<code>}}replace(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Removes the element and inserts content in place of it.

- {{<code>}}remove(){{</code>}} : {{<type>}}Element{{</type>}}

  - Removes the element with all its content.

{{</definitions>}}

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

{{<definitions>}}

- `comment.removed` {{<type>}}boolean{{</type>}}

  - Indicates whether the element has been removed or replaced by one of the previous handlers.

- `comment.text` {{<type>}}string{{</type>}}
  - The text of the comment. This property can be assigned different values, to modify comment’s text.

{{</definitions>}}

#### Methods

{{<definitions>}}

- {{<code>}}before(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Inserts content before the element.

  {{<render file="_content_and_contentoptions.md">}}

- {{<code>}}after(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Inserts content right after the element.

- {{<code>}}replace(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}Element{{</type>}}

  - Removes the element and inserts content in place of it.

- {{<code>}}remove(){{</code>}} : {{<type>}}Element{{</type>}}

  - Removes the element with all its content.

{{</definitions>}}

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

{{<definitions>}}

- `doctype.name` {{<type>}}string | null{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  - The doctype name.

- `doctype.publicId` {{<type>}}string | null{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  - The quoted string in the doctype after the PUBLIC atom.

- `doctype.systemId` {{<type>}}string | null{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}
  - The quoted string in the doctype after the SYSTEM atom or immediately after the `publicId`.

{{</definitions>}}

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

{{<definitions>}}

- {{<code>}}append(content{{<param-type>}}Content{{</param-type>}}, contentOptions{{<param-type>}}ContentOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}){{</code>}} : {{<type>}}DocumentEnd{{</type>}}

  - Inserts content after the end of the document.

  {{<render file="_content_and_contentoptions.md">}}

{{</definitions>}}

---

## Selectors

This is what selectors are and what they are used for.

{{<definitions>}}

- `*`

  - Any element.

- `E`

  - Any element of type E.

- `E:nth-child(n)`

  - An E element, the n-th child of its parent.

- `E:first-child`

  - An E element, first child of its parent.

- `E:nth-of-type(n)`

  - An E element, the n-th sibling of its type.

- `E:first-of-type`

  - An E element, first sibling of its type.

- `E:not(s)`

  - An E element that does not match either compound selectors.

- `E.warning`

  - An E element belonging to the class warning.

- `E#myid`

  - An E element with ID equal to myid.

- `E[foo]`

  - An E element with a foo attribute.

- `E[foo="bar"]`

  - An E element whose foo attribute value is exactly equal to bar.

- `E[foo="bar" i]`

  - An E element whose foo attribute value is exactly equal to any (ASCII-range) case-permutation of bar.

- `E[foo="bar" s]`

  - An E element whose foo attribute value is exactly and case-sensitively equal to bar.

- `E[foo~="bar"]`

  - An E element whose foo attribute value is a list of whitespace-separated values, one of which is exactly equal to bar.

- `E[foo^="bar"]`

  - An E element whose foo attribute value begins exactly with the string bar.

- `E[foo$="bar"]`

  - An E element whose foo attribute value ends exactly with the string bar.

- `E[foo*="bar"]`

  - An E element whose foo attribute value contains the substring bar.

- {{<code>}}E\[foo|="en"]{{</code>}}

  - An E element whose foo attribute value is a hyphen-separated list of values beginning with en.

- `E F`

  - An F element descendant of an E element.

- `E > F`
  - An F element child of an E element.

{{</definitions>}}

---

## Errors

If a handler throws an exception, parsing is immediately halted, the transformed response body is errored with the thrown exception, and the untransformed response body is canceled (closed). If the transformed response body was already partially streamed back to the client, the client will see a truncated response.

```js
async function handle(request) {
  let oldResponse = await fetch(request);
  let newResponse = new HTMLRewriter()
    .on('*', {
      element(element) {
        throw new Error('A really bad error.');
      },
    })
    .transform(oldResponse);

  // At this point, an expression like `await newResponse.text()`
  // will throw `new Error("A really bad error.")`.
  // Thereafter, any use of `newResponse.body` will throw the same error,
  // and `oldResponse.body` will be closed.

  // Alternatively, this will produce a truncated response to the client:
  return newResponse;
}
```

---

## Related resources

- [Introducing `HTMLRewriter`](https://blog.cloudflare.com/introducing-htmlrewriter/)
- [Tutorial: Localize a Website](/workers/tutorials/localize-a-website/)
- [Example: rewrite links](/workers/examples/rewrite-links/)
