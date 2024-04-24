---
pcx_content_type: configuration
title: Request header modification examples
weight: 5
---

# Request header modification examples

The following examples illustrate how to perform request header modifications with Transform Rules:

- [Add an HTTP request header with a static value](#add-an-http-request-header-with-a-static-value)
- [Add an HTTP request header with the current bot score](#add-an-http-request-header-with-the-current-bot-score)
- [Remove an HTTP request header](#remove-an-http-request-header)

## Add an HTTP request header with a static value

The following HTTP request header modification rule adds a header named `X-Source` with a static value (`Cloudflare`) to the request:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify request header**: _Set static_

**Header name**: `X-Source`

**Value**: `Cloudflare`

{{</example>}}

## Add an HTTP request header with the current bot score

The following HTTP request header modification rule adds a header named `X-Bot-Score` with the current bot score to the request:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `X-Bot-Score`

**Value**: `to_string(cf.bot_management.score)`

{{</example>}}

## Remove an HTTP request header

The following HTTP request header modification rule removes the `cf-connecting-ip` header from the request:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/private/")
```

Selected operation under **Modify request header**: _Remove_

**Header name**: `cf-connecting-ip`

{{</example>}}
