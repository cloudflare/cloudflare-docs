---
title: Create Durable Objects
pcx_content_type: concept
weight: 16
---

# Create Durable Objects

A Durable Object is a client object used to send requests to a remote Durable Object.

`OBJECT_NAMESPACE.get(id)` creates a Durable Object.

Durable Objects implement E-order semantics. When you make multiple calls to the same Durable Object, it is guaranteed that the calls will be delivered to the remote Object in the order in which you made them. E-order semantics makes many distributed programming problems easier. 

However, due to random network disruptions or other transient issues, an Object may become disconnected from its remote Object. A disconnected Object is a permanently broken Object. In this scenario, all in-flight calls and future calls will fail with exceptions. 

To make new requests to the Durable Object, you must call `OBJECT_NAMESPACE.get(id)` again to get a new Object, keeping in mind that there are no ordering guarantees between requests to the new Object compared to the old one. If ordering is not a concern, you can create a new Object for every request.

{{<Aside type="note" header="E-order">}}

E-order is a concept deriving from the [E distributed programming language](<https://en.wikipedia.org/wiki/E_(programming_language)>). E-order is implemented by the [Cap'n Proto](https://capnproto.org) distributed object-capability RPC protocol, which Cloudflare Workers uses for internal communications.

{{</Aside>}}

## Obtain a Durable Object

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id);
```

### Parameters

{{<definitions>}}

- `id` {{<type>}}DurableObjectId{{</type>}}
  - An ID constructed using `newUniqueId()`, `idFromName()`, or `idFromString()` on this namespace.

  - This method constructs an Object, which is a local client that provides access to a remote Durable Object.

  - If the remote Object does not already exist, it will be created. Thus, there will always be an Object accessible from the stub.

  - This method always returns the Object immediately, before it has connected to the remote Object. This allows you to begin making requests to the Object right away, without waiting for a network round trip.

{{</definitions>}}

## Provide a location hint

Durable Objects do not currently move between geographical regions after they are created<sup>1</sup>. By default, Durable Objects are created close to the first client that accesses them via `GET`. 

To manually create Durable Objects in another location, provide an optional `locationHint` parameter to `GET`. Only the first call to `GET` for a particular object will respect the hint.

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id, { locationHint: 'enam' });
```

The following locations are supported. Hints are a best effort and not a guarantee. Durable Objects do not currently run in all of the locations below. The closest nearby region will be used until those locations are fully supported.

| Location Hint Parameter  | Location              |
| ------------------------ | --------------------- |
| wnam                     | Western North America |
| enam                     | Eastern North America |
| sam                      | South America         |
| weur                     | Western Europe        |
| eeur                     | Eastern Europe        |
| apac                     | Asia-Pacific          |
| oc                       | Oceania               |
| afr                      | Africa                |
| me                       | Middle East           |

<sup>1</sup> Dynamic relocation of existing Durable Objects is planned for the future.

## Restrict Durable Objects to a jurisdiction

Durable Objects can be created so that they only run and store data within a specific jurisdiction to comply with local regulations such as the [GDPR](https://gdpr-info.eu/) or [FedRAMP](https://blog.cloudflare.com/cloudflare-achieves-fedramp-authorization/). 

To use a jurisdiction, first create a jursidictional subnamespace:

```js
let subnamespace = OBJECT_NAMESPACE.jurisdiction('eu');
```

A jurisdictional subnamespace works like a normal Durable Object namespace (`OBJECT_NAMESPACE` above), except that IDs created within them permanently encode the jurisdiction that was used to create the subnamespace. Additionally, the `idFromString` and `get` methods will throw an exception if the IDs passed into them are not within the subnamespace's jurisdiction. Once you have a subnamespace you can use all of the namespace methods documented above.

To create a new Object ID that will only run and persist data within the jurisdiction:

```js
let id = subnamespace.newUniqueId();
```

To derive a unique object ID from the given name string that will only run and persist data within the jurisdiction:

```js
let id = subnamespace.idFromName(name);
```

{{<Aside type="note" header="IDs derived from the same name but different jurisdictions will differ">}}

Because the jurisdiction is encoded permanently in the Object ID, it is possible to have the same name represent different objects in different jurisdictions. For example: `OBJECT_NAMESPACE.idFromName('my-name')` and `OBJECT_NAMESPACE.jurisdiction('eu').idFromName('my-name')` represent different objects. They will have their own transient (in-memory) and persistent state, and will likely run in different geographical regions.

This may be counterintuitive at first, but it would be impossible to enforce two different non-overlapping jurisdictions for a single name. The key insight to remember is that Durable Object namespaces operate on IDs, not names, and the jurisdiction is a permanent part of the ID.

{{</Aside>}}

To parse a previously-created ID from a string:

```js
let id = subnamespace.idFromString(id);
```

To obtain an Object:

```js
let durableObjectStub = subnamespace.get(id)
```

While you cannot use an ID from a different jurisdiction in a subnamespace's `idFromString` or `get` methods, you can use any valid ID in the top-level namespace's methods. Object IDs created with a jurisdiction will still only run and persist data within the jurisdiction.

```js
let id = subnamespace.idFromName(name);

// This is valid.
OBJECT_NAMESPACE.idFromString(id.toString())

// And so is this.
OBJECT_NAMESPACE.get(id)
```

Your Workers may still access Objects constrained to a jurisdiction from anywhere in the world. The jurisdiction constraint only controls where the Durable Object itself runs and persists data. Consider using [Regional Services](https://blog.cloudflare.com/introducing-regional-services/) to control the regions from which Cloudflare responds to requests.

The currently supported jurisdictions are `eu` (the European Union) and `fedramp` (FedRAMP).

{{<Aside type="note" header="ID logging">}}

Object IDs will be logged outside of the specified jurisdiction for billing and debugging purposes.

{{</Aside>}}

## Send HTTP requests

```js
let response = await durableObjectStub.fetch(request);
let response = await durableObjectStub.fetch(url, options);
```

The `fetch()` method of a stub has the exact same signature as the global [`fetch`](/workers/runtime-apis/fetch/). However, instead of sending an HTTP request to the Internet, the request is always sent to the Durable Object to which the Object points.

Any uncaught exceptions thrown by the Durable Object's `fetch()` handler will be propagated to the caller's `fetch()` promise. 

If an uncaught exception is thrown by the Durable Object's `fetch()` handler, then the exception propagated to the caller's `fetch()` promise will include a `.remote` property, which will be set to `True`. 

If the caller's `fetch()` failed as a result of being unable to reach the Durable Object, the exception thrown to the caller's `fetch()` will not have the `.remote` property, indicating the exception was not generated remotely.

## List Durable Objects

The Cloudflare REST API supports retrieving a [list of Durable Objects](/api/operations/durable-objects-namespace-list-objects) within a namespace and a [list of namespaces](/api/operations/durable-objects-namespace-list-namespaces) associated with an account.


