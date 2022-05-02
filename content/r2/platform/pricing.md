---
pcx-content-type: concept
title: Pricing
---

# Pricing

R2 charges based on the total volume of data stored, along with two classes of operations on that data:

 1. [Class A operations](#class-a-operations) which are more expensive and tend to mutate state. 
 2. [Class B operations](#class-b-operations) which tend to read existing state.
 
 There are no charges for egress bandwidth.

All included usage is on a monthly basis.

## R2

{{<table-wrap>}}

|                    | Forever Free                 | Paid - Rates                       | 
| ------------------ | ---------------------------- | ---------------------------------- |
| Storage            | 10 GB / month                | $0.015 / GB-month                  |
| Class A Operations | 1,000,000 requests / month   | $4.50 / million requests           | 
| Class B Operations | 10,000,000 requests / month  | $0.36 / million requests           | 

{{</table-wrap>}}

### Storage Usage

Storage for is billed using gigabyte-month (GB-month) and is a measure of how large your objects are and how long you store your objects for in the month.

### Class A Operations

Class A Operations include `ListBuckets`, `PutBucket`, `ListObjects`, `PutObject`, `CopyObject`, `CompleteMultipartUpload`, `CreateMultipartUpload`, `UploadPart`, and `UploadPartCopy`.

### Class B Operations

Class B Operations include `HeadBucket`, `HeadObject`, and `GetObject`.

### Free Operations

Free operations include `DeleteObject`, `DeleteBucket` and `DeleteMulitpartUpload`.

## R2 billing examples

#### Example 1

If a user writes 1,000 objects in R2 for 1 month and each object is 1 GB in size and requested 1,000 times per month, the estimated cost for the month would be:

{{<table-wrap>}}
|                    | Usage                                      | Free Tier    | Billable Quantity | Price      |
|--------------------|--------------------------------------------|--------------|-------------------|------------|
| Class B Operations | (1,000 objects) * (1,000 reads per object) |   10,000,000 |                 0 |      $0.00 |
| Class A Operations | (1,000 objects) * (1 write per object)     |    1,000,000 |                 0 |      $0.00 |
| Storage            | (1,000 objects) * (1GB per object)         | 10 GB-months |     990 GB-months |     $14.85 |
| **TOTAL**          |                                            |              |                   | **$14.85** |
{{</table-wrap>}}

#### Example 2

If a user writes the same 1 GB object 1,000,000 times a day and the object is read 10,000,000 times a day, the estimated cost in a month would be: 

{{<table-wrap>}}
|                    | Usage                                               | Free Tier    | Billable Quantity | Price       |
|--------------------|-----------------------------------------------------|--------------|-------------------|-------------|
| Class B Operations | (1 object) * (10,000,000 reads per day) * (30 days) |   10,000,000 |       290,000,000 |     $104.40 |
| Class A Operations | (1 object) * (1,000,000 writes per day) * (30 days) |    1,000,000 |        29,000,000 |     $130.50 |
| Storage            | (1 object) * (1GB per object)                       | 10 GB-months |       0 GB-months |        $0.00 |
| **TOTAL**          |                                                     |              |                   | **$234.90** |
{{</table-wrap>}}