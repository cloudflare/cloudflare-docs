---
pcx_content_type: configuration
title: Response header modification examples
weight: 5
---

# Response header modification examples

The following examples illustrate how to perform response header modifications with Transform Rules:

- [Set an HTTP response header to a static value](#set-an-http-response-header-to-a-static-value)
- [Set an HTTP response header to the current bot score](#set-an-http-response-header-to-the-current-bot-score)
- [Add an HTTP response header with a static value](#add-an-http-response-header-with-a-static-value)
- [Remove an HTTP response header](#remove-an-http-response-header)

## Set an HTTP response header to a static value

The following HTTP response header modification rule sets a header named `X-Source` to a static value (`Cloudflare`) in the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Set static_

**Header name**: `X-Source`

**Value**: `Cloudflare`

{{</example>}}

This rule would overwrite any existing `X-Source` headers already present in the response.

## Set an HTTP response header to the current bot score

The following HTTP response header modification rule sets a header named `X-Bot-Score` to the current bot score in the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Set dynamic_

**Header name**: `X-Bot-Score`

**Value**: `to_string(cf.bot_management.score)`

{{</example>}}

This rule would overwrite any existing `X-Bot-Score` headers already present in the response.

## Add an HTTP response header with a static value

The following HTTP response header modification rule adds a header named `set-cookie` with a static value (`cookiename=value`) to the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Add_

**Header name**: `set-cookie`

**Value**: `cookiename=value`

{{</example>}}

This rule would keep any existing `set-cookie` headers already present in the response.

## Remove an HTTP response header

The following HTTP response header modification rule removes the `cf-connecting-ip` header from the response:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/private/")
```

Selected operation under **Modify response header**: _Remove_

**Header name**: `cf-connecting-ip`

{{</example>}}
