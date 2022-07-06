---
title: S3 API Compatibility
pcx-content-type: reference
---

# S3 API compatibility

R2 implements the S3 API to allow users and their applications to migrate easily. When comparing to AWS S3, Cloudflare has removed some API operations' features and added others. The S3 API operations are listed below with their current implementation status. Feature implementation is currently in progress. Refer back to this page for updates.
The API is available via the `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` endpoint. Find your [account ID in the Cloudflare dashboard](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

## How to read this page

This page has two sections: bucket-level operations and object-level operations.

Each section will have two tables: a table of implemented APIs and a table of unimplemented APIs.

Refer the feature column of each table to review which features of an API have been implemented and which have not.

✅ Feature Implemented <br>
❌ Feature Not Implemented

## Bucket region

When using the S3 API, the region for an R2 bucket is `auto`. For compatibility with tools that do not allow you to specify a region, an empty value and `us-east-1` will alias to the `auto` region.

This also applies to the `LocationConstraint` for the `CreateBucket` API.

## Bucket-level operations

The following tables are related to bucket-level operations.

### Implemented bucket-level operations

Below is a list of implemented bucket-level operations. Refer to the Feature column to review which features have been implemented (✅) and have not been implemented (❌).

{{<table-wrap style="width:100%">}}

| API Name                                | Feature                           |
| --------------------------------------- |---------------------------------- |
| ✅ [ListBuckets](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBuckets.html)     |                                    |
| ✅ [HeadBucket](https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadBucket.html)       | ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |
| ✅ [CreateBucket](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html)   | ❌ ACL: <br> &emsp;  ❌ x-amz-acl <br> &emsp;  ❌ x-amz-grant-full-control <br> &emsp;  ❌ x-amz-grant-read <br> &emsp;  ❌ x-amz-grant-read-acp  <br> &emsp;  ❌ x-amz-grant-write <br> &emsp;  ❌ x-amz-grant-write-acp <br> ❌ Object Locking: <br> &emsp;  ❌ x-amz-bucket-object-lock-enabled <br>  ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |
| ✅ [DeleteBucket](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucket.html)   | ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |
| ✅ [GetBucketLocation](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLocation.html)  | ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |

{{</table-wrap>}}

### Unimplemented bucket-level operations

Below is a list of unimplemented bucket-level operations.

{{<table-wrap>}}

| API Name       | Feature                           |
| ---------------| --------------------------------- |
| ❌ [GetBucketLocation](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLocation.html)  | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |

{{</table-wrap>}}

## Object-level operations

The following tables are related to object-level operations.

### Implemented object-level operations
 
Below is a list of implemented object-level operations. Refer to the Feature column to review which features have been implemented (✅) and have not been implemented (❌).

{{<table-wrap style="width:123%">}}

| API Name                | Feature                   |
| ------------------------| ------------------------- |
| ✅ [HeadObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadObject.html)       | ✅ Conditional Operations: <br> &emsp;   ✅ If-Match <br> &emsp;  ✅ If-Modified-Since <br> &emsp;  ✅ If-None-Match <br> &emsp;  ✅ If-Unmodified-Since <br> ✅ Range: <br> &emsp;  ✅ Range (has no effect in HeadObject) <br> &emsp;  ✅ partNumber <br> ❌ SSE-C: <br> &emsp;  ❌ x-amz-server-side-encryption-customer-algorithm <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner  |
| ✅ [ListObjects](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html)      | Query Parameters: <br> &emsp;  ✅ delimiter <br> &emsp;  ✅ encoding-type <br> &emsp; ✅ marker <br> &emsp;  ✅ max-keys <br> &emsp;  ✅ prefix <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |
| ✅ [ListObjectsV2](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html) | Query Parameters: <br> &emsp;  ✅ list-type <br> &emsp;  ✅ continuation-token <br> &emsp;  ✅ delimiter <br> &emsp;  ✅ encoding-type <br> &emsp;  ✅ fetch-owner <br> &emsp;  ✅ max-keys <br> &emsp;  ✅ prefix <br> &emsp;  ✅ start-after <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner                   |
| ✅ [GetObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html)         | ✅ Conditional Operations: <br> &emsp;  ✅ If-Match <br> &emsp;  ✅ If-Modified-Since <br> &emsp;  ✅ If-None-Match <br> &emsp;  ✅ If-Unmodified-Since <br> ✅ Range: <br> &emsp;  ✅ Range <br> &emsp;  ✅ PartNumber <br> ❌ SSE-C: <br> &emsp;  ❌ x-amz-server-side-encryption-customer-algorithm <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |
| ✅ [PutObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html)         | ✅ System Metadata: <br> &emsp;  ✅ Content-Type <br> &emsp;  ✅ Cache-Control <br> &emsp;  ✅ Content-Disposition <br> &emsp;  ✅ Content-Encoding <br> &emsp;  ✅ Content-Language <br> &emsp;  ✅ Expires <br> &emsp;  ✅ Content-MD5 <br> ❌ Object Lifecycle <br> ❌ Website: <br> &emsp;  ❌ x-amz-website-redirect-location <br> ❌ SSE-C: <br> &emsp;  ❌ x-amz-server-side-encryption <br> &emsp;  ❌ x-amz-server-side-encryption-customer-algorithm <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key-MD5 <br> &emsp;  ❌ x-amz-server-side-encryption-aws-kms-key-id <br> &emsp;  ❌ x-amz-server-side-encryption-context <br> &emsp;  ❌ x-amz-server-side-encryption-bucket-key-enabled <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Tagging: <br> &emsp;  ❌ x-amz-tagging <br> ❌ Object Locking: <br> &emsp;  ❌ x-amz-object-lock-mode <br> &emsp;  ❌ x-amz-object-lock-retain-until-date <br> &emsp;  ❌ x-amz-object-lock-legal-hold <br> ❌ ACL: <br> &emsp;  ❌ x-amz-acl <br> &emsp;  ❌ x-amz-grant-full-control <br> &emsp;  ❌ x-amz-grant-read <br> &emsp;  ❌ x-amz-grant-read-acp <br> &emsp;  ❌ x-amz-grant-write-acp <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |
| ✅ [DeleteObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html)| ❌ Multi-factor authentication: <br> &emsp;  ❌ x-amz-mfa <br> ❌ Object Locking: <br> &emsp;  ❌ x-amz-bypass-governance-retention <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |
| ✅ [DeleteObjects](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html) | ❌ Multi-factor authentication: <br> &emsp;  ❌ x-amz-mfa <br> ❌ Object Locking: <br> &emsp;  ❌ x-amz-bypass-governance-retention <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |
| ✅ [CreateMultipartUpload](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html)  | ✅ System Metadata: <br> &emsp;  ✅ Content-Type <br> &emsp;  ✅ Cache-Control <br> &emsp;  ✅ Content-Disposition <br> &emsp;  ✅ Content-Encoding <br> &emsp;  ✅ Content-Language <br> &emsp;  ✅ Expires <br> &emsp;  ✅ Content-MD5 <br> ❌ Website: <br> &emsp;  ❌ x-amz-website-redirect-location <br> ❌ SSE-C: <br> &emsp;  ❌ x-amz-server-side-encryption <br> &emsp;  ❌ x-amz-server-side-encryption-customer-algorithm <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key-MD5 <br> &emsp;  ❌ x-amz-server-side-encryption-aws-kms-key-id <br> &emsp;  ❌ x-amz-server-side-encryption-context <br> &emsp;  ❌ x-amz-server-side-encryption-bucket-key-enabled <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Tagging: <br> &emsp;  ❌ x-amz-tagging <br> ❌ Object Locking: <br> &emsp;  ❌ x-amz-object-lock-mode <br> &emsp;  ❌ x-amz-object-lock-retain-until-date <br> &emsp;  ❌ x-amz-object-lock-legal-hold <br> ❌ ACL: <br> &emsp;  ❌ x-amz-acl <br> &emsp;  ❌ x-amz-grant-full-control <br> &emsp;  ❌ x-amz-grant-read <br> &emsp;  ❌ x-amz-grant-read-acp <br> &emsp;  ❌ x-amz-grant-write-acp <br> ❌ Storage class: <br> &emsp;  ❌ x-amz-storage-class <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |
| ✅ [CompleteMultipartUpload](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html)| ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer |
| ✅ [AbortMultipartUpload](https://docs.aws.amazon.com/AmazonS3/latest/API/API_AbortMultipartUpload.html)| ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer |
| ✅ [CopyObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html)       | ✅ Operation Metadata: <br> &emsp;  ✅ x-amz-metadata-directive <br> ✅ System Metadata: <br> &emsp;  ✅ Content-Type <br> &emsp;  ✅ Cache-Control <br> &emsp;  ✅ Content-Disposition <br> &emsp;  ✅ Content-Encoding <br> &emsp;  ✅ Content-Language <br> &emsp;  ✅ Expires <br> ✅ Conditional Operations: <br> &emsp;  ✅ x-amz-copy-source <br> &emsp;  ✅ x-amz-copy-source-if-match <br> &emsp;  ✅ x-amz-copy-source-if-modified-since <br> &emsp;  ✅ x-amz-copy-source-if-none-match <br> &emsp;  ✅ x-amz-copy-source-if-unmodified-since <br> ❌ ACL: <br> &emsp;  ❌ x-amz-acl <br> &emsp;  ❌ x-amz-grant-full-control <br> &emsp;  ❌ x-amz-grant-read <br> &emsp;  ❌ x-amz-grant-read-acp <br> &emsp;  ❌ x-amz-grant-write-acp <br> ❌ Website: <br> &emsp;  ❌ x-amz-website-redirect-location <br> ❌ SSE-C: <br> &emsp;  ❌ x-amz-server-side-encryption <br> &emsp;  ❌ x-amz-server-side-encryption-customer-algorithm <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key-MD5 <br> &emsp;  ❌ x-amz-server-side-encryption-aws-kms-key-id <br> &emsp;  ❌ x-amz-server-side-encryption-context <br> &emsp;  ❌ x-amz-server-side-encryption-bucket-key-enabled <br> &emsp;  ❌ x-amz-copy-source-server-side-encryption-customer-algorithm <br> &emsp;  ❌ x-amz-copy-source-server-side-encryption-customer-key <br> &emsp;  ❌ x-amz-copy-source-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Tagging: <br> &emsp;  ❌ x-amz-tagging <br> &emsp;  ❌ x-amz-tagging-directive <br> ❌ Object Locking: <br> &emsp;  ❌ x-amz-object-lock-mode <br> &emsp;  ❌ x-amz-object-lock-retain-until-date <br> &emsp;  ❌ x-amz-object-lock-legal-hold <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner <br> &emsp;  ❌ x-amz-source-expected-bucket-owner <br> ❌ Checksums: <br> &emsp;  ❌ x-amz-checksum-algorithm  |
| ✅ [UploadPart](https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPart.html)        | ✅ System Metadata: <br> &emsp;  ✅ Content-MD5 <br> ❌ SSE-C: <br> &emsp;  ❌ x-amz-server-side-encryption <br> &emsp;  ❌ x-amz-server-side-encryption-customer-algorithm <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner |
| ✅ [UploadPartCopy](https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPartCopy.html)| ❌ Conditional Operations: <br> &emsp;  ❌ x-amz-copy-source <br> &emsp;  ❌ x-amz-copy-source-if-match <br> &emsp;  ❌ x-amz-copy-source-if-modified-since <br> &emsp;  ❌ x-amz-copy-source-if-none-match <br> &emsp;  ❌ x-amz-copy-source-if-unmodified-since <br> ✅ Range: <br> &emsp;  ✅ x-amz-copy-source-range <br> ❌ SSE-C: <br> &emsp;  ❌ x-amz-server-side-encryption-customer-algorithm <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key <br> &emsp;  ❌ x-amz-server-side-encryption-customer-key-MD5 <br> &emsp;  ❌ x-amz-copy-source-server-side-encryption-customer-algorithm <br> &emsp;  ❌ x-amz-copy-source-server-side-encryption-customer-key <br> &emsp;  ❌ x-amz-copy-source-server-side-encryption-customer-key-MD5 <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner <br> &emsp;  ❌ x-amz-source-expected-bucket-owner |

{{</table-wrap>}}

### Unimplemented object-level operations

Below is a list of unimplemented object-level operations.

{{<table-wrap>}}

| API Name                                                                                | Feature                   |
| ----------------------------------------------------------------------------------------| ------------------------- |
| ❌ [ListMultipartUploads](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListMultipartUploads.html) | ❌ Query Parameters: <br> &emsp;  ❌ delimiter <br> &emsp;  ❌ encoding-type <br> &emsp;  ❌ key-marker <br> &emsp;  ❌ max-uploads <br> &emsp;  ❌ prefix <br> &emsp;  ❌ upload-id-marker |
| ❌ [ListParts](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListParts.html)          | ❌ Query Parameters: <br> &emsp;  ❌ max-parts <br> &emsp;  ❌ part-number-marker <br> ❌ Bucket Owner: <br> &emsp;  ❌ x-amz-expected-bucket-owner <br> ❌ Request Payer: <br> &emsp;  ❌ x-amz-request-payer |

{{</table-wrap>}}

{{<Aside type="warning">}}

Even though `ListObjects` is a supported operation, it is recommended that you use `ListObjectsV2` instead when developing applications. For more information, refer to [ListObjects](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html).

{{</Aside>}}
