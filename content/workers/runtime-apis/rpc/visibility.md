---
pcx_content_type: configuration
title: Visibility and Security Model
weight: 3
meta:
  title: Workers RPC — Visibility and Security Model
  description: Which properties are and are not exposed to clients that communicate with your Worker or Durable Object via RPC
---

# Visibility and Security Model

## Security Model

The Workers RPC system is intended to allow safe communications between Workers that do not trust each other. The system does not allow either side of an RPC session to access arbitrary objects on the other side, much less invoke arbitrary code. Instead, each side can only invoke the objects and functions for which they have explicitly received stubs via previous calls.

This security model is commonly known as Object Capabilities, or Capability-Based Security. Workers RPC is built on [Cap'n Proto RPC](https://capnproto.org/rpc.html), which in turn is based on CapTP, the object transport protocol used by the [distributed programming language E](https://www.crockford.com/ec/etut.html).

## Visibility of Methods and Properties

### Private properties

[Private properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties) of classes are not directly exposed over RPC.

### Class instance properties

When you send an instance of an application-defined class, the recipient can only access methods and properties declared on the class, not properties of the instance. For example:

```js
class Foo extends RpcTarget {
  constructor() {
    super();

    // i CANNOT be accessed over RPC
    this.i = 0;

    // funcProp CANNOT be called over RPC
    this.funcProp = () => {}
  }

  // value CAN be accessed over RPC
  get value() {
    return this.i;
  }

  // method CAN be called over RPC
  method() {}
}
```

This behavior is intentional — it is intended to protect you from accidentally exposing private class internals. Generally, instance properties should be declared private, [by prefixing them with `#`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties). However, private properties are a relatively new feature of JavaScript, and are not yet widely used in the ecosystem.

Since the RPC interface between two of your Workers may be a security boundary, we need to be extra-careful, so instance properties are always private when communicating between Workers using RPC, whether or not they have the `#` prefix. You can always declare an explicit getter at the class level if you wish to expose the property, as shown above.

These visibility rules apply only to objects that extend `RpcTarget`, `WorkerEntrypoint`, or `DurableObject`, and do not apply to plain objects. Plain objects are passed "by value", sending all of their "own" properties.

### "Own" properties of functions

When you pass a function over RPC, the caller can access the "own" properties of the function object itself.

```js
someRpcMethod() {
  let func = () => {};
  func.prop = 123;  // `prop` is visible over RPC
  return func;
}
```

Such properties on a function are accessed asynchronously, like class properties of an RpcTarget. But, unlike the `RpcTarget` example above, the function's instance properties that are accessible to the caller. In practice, properties are rarely added to functions.