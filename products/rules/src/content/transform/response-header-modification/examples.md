---
pcx-content-type: configuration
order: 4
---

# Response header modification examples

The following examples illustrate how to perform header modifications with Transform Rules:

* [Add an HTTP response header with a static value](#add-an-http-request-header-with-a-static-value)
* [Add an HTTP response header with the current bot score](#add-an-http-request-header-with-the-current-bot-score)
* [Remove an HTTP response header](#remove-an-http-request-header)

## Add an HTTP response header with a static value

The following HTTP Response Header Modification Rule adds a header named `X-Source` with a static value (`Cloudflare`) to the request:

<Example>

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Set static_

**Header name**: `X-Source`

**Value**: `Cloudflare`

</Example>

## Add an HTTP response header with the current bot score

The following HTTP Response Header Modification Rule adds a header named `X-Bot-Score` with the current bot score to the request:

<Example>

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Set dynamic_

**Header name**: `X-Bot-Score`

**Value**: `to_string(cf.bot_management.score)`

</Example>

## Remove an HTTP response header

The following HTTP Response Header Modification Rule removes the `cf-connecting-ip` header from the request:

<Example>

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/private/")
```

Selected operation under **Modify response header**: _Remove_

**Header name**: `cf-connecting-ip`

</Example>
