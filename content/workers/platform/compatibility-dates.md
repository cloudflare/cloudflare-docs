---
pcx_content_type: concept
title: Compatibility dates
---

# Compatibility dates

Cloudflare regularly updates the Workers runtime. These updates apply to all Workers globally and should never cause a Worker that is already deployed to stop functioning. Sometimes, though, some changes may be backwards-incompatible. In particular, there might be bugs in the runtime API that existing Workers may inadvertently depend upon. Cloudflare implements bug fixes that new Workers can opt into while existing Workers will continue to see the buggy behavior to prevent breaking deployed Workers.

Compatibility dates (and flags) are how you, as a developer, opt into these changes. By specifying a `compatibility_date` in your `wrangler.toml` file, that Worker enables all changes that were made before the given date.

```toml
# (in wrangler.toml)
# Opt into backwards-incompatible changes through April 5, 2022.
compatibility_date = "2022-04-05"
```

When you start your project, you should always set `compatibility_date` to the current date. You should occasionally update the `compatibility_date` field. When updating, you should refer to this page to find out what has changed, and you should be careful to test your Worker to see if the changes affect you, updating your code as necessary. The new compatibility date takes effect when you next run the `wrangler publish` command.

There is no need to update your `compatibility_date` if you do not want to. The Workers runtime will support old compatibility dates forever. If, for some reason, Cloudflare finds it is necessary to make a change that will break live Workers, Cloudflare will actively contact affected developers. That said, Cloudflare aims to avoid this if at all possible.

However, even though you do not need to update the `compatibility_date` field, it is a good practice to do so for two reasons:

1.  Sometimes, new features can only be made available to Workers that have a current `compatibility_date`. To access the latest features, you need to stay up-to-date.
2.  Generally, other than this page, the Workers documentation may only describe the current `compatibility_date`, omitting information about historical behavior. If your Worker uses an old `compatibility_date`, you will need to continuously refer to this page in order to check if any of the APIs you are using have changed.

## Compatibility flags

In addition to setting a `compatibility_date` in your `wrangler.toml` file, you may also provide a list of `compatibility_flags`, which enable or disable specific changes.

```toml
# (in wrangler.toml)
# Opt into backwards-incompatible changes through September 14, 2021.
compatibility_date = "2021-09-14"
# Also opt into an upcoming fix to the FormData API.
compatibility_flags = [ "formdata_parser_supports_files" ]
```

This example enabled the specific flag `formdata_parser_supports_files`, which is described below. As of the specified date, `2021-09-14`, this particular flag was not yet enabled by default, but specifying it in this way enables it anyway. `compatibility_flags` can also be used to disable changes that became the default in the past.

Most developers will not need to use `compatibility_flags`; instead, Cloudflare recommends only specifying `compatibility_date`. `compatibility_flags` can be useful if you want to help the Workers team test upcoming changes that are not yet enabled by default, or if you need to hold back a change that your code depends on but still want to apply other compatibility changes.

## Change history

Newest changes are listed first.

### Minimal subrequests

<table>
	<tbody>
		<tr>
			<td>
				<strong>Default as of</strong>
			</td>
			<td>2022-04-05</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to enable</strong>
			</td>
			<td>
				<code>minimal_subrequests</code>
			</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to disable</strong>
			</td>
			<td>
				<code>no_minimal_subrequests</code>
			</td>
		</tr>
	</tbody>
</table>

With the `minimal_subrequests` flag set, `fetch()` subrequests sent to endpoints on the Worker's own zone (also called same-zone subrequests) have a reduced set of features applied to them. In general, these features should not have been applied to same-zone subrequests in the first place, and very few user-facing behavior changes are anticipated. Specifically, Workers might observe the following behavior changes with the new flag:

- Response bodies will not be opportunistically gzipped before being transmitted to the Workers runtime. If a Worker reads the response body, it will read it in plaintext, as has always been the case, so disabling this prevents unnecessary decompression. Meanwhile, if the Worker passes the response through to the client, Cloudflare's HTTP proxy will opportunistically gzip the response body on that side of the Workers runtime instead. The behavior change observable by a Worker script should be that some `Content-Encoding: gzip` headers will no longer appear.
- Automatic Platform Optimization may previously have been applied on both the Worker's initiating request and its subrequests in some circumstances. It will now only apply to the initiating request.
- Link prefetching will now only apply to the Worker's response, not responses to the Worker's subrequests.

### Global `navigator`

<table>
	<tbody>
		<tr>
			<td>
				<strong>Default as of</strong>
			</td>
			<td>2022-03-21</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to enable</strong>
			</td>
			<td>
				<code>global_navigator</code>
			</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to disable</strong>
			</td>
			<td>
				<code>no_global_navigator</code>
			</td>
		</tr>
	</tbody>
</table>

With the `global_navigator` flag set, a new global `navigator` property is available from within Workers. Currently, it exposes only a single `navigator.userAgent` property whose value is set to `'Cloudflare-Workers'`. This property can be used to reliably determine whether code is running within the Workers environment.

### Setters/getters on API object prototypes

<table>
	<tbody>
		<tr>
			<td>
				<strong>Default as of</strong>
			</td>
			<td>2022-01-31</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to enable</strong>
			</td>
			<td>
				<code>workers_api_getters_setters_on_prototype</code>
			</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to disable</strong>
			</td>
			<td>
				<code>workers_api_getters_setters_on_instance</code>
			</td>
		</tr>
	</tbody>
</table>

Originally, properties on Workers API objects were defined as instance properties as opposed to prototype properties. This broke subclassing at the JavaScript layer, preventing a subclass from correctly overriding the superclass getters/setters. This flag controls the breaking change made to set those getters/setters on the prototype template instead.

This changes applies to:

- `AbortSignal`
- `AbortController`
- `Blob`
- `Body`
- `DigestStream`
- `Event`
- `File`
- `Request`
- `ReadableStream`
- `ReadableStreamDefaultReader`
- `ReadableStreamBYOBReader`
- `Response`
- `TextDecoder`
- `TextEncoder`
- `TransformStream`
- `URL`
- `WebSocket`
- `WritableStream`
- `WritableStreamDefaultWriter`

### New URL parser implementation

<table>
	<tbody>
		<tr>
			<td>
				<strong>Flag to enable</strong>
			</td>
			<td>
				<code>url_standard</code>
			</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to disable</strong>
			</td>
			<td>
				<code>url_original</code>
			</td>
		</tr>
	</tbody>
</table>

The original Workers `URL` API implementation is not fully compliant with the [WHATWG URL Standard](https://url.spec.whatwg.org/). Cloudflare has added a new implementation that is fully compliant. However, since the new implementation is not completely backwards compatible, it is disabled by default. Use the `url_standard` flag to enable the new implementation.

### Streams BYOB reader detaches buffer

<table>
	<tbody>
		<tr>
			<td>
				<strong>Default as of</strong>
			</td>
			<td>2021-11-10</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to enable early</strong>
			</td>
			<td>
				<code>streams_byob_reader_detaches_buffer</code>
			</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to disable</strong>
			</td>
			<td>
				<code>streams_byob_reader_does_not_detach_buffer</code>
			</td>
		</tr>
	</tbody>
</table>

Originally, the Workers runtime did not detach the `ArrayBuffer`s from user-provided TypedArrays when using the [BYOB reader's `read()` method](/workers/runtime-apis/streams/readablestreambyobreader/#methods), as required by the Streams spec, meaning it was possible to inadvertently reuse the same buffer for multiple `read()` calls. This change makes Workers conform to the spec.

User code should never try to reuse an `ArrayBuffer` that has been passed into a [BYOB reader's `read()` method](/workers/runtime-apis/streams/readablestreambyobreader/#methods). Instead, user code can re-use the `ArrayBuffer` backing the result of the `read()` promise, as in the example below.

```js
// Consume and discard `readable` using a single 4KiB buffer.
let reader = readable.getReader({ mode: 'byob' });
let arrayBufferView = new Uint8Array(4096);
while (true) {
	let result = await reader.read(arrayBufferView);
	if (result.done) break;
	// Optionally something with `result` here.
	// Re-use the same memory for the next `read()` by creating
	// a new Uint8Array backed by the result's ArrayBuffer.
	arrayBufferView = new Uint8Array(result.value.buffer);
}
```

The more recently added extension method `readAtLeast()` will always detach the `ArrayBuffer` and is unaffected by this feature flag setting.

### Durable Object `stub.fetch()` requires a full URL

<table>
	<tbody>
		<tr>
			<td>
				<strong>Default as of</strong>
			</td>
			<td>2021-11-10</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to enable early</strong>
			</td>
			<td>
				<code>durable_object_fetch_requires_full_url</code>
			</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to disable</strong>
			</td>
			<td>
				<code>durable_object_fetch_allows_relative_url</code>
			</td>
		</tr>
	</tbody>
</table>

Originally, when making a request to a Durable Object by calling `stub.fetch(url)`, a relative URL was accepted as an input. The URL would be interpreted relative to the dummy URL `http://fake-host`, and the resulting absolute URL was delivered to the destination object's `fetch()` handler. This was a mistake — full URLs were meant to be required. This flag makes full URLs required.

### `fetch()` improperly interprets unknown protocols as HTTP

<table>
	<tbody>
		<tr>
			<td>
				<strong>Default as of</strong>
			</td>
			<td>2021-11-10</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to enable early</strong>
			</td>
			<td>
				<code>fetch_refuses_unknown_protocols</code>
			</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to disable</strong>
			</td>
			<td>
				<code>fetch_treats_unknown_protocols_as_http</code>
			</td>
		</tr>
	</tbody>
</table>

Originally, if the `fetch()` function was passed a URL specifying any protocol other than `http:` or `https:`, it would silently treat it as if it were `http:`. For example, `fetch()` would appear to accept `ftp:` URLs, but it was actually making HTTP requests instead.

Note that Cloudflare Workers supports a non-standard extension to `fetch()` to make it support WebSockets. However, when making an HTTP request that is intended to initiate a WebSocket handshake, you should still use `http:` or `https:` as the protocol, not `ws:` nor `wss:`.

The `ws:` and `wss:` URL schemes are intended to be used together with the `new WebSocket()` constructor, which exclusively supports WebSocket. The extension to `fetch()` is designed to support HTTP and WebSocket in the same request (the response may or may not choose to initiate a WebSocket), and so all requests are considered to be HTTP.

### `FormData` parsing supports `File`

<table>
	<tbody>
		<tr>
			<td>
				<strong>Default as of</strong>
			</td>
			<td>2021-11-03</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to enable early</strong>
			</td>
			<td>
				<code>formdata_parser_supports_files</code>
			</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to disable</strong>
			</td>
			<td>
				<code>formdata_parser_converts_files_to_strings</code>
			</td>
		</tr>
	</tbody>
</table>

[The `FormData` API](https://developer.mozilla.org/en-US/docs/Web/API/FormData) is used to parse data (especially HTTP request bodies) in `multipart/form-data` format.

Originally, the Workers runtime's implementation of the `FormData` API incorrectly converted uploaded files to strings. Therefore, `formData.get("filename")` would return a string containing the file contents instead of a `File` object. This change fixes the problem, causing files to be represented using `File` as specified in the standard.

## Experimental changes

These changes can be enabled via `compatibility_flags`, but are not yet scheduled to become default on any particular date.

### `HTMLRewriter` handling of `<esi:include>`

<table>
	<tbody>
		<tr>
			<td>
				<strong>Default as of</strong>
			</td>
			<td>TBD</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to enable early</strong>
			</td>
			<td>
				<code>html_rewriter_treats_esi_include_as_void_tag</code>
			</td>
		</tr>
		<tr>
			<td>
				<strong>Flag to disable</strong>
			</td>
			<td>TBD</td>
		</tr>
	</tbody>
</table>

The HTML5 standard defines a fixed set of elements as void elements, meaning they do not use an end tag: `<area>`, `<base>`, `<br>`, `<col>`, `<command>`, `<embed>`, `<hr>`, `<img>`, `<input>`, `<keygen>`, `<link>`, `<meta>`, `<param>`, `<source>`, `<track>`, and `<wbr>`.

HTML5 does not recognize XML self-closing tag syntax. For example, `<script src="foo.js" />` does not specify a script element with no body. A `</script>` ending tag is still required. The `/>` syntax simply is not recognized by HTML5 at all; it is treated the same as `>`. However, many developers still like to use this syntax, as a holdover from XHTML, a standard which failed to gain traction in the early 2000's.

`<esi:include>` and `<esi:comment>` are two tags that are not part of the HTML5 standard, but are instead used as part of [Edge Side Includes](https://en.wikipedia.org/wiki/Edge_Side_Includes), a technology for server-side HTML modification. These tags are not expected to contain any body and are commonly written with XML self-closing syntax.

`HTMLRewriter` was designed to parse standard HTML5, not ESI. However, it would be useful to be able to implement some parts of ESI using `HTMLRewriter`. To that end, this compatibility flag causes `HTMLRewriter` to treat `<esi:include>` and `<esi:comment>` as void tags, so that they can be parsed and handled properly.
