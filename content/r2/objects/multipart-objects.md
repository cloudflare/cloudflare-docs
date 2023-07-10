---
title: Multipart Upload
pcx_content_type: how-to
weight: 1
---

# Multipart Upload

R2 supports [S3 API's Multipart Upload](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html) with some limitations.

## Limitations

Object part sizes must be at least 5MiB but no larger than 5GiB.  All parts except the last one must be the same size.  The last part has no minimum size, but must be the same or smaller than the other parts.

The maximum number of parts is 10,000.

Most S3 clients conform to these expectations.

## Lifecycles

The default object lifecycle policy for multipart uploads is that incompleted uploads will be automatically aborted 7 days.  This can be changed by [configuring a custom lifecycle policy](/r2/buckets/object-lifecycles/).

## ETags

The ETags for objects uploaded via multipart are different than those uploaded with PutObject.

For uploads created after June 21, 2023, R2's multipart ETags now mimic the behavior of S3.  The ETag of each individual part is the MD5 hash of the contents of the part.  The ETag of the completed multipart object is the hash of the MD5 sums of each of the constituent parts concatenated together followed by a hyphen and the number of parts uploaded.

For example, consider a multipart upload with two parts.  If they have the ETags `bce6bf66aeb76c7040fdd5f4eccb78e6` and `8165449fc15bbf43d3b674595cbcc406` respectively, the ETag of the completed multipart upload will be `f77dc0eecdebcd774a2a22cb393ad2ff-2`.
