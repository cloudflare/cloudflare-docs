---
title: Extensions
pcx-content-type: concept
---

# Extensions

R2 implements some extensions on top of the basic S3 API. This page outlines these additional, available features.

## Extended metadata using Unicode

The [Workers R2 API](/r2/runtime-apis/) supports Unicode in keys and values natively without requiring any additional encoding or decoding for the `customMetadata` field. These fields map to the `x-amz-meta-`-prefixed headers used within the R2 S3-compatible API endpoint.

HTTP header names and values may only contain ASCII characters, which is a small subset of the Unicode character library. To easily accommodate users, R2 adheres to [RFC2047](https://datatracker.ietf.org/doc/html/rfc2047) and automatically decodes all `x-amz-meta-*` header values before storage. On retrieval, any metadata values with unicode are RFC2047-encoded before rendering the response. The length limit for metadata values is applied to the decoded Unicode value.

{{<Aside type="warning" header="Metadata variance">}}
Be mindful when using both Workers and S3 API endpoints to access the same data. If the R2 metadata keys contain Unicode, they are stripped when accessed through the through S3 API and the `x-amz-missing-meta` header is set to the number of keys that were omitted.
{{</Aside>}}

These headers map to the `httpMetadata` field in the R2 bindings:

{{<table-wrap>}}
| HTTP Header           | Property Name                     |
|---------------------- | --------------------------------- |
| `Content-Encoding`    | `httpMetadata.contentEncoding`    |
| `Content-Type`        | `httpMetadata.contentType`        |
| `Content-Language`    | `httpMetadata.contentLanguage`    |
| `Content-Disposition` | `httpMetadata.contentDisposition` |
| `Cache-Control`       | `httpMetadata.cacheControl`       |
| `Expires`             | `httpMetadata.expires`            |
{{</table-wrap>}}

If using Unicode in object key names, refer to the [Unicode Interoperability technical notes](/r2/learning/unicode-interoperability/).

## CopyObject

### MERGE metadata directive

The `x-amz-metadata-directive` allows a `MERGE` value, in addition to the standard `COPY` and `REPLACE` options. When used, `MERGE` is a combination of `COPY` and `REPLACE`, which will `COPY` any metadata keys from the source object and `REPLACE` those that are specified in the request with the new value. You cannot use `MERGE` to remove existing metadata keys from the source — use `REPLACE` instead.

## `ListBuckets`

`ListBuckets` supports all the same search parameters as `ListObjectsV2` in R2 because some customers may have more than 1,000 buckets. Because tooling, like existing S3 libraries, may not expose a way to set these search parameters, these values may also be sent in via headers. Values in headers take precedence over the search parameters.

{{<table-wrap>}}
| Search parameter     | HTTP Header             | Meaning                                                           |
|--------------------- | ----------------------- | ----------------------------------------------------------------- |
| `prefix`             | `cf-prefix`             | Show buckets with this prefix only.                               |
| `start-after`        | `cf-start-after`        | Show buckets whose name appears lexicographically in the account. |
| `continuation-token` | `cf-continuation-token` | Resume listing from a previously returned continuation token.     |
| `max-keys`           | `cf-max-keys`           | Return this maximum number of buckets. Default and max is `1000`.   |
{{</table-wrap>}}

The XML response contains a `NextContinuationToken` and `IsTruncated` elements as appropriate. Since these may not be accessible from existing S3 APIs, these are also available in response headers:

{{<table-wrap>}}
| XML Response Element    | HTTP Response Header         | Meaning                                                                                      |
| ----------------------- | ---------------------------- | -------------------------------------------------------------------------------------------- |
| `IsTruncated`           | `cf-is-truncated`            | This is set to `true` if the list of buckets returned is not all the buckets on the account. |
| `NextContinuationToken` | `cf-next-continuation-token` | This is set to continuation token to pass on a subsequent `ListBuckets` to resume the listing. |
| `StartAfter`            |                              | This is the start-after value that was passed in on the request.                             |
| `KeyCount`              |                              | The number of buckets returned.                                                              |
| `ContinuationToken`     |                              | The continuation token that was supplied in the request.                                     |
| `MaxKeys`               |                              | The max keys that were specified in the request.                                             |
{{</table-wrap>}}

## PutObject

### Conditional operations in `PutObject`

`PutObject` supports [conditional uploads](https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests) via the [`If-Match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match), [`If-None-Match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match), [`If-Modified-Since`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since), and [`If-Unmodified-Since`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Unmodified-Since) headers. These headers behave similarly to how `GetObject` and `HeadObject` interpret these headers, rejecting uploads with `304 NotModified` or `412 PreconditionFailed` error codes when an upload is not necessary or the preceding state does not match, respectively.
