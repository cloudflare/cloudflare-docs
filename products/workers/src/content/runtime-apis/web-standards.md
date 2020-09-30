---
title: Web standards
order: 0
---

# JavaScript and web standards

The Workers runtime provides the following standardized APIs for use by scripts running at the edge.

--------------------------------

## JavaScript standards

Cloudflare Workers uses the V8 JavaScript engine from Google Chrome. The Workers runtime is updated at least once a week, to at least the version that is currently used by Chrome's stable release. This means you can safely use the latest JavaScript features, with no need for transpilers.

All of the [standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) supported by the current Google Chrome stable release are supported, with a few notable exceptions:

- `eval()` is not allowed for security reasons.
- `new Function` is not allowed for security reasons.
- `Date.now()` returns the time of the last I/O; it does not advance during code execution.

--------------------------------

## Web global APIs

The following methods are available per the [Worker Global Scope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope):

### Base64 utility methods

<Definitions>

- <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob">atob()</TypeLink>

  - Decodes a string of data which has been encoded using base-64 encoding.

- <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa">btoa()</TypeLink>

  - Creates a base-64 encoded ASCII string from a string of binary data.

</Definitions>

### Timers

<Definitions>

- <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval">setInterval()</TypeLink>

  - Schedules a function to execute every time a given number of milliseconds elapses.

- <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval">clearInterval()</TypeLink>

  - Cancels the repeated execution set using [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval).

- <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout">setTimeout()</TypeLink>

  - Schedules a function to execute in a given amount of time.

- <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout">clearTimeout()</TypeLink>

  - Cancels the delayed execution set using [`setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).

</Definitions>

<Aside>

__Note:__ Timers are only available inside of [the Request Context](/runtime-apis/request#the-request-context).

</Aside>

### Fetch global

<Definitions>

- <TypeLink href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch">fetch()</TypeLink>

  - Starts the process of fetching a resource from the network. See [FetchAPI](/runtime-apis/fetch).

</Definitions>

<Aside>

__Note:__ The Fetch API is only available inside of [the Request Context](/runtime-apis/request#the-request-context).

</Aside>

--------------------------------

## Encoding API

Both TextEncoder and TextDecoder support UTF-8 encoding/decoding.

[Go to the docs](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API)

--------------------------------

## URL API

The URL API supports urls conforming to http and https schemes.

[Go to the docs](https://developer.mozilla.org/en-US/docs/Web/API/URL)

<Aside>

__Note:__ The Workers’ Runtime’s URL class behavior differs from the URL Spec documented above. If you’d like to use another URL implementation, you can [shim the URL class using webpack](/cli-wrangler/webpack/#shimming-globals).

</Aside>
