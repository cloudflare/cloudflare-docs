---
pcx-content-type: configuration
title: Runtime APIs
---

# R2

The in-Worker R2 API is accessed by binding an R2 bucket to a [Worker](/workers). The Worker you write can expose external access to  buckets via a route, or manipulate R2 objects internally.

The R2 API includes some extensions and semantic differences from the S3 API.  If you need S3 compatibility, consider using the [S3 compatible API](/r2/platform/s3-compatibility/).

## Concepts

R2 organizes the data you store, called objects, into containers, called buckets.  Buckets are the fundamental unit of performance scaling and access within R2.

## Creating a binding

{{<Aside type="note" header="Bindings">}}

A binding is a how your Worker interacts with external resources such as [KV Namespaces](/workers/runtime-apis/kv/), [Durable Objects](/workers/runtime-apis/durable-objects/), or [R2 Buckets](#api). A binding is a runtime variable that the Workers runtime provides to your code. You can declare a variable name in your `wrangler.toml` file that will be bound to these resources at runtime, and interact with them through this variable. Every binding's variable name and behavior is determined by you when deploying the Worker. Refer to the [Environment Variables](https://github.com/workers/platform/environment-variables) documentation for more information.

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

The following methods are available on the bucket binding Object injected into your code.

For example, to issue a PUT object request using the binding above:

```js
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const key = url.pathname.slice(1);

  switch (request.method) {
    case "PUT":
      await MY_BUCKET.put(key, request.body);
      return new Response(`Put ${key} successfully!`);
}
```

{{<definitions>}}

- {{<code>}}head(key{{<param-type>}}string{{</param-type>}}, options{{<param-type>}}R2HeadOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}) {{<type>}}Promise\<{{<param-type>}}R2Object{{</param-type>}}|{{<param-type>}}null{{</param-type>}}>{{</type>}}{{</code>}}

  - Retrieves the R2Object for the given key containing only object metadata, if the key exists, and null if the key does not exist.

- {{<code>}}get(key{{<param-type>}}string{{</param-type>}}, options{{<param-type>}}R2GetOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}) {{<type>}}Promise\<{{<param-type>}}R2Object{{</param-type>}}|{{<param-type>}}null{{</param-type>}}>{{</type>}}{{</code>}}

  - Retrieves the R2Object for the given key containing object metadata and the object body as a {{<code>}}{{<param-type>}}ReadableStream{{</param-type>}}{{</code>}}, if the key exists, and null if the key does not exist.
  - In the event that a precondition specified in {{<code>}}options{{</code>}} fails, {{<code>}}get(){{</code>}} returns an {{<code>}}{{<param-type>}}R2Object{{</param-type>}}{{</code>}} with {{<code>}}body{{</code>}} undefined.

- {{<code>}}put(key{{<param-type>}}string{{</param-type>}}, value{{<param-type>}}ReadableStream{{</param-type>}}|{{<param-type>}}ArrayBuffer{{</param-type>}}|{{<param-type>}}ArrayBufferView{{</param-type>}}|{{<param-type>}}string{{</param-type>}}|{{<param-type>}}null{{</param-type>}}|{{<param-type>}}Blob{{</param-type>}}, options{{<param-type>}}R2PutOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}) {{<type>}}Promise\<{{<param-type>}}R2Object{{</param-type>}}>{{</type>}}{{</code>}}

  - Stores the given {{<code>}}value{{</code>}} and metadata under the associated {{<code>}}key{{</code>}}. Once the write succeeds, returns an R2Object containing metadata about the stored Object.
  - R2 writes are strongly consistent.  Once the Promise resolves, all subsequent read operations will see this key value pair globally.

- {{<code>}}delete(key{{<param-type>}}string{{</param-type>}}) {{<type>}}Promise\<{{<param-type>}}void {{</param-type>}}>{{</type>}}{{</code>}}

  - Deletes the given {{<code>}}value{{</code>}} and metadata under the associated {{<code>}}key{{</code>}}. Once the delete succeeds, returns {{<code>}}void{{</code>}}.
   - R2 deletes are strongly consistent.  Once the Promise resolves, all subsequent read operations will no longer see this key value pair globally.

- {{<code>}}list(options{{<param-type>}}R2ListOptions{{</param-type>}}{{<prop-meta>}}optional{{</prop-meta>}}) {{<type>}}Promise\<{{<param-type>}}R2Objects{{</param-type>}}|{{<param-type>}}null{{</param-type>}}>{{</type>}}{{</code>}}

  - Returns an {{<code>}}R2Objects{{</code>}} containing a list of {{<code>}}R2Object{{</code>}} contained within the bucket. By default, returns the first 1000 entries.

{{</definitions>}}

## R2Object definition

{{<definitions>}}

* `key` {{<type>}}string{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  * The object's key.

* `body` {{<type>}}ReadableStream{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  * Stream of the body contents.

* `bodyUsed` {{<type>}}Boolean{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  * Declares whether the body has been used in a response yet.

* `arrayBuffer()` {{<type>}}Promise\<ArrayBuffer>{{</type>}}

  * Returns a promise that resolves with an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) representation of the request body.

* `text()` {{<type>}}Promise\<string>{{</type>}}

  * Returns a promise that resolves with a string (text) representation of the request body.

* `json()` {{<type>}}Promise\<Object>{{</type>}}

  * Returns a promise that resolves with a JSON representation of the request body.

* `blob()` {{<type>}}Promise\<Blob>{{</type>}}

  * Returns a Promise that resolves to a binary Blob containing the object's value.

* `version` {{<type>}}string{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  * Random unique string associated with a specific upload of a key.

* `size` {{<type>}}number{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  * Size of the object in bytes.

* `etag` {{<type>}}string{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  * The etag associated with the object upload.

* `httpEtag` {{<type>}}string{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  * The object's etag, in quotes so as to be returned as a header.

* `uploaded` {{<type>}}Date{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  * A `Date` object representing the time the object was uploaded.

* `httpMetadata` {{<type>}}R2HTTPMetadata | Headers{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  *  Various HTTP headers associated with the object. See [HTTP Metadata](#http-metadata).

* `customMetadata` {{<type>}}Record\<string, string>{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  * A map of custom, user-defined metadata that will be stored with the object.

* `writeHttpMetadata{{<type>}}Record\<test, test>{{</type>}}`

{{</definitions>}}

## Method-specific types

### R2GetOptions

{{<definitions>}}

* `onlyIf` {{<type>}}R2Conditional{{</type>}}

  * Specifies that the Object should only be returned given satisfaction of certain conditions in the `R2Conditional`. See [Conditional Operations](#conditional-operations).

{{</definitions>}}

### Ranged reads

`R2GetOptions` accepts a `length` parameter, which restricts data returned in `body` to be `length` bytes, starting from `offset`, inclusive.

{{<definitions>}}

* `offset` {{<type>}}number{{</type>}}

  * The byte to begin returning data from, inclusive.

* `length` {{<type>}}number{{</type>}}

  * The number of bytes to return. If more bytes are requested than exist in the object, fewer bytes than this number may be returned.

{{</definitions>}}

### R2PutOptions

{{<definitions>}}

* `httpMetadata` {{<type>}}R2HTTPMetadata | Headers{{</type>}}  {{<prop-meta>}}optional{{</prop-meta>}}

  * Various HTTP headers associated with the object. See [HTTP Metadata](#http-metadata).

* `customMetadata` {{<type>}}Record\<string, string>{{</type>}}  {{<prop-meta>}}optional{{</prop-meta>}}

  * A map of custom, user-defined metadata that will be stored with the object.

* `md5` {{<type>}}ArrayBuffer | string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * A md5 hash to use to check the received object's integrity.

* `sha1` {{<type>}}ArrayBuffer | string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * A sha1 hash to use to check the received object's integrity.

{{</definitions>}}

### R2ListOptions

{{<definitions>}}

* `limit` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * The number of results to return. Defaults to 1000, with a maximum of 1000.

* `prefix` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * The prefix to match keys against. Keys will only be returned if they start with given prefix.

* `cursor` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * An opaque token that indicates where to continue listing objects from. A cursor can be retrieved from a previous `list` operation.

* `delimiter` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * The character to use when grouping keys.

* `include` {{<type>}}Array\<string\>{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * Can include `httpMetadata` and/or `customMetadata`. If included, items returned by the `list` will include the specified metadata.

  * Note that there is a limit on the total amount of data that a single `list` operation can return. If you request data, you may receive fewer than `limit` results in your response to accommodate metadata.

    This means applications must be careful to **avoid** code like the following:

    ```js
    while (listed.length < limit) {
      listed = myBucket.list({ limit, include: ['customMetadata'] })
    }
    ```

    Instead, use the `truncated` property to determine if the `list` request has more data to be returned.

{{</definitions>}}

### R2Objects

An object containing an `R2Object` array, returned by `BUCKET_BINDING.list()`.

{{<definitions>}}

* `objects` {{<type>}}Array\<R2Object\>{{</type>}}

  * An array of objects matching the `list` request.

* `truncated` {{<type>}}string{{</type>}}

  * If true, indicates there are more results to be retrieved for the current `list` request.

* `cursor` {{<type>}}string{{</type>}}

  * A token that can be passed to future `list` calls to resume listing from that point. Only present if truncated is true.

* `delimitedPrefixes` {{<type>}}Array\<string\>{{</type>}}

  * If a delimiter has been specified, contains all prefixes between the specified prefix and the next occurrence of the delimiter.

  * For example, if no prefix is provided and the delimiter is '/', `foo/bar/baz` would return `foo` as a delimited prefix. If `foo/` was passed as a prefix with the same structure and delimiter, `foo/bar` would be returned as a delimited prefix.

{{</definitions>}}

### Conditional operations

You can pass an `R2Conditional` object to `R2GetOptions`. If the condition check fails, the body will not be returned. This will make `get` requests have lower latency.

{{<definitions>}}

* `etagMatches` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * Performs the operation if the object's etag matches the given string.

* `etagDoesNotMatch` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * Performs the operation if the object's etag does not match the given string.

* `uploadedBefore` {{<type>}}Date{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * Performs the operation if the object was uploaded before the given date.

* `uploadedAfter` {{<type>}}Date{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  * Performs the operation if the object was uploaded after the given date.

{{</definitions>}}

For more information about conditional requests, see [RFC 7232](https://datatracker.ietf.org/doc/html/rfc7232).

### HTTP Metadata

Generally, these fields match the HTTP metadata passed when the object was created. They can be overriden when issuing `get` requests, in which case the given values will be echoed back in the response.

{{<definitions>}}

* `contentType` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

* `contentLanguage` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

* `contentDisposition` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

* `contentEncoding` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

* `cacheControl` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

* `cacheExpiry` {{<type>}}Date{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

 {{</definitions>}}