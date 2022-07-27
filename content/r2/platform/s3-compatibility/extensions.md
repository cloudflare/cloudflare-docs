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

## Auto-creating buckets on upload

If creating buckets on demand, you might initiate an upload with the assumption that a target bucket exists. When the `NoSuchBucket` error is returned, you may want to issue a `CreateBucket` operation. However, this is operationally problematic. If the body has already been partially consumed, the upload will need to be aborted. To solve this, developers use the [HTTP `100`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100) response to detect whether the body should be sent or if the bucket needs to be created and the upload retried. This is how other object storage providers typically solve this error. However, Cloudflare does not support the HTTP `100` response. Additionally, if the HTTP `100` response was supported, there is still additional latency due to the round trips involved.

To support being able to send an upload with a streaming body to a bucket that may not exist yet, uploads (such as, `PutObject` / `CreateMultipartUpload`) support a header being specified that will ensure the `NoSuchBucket` error is not returned. If it does not exist at the time of upload, the bucket is implicitly instantiated with the following `CreateBucket` request:
```
PUT / HTTP/1.1
Host: bucket.account.r2.cloudflarestorage.com
<CreateBucketConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <LocationConstraint>auto</LocationConstraint>
</CreateBucketConfiguration>
```

This is only useful if you are creating buckets spontaneously because you do not know the name of the bucket or preferred access location ahead of time. For example, you have one bucket per one of your customers and the bucket is created on first upload to the bucket and not during account registration. In these cases, the [ListBuckets extension](#ListBuckets) to support accounts with greater than 1000 buckets may also be useful.

## PutObject

### cf-create-bucket-if-missing

Add a `cf-create-bucket-if-missing` header with the value `true` to implicitly create the bucket if it does not exist yet. Refer to [above](#auto-creating-buckets-on-upload) for a more detailed explanation of when to use this.

## CreateMultipartUpload

### cf-create-bucket-if-missing

Add the `cf-create-bucket-if-missing` header with the value `true` to implicitly create the bucket if it does not exist yet. Refer to [above](#auto-creating-buckets-on-upload) for a more detailed explanation of when to use this.

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
