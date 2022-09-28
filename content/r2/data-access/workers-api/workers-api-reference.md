---
pcx_content_type: reference
title: Workers API Reference
---

# R2

The in-Worker R2 API is accessed by binding an R2 bucket to a [Worker](/workers). The Worker you write can expose external access to  buckets via a route or manipulate R2 objects internally.

The R2 API includes some extensions and semantic differences from the S3 API. If you need S3 compatibility, consider using the [S3-compatible API](/r2/data-access/s3-api/).

## Concepts

R2 organizes the data you store, called objects, into containers, called buckets. Buckets are the fundamental unit of performance, scaling, and access within R2.

## Create a binding

{{<Aside type="note" header="Bindings">}}

A binding is a how your Worker interacts with external resources such as [KV Namespaces](/workers/runtime-apis/kv/), [Durable Objects](/workers/runtime-apis/durable-objects/), or [R2 Buckets](#api). A binding is a runtime variable that the Workers runtime provides to your code. You can declare a variable name in your `wrangler.toml` file that will be bound to these resources at runtime, and interact with them through this variable. Every binding's variable name and behavior is determined by you when deploying the Worker. Refer to [Environment Variables](/workers/platform/environment-variables) for more information.

A binding is defined in the `wrangler.toml` file of your Worker project's directory.

{{</Aside>}}

To bind your R2 bucket to your Worker, add the following to your `wrangler.toml` file. Update the `binding` property to a valid JavaScript variable identifier and `bucket_name` to the name of your R2 bucket:

```toml
[[r2_buckets]]
binding = 'MY_BUCKET' # <~ valid JavaScript variable name
bucket_name = '<YOUR_BUCKET_NAME>'
```

Within your Worker, your bucket binding is now available under the `MY_BUCKET` variable and you can begin interacting with it using the [bucket methods](#bucket-methods) described below.

## Bucket method definitions

The following methods are available on the bucket binding object injected into your code.

For example, to issue a `PUT` object request using the binding above:

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const key = url.pathname.slice(1);

		switch (request.method) {
			case 'PUT':
				await env.MY_BUCKET.put(key, request.body);
				return new Response(`Put ${key} successfully!`);

			default:
				return new Response(`${request.method} is not allowed.`, {
					status: 405,
					headers: {
						Allow: 'PUT',
					},
				});
		}
	},
};
```

{{<definitions>}}

- {{<code>}}head(key{{<param-type>}}string{{</param-type>}}) {{<type>}}Promise\<{{<param-type>}}R2Object{{</param-type>}}|{{<param-type>}}null{{</param-type>}}>{{</type>}}{{</code>}}

  - Retrieves the `R2Object` for the given key containing only object metadata, if the key exists, and null if the key does not exist.

- {{<code>}}get(key{{<param-type>}}string{{</param-type>}}, options{{<param-type>}}R2GetOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}) {{<type>}}Promise\<{{<param-type>}}R2ObjectBody{{</param-type>}}|{{<param-type>}}R2Object{{</param-type>}}|{{<param-type>}}null{{</param-type>}}>{{</type>}}{{</code>}}

  - Retrieves the `R2Object` for the given key containing object metadata and the object body as a {{<code>}}{{<param-type>}}ReadableStream{{</param-type>}}{{</code>}}, if the key exists, and `null` if the key does not exist.
  - In the event that a precondition specified in {{<code>}}options{{</code>}} fails, {{<code>}}get(){{</code>}} returns an {{<code>}}{{<param-type>}}R2Object{{</param-type>}}{{</code>}} with {{<code>}}body{{</code>}} undefined.

- {{<code>}}put(key{{<param-type>}}string{{</param-type>}}, value{{<param-type>}}ReadableStream{{</param-type>}}|{{<param-type>}}ArrayBuffer{{</param-type>}}|{{<param-type>}}ArrayBufferView{{</param-type>}}|{{<param-type>}}string{{</param-type>}}|{{<param-type>}}null{{</param-type>}}|{{<param-type>}}Blob{{</param-type>}}, options{{<param-type>}}R2PutOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}) {{<type>}}Promise\<{{<param-type>}}R2Object{{</param-type>}}>{{</type>}}{{</code>}}

  - Stores the given {{<code>}}value{{</code>}} and metadata under the associated {{<code>}}key{{</code>}}. Once the write succeeds, returns an `R2Object` containing metadata about the stored Object.
  - R2 writes are strongly consistent. Once the Promise resolves, all subsequent read operations will see this key value pair globally.

- {{<code>}}delete(key{{<param-type>}}string{{</param-type>}}) {{<type>}}Promise\<{{<param-type>}}void {{</param-type>}}>{{</type>}}{{</code>}}

  - Deletes the given {{<code>}}value{{</code>}} and metadata under the associated {{<code>}}key{{</code>}}. Once the delete succeeds, returns {{<code>}}void{{</code>}}.
   - R2 deletes are strongly consistent. Once the Promise resolves, all subsequent read operations will no longer see this key value pair globally.

- {{<code>}}list(options{{<param-type>}}R2ListOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}) {{<type>}}Promise\<{{<param-type>}}R2Objects{{</param-type>}}|{{<param-type>}}null{{</param-type>}}>{{</type>}}{{</code>}}

  - Returns an {{<code>}}R2Objects{{</code>}} containing a list of {{<code>}}R2Object{{</code>}} contained within the bucket. By default, returns the first 1000 entries.

{{</definitions>}}

## `R2Object` definition

`R2Object` is created when you `PUT` an object into an R2 bucket. `R2Object` represents the metadata of an object based on the information provided by the uploader. Every object that you `PUT` into an R2 bucket will have an `R2Object` created.

{{<definitions>}}

- {{<code>}}key{{<param-type>}}string{{</param-type>}}{{</code>}}

  - The object's key.

- {{<code>}}body{{<param-type>}}ReadableStream{{</param-type>}}{{</code>}}

  - The object's value.

- {{<code>}}bodyUsed{{<param-type>}}boolean{{</param-type>}}{{</code>}}

  - Whether the object's value has been consumed or not.

- {{<code>}}arrayBuffer(){{<type>}}Promise\<{{<param-type>}}ArrayBuffer{{</param-type>}}>{{</type>}}{{</code>}}

  - Returns a Promise that resolves to an `ArrayBuffer` containing the object's value.

- {{<code>}}text(){{<type>}}Promise\<{{<param-type>}}string{{</param-type>}}{{</type>}}>{{</code>}}

  - Returns a Promise that resolves to an string containing the object's value.

- {{<code>}}json<T>(){{<type>}}Promise\<{{<param-type>}}T{{</param-type>}}{{</type>}}>{{</code>}}

  - Returns a Promise that resolves to the given object containing the object's value.

- {{<code>}}blob(){{<type>}}Promise\<{{<param-type>}}Blob{{</param-type>}}{{</type>}}>{{</code>}}

  - Returns a Promise that resolves to a binary Blob containing the object's value.

- {{<code>}}version{{<param-type>}}string{{</param-type>}}{{</code>}}

  - Random unique string associated with a specific upload of a key.

- {{<code>}}size{{<param-type>}}number{{</param-type>}}{{</code>}}

  - Size of the object in bytes.

- {{<code>}}etag{{<param-type>}}string{{</param-type>}}{{</code>}}

  - The etag associated with the object upload.

- {{<code>}}httpEtag{{<param-type>}}string{{</param-type>}}{{</code>}}

  - The object's etag, in quotes so as to be returned as a header.

- {{<code>}}uploaded{{<param-type>}}Date{{</param-type>}}{{</code>}}

  - A Date object representing the time the object was uploaded.

- {{<code>}}httpMetadata{{<param-type>}}R2HTTPMetadata{{</param-type>}}{{</code>}}

  - Various HTTP headers associated with the object. Refer to [HTTP Metadata](#http-metadata).

- {{<code>}}customMetadata{{<param-type>}}Record\<string, string>{{</param-type>}}{{</code>}}

  - A map of custom, user-defined metadata associated with the object.
  
- {{<code>}}range{{</code>}} {{<param-type>}}R2Range{{</param-type>}}

  - A `R2Range` object containing the returned range of the object.

- {{<code>}}writeHttpMetadata(headers{{<param-type>}}Headers{{</param-type>}}){{</code>}} {{<type>}}void{{</type>}}

  -  Retrieves the `httpMetadata` from the `R2Object` and applies their corresponding HTTP headers to the `Headers` input object. Refer to [HTTP Metadata](#http-metadata).

{{</definitions>}}

## Method-specific types

### R2GetOptions

{{<definitions>}}

- {{<code>}}onlyIf{{<param-type>}}R2Conditional{{</param-type>}}{{</code>}}

  - Specifies that the object should only be returned given satisfaction of certain conditions in the `R2Conditional`. Refer to [Conditional operations](#conditional-operations).
  
- {{<code>}}range{{<param-type>}}R2Range{{</param-type>}}{{</code>}}

  - Specifies that only a specific length (from an optional offset) or suffix of bytes from the object should be returned. Refer to [Ranged reads](#ranged-reads).

{{</definitions>}}

#### Ranged reads

`R2GetOptions` accepts a `range` parameter, which can be used to restrict the data returned in `body`.

There are 3 variations of arguments that can be used in a range:

* An offset with an optional length.
* An optional offset with a length.
* A suffix.

{{<definitions>}}

- {{<code>}}offset{{<param-type>}}number{{</param-type>}}{{</code>}}

  - The byte to begin returning data from, inclusive.

- {{<code>}}length{{<param-type>}}number{{</param-type>}}{{</code>}}

  - The number of bytes to return. If more bytes are requested than exist in the object, fewer bytes than this number may be returned.
  
- {{<code>}}suffix{{<param-type>}}number{{</param-type>}}{{</code>}}

  - The number of bytes to return from the end of the file, starting from the last byte. If more bytes are requested than exist in the object, fewer bytes than this number may be returned.

{{</definitions>}}

### R2PutOptions

{{<definitions>}}

- {{<code>}}httpMetadata{{<param-type>}}R2HTTPMetadata{{</param-type>}}|{{<param-type>}}Headers{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - Various HTTP headers associated with the object. Refer to [HTTP Metadata](#http-metadata).

- {{<code>}}customMetadata{{<param-type>}}Record\<string, string>{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - A map of custom, user-defined metadata that will be stored with the object.

- {{<code>}}md5{{<param-type>}}ArrayBuffer{{</param-type>}}|{{<param-type>}}string{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}{{</code>}}

  - A md5 hash to use to check the received object's integrity.

{{</definitions>}}

### R2ListOptions

{{<definitions>}}

- {{<code>}}limit{{<param-type>}}number{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}
  - The number of results to return. Defaults to `1000`, with a maximum of `1000`.

- {{<code>}}prefix{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}
  - The prefix to match keys against. Keys will only be returned if they start with given prefix. 

- {{<code>}}cursor{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}
  - An opaque token that indicates where to continue listing objects from. A cursor can be retrieved from a previous list operation.

- {{<code>}}delimiter{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}
  - The character to use when grouping keys.

- {{<code>}}include{{<param-type>}}Array\<string\>{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}
  - Can include `httpMetadata` and/or `customMetadata`. If included, items returned by the list will include the specified metadata.

  - Note that there is a limit on the total amount of data that a single `list` operation can return. If you request data, you may recieve fewer than `limit` results in your response to accomodate metadata.

  - The [compatibility date](/workers/platform/compatibility-dates/) must be set to `2022-08-04` or later in your `wrangler.toml` file. If not, then the `r2_list_honor_include` compatibility flag must be set. Otherwise it is treated as `include: ['httpMetadata', 'customMetadata']` regardless of what the `include` option provided actually is.

  This means applications must be careful to avoid comparing the amount of returned objects against your `limit`. Instead, use the `truncated` property to determine if the `list` request has more data to be returned.

```js
---
filename: index.js
---
const options = {
  limit: 500,
  include: ['customMetadata'],
}

const listed = await env.MY_BUCKET.list(options);

let truncated = listed.truncated;
let cursor = truncated ? listed.cursor : undefined;

// ❌ - if your limit can't fit into a single response or your
// bucket has less objects than the limit, it will get stuck here.
while (listed.objects.length < options.limit) {
  // ...
}

// ✅ - use the truncated property to check if there are more
// objects to be returned
while (truncated) {
  const next = await env.MY_BUCKET.list({
    ...options,
    cursor: cursor,
  });
  listed.objects.push(...next.objects);

  truncated = next.truncated;
  cursor = next.cursor
}
```

{{</definitions>}}

### R2Objects

An object containing an `R2Object` array, returned by `BUCKET_BINDING.list()`.

{{<definitions>}}

- {{<code>}}objects{{<param-type>}}Array\<{{<type>}}R2Object{{</type>}}\>{{</param-type>}}{{</code>}}

  - An array of objects matching the `list` request.

- {{<code>}}truncated{{<param-type>}}boolean{{</param-type>}}{{</code>}}

  - If true, indicates there are more results to be retrieved for the current `list` request.

- {{<code>}}cursor{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

  - A token that can be passed to future `list` calls to resume listing from that point. Only present if truncated is true.

- {{<code>}}delimitedPrefixes{{<param-type>}}Array\<{{<type>}}string{{</type>}}\>{{</param-type>}}{{</code>}}

  - If a delimiter has been specified, contains all prefixes between the specified prefix and the next occurence of the delimiter.
  
  - For example, if no prefix is provided and the delimiter is '/', `foo/bar/baz` would return `foo` as a delimited prefix. If `foo/` was passed as a prefix with the same structure and delimiter, `foo/bar` would be returned as a delimited prefix. 

{{</definitions>}}

### Conditional operations

You can pass an `R2Conditional` object to `R2GetOptions`.  If the condition check fails, the body will not be returned. This will make `get()` have lower latency.

{{<definitions>}}

- {{<code>}}etagMatches{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

  - Performs the operation if the object's etag matches the given string.

- {{<code>}}etagDoesNotMatch{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

  - Performs the operation if the object's etag does not match the given string.

- {{<code>}}uploadedBefore{{<param-type>}}Date{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

  - Performs the operation if the object was uploaded before the given date.

- {{<code>}}uploadedAfter{{<param-type>}}Date{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

  - Performs the operation if the object was uploaded after the given date.

 {{</definitions>}}

For more information about conditional requests, refer to [RFC 7232](https://datatracker.ietf.org/doc/html/rfc7232).

### HTTP Metadata

Generally, these fields match the HTTP metadata passed when the object was created.  They can be overridden when issuing `GET` requests, in which case, the given values will be echoed back in the response.

{{<definitions>}}

- {{<code>}}contentType{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

- {{<code>}}contentLanguage{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

- {{<code>}}contentDisposition{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

- {{<code>}}contentEncoding{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

- {{<code>}}cacheControl{{<param-type>}}string{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

- {{<code>}}cacheExpiry{{<param-type>}}Date{{<prop-meta>}}optional{{</prop-meta>}}{{</param-type>}}{{</code>}}

 {{</definitions>}}
