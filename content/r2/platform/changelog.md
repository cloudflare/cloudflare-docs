---
pcx-content-type: changelog
title: Changelog
---

# Changelog

## 2022-07-06

- Support the `r2_list_honor_include` compat flag coming up in an upcoming runtime release (default behavior as of 2022-07-14 compat date). Without that compat flag/date, list will continue to function implicitly as `include: ['httpMetadata', 'customMetadata']` regardless of what you specify.
- `cf-create-bucket-if-missing` can be set on a `PutObject`/`CreateMultipartUpload` request to implicitly create the bucket if it doesn't exist.
- Fix S3 compatibility with MinIO client spec non-compliant XML for publishing multipart uploads. Any leading and trailing quotes in `CompleteMultipartUpload` are now optional and ignored as it seems to be the actual non-standard behavior AWS implements.

## 2022-07-01

- Unsupported search parameters to `ListObjects`/`ListObjectsV2` are now rejected with `501 Not Implemented`.
- Fixes for Listing:
  - Fix listing behavior when the number of files within a folder exceeds the limit (you'd end up seeing a CommonPrefix for that large folder N times where N = number of children within the CommonPrefix / limit).
    - Fix corner case where listing could cause objects with sharing the base name of a "folder" to be skipped.
    - Fix listing over some files that shared a certain common prefix.
  - `DeleteObjects` can now handle 1000 objects at a time.
- S3 `CreateBucket` request can specify `x-amz-bucket-object-lock-enabled` with a value of `false` and not have the requested rejected with a `NotImplemented` error. A value of `true` will continue to be rejected as R2 does not yet support object locks.

## 2022-06-17

- Fixed a regression for some clients when using an empty delimiter.
- Added support for S3 pre-signed URLs.

## 2022-06-16

- Fixed a regression in the S3 API `UploadPart` operation where `TooMuchConcurrency` & `NoSuchUpload` errors were being returned as `NoSuchBucket`.

## 2022-06-13

- Fixed a bug with the S3 API `ListObjectsV2` operation not returning empty folder/s as common prefixes when using delimiters.
- The S3 API `ListObjectsV2` `KeyCount` parameter now correctly returns the sum of keys and common prefixes rather than just the keys.
- Invalid cursors for list operations no longer fail with an `InternalError` and now return the appropriate error message.

## 2022-06-10

- The `ContinuationToken` field is now correctly returned in the response if provided in a S3 API `ListObjectsV2` request.
- Fixed a bug where the S3 API `AbortMultipartUpload` operation threw an error when called multiple times.

## 2022-05-27

- Fixed a bug where the S3 API's `PutObject` or the `.put()` binding could fail but still show the bucket upload as successful.
- If [conditional headers](https://datatracker.ietf.org/doc/html/rfc7232) are provided to S3 API `UploadObject` or `CreateMultipartUpload` operations, and the object exists, a `412 Precondition Failed` status code will be returned if these checks are not met.

## 2022-05-20

- Fixed a bug when `Accept-Encoding` was being used in `SignedHeaders` when sending requests to the S3 API would result in a `SignatureDoesNotMatch` response.

## 2022-05-17

- Fixed a bug where requests to the S3 API were not handling non-encoded parameters used for the authorization signature.
- Fixed a bug where requests to the S3 API where number-like keys were being parsed as numbers instead of strings.

## 2022-05-16

- Add support for virtual-hosted style paths, such as `<BUCKET>.<ACCOUNT_ID>.r2.cloudflarestorage.com`.
- Implemented `GetBucketLocation` for compatibility with external tools, this will always return a `LocationConstraint` of `auto`.

## 2022-05-06

- S3 API `GetObject` ranges are now inclusive (`bytes=0-0` will correctly return the first byte).
- S3 API `GetObject` partial reads return the proper `206 Partial Content` response code.
- Copying from a non-existent key (or from a non-existent bucket) to another bucket now returns the proper `NoSuchKey` / `NoSuchBucket` response.
- The S3 API now returns the proper `Content-Type: application/xml` response header on relevant endpoints.
- Multipart uploads now have a `-N` suffix on the etag representing the number of parts the file was published with.
- `UploadPart` and `UploadPartCopy` now return proper error messages, such as `TooMuchConcurrency` or `NoSuchUpload`, instead of 'internal error'.
- `UploadPart` can now be sent a 0-length part.

## 2022-05-05

- When using the S3 API, an empty string and `us-east-1` will now alias to the `auto` region for compatibility with external tools.
- `GetBucketEncryption`, `PutBucketEncryption` and `DeleteBucketEncrypotion` are now supported (the only supported value currently is `AES256`).
- Unsupported operations are explicitly rejected as unimplemented rather than implicitly converting them into `ListObjectsV2`/`PutBucket`/`DeleteBucket` respectively.
- S3 API `CompleteMultipartUploads` requests are now properly escaped.

## 2022-05-03

- Pagination cursors are no longer returned when the keys in a bucket is the same as the `MaxKeys` argument.
- The S3 API `ListBuckets` operation now accepts `cf-max-keys`, `cf-start-after` and `cf-continuation-token` headers behave the same as the respective URL parameters.
- The S3 API `ListBuckets` and `ListObjects` endpoints now allow `per_page` to be 0.
- The S3 API `CopyObject` source parameter now requires a leading slash.
- The S3 API `CopyObject` operation now returns a `NoSuchBucket` error when copying to a non-existent bucket instead of an internal error.
- Enforce the requirement for `auto` in SigV4 signing and the `CreateBucket` `LocationConstraint` parameter.
- The S3 API `CreateBucket` operation now returns the proper `location` response header. 

## 2022-04-14

- The S3 API now supports unchunked signed payloads.
- Fixed `.put()` for the Workers R2 bindings.
- Fixed a regression where key names were not properly decoded when using the S3 API.
- Fixed a bug where deleting an object and then another object which is a prefix of the first could result in errors.
- The S3 API `DeleteObjects` operation no longer returns an error even though an object has been deleted in some cases.
- Fixed a bug where `startAfter` and `continuationToken` were not working in list operations.
- The S3 API `ListObjects` operation now correctly renders `Prefix`, `Delimiter`, `StartAfter` and `MaxKeys` in the response. 
- The S3 API `ListObjectsV2` now correctly honors the `encoding-type` parameter.
- The S3 API `PutObject` operation now works with `POST` requests for `s3cmd` compatibility.

## 2022-04-04

- The S3 API `DeleteObjects` request now properly returns a `MalformedXML` error instead of `InternalError` when provided with more than 128 keys.
