---
pcx_content_type: configuration
title: Response header modification examples
weight: 5
---

# Response header modification examples

The following examples illustrate how to perform response header modifications with Transform Rules:

- [Add an HTTP response header with a static value](#add-an-http-response-header-with-a-static-value)
- [Add an HTTP response header with the current bot score](#add-an-http-response-header-with-the-current-bot-score)
- [Remove an HTTP response header](#remove-an-http-response-header)

## Add an HTTP response header with a static value

The following HTTP Response Header Modification Rule adds a header named `X-Source` with a static value (`Cloudflare`) to the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Set static_

**Header name**: `X-Source`

**Value**: `Cloudflare`

{{</example>}}

## Add an HTTP response header with the current bot score

The following HTTP Response Header Modification Rule adds a header named `X-Bot-Score` with the current bot score to the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Set dynamic_

**Header name**: `X-Bot-Score`

**Value**: `to_string(cf.bot_management.score)`

{{</example>}}

## Remove an HTTP response header

The following HTTP Response Header Modification Rule removes the `cf-connecting-ip` header from the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/private/")
```

Selected operation under **Modify response header**: _Remove_

**Header name**: `cf-connecting-ip`

{{</example>}}
