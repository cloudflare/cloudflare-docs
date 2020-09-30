# Class

## Background

The `Class` class is used whenever you’re trying to create an instance. It’s particularly useful when you’re trying to create multiple instances. Here are some common uses:

- [Tutorial which uses Class](#)
- [Example which uses Class](#)
- [Another example which uses Class](#)

--------------------------------

## Constructor

```js
const instance = new Class()
```

### Properties

<Definitions>

- `instance.title` <Type>string</Type> <PropMeta>read-only</PropMeta>

  - The title of the instance

- `instance.visible` <Type>boolean</Type> <PropMeta>read-only</PropMeta>

  - Boolean indicating if the instance is visible

</Definitions>

### Methods

<Definitions>

- <Code>setTitle(newTitle<ParamType>string</ParamType>)</Code>

  - Sets the title to `newTitle`.

- <Code>hide()</Code> <Type>boolean</Type>

  - Attempts to hide the instance. Returns a boolean whether hiding was successful.

</Definitions>

--------------------------------

## Common issues

Sometimes you’ll find that when you create instances of `Class`, unexpected things happen. It’s important to remember that you can always [debug your `Class`](#learning-page-about-debugging).

--------------------------------

## See also

- [`RelatedClass`](#)
- [`OtherRelatedClass`](#)
- [An external link to relevant documentation, e.g. on MDN](https://example.com)
- [A page about writing JS in general](#)
