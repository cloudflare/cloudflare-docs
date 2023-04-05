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

{{<table-wrap>}}

|                    | Free                         | Paid - Rates                       |
| ------------------ | ---------------------------- | ---------------------------------- |
| Storage            | 10 GB / month                | $0.015 / GB-month                  |
| Class A Operations | 1 million requests / month   | $4.50 / million requests           |
| Class B Operations | 10 million requests / month  | $0.36 / million requests           |

{{</table-wrap>}}

### Storage usage

Storage is billed using gigabyte-month (GB-month) as the billing metric. A GB-month is calculated by recording total bytes stored for the duration of the month.

For example:

* Storing 1 GB for 30 days will be charged as 1 GB-month.
* Storing 2 GB for 15 days will be charged as 1 GB-month.

### Class A operations

Class A Operations include `ListBuckets`, `PutBucket`, `ListObjects`, `PutObject`, `CopyObject`, `CompleteMultipartUpload`, `CreateMultipartUpload`, `ListMultipartUploads`, `UploadPart`, `UploadPartCopy` and `PutBucketEncryption`.

### Class B operations

Class B Operations include `HeadBucket`, `HeadObject`, `GetObject`, `UsageSummary`, `GetBucketEncryption` and `GetBucketLocation`.

### Free operations

Free operations include `DeleteObject`, `DeleteBucket` and `AbortMultipartUpload`.

## Pricing calculator

To learn about potential cost savings from using R2, refer to the [R2 pricing calculator](https://r2-calculator.cloudflare.com/).

## R2 billing examples

#### Data Storage

If a user writes 1,000 objects in R2 for 1 month with an average size of 1 GB and requests each 1,000 times per month, the estimated cost for the month would be:

{{<table-wrap>}}
|                    | Usage                                      | Free Tier    | Billable Quantity | Price      |
|--------------------|--------------------------------------------|--------------|-------------------|------------|
| Class B Operations | (1,000 objects) * (1,000 reads per object) |   10 million |                 0 |      $0.00 |
| Class A Operations | (1,000 objects) * (1 write per object)     |    1 million |                 0 |      $0.00 |
| Storage            | (1,000 objects) * (1GB per object)         | 10 GB-months |     990 GB-months |     $14.85 |
| **TOTAL**          |                                            |              |                   | **$14.85** |
{{</table-wrap>}}

#### Asset Hosting

If a user writes 100,000 files with an average size of 100 KB object and reads 10,000,000 objects per day, the estimated cost in a month would be: 

{{<table-wrap>}}
|                    | Usage                                               | Free Tier    | Billable Quantity | Price       |
|--------------------|-----------------------------------------------------|--------------|-------------------|-------------|
| Class B Operations | (10,000,000 reads per day) * (30 days)              |   10 million |       290,000,000 |     $104.40 |
| Class A Operations | (100,000 writes)                                    |    1 million |                 0 |       $0.00 |
| Storage            | (100,000 objects) * (100KB per object)              | 10 GB-months |       0 GB-months |       $0.00 |
| **TOTAL**          |                                                     |              |                   | **$104.40** |
{{</table-wrap>}}
