---
pcx_content_type: changelog
title: Changelog
meta:
    description: Review recent changes to Cloudflare Workers.
rss: file
---

# Changelog

## 2023-03-24

- Fixed a bug in Wrangler tail and and live logs on the dashboard that prevented the Administrator Read-Only and Workers Tail Read roles from successfully tailing Workers.

## 2023-03-09

- No externally-visible changes

## 2023-03-06

- [Workers Logpush](/workers/platform/logpush/#limits) now supports 300 characters per log line. This is an increase from the previous limit of 150 characters per line.

## 2023-02-06

- Fixed a bug where transferring large request bodies to a Durable Object was unexpectedly slow.
- Previously, an error would be thrown when trying to access unimplemented standard `Request` and `Response` properties. Now those will be left as `undefined`.

## 2023-01-13

- Durable Objects can now use jurisdictions with `idFromName` via a new subnamespace API.
- V8 updated to 10.9.

## 2022-12-16

- Conditional `PUT` requests have been fixed in the R2 bindings API.

## 2022-12-02

- Queues no longer support calling `send()` with an undefined JavaScript value as the message.

## 2022-11-30
- The DOMException constructor has been updated to align better with the standard specification. Specifically, the message and name arguments can now be any JavaScript value that is coercible into a string (previously, passing non-string values would throw).
- Extended the R2 binding API to include support for multipart uploads.

## 2022-11-17

- V8 update: 10.6 → 10.8

## 2022-11-02

- Implemented `toJSON()` for R2Checksums so that it is usable with `JSON.stringify()`.

## 2022-10-21

- The alarm retry limit will no longer apply to errors that are our fault.
- Compatibility dates have been added for multiple flags including the new streams implementation.
- `DurableObjectStorage` has a new method `sync()` that provides a way for a Worker to wait for its writes (including those performed with `allowUnconfirmed`) to be synchronized with storage.
## 2022-10-10

- Fixed a bug where if an ES-modules-syntax script exported an array-typed value from the top-level module, the upload API would refuse it with a [`500` error](https://community.cloudflare.com/t/community-tip-fixing-error-500-internal-server-error/44453).
- `console.log` now prints more information about certain objects, for example Promises.
- The Workers Runtime is now built from the Open Source code in: [GitHub - cloudflare/workerd: The JavaScript / Wasm runtime that powers Cloudflare Workers](https://github.com/cloudflare/workerd).

## 2022-09-16

- R2 `put` bindings options can now have an `onlyIf` field similar to `get` that does a conditional upload.
- Allow deleting multiple keys at once in R2 bindings.
- Added support for SHA-1, SHA-256, SHA-384, SHA-512 checksums in R2 `put` options.
- User-specified object checksums will now be available in the R2 `get/head` bindings response. MD5 is included by default for non-multipart uploaded objects.
- Updated V8 to 10.6.

## 2022-08-12

- A `Headers` object with the `range` header can now be used for range within `R2GetOptions` for the `get` R2 binding.
- When headers are used for `onlyIf` within `R2GetOptions` for the `get` R2 binding, they now correctly compare against the second granularity. This allows correctly round-tripping to the browser and back. Additionally, `secondsGranularity` is now an option that can be passed into options constructed by hand to specify this when constructing outside Headers for the same effect.
- Fixed the TypeScript type of `DurableObjectState.id` in [@cloudflare/workers-types](https://github.com/cloudflare/workers-types) to always be a `DurableObjectId`.
- Validation errors during Worker upload for module scripts now include correct line and column numbers.
- Bugfix, Profiling tools and flame graphs via Chrome’s debug tools now properly report information.

## 2022-06-24

- `wrangler dev` in global network preview mode now supports scheduling alarms.
- R2 GET requests made with the `range` option now contain the returned range in the `GetObject`’s `range` parameter.
- Some Web Cryptography API error messages include more information now.
- Updated V8 from 10.2 to 10.3.


## 2022-06-18

- Cron trigger events on Worker scripts using the old `addEventListener` syntax are now treated as failing if there is no event listener registered for `scheduled` events.
- The `durable_object_alarms` flag no longer needs to be explicitly provided to use DO alarms.

## 2022-06-09

- No externally-visible changes.

## 2022-06-03

- It is now possible to create standard `TransformStream` instances that can perform transformations on the data. Because this changes the behavior of the default `new TransformStream()` with no arguments, the `transformstream_enable_standard_constructor` compatibility flag is required to enable.
- Preview in Quick Edit now correctly uses the correct R2 bindings.
- Updated V8 from 10.1 to 10.2.

## 2022-05-26

- The static `Response.json()` method can be used to initialize a Response object with a JSON-serialized payload (refer to [whatwg/fetch #1392](https://github.com/whatwg/fetch/pull/1392)).
- R2 exceptions being thrown now have the `error` code appended in the message in parenthesis. This is a stop-gap until we are able to explicitly add the code property on the thrown `Error` object.

## 2022-05-19

- R2 bindings: `contentEncoding`, `contentLanguage`, and `cacheControl` are now correctly rendered.
- ReadableStream `pipeTo` and `pipeThrough` now support cancelation using `AbortSignal`.
- Calling `setAlarm()` in a DO with no `alarm()` handler implemented will now throw instead of failing silently. Calling `getAlarm()` when no `alarm()` handler is currently implemented will return null, even if an alarm was previously set on an old version of the DO class, as no execution will take place.
- R2: Better runtime support for additional ranges.
- R2 bindings now support ranges that have an `offset` and an optional `length`, a `length` and an optional `offset`, or a `suffix` (returns the last `N` bytes of a file).

## 2022-05-12

- Fix R2 bindings saving cache-control under content-language and rendering cache-control under content-language.
- Fix R2 bindings list without options to use the default list limit instead of never returning any results.
- Fix R2 bindings which did not correctly handle error messages from R2, resulting in `internal error` being thrown. Also fix behavior for get throwing an exception on a non-existent key instead of returning null. `R2Error` is removed for the time being and will be reinstated at some future time TBD.
- R2 bindings: if the onlyIf condition results in a precondition failure or a not modified result, the object is returned without a body instead of returning null.
- R2 bindings: sha1 is removed as an option because it was not actually hooked up to anything. TBD on additional checksum options beyond md5.
- Added `startAfter` option to the `list()` method in the Durable Object storage API.

## 2022-05-05

- `Response.redirect(url)` will no longer coalesce multiple consecutive slash characters appearing in the URL’s path.
- Fix generated types for Date.
- Fix R2 bindings list without options to use the default list limit instead of never returning any results.
- Fix R2 bindings did not correctly handle error messages from R2, resulting in internal error being thrown. Also fix behavior for get throwing an exception on a non-existent key instead of returning null. `R2Error` is removed for the time being and will be reinstated at some future time TBD.

## 2022-04-29

- Minor V8 update: 10.0 → 10.1.
- R2 public beta bindings are the default regardless of compat date or flags. Internal beta bindings customers should transition to public beta bindings as soon as possible. A back compatibility flag is available if this is not immediately possible. After some lag, new scripts carrying the `r2_public_beta_bindings` compatibility flag will stop accepting to be published until that flag is removed.

## 2022-04-22

- Major V8 update: 9.9 → 10.0.

## 2022-04-14

- Performance and stability improvements.

## 2022-04-08

- The AES-GCM implementation that is part of the Web Cryptography API now returns a friendlier error explaining that 0-length IVs are not allowed.
- R2 error responses now include better details.

## 2022-03-24

- A new compatibility flag has been introduced, `minimal_subrequests` , which removes some features that were unintentionally being applied to same-zone `fetch()` calls. The flag will default to enabled on Tuesday, 2022-04-05, and is described in [Workers `minimal_subrequests` compatibility flag](/workers/platform/compatibility-dates/#minimal-subrequests).
- When creating a `Response` with JavaScript-backed ReadableStreams, the `Body` mixin functions (e.g. `await response.text()` ) are now implemented.
- The `IdentityTransformStream` creates a byte-oriented `TransformStream` implementation that simply passes bytes through unmodified. The readable half of the `TransformStream` supports BYOB-reads. It is important to note that `IdentityTransformStream` is identical to the current non-spec compliant `TransformStream` implementation, which will be updated soon to conform to the WHATWG Stream Standard. All current uses of `new TransformStream()` should be replaced with `new IdentityTransformStream()` to avoid potentially breaking changes later.

## 2022-03-17

- The standard [ByteLengthQueuingStrategy](https://developer.mozilla.org/en-US/docs/Web/API/ByteLengthQueuingStrategy) and [CountQueuingStrategy](https://developer.mozilla.org/en-US/docs/Web/API/CountQueuingStrategy) classes are now available.
- When the `capture_async_api_throws` flag is set, built-in Cloudflare-specific and Web Platform Standard APIs that return Promises will no longer throw errors synchronously and will instead return rejected promises. Exception is given with fatal errors such as out of memory errors.
- Fix R2 publish date rendering.
- Fix R2 bucket binding .get populating contentRange with garbage. contentRange is now undefined as intended.
- When using JavaScript-backed `ReadableStream`, it is now possible to use those streams with `new Response()`.

## 2022-03-11

- Fixed a bug where the key size was not counted when determining how many write units to charge for a Durable Object single-key `put()`. This may result in future writes costing one write unit more than past writes when the key is large enough to bump the total write size up above the next billing unit threshold of 4096 bytes. Multi-key `put()` operations have always properly counted the key size when determining billable write units.
- Implementations of `CompressionStream` and `DecompressionStream` are now available.

## 2022-03-04

- Initial pipeTo/pipeThrough support on ReadableStreams constructed using the new `ReadableStream()` constructor is now available.
- With the `global_navigator` compatibility flag set, the `navigator.userAgent` property can be used to detect when code is running within the Workers environment.
- A bug in the new URL implementation was fixed when setting the value of a `URLSearchParam`.
- The global `addEventListener` and dispatchEvent APIs are now available when using module syntax.
- An implementation of `URLPattern` is now available.

## 2022-02-25

- The `TextDecoder` class now supports the full range of text encodings defined by the WHATWG Encoding Standard.
- Both global `fetch()` and durable object `fetch()` now throw a TypeError when they receive a WebSocket in response to a request without the “Upgrade: websocket” header.
- Durable Objects users may now store up to 50 GB of data across the objects in their account by default. As before, if you need more storage than that you can contact us for an increase.

## 2022-02-18

- `TextDecoder` now supports Windows-1252 labels (aka ASCII): [Encoding API Encodings - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings).

## 2022-02-11

- WebSocket message sends were erroneously not respecting Durable Object output gates as described in the [I/O gate blog post](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/). That bug has now been fixed, meaning that WebSockets will now never send a message under the assumption that a storage write has succeeded unless that write actually has succeeded.

## 2022-02-05

- Fixed bug causing WebSockets to Durable Objects to occasionally hang when the script implementing both a Worker and a Durable Object is re-deployed with new code.
- `crypto.getRandomValues` now supports BigInt64Array and BigUint64Array.
- A new implementation of the standard URL implementation is available. Use `url_standard` feature flag to enable the spec-compliant URL API implementation.

## 2022-01-28

- No user-visible changes.

## 2022-01-20

- Updated V8: 9.7 → 9.8.

## 2022-01-17

- `HTMLRewriter` now supports inspecting and modifying end tags, not just start tags.
- Fixed bug where Durable Objects experiencing a transient CPU overload condition would cause in-progress requests to be unable to return a response (appearing as an indefinite hang from the client side), even after the overload condition clears.

## 2022-01-07

- The `workers_api_getters_setters_on_prototype` configuration flag corrects the way Workers attaches property getters and setters to API objects so that they can be properly subclassed.

## 2021-12-22

- Async iteration (using `for` and `await`) on instances of `ReadableStream` is now available.

## 2021-12-10

- Raised the max value size in Durable Object storage from 32 KiB to 128 KiB.
- `AbortSignal.timeout(delay)` returns an `AbortSignal` that will be triggered after the given number of milliseconds.
- Preview implementations of the new `ReadableStream` and new `WritableStream` constructors are available behind the `streams_enable_constructors` feature flag.
- `crypto.DigestStream` is a non-standard extension to the crypto API that supports generating a hash digest from streaming data. The `DigestStream` itself is a `WritableStream` that does not retain the data written into it; instead, it generates a digest hash automatically when the flow of data has ended. The same hash algorithms supported by `crypto.subtle.digest()` are supported by the `crypto.DigestStream`.
- Added early support for the `scheduler.wait()` API, which is [going through the WICG standardization process](https://github.com/WICG/scheduling-apis), to provide an `await`-able alternative to `setTimeout()`.
- Fixed bug in `deleteAll` in Durable Objects containing more than 10000 keys that could sometimes cause incomplete data deletion and/or hangs.

## 2021-12-02

- The Streams spec requires that methods returning promises must not throw synchronous errors. As part of the effort of making the Streams implementation more spec compliant, we are converting a number of sync throws to async rejections.
- Major V8 update: 9.6 → 9.7. See [V8 release v9.7 · V8](https://v8.dev/blog/v8-release-97) for more details.

## 2021-11-19

- Durable Object stubs that receive an overload exception will be permanently broken to match the behavior of other exception types.
- Fixed issue where preview service claimed Let’s Encrypt certificates were expired.
- [`structuredClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) is now supported.

## 2021-11-12

- The `AbortSignal` object has a new `reason` property indicating the reason for the cancellation. The reason can be specified when the `AbortSignal` is triggered or created.
- Unhandled rejection warnings will be printed to the inspector console.

## 2021-11-05

- Upgrade to V8 9.6. This adds support for WebAssembly reference types. Refer to the [V8 release v9.6 · V8](https://v8.dev/blog/v8-release-96) for more details.
- Streams: When using the BYOB reader, the `ArrayBuffer` of the provided TypedArray should be detached, per the Streams spec. Because Workers was not previously enforcing that rule, and changing to comply with the spec could breaking existing code, a new compatibility flag, [streams_byob_reader_detaches_buffer](https://github.com/cloudflare/cloudflare-docs/pull/2644), has been introduced that will be enabled by default on 2021-11-10. User code should never try to reuse an `ArrayBuffer` that has been passed in to a BYOB readers `read()` method. The more recently added extension method `readAtLeast()` will always detach the `ArrayBuffer` and is unaffected by the compatibility flag setting.

## 2021-10-21

- Added support for the `signal` option in `EventTarget.addEventListener()`, to remove an event listener in response to an `AbortSignal`.
- The `unhandledrejection` and `rejectionhandled` events are now supported.
- The `ReadableStreamDefaultReader` and `ReadableStreamBYOBReader` constructors are now supported.
- Added non-standard `ReadableStreamBYOBReader` method `.readAtLeast(size, buffer)` that can be used to return a buffer with at least `size` bytes. The `buffer` parameter must be an `ArrayBufferView`. Behavior is identical to `.read()` except that at least `size` bytes are read, only returning fewer if EOF is encountered. One final call to `.readAtLeast()` is still needed to get back a `done = true` value.
- The compatibility flags `formdata_parser_supports_files`, `fetch_refuses_unknown_protocols`, and `durable_object_fetch_requires_full_url` have been scheduled to be turned on by default as of 2021-11-03, 2021-11-10, and 2021-11-10, respectively. For more details, refer to [Compatibility Dates](/workers/platform/compatibility-dates/)

## 2021-10-14

- `request.signal` will always return an `AbortSignal`.
- Cloudflare Workers’ integration with Chrome DevTools profiling now more accurately reports the line numbers and time elapsed. Previously, the line numbers were shown as one line later then the actual code, and the time shown would be proportional but much longer than the actual time used.
- Upgrade to v8 9.5. Refer to [V8 release v9.5 · V8](https://v8.dev/blog/v8-release-95) for more details.

## 2021-09-24

- The `AbortController` and `AbortSignal` objects are now available.
- The Web Platform `queueMicrotask` API is now available.
- It is now possible to use new `EventTarget()` and to create custom `EventTarget` subclasses.
- The `once` option is now supported on `addEventTarget` to register event handlers that will be invoked only once.
- Per the HTML specification, a listener passed in to the `addEventListener` function is allowed to either be a function or an object with a `handleEvent` member function. Previously, Workers only supported the function option, now it supports both.
- The `Event` object now supports most standard methods and properties.
- V8 updated from 9.3 to 9.4.

## 2021-09-03

- The `crypto.randomUUID()` method can be used to generate a new random version 4 UUID.
- Durable Objects are now scheduled more evenly around a colocation (colo).

## 2021-08-05

- No user-facing changes. Just bug fixes & internal maintenance.

## 2021-07-30

- Fixed a hang in Durable Objects when reading more than 16MB of data at once (for example, with a large `list()` operation).
- Added a new compatibility flag `html_rewriter_treats_esi_include_as_void_tag` which causes `HTMLRewriter` to treat `<esi:include>` and `<esi:comment>` as void tags, such that they are considered to have neither an end tag nor nested content. To opt a worker into the new behavior, you must use Wrangler v1.19.0 or newer and specify the flag in `wrangler.toml`. Refer to the [Wrangler compatibility flag notes](https://github.com/cloudflare/wrangler-legacy/pull/2009) for details.

## 2021-07-23

- Performance and stability improvements.

## 2021-07-16

- Workers can now make up to 1000 subrequests to Durable Objects from a within a single request invocation, up from the prior limit of 50.
- Major changes to Durable Objects implementation, the details of which will be the subject of an upcoming blog post. In theory, the changes should not harm existing apps, except to make them faster. Let your account team know if you observe anything unusual or report your issue in the [Workers Discord](https://discord.gg/cloudflaredev).
- Durable Object constructors may now initiate I/O, such as `fetch()` calls.
- Added Durable Objects `state.blockConcurrencyWhile()` API useful for delaying delivery of requests and other events while performing some critical state-affecting task. For example, this can be used to perform start-up initialization in an object’s constructor.
- In Durable Objects, the callback passed to `storage.transaction()` can now return a value, which will be propagated as the return value of the `transaction()` call.

## 2021-07-13

- The preview service now prints a warning in the devtools console when a script uses `Response/Request.clone()` but does not read one of the cloned bodies. Such a situation forces the runtime to buffer the entire message body in memory, which reduces performance. [Find an example here](https://cloudflareworkers.com/#823fbe463bfafd5a06bcfeabbdf5eeae:https://tutorial.cloudflareworkers.com).

## 2021-07-01

- Fixed bug where registering the same exact event listener method twice on the same event type threw an internal error.
- Add support for the `.forEach()` method for `Headers`, `URLSearchParameters`, and `FormData`.

## 2021-06-27

- WebCrypto: Implemented non-standard Ed25519 operation (algorithm NODE-ED25519, curve name NODE-ED25519). The Ed25519 implementation differs from NodeJS’s in that raw import/export of private keys is disallowed, per parity with ECDSA/ECDH.

## 2021-06-17

Changes this week:

- Updated V8 from 9.1 to 9.2.
- `wrangler tail` now works on Durable Objects. Note that logs from long-lived WebSockets will not be visible until the WebSocket is closed.

## 2021-06-11

Changes this week:

- Turn on V8 Sparkplug compiler.
- Durable Object instances that are finishing up existing requests after their code is updated will be disconnected from the persistent storage API, to maintain the invariant that only a single instance ever has access to persistent storage for a given Durable Object.

## 2021-06-04

Changes this week:

- WebCrypto: We now support the “raw” import/export format for ECDSA/ECDH public keys.
- `request.cf` is no longer missing when writing Workers using modules syntax.

## 2021-05-14

Changes this week:

- Improve error messages coming from the WebCrypto API.
- Updated V8: 9.0 → 9.1

Changes in an earlier release:

- WebCrypto: Implement JWK export for RSA, ECDSA, & ECDH.
- WebCrypto: Add support for RSA-OAEP
- WebCrypto: HKDF implemented.
- Fix recently-introduced backwards clock jumps in Durable Objects.
- `WebCrypto.generateKey()`, when asked to generate a key pair with algorithm RSA-PSS, would instead return a key pair using algorithm RSASSA-PKCS1-v1_5. Although the key structure is the same, the signature algorithms differ, and therefore, signatures generated using the key would not be accepted by a correct implementation of RSA-PSS, and vice versa. Since this would be a pretty obvious problem, but no one ever reported it to us, we guess that currently, no one is using this functionality on Workers.

## 2021-04-29

Changes this week:

- WebCrypto: Implemented `wrapKey()` / `unwrapKey()` for AES algorithms.
- The arguments to `WebSocket.close()` are now optional, as the standard says they should be.

## 2021-04-23

Changes this week:

- In the WebCrypto API, encrypt and decrypt operations are now supported for the “AES-CTR” encryption algorithm.
- For Durable Objects, CPU time limits are now enforced on the object level rather than the request level. Each time a new request arrives, the time limit is “topped up” to 500ms. After the (free) beta period ends and Durable Objects becomes generally available, we will increase this to 30 seconds.
- When a Durable Object exceeds its CPU time limit, the entire object will be discarded and recreated. Previously, we allowed subrequest requests to continue using the same object, but this was dangerous because hitting the CPU time limit can leave the object in an inconsistent state.
- Long running Durable Objects are given more subrequest quota as additional WebSocket messages are sent to them, to avoid the problem of a long-running Object being unable to make any more subrequests after it has been held open by a particular WebSocket for a while.
- When a Durable Object’s code is updated, or when its isolate is reset due to exceeding the memory limit, all stubs pointing to the object will become invalidated and have to be recreated. This is consistent with what happens when the CPU time is exceeded, or when stubs become disconnected due to random network errors. This behavior is useful, as apps can now assume that two messages sent to the same stub will be delivered to exactly the same live instance (if they are delivered at all). Apps which do not care about this property should recreate their stubs for every request; there is no performance penalty from doing so.
- When a Durable Object’s isolate exceeds its memory limit, an exception with an explanatory message will now be thrown to the caller, instead of “internal error”.
- When a Durable Object exceeds its CPU time limit, an exception with an explanatory message will now be thrown to the caller, instead of “internal error”.
- `wrangler tail` now reports CPU-time-exceeded exceptions with an explanatory message instead of “internal error”.

## 2021-04-19

Changes since the last post on 3/26:

- Cron Triggers now have a 15 minute wall time limit, in addition to the existing CPU time limit. (Previously, there was no limit, so a cron trigger that spent all its time waiting for I/O could hang forever.)
- Our WebCrypto implementation now supports importing and exporting HMAC and AES keys in JWK format.
- Our WebCrypto implementation now supports AES key generation for CTR, CBC, and KW modes. AES-CTR encrypt/decrypt and AES-KW key wrapping/unwrapping support will land in a later release.
- Fixed bug where `crypto.subtle.encrypt()` on zero-length inputs would sometimes throw an exception.
- Errors on script upload will now be properly reported for module-based scripts, instead of appearing as a ReferenceError.
- WebCrypto: Key derivation for ECDH.
- WebCrypto: Support ECDH key generation & import.
- WebCrypto: Support ECDSA key generation.
- Fixed bug where `crypto.subtle.encrypt()` on zero-length inputs would sometimes throw an exception.
- Improved exception messages thrown by the WebCrypto API somewhat.
- `waitUntil` is now supported for module Workers. An additional argument called ‘ctx’ is passed after ‘env’, and `waitUntil` is a method on ‘ctx’.
- `passThroughOnException` is now available under the ctx argument to module handlers
- Reliability improvements for Durable Objects
- Reliability improvements for Durable Objects persistent storage API
- `ScheduledEvent.cron` is now set to the original cron string that the event was scheduled for.

## 2021-03-26

Changes this week:

- Existing WebSocket connections to Durable Objects will now be forcibly disconnected on code updates, in order to force clients to connect to the instance running the new code.

## 2021-03-11

New this week:

- When the Workers Runtime itself reloads due to us deploying a new version or config change, we now preload high-traffic Workers in the new instance of the runtime before traffic cuts over. This ensures that users do not observe cold starts for these Workers due to the upgrade, and also fixes a low rate of spurious 503 errors that we had previously been seeing due to overload during such reloads.

(It looks like no release notes were posted the last few weeks, but there were no new user-visible changes to report.)

## 2021-02-11

Changes this week:

- In the preview mode of the dashboard, a Worker that fails during startup will now return a 500 response, rather than getting the default passthrough behavior, which was making it harder to notice when a Worker was failing.
- A Durable Object’s ID is now provided to it in its constructor. It can be accessed off of the `state` provided as the constructor’s first argument, as in `state.id`.

## 2021-02-05

New this week:

- V8 has been updated from 8.8 to 8.9.
- During a `fetch()`, if the destination server commits certain HTTP protocol errors, such as returning invalid (unparsable) headers, we now throw an exception whose description explains the problem, rather than an “internal error”.

New last week (forgot to post):

- Added support for `waitUntil()` in Durable Objects. It is a method on the state object passed to the Durable Object class’s constructor.

## 2021-01-22

New in the past week:

- Fixed a bug which caused scripts with WebAssembly modules to hang when using devtools in the preview service.

## 2021-01-14

Changes this week:

- Implemented File and Blob APIs, which can be used when constructing FormData in outgoing requests. Unfortunately, FormData from incoming requests at this time will still use strings even when file metadata was present, in order to avoid breaking existing deployed Workers. We will find a way to fix that in the future.

## 2021-01-07

Changes this week:

- No user-visible changes.

Changes in the prior release:

- Fixed delivery of WebSocket “error” events.
- Fixed a rare bug where a WritableStream could be garbage collected while it still had writes queued, causing those writes to be lost.

## 2020-12-10

Changes this week:

- Major V8 update: 8.7.220.29 -> 8.8.278.8

## 2019-09-19

Changes this week:

- Unannounced new feature. (Stay tuned.)
- Enforced new limit on concurrent subrequests (see below).
- Stability improvements.

**Concurrent Subrequest Limit**

As of this release, we impose a limit on the number of outgoing HTTP requests that a Worker can make simultaneously. **For each incoming request**, a Worker can make up to 6 concurrent outgoing `fetch()` requests.

If a Worker’s request handler attempts to call `fetch()` more than six times (on behalf of a single incoming request) without waiting for previous fetches to complete, then fetches after the sixth will be delayed until previous fetches have finished. A Worker is still allowed to make up to 50 total subrequests per incoming request, as before; the new limit is only on how many can execute simultaneously.

**Automatic deadlock avoidance**

Our implementation automatically detects if delaying a fetch would cause the Worker to deadlock, and prevents the deadlock by cancelling the least-recently-used request. For example, imagine a Worker that starts 10 requests and waits to receive all the responses without reading the response bodies. A fetch is not considered complete until the response body is fully-consumed (for example, by calling `response.text()` or `response.json()`, or by reading from `response.body`). Therefore, in this scenario, the first six requests will run and their response objects would be returned, but the remaining four requests would not start until the earlier responses are consumed. If the Worker fails to actually read the earlier response bodies and is still waiting for the last four requests, then the Workers Runtime will automatically cancel the first four requests so that the remaining ones can complete. If the Worker later goes back and tries to read the response bodies, exceptions will be thrown.

**Most Workers are Not Affected**

The vast majority of Workers make fewer than six outgoing requests per incoming request. Such Workers are totally unaffected by this change.

Of Workers that do make more than six outgoing requests concurrently for a single incoming request, the vast majority either read the response bodies immediately upon each response returning, or never read the response bodies at all. In either case, these Workers will still work as intended – although they may be a little slower due to outgoing requests after the sixth being delayed.

A very small number of deployed Workers (about 20 total) make more than 6 requests concurrently, wait for all responses to return, and then go back to read the response bodies later. For all known Workers that do this, we have temporarily grandfathered your zone into the old behavior, so that your Workers will continue to operate. However, we will be communicating with customers one-by-one to request that you update your code to proactively read request bodies, so that it works correctly under the new limit.

**Why did we do this?**

Cloudflare communicates with origin servers using HTTP/1.1, not HTTP/2. Under HTTP/1.1, each concurrent request requires a separate connection. So, Workers that make many requests concurrently could force the creation of an excessive number of connections to origin servers. In some cases, this caused resource exhaustion problems either at the origin server or within our own stack.

On investigating the use cases for such Workers, every case we looked at turned out to be a mistake or otherwise unnecessary. Often, developers were making requests and receiving responses, but they only cared about the response status and headers but not the body. So, they threw away the response objects without reading the body, essentially leaking connections. In some other cases, developers had simply accidentally written code that made excessive requests in a loop for no good reason at all. Both of these cases should now cause no problems under the new behavior.

We chose the limit of 6 concurrent connections based on the fact that Chrome enforces the same limit on web sites in the browser.

## 2020-12-04

Changes this week:

- Durable Objects storage API now supports listing keys by prefix.
- Improved error message when a single request performs more than 1000 KV operations to make clear that a per-request limit was reached, not a global rate limit.
- `wrangler dev` previews should now honor non-default resource limits, for example, longer CPU limits for those in the Workers Unbound beta.
- Fixed off-by-one line numbers in Worker exceptions.
- Exceptions thrown in a Durable Object’s `fetch()` method are now tunneled to its caller.
- Fixed a bug where a large Durable Object response body could cause the Durable Object to become unresponsive.

## 2020-11-13

Changes over the past week:

- `ReadableStream.cancel()` and `ReadableStream.getReader().cancel()` now take an optional, instead of a mandatory, argument, to conform with the Streams spec.
- Fixed an error that occurred when a WASM module declared that it wanted to grow larger than 128MB. Instead, the actual memory usage of the module is monitored and an error is thrown if it exceeds 128MB used.

## 2020-11-05

Changes this week:

- Major V8 update: 8.6 -> 8.7
- Limit the maximum number of Durable Objects keys that can be changed in a single transaction to 128.

## 2020-10-05

We had our usual weekly release last week, but:

- No user-visible changes.

## 2020-09-24

Changes this week:

- Internal changes to support upcoming features.

Also, a change from the 2020-09-08 release that it seems we forgot to post:

- V8 major update: 8.5 -> 8.6

## 2020-08-03

Changes last week:

- Fixed a regression which could cause `HTMLRewriter.transform()` to throw spurious “The parser has stopped.” errors.
- Upgraded V8 from 8.4 to 8.5.

## 2020-07-09

Changes this week:

- Fixed a regression in HTMLRewriter: <https://github.com/cloudflare/lol-html/issues/50>
- Common HTTP method names passed to `fetch()` or `new Request()` are now case-insensitive as required by the Fetch API spec.

Changes last week (… forgot to post):

- `setTimeout`/`setInterval` can now take additional arguments which will be passed on to the callback, as required by the spec. (Few people use this feature today because it’s usually much easier to use lambda captures.)

Changes the week before last (… also… forgot to post… we really need to code up a bot for this):

- The HTMLRewriter now supports the `:nth-child` , `:first-child` , `:nth-of-type` , and `:first-of-type` selectors.

## 2020-05-15

Changes this week:

- Implemented API for yet-to-be-announced new feature.

## 2020-04-20

Looks like we forgot to post release notes for a couple weeks. Releases still are happening weekly as always, but the “post to the community” step is insufficiently automated…
4/2 release:

- Fixed a source of long garbage collection paused in memory limit enforcement.

4/9 release:

- No publicly-visible changes.

4/16 release:

- In preview, we now log a warning when attempting to construct a `Request` or `Response` whose body is of type `FormData` but with the `Content-Type` header overridden. Such bodies would not be parseable by the receiver.

## 2020-03-26

New this week:

- Certain “internal errors” that could be thrown when using the Cache API are now reported with human-friendly error messages. For example, `caches.default.match("not a URL")` now throws a TypeError.

## 2020-02-28

New from the past two weeks:

- Fixed a bug in the preview service where the CPU time limiter was overly lenient for the first several requests handled by a newly-started worker. The same bug actually exists in production as well, but we are much more cautious about fixing it there, since doing so might break live sites. If you find your worker now exceeds CPU time limits in preview, then it is likely exceeding time limits in production as well, but only appearing to work because the limits are too lenient for the first few requests. Such Workers will eventually fail in production, too (and always have), so it is best to fix the problem in preview before deploying.
- Major V8 update: 8.0 -> 8.1
- Minor bug fixes.

## 2020-02-13

Changes over the last couple weeks:

- Fixed a bug where if two differently-named scripts within the same account had identical content and were deployed to the same zone, they would be treated as the “same Worker”, meaning they would share the same isolate and global variables. This only applied between Workers on the same zone, so was not a security threat, but it caused confusion. Now, two differently-named Worker scripts will never be considered the same Worker even if they have identical content.
- Performance and stability improvements.

## 2020-01-24

It has been a while since we posted release notes, partly due to the holidays. Here is what is new over the past month:

- Performance and stability improvements.
- A rare source of `daemonDown` errors when processing bursty traffic over HTTP/2 has been eliminated.
- Updated V8 7.9 -> 8.0.

## 2019-12-12

New this week:

- We now pass correct line and column numbers more often when reporting exceptions to the V8 inspector. There remain some cases where the reported line and column numbers will be wrong.
- Fixed a significant source of daemonDown (1105) errors.

## 2019-12-06

Runtime release notes covering the past few weeks:

- Increased total per-request `Cache.put()` limit to 5GiB.
- Increased individual `Cache.put()` limits to the lesser of 5GiB or the zone’s normal cache limits (<https://support.cloudflare.com/hc/en-us/articles/200172516-Understanding-Cloudflare-s-CDN>).
- Added a helpful error message explaining AES decryption failures.
- Some overload errors were erroneously being reported as daemonDown (1105) errors. They have been changed to exceededCpu (1102) errors, which better describes their cause.
- More “internal errors” were converted to useful user-facing errors.
- Stability improvements and bug fixes.
