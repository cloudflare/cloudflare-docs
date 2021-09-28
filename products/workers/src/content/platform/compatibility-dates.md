---
order: 10
pcx-content-type: concept
---

# Compatibility Dates

Cloudflare regularly updates the Workers Runtime. When we do so, the update applies to all Workers globally. Such updates should never cause a Worker that is already deployed to stop functioning. Sometimes, though, we need to make changes that are backwards-incompatible. In particular, sometimes we need to fix bugs in the behavior of a runtime API where it is possible that some deployed Workers are inadvertently depending on the buggy behavior. We cannot break those deployed Workers, so instead we design the bug fix such that existing Workers will continue to see the buggy behavior, while new Workers can opt into the change.

Compatibility dates (and flags) are how you, as a developer, opt into such changes. By specifying a `compatibility_date` in your `wrangler.toml`, you are saying that you want your Worker to see all changes that were made before the given date.

```toml
# (in wrangler.toml)
# Opt into backwards-incompatible changes through September 14, 2021.
compatibility_date = "2021-09-14"
```

When you start your project, you should always set `compatibility_date` to the current date. Then, from time to time, you should update `compatibility_date`. When updating, you should refer to this page to find out what has changed, and you should be careful to test your Worker to see if the changes affect you, updating your code as necessary. The new compatibility date takes effect when you next run `wrangler publish`.

There is no need to update your `compatibility_date` if you don't want to. The Workers Runtime will generally support old compatibility dates forever. If, for some reason, Cloudflare finds it is necessary to make a change that will break live Workers, we will actively contact affected developers. That said, our aim is to avoid this if at all possible.

However, even though you don't need to update `compatibility_date`, it is a good idea to do so for two reasons:

1. Sometimes new features can only be made available to Workers that have a current `compatibility_date`. To access the latest features, you need to stay up-to-date.
2. Generally, other than this page, the Workers documentation may only describe the current `compatibility_date`, omitting information about historical behavior. If your Worker uses an old `compatibility_date`, you will need to constantly refer to this page in order to check if any of the APIs you are using have changed.

**Compatibility Flags**

In addition to setting a `compatibility_date` in `wrangler.toml`, you may also provide a list of `compatibility_flags`, which enable or disable specific changes.

```toml
# (in wrangler.toml)
# Opt into backwards-incompatible changes through September 14, 2021.
compatibility_date = "2021-09-14"
# Also opt into an upcoming fix to the FormData API.
compatibility_flags = [ "formdata_parser_supports_files" ]
```

In this example, we've enabled the specific flag `formdata_parser_supports_files`, which is described below. As of the specified date, `2021-09-14`, this particular flag was not yet enabled by default, but specifying it in this way enables it anyway. `compatibility_flags` can also be used to disable changes that became the default in the past.

Most developers will not need to use `compatibility_flags`; instead, we recommend only specifying `compatibility_date`. `compatibility_flags` can be useful if you want to help the Workers team test upcoming changes that are not yet enabled by default, or if you need to hold back a change that your code depends on but still want to apply other compatibility changes.

## Change History

Newest changes are listed first.

_At this time, compatibility dates are new and no changes have yet been scheduled to become default._

## Experimental changes

These changes can be enabled via `compatibility_flags`, but aren't yet scheduled to become default on any particular date.

### `FormData` parsing supports `File`

<table><tbody>
  <tr><td><strong>Default as of</strong></td><td>TBD</td></tr>
  <tr><td><strong>Flag to enable early</strong></td><td><code>formdata_parser_supports_files</code></td></tr>
  <tr><td><strong>Flag to disable</strong></td><td><code>formdata_parser_converts_files_to_strings</code></td></tr>
</tbody></table>

[The `FormData` API](https://developer.mozilla.org/en-US/docs/Web/API/FormData) is used to parse data (especially HTTP request bodies) in `multipart/form-data` format.

Originally, the Workers Runtime's implementation of the `FormData` API incorrectly converted uploaded files to strings. Hence, `formData.get("filename")` would return a string containing the file contents instead of a `File` object. This change fixes the problem, causing files to be represented using `File` as specified in the standard.

### `fetch()` improperly interprets unknown protocols as HTTP

<table><tbody>
  <tr><td><strong>Default as of</strong></td><td>TBD</td></tr>
  <tr><td><strong>Flag to enable early</strong></td><td><code>fetch_refuses_unknown_protocols</code></td></tr>
  <tr><td><strong>Flag to disable</strong></td><td><code>fetch_treats_unknown_protocols_as_http</code></td></tr>
</tbody></table>

Originally, if the `fetch()` function was passed a URL specifying any protocol other than `http:` or `https:`, it would silently treat it as if it were `http:`. So, for example, `fetch()` would appear to accept `ftp:` URLs, but it was actually making HTTP requests instead.

Note that Cloudflare Workers supports a non-standard extension to `fetch()` to make it support WebSockets. However, when making an HTTP request that is intended to initiate a WebSocket handshake, you should still use `http:` or `https:` as the protocol, **not** `ws:` nor `wss:`. The `ws:` and `wss:` URL schemes are intended to be used together with the `new WebSocket()` constructor, which exclusively supports WebSocket. Our extension to `fetch()` is designed to support HTTP and WebSocket in the same request (the response may or may not choose to initiate a WebSocket), and so all requests are considered to be HTTP.

### `HTMLRewriter` handling of `<esi:include>`

<table><tbody>
  <tr><td><strong>Default as of</strong></td><td>TBD</td></tr>
  <tr><td><strong>Flag to enable early</strong></td><td><code>html_rewriter_treats_esi_include_as_void_tag</code></td></tr>
  <tr><td><strong>Flag to disable</strong></td><td>TBD</td></tr>
</tbody></table>

The HTML5 standard defines a fixed set of elements as "void elements", meaning they do not use an end tag: `<area>`, `<base>`, `<br>`, `<col>`, `<command>`, `<embed>`, `<hr>`, `<img>`, `<input>`, `<keygen>`, `<link>`, `<meta>`, `<param>`, `<source>`, `<track>`, and `<wbr>`.

HTML5 does not recognize XML "self-closing" tag syntax. For example, `<script src="foo.js" />` does *not* specify a script element with no body. A `</script>` ending tag is still required. The `/>` syntax simply isn't recognized by HTML5 at all; it is treated the same as `>`. However, many developers still like to use this syntax, as a holdover from XHTML, a standard which failed to gain traction in the early 2000's.

`<esi:include>` and `<esi:comment>` are two tags that are not part of the HTML5 standard, but are instead used as part of [Edge Side Includes](https://en.wikipedia.org/wiki/Edge_Side_Includes), a technology for server-side HTML modification. These tags are not expected to contain any body and are commonly written with XML self-closing syntax.

`HTMLRewriter` was designed to parse standard HTML5, not ESI. However, it would be useful to be able to implement some parts of ESI using `HTMLRewriter`. To that end, this compatibility flag causes `HTMLRewriter` to treat `<esi:include>` and `<esi:comment>` as "void tags", so that they can be parsed and handled properly.

