---
title: Extensions
pcx_content_type: concept
---

# Extensions

R2 implements some extensions on top of the basic S3 API. This page outlines these additional, available features.

## Extended metadata using Unicode

The [Workers R2 API](/r2/data-access/bindings/bindings-reference/) supports Unicode in keys and values natively without requiring any additional encoding or decoding for the `customMetadata` field. These fields map to the `x-amz-meta-`-prefixed headers used within the R2 S3-compatible API endpoint.

HTTP header names and values may only contain ASCII characters, which is a small subset of the Unicode character library. To easily accommodate users, R2 adheres to [RFC2047](https://datatracker.ietf.org/doc/html/rfc2047) and automatically decodes all `x-amz-meta-*` header values before storage. On retrieval, any metadata values with unicode are RFC2047-encoded before rendering the response. The length limit for metadata values is applied to the decoded Unicode value.

{{<Aside type="warning" header="Metadata variance">}}
Be mindful when using both Workers and S3 API endpoints to access the same data. If the R2 metadata keys contain Unicode, they are stripped when accessed through the S3 API and the `x-amz-missing-meta` header is set to the number of keys that were omitted.
{{</Aside>}}

These headers map to the `httpMetadata` field in the [R2 bindings](/workers/platform/bindings/):

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

If using Unicode in object key names, refer to [Unicode Interoperability](/r2/platform/learning/unicode-interoperability/).

## Auto-creating buckets on upload

If you are creating buckets on demand, you might initiate an upload with the assumption that a target bucket exists. In this situation, if you received a `NoSuchBucket` error, you would probably issue a `CreateBucket` operation. However, following this approach can cause issues: if the body has already been partially consumed, the upload will need to be aborted. A common solution to this issue, followed by other object storage providers, is to use the [HTTP `100`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100) response to detect whether the body should be sent, or if the bucket must be created before retrying the upload. However, Cloudflare does not support the HTTP `100` response. Even if the HTTP `100` response was supported, you would still have additional latency due to the round trips involved.

To support sending an upload with a streaming body to a bucket that may not exist yet, upload operations such as `PutObject` or `CreateMultipartUpload` allow you to specify a header that will ensure the `NoSuchBucket` error is not returned. If the bucket does not exist at the time of upload, it is implicitly instantiated with the following `CreateBucket` request:

```txt
PUT / HTTP/1.1
Host: bucket.account.r2.cloudflarestorage.com
<CreateBucketConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <LocationConstraint>auto</LocationConstraint>
</CreateBucketConfiguration>
```

This is only useful if you are creating buckets on demand because you do not know the name of the bucket or the preferred access location ahead of time. For example, you have one bucket per one of your customers and the bucket is created on first upload to the bucket and not during account registration. In these cases, the [`ListBuckets` extension](#ListBuckets), which supports accounts with more than 1,000 buckets, may also be useful.

## PutObject

### cf-create-bucket-if-missing

Add a `cf-create-bucket-if-missing` header with the value `true` to implicitly create the bucket if it does not exist yet. Refer to [Auto-creating buckets on upload](#auto-creating-buckets-on-upload) for a more detailed explanation of when to add this header.

## CreateMultipartUpload

### cf-create-bucket-if-missing

Add a `cf-create-bucket-if-missing` header with the value `true` to implicitly create the bucket if it does not exist yet. Refer to [Auto-creating buckets on upload](#auto-creating-buckets-on-upload) for a detailed explanation of when to add this header.

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
