---
title: Data location
pcx_content_type: concept
weight: 16
---

# Data location

You can restrict a Durable Object to a jurisdiction, or provide a location hint.

## Restrict Durable Objects to a jurisdiction

Durable Objects can be created so that they only run and store data within a specific jurisdiction to comply with local regulations such as the [GDPR](https://gdpr-info.eu/) or [FedRAMP](https://blog.cloudflare.com/cloudflare-achieves-fedramp-authorization/). 

{{<Aside type="note">}}
Jurisdictions are available to all Durable Objects users. 
{{</Aside>}}

To use a jurisdiction, first create a jurisidictional subnamespace in your Worker's code:

```js
let subnamespace = OBJECT_NAMESPACE.jurisdiction('eu');
```

A jurisdictional subnamespace works like a normal Durable Object namespace (`OBJECT_NAMESPACE` above), except that IDs created within them permanently encode the jurisdiction that was used to create the subnamespace. Additionally, the `idFromString()` and `get()` methods will throw an exception if the IDs passed into them are not within the subnamespace's jurisdiction. Once you have a subnamespace, you can use all of the namespace methods documented above.

To create a new Durable Object ID that will only run and persist data within the jurisdiction:

```js
let id = subnamespace.newUniqueId();
```

To derive a unique Object ID from the given name string that will only run and persist data within the jurisdiction:

```js
let id = subnamespace.idFromName(name);
```

{{<Aside type="note" header="IDs derived from the same name but different jurisdictions will differ">}}

Because the jurisdiction is encoded permanently in the Durable Object ID, it is possible to have the same name represent different Durable Objects in different jurisdictions. For example: `OBJECT_NAMESPACE.idFromName('my-name')` and `OBJECT_NAMESPACE.jurisdiction('eu').idFromName('my-name')` represent different Durable Objects. They will have their own transient (in-memory) and persistent state, and will likely run in different geographical regions.

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

While you cannot use an ID from a different jurisdiction in a subnamespace's `idFromString()` or `get()` methods, you can use any valid ID in the top-level namespace's methods. Object IDs created with a jurisdiction will still only run and persist data within the jurisdiction.

```js
let id = subnamespace.idFromName(name);

// This is valid.
OBJECT_NAMESPACE.idFromString(id.toString())

// And so is this.
OBJECT_NAMESPACE.get(id)
```

Your Workers may still access Durable Objects constrained to a jurisdiction from anywhere in the world. The jurisdiction constraint only controls where the Durable Object itself runs and persists data. Consider using [Regional Services](/data-localization/regional-services/) to control the regions from which Cloudflare responds to requests.

The currently supported jurisdictions are `eu` (the European Union) and `fedramp` (FedRAMP).

{{<Aside type="note" header="ID logging">}}

Durable Object IDs will be logged outside of the specified jurisdiction for billing and debugging purposes.

{{</Aside>}}

## Provide a location hint

Durable Objects do not currently move between geographical regions after they are created<sup>1</sup>. By default, Durable Objects are created close to the first client that accesses them via `GET`. 

To manually create Durable Objects in another location, provide an optional `locationHint` parameter to `GET`. Only the first call to `GET` for a particular Object will respect the hint.

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id, { locationHint: 'enam' });
```

The following locations are supported. Hints are a best effort and not a guarantee. 

{{<Aside type="warning">}}
Durable Objects do not currently run in all locations below. The closest nearby region will be used until those locations are fully supported.
{{</Aside>}}

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