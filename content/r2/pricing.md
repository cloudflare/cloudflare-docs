---
pcx_content_type: concept
title: Pricing
weight: 10
---

# Pricing

R2 charges based on the total volume of data stored, along with two classes of operations on that data:

1. [Class A operations](#class-a-operations) which are more expensive and tend to mutate state.
2. [Class B operations](#class-b-operations) which tend to read existing state.

There are no charges for egress bandwidth.

All included usage is on a monthly basis.

## R2 pricing

|                    | Free                         | Paid - Rates                       |
| ------------------ | ---------------------------- | ---------------------------------- |
| Storage            | 10 GB / month                | $0.015 / GB-month                  |
| Class A Operations | 1 million requests / month   | $4.50 / million requests           |
| Class B Operations | 10 million requests / month  | $0.36 / million requests           |
| Egress (data transfer to Internet) | Free [^1] |

[^1]: Egressing directly from R2, including via the [Workers API](/r2/api/workers/), [S3 API](/r2/api/s3/), and [`r2.dev` domains](/r2/buckets/public-buckets/#enable-managed-public-access) does not incur data transfer (egress) charges and is free. If you connect other, metered services to an R2 bucket, you may be charged by those services.

### Storage usage

Storage is billed using gigabyte-month (GB-month) as the billing metric. A GB-month is calculated by averaging the _peak_ storage per day over a billing period (30 days)

For example:

- Storing 1 GB constantly for 30 days will be charged as 1 GB-month.
- Storing 3 GB constantly for 30 days will be charged as 3 GB-month.
- Storing 1 GB for 5 days, then 3 GB for the remaining 25 days will be charged as `1GB * 5/30 month + 3GB * 25/30 month = 2.66 GB-month`

### Class A operations

Class A Operations include `ListBuckets`, `PutBucket`, `ListObjects`, `PutObject`, `CopyObject`, `CompleteMultipartUpload`, `CreateMultipartUpload`, `ListMultipartUploads`, `UploadPart`, `UploadPartCopy`, `ListParts`, `PutBucketEncryption`, `PutBucketCors` and `PutBucketLifecycleConfiguration`.

### Class B operations

Class B Operations include `HeadBucket`, `HeadObject`, `GetObject`, `UsageSummary`, `GetBucketEncryption`, `GetBucketLocation`, `GetBucketCors` and `GetBucketLifecycleConfiguration`.

### Free operations

Free operations include `DeleteObject`, `DeleteBucket` and `AbortMultipartUpload`.

## Data migration pricing

### Super Slurper

Super Slurper is free to use. You are only charged for the Class A operations that Super Slurper makes to your R2 bucket. Objects with sizes < 100MiB are uploaded to R2 in a single Class A operation. Larger objects use multipart uploads to increase transfer success rates and will perform multiple Class A operations. Note that your source bucket might incur additional charges as Super Slurper copies objects over to R2.

Once migration completes, you are charged for storage & Class A/B operations as described in previous sections.

### Sippy

Sippy is free to use. You are only charged for the operations Sippy makes to your R2 bucket. If a requested object is not present in R2, Sippy will copy it over from your source bucket. Objects with sizes < 200MiB are uploaded to R2 in a single Class A operation. Larger objects use multipart uploads to increase transfer success rates, and will perform multiple Class A operations. Note that your source bucket might incur additional charges as Sippy copies objects over to R2.

As objects are migrated to R2, they are served from R2, and you are charged for storage & Class A/B operations as described in previous sections.

## Pricing calculator

To learn about potential cost savings from using R2, refer to the [R2 pricing calculator](https://r2-calculator.cloudflare.com/).

## R2 billing examples

### Data storage

If a user writes 1,000 objects in R2 for 1 month with an average size of 1 GB and requests each 1,000 times per month, the estimated cost for the month would be:

{{<table-wrap>}}
|                    | Usage                                      | Free Tier    | Billable Quantity | Price      |
|--------------------|--------------------------------------------|--------------|-------------------|------------|
| Class B Operations | (1,000 objects) * (1,000 reads per object) |   10 million |                 0 |      $0.00 |
| Class A Operations | (1,000 objects) * (1 write per object)     |    1 million |                 0 |      $0.00 |
| Storage            | (1,000 objects) * (1GB per object)         | 10 GB-months |     990 GB-months |     $14.85 |
| **TOTAL**          |                                            |              |                   | **$14.85** |
{{</table-wrap>}}

### Asset hosting

If a user writes 100,000 files with an average size of 100 KB object and reads 10,000,000 objects per day, the estimated cost in a month would be:

{{<table-wrap>}}
|                    | Usage                                               | Free Tier    | Billable Quantity | Price       |
|--------------------|-----------------------------------------------------|--------------|-------------------|-------------|
| Class B Operations | (10,000,000 reads per day) * (30 days)              |   10 million |       290,000,000 |     $104.40 |
| Class A Operations | (100,000 writes)                                    |    1 million |                 0 |       $0.00 |
| Storage            | (100,000 objects) * (100KB per object)              | 10 GB-months |       0 GB-months |       $0.00 |
| **TOTAL**          |                                                     |              |                   | **$104.40** |
{{</table-wrap>}}

## Cloudflare billing policy

To learn more about how usage is billed, refer to [Cloudflare Billing Policy](/support/account-management-billing/billing-cloudflare-plans/cloudflare-billing-policy/).

## Frequently asked questions

### Will I be charged for unauthorized requests to my R2 bucket?

No. You are not charged for operations when the caller does not have permission to make the request (HTTP 401 `Unauthorized` response status code).
