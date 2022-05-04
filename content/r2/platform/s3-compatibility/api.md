---
title: R2 S3 XML API Compatibility
pcx-content-type: reference
meta:
  title: R2 S3 XML API Compatibility
---

# S3 XML API compatibility

R2 implements the S3 API to allow users and their applications to migrate easily. When comparing to AWS S3, Cloudflare has removed some API operations' features and added others. The S3 API operations are listed below with their current implementation status. Feature implementation is currently in progress. Refer back to this page for updates.

## How to read this page

This page has two sections: bucket-level operations and object-level operations. 

Each section will have two tables: a table of implemented APIs and a table of unimplemented APIs.

Refer the feature column of each table to review which features of an API have been implemented and which have not.

✅ Feature Implemented  
❌ Feature Not Implemented

## Bucket-level operations

The following tables are related to bucket-level operations.

### Implemented bucket-level operations

Below is a list of implemented bucket-level operations. Refer to the Feature column to review which features have been implemented (✅) and have not been implemented (❌).

{{<table-wrap style="width:100%">}}

| API Name                                                                                | Feature                           |
| -------------------------------------------------------------------------------------   |---------------------------------- |
| [ListBuckets](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBuckets.html)     |                                    |
| [HeadBucket](https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadBucket.html)       | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner  |
| [CreateBucket](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateBucket.html)   | ❌ ACL: <br> ❌ x-amz-acl <br> ❌ x-amz-grant-full-control <br> ❌ x-amz-grant-read <br> ❌ x-amz-grant-read-acp  <br> ❌ x-amz-grant-write <br> ❌ x-amz-grant-write-acp |
|                                                                                         | ❌ Object Locking: <br> ❌ x-amz-bucket-object-lock-enabled  |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner                     |
| [DeleteBucket](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteBucket.html)   | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner    |

{{</table-wrap>}}

### Unimplemented bucket-level operations

Below is a list of unimplemented bucket-level operations.

{{<table-wrap>}}

| API Name                                                                                         | Feature                           |
| ------------------------------------------------------------------------------------------------ | --------------------------------- |
| ❌ [GetBucketLocation](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketLocation.html)  | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |

{{</table-wrap>}}

## Object-level operations

The following tables are related to object-level operations.

### Implemented object-level operations
 
Below is a list of implemented object-level operations. Refer to the Feature column to review which features have been implemented (✅) and have not been implemented (❌).

{{<table-wrap style="width:120%">}}

| API Name                                                                                | Feature                   |
| ----------------------------------------------------------------------------------------| ------------------------- |
| [HeadObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_HeadObject.html)       | ✅ Conditional Operations: <br>  ✅ If-Match <br> ✅ If-Modified-Since <br> ✅ If-None-Match <br> ✅ If-Unmodified-Since |
|                                                                                         | ✅ Range: <br> ✅ Range (has no effect in HeadObject) <br> ✅ partNumber<br>                  |
|                                                                                         | ❌ SSE-C: <br> ❌ x-amz-server-side-encryption-customer-algorithm  <br> ❌ x-amz-server-side-encryption-customer-key <br> ❌ x-amz-server-side-encryption-customer-key-MD5   |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner  |
| [ListObjectsV2](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html) | Query Parameters: <br> ✅ list-type <br> ✅ continuation-token <br> ✅ delimiter <br> ✅ encoding-type <br> ✅ fetch-owner <br> ✅ max-keys <br> ✅ prefix <br> ✅ start-after |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner                   |
| [GetObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html)         | ✅ Conditional Operations: <br>  ✅ If-Match <br> ✅ If-Modified-Since <br> ✅ If-None-Match <br> ✅ If-Unmodified-Since | |
|                                                                                         | ✅ Range: <br> ✅ Range <br> ✅ PartNumber |
|                                                                                         | ❌ SSE-C: <br> ❌ x-amz-server-side-encryption-customer-algorithm <br> ❌ x-amz-server-side-encryption-customer-key <br> ❌ x-amz-server-side-encryption-customer-key-MD5  |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
| [PutObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html)         | ✅ System Metadata: <br> ✅ Cache-Control <br> ✅ Content-Disposition  <br> ✅ Content-Encoding <br> ✅ Content-Language <br> ✅ Expires <br> ✅ Content-MD5 |
|                                                                                         | ❌ Object Lifecycle      |
|                                                                                         | ❌ Website: <br> ❌ x-amz-website-redirect-location |
|                                                                                         | ❌ SSE-C: <br> ❌ x-amz-server-side-encryption <br> ❌ x-amz-server-side-encryption-customer-algorithm <br> ❌ x-amz-server-side-encryption-customer-key <br> ❌ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ x-amz-server-side-encryption-aws-kms-key-id <br> ❌ x-amz-server-side-encryption-context <br> ❌ x-amz-server-side-encryption-bucket-key-enabled |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Tagging: <br> ❌ x-amz-tagging |      |
|                                                                                         | ❌ Object Locking: <br> ❌ x-amz-object-lock-mode <br> ❌ x-amz-object-lock-retain-until-date <br> ❌ x-amz-object-lock-legal-hold |
|                                                                                         | ❌ ACL: <br> ❌ x-amz-acl <br> ❌ x-amz-grant-full-control <br> ❌ x-amz-grant-read <br> ❌ x-amz-grant-read-acp <br> ❌ x-amz-grant-write-acp |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
| [DeleteObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html)   | ❌ Multi-factor authentication: <br> ❌ x-amz-mfa |
|                                                                                         | ❌ Object Locking: <br> ❌ x-amz-bypass-governance-retention |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
| [DeleteObjects](https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html) | ❌ Multi-factor authentication: <br> ❌ x-amz-mfa |
|                                                                                         | ❌ Object Locking: <br> ❌ x-amz-bypass-governance-retention |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
| [CreateMultipartUpload](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html)  | ✅ System Metadata: <br> ✅ Cache-Control <br> ✅ Content-Disposition <br> ✅ Content-Encoding <br> ✅ Content-Language <br> ✅ Expires <br> ✅ Content-MD5 |
|                                                                                         | ❌ Website <br> ❌ x-amz-website-redirect-location |
|                                                                                         | ❌ SSE-C: <br> ❌ x-amz-server-side-encryption <br> ❌ x-amz-server-side-encryption-customer-algorithm <br> ❌ x-amz-server-side-encryption-customer-key <br> ❌ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ x-amz-server-side-encryption-aws-kms-key-id <br> ❌ x-amz-server-side-encryption-context <br> ❌ x-amz-server-side-encryption-bucket-key-enabled |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Tagging: <br> ❌ x-amz-tagging |
|                                                                                         | ❌ Object Locking: <br> ❌ x-amz-object-lock-mode <br> ❌ x-amz-object-lock-retain-until-date <br> ❌ x-amz-object-lock-legal-hold |
|                                                                                         | ❌ ACL: <br> ❌ x-amz-acl <br> ❌ x-amz-grant-full-control <br> ❌ x-amz-grant-read <br> ❌ x-amz-grant-read-acp <br> ❌ x-amz-grant-write-acp |
|                                                                                         | ❌ Storage class: <br> ❌ x-amz-storage-class |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
|[CompleteMultipartUpload](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html)| ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|[AbortMultipartUpload](https://docs.aws.amazon.com/AmazonS3/latest/API/API_AbortMultipartUpload.html)| ❌ Request Payer: <br> ❌ x-amz-request-payer |
|[CopyObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html#)       | ✅ Operation Metadata: <br> ✅ x-amz-metadata-directive |
|                                                                                         | ✅ System Metadata: <br> ✅ Cache-Control <br> ✅ Content-Disposition <br> ✅ Content-Encoding <br> ✅ Content-Language <br> ✅ Expires |
|                                                                                         | ✅ Conditional Operations: <br> ✅ x-amz-copy-source <br> ✅ x-amz-copy-source-if-match <br> ✅ x-amz-copy-source-if-modified-since <br> ✅ x-amz-copy-source-if-none-match <br> ✅ x-amz-copy-source-if-unmodified-since| 
|                                                                                         | ❌ ACL: <br> ❌ x-amz-acl <br> ❌ x-amz-grant-full-control <br> ❌ x-amz-grant-read <br> ❌ x-amz-grant-read-acp <br> ❌ x-amz-grant-write-acp|
|                                                                                         | ❌ Website <br> ❌ x-amz-website-redirect-location |
|                                                                                         | ❌ SSE-C: <br> ❌ x-amz-server-side-encryption <br> ❌ x-amz-server-side-encryption-customer-algorithm <br> ❌ x-amz-server-side-encryption-customer-key <br> ❌ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ x-amz-server-side-encryption-aws-kms-key-id <br> ❌ x-amz-server-side-encryption-context <br> ❌ x-amz-server-side-encryption-bucket-key-enabled <br> ❌ x-amz-copy-source-server-side-encryption-customer-algorithm <br> ❌ x-amz-copy-source-server-side-encryption-customer-key <br> ❌ x-amz-copy-source-server-side-encryption-customer-key-MD5 |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Tagging: <br> ❌ x-amz-tagging <br> ❌ x-amz-tagging-directive |
|                                                                                         | ❌ Object Locking: <br> ❌ x-amz-object-lock-mode <br> ❌ x-amz-object-lock-retain-until-date <br> ❌ x-amz-object-lock-legal-hold |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner <br> ❌ x-amz-source-expected-bucket-owner |
|[UploadPart](https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPart.html)        | ✅ System Metadata: <br> ✅ Content-MD5 |
|                                                                                         | ❌ SSE-C: <br> ❌ x-amz-server-side-encryption <br> ❌ x-amz-server-side-encryption-customer-algorithm <br> ❌ x-amz-server-side-encryption-customer-key <br> ❌ x-amz-server-side-encryption-customer-key-MD5 |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
|[UploadPartCopy](https://docs.aws.amazon.com/AmazonS3/latest/API/API_UploadPartCopy.html)| ❌ Conditional Operations: <br> ❌ x-amz-copy-source <br> ❌ x-amz-copy-source-if-match <br> ❌ x-amz-copy-source-if-modified-since <br> ❌ x-amz-copy-source-if-none-match <br> ❌ x-amz-copy-source-if-unmodified-since|
|                                                                                         | ✅ Range: <br> ✅ x-amz-copy-source-range|
|                                                                                         | ❌ SSE-C: <br> ❌ x-amz-server-side-encryption-customer-algorithm <br> ❌ x-amz-server-side-encryption-customer-key <br> ❌ x-amz-server-side-encryption-customer-key-MD5 <br> ❌ x-amz-copy-source-server-side-encryption-customer-algorithm <br> ❌ x-amz-copy-source-server-side-encryption-customer-key <br> ❌ x-amz-copy-source-server-side-encryption-customer-key-MD5 |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner <br> ❌ x-amz-source-expected-bucket-owner |

{{</table-wrap>}}

### Unimplemented object-level operations

Below is a list of unimplemented object-level operations.

{{<table-wrap>}}

| API Name                                                                                | Feature                   |
| ----------------------------------------------------------------------------------------| ------------------------- |
|❌ [ListObjects](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjects.html)      | ❌ Query Parameters: <br> ❌ delimiter <br> ❌ encoding-type <br> ❌ marker <br> ❌ max-keys <br> ❌ prefix |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
|❌ [ListMultipartUploads](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListMultipartUploads.html) | ❌ Query Parameters: <br> ❌ delimiter <br> ❌ encoding-type <br> ❌ key-marker <br> ❌ max-uploads <br> ❌ prefix <br> ❌ upload-id-marker |
|❌ [ListParts](https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListParts.html)          | ❌ Query Parameters: <br> ❌ max-parts <br> ❌ part-number-marker |
|                                                                                         | ❌ Bucket Owner: <br> ❌ x-amz-expected-bucket-owner |
|                                                                                         | ❌ Request Payer: <br> ❌ x-amz-request-payer |

{{</table-wrap>}}

{{<Aside type="warning">}}

Note that `ListObjects` is a deprecated operation in S3 that was replaced with `ListObjectsV2`.

{{</Aside>}}
