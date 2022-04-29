---
pcx-content-type: concept
title: Pricing
---

# Pricing

R2 charges based on the total volume of data stored, along with two classes of operations on that data - Class A operations, which are more expensive and tend to mutate state, and Class B operations, which tend to read existing state. There are no charges for egress bandwidth.

All included usage is on a monthly basis.

## R2

{{<table-wrap>}}

|                    | Forever Free                 | Paid - Rates                       | 
| ------------------ | ---------------------------- | ---------------------------------- |
| Storage            | 10 GB / month                | $0.015 / GB-month                  |
| Class A Operations | 1,000,000 requests / month   | $4.50 / million requests           | 
| Class B Operations | 10,000,000 requeests / month | $0.36 / million requests           | 

{{</table-wrap>}}

### Storage Usage

Storage for is billed using gigabyte-month (GB-month) and is a measure of how large your objects are and how long you store your
objects for in the month.

### Class A Operations

The list of Class A Operations includes ListBuckets, PutBucket, ListObjects, PutObject, CopyObject, CompleteMultipartUpload, CreateMultipartUpload, UploadPart, 
and UploadPartCopy.

### Class B Operations

The list of Class B Operations includes HeadBucket, HeadObject, and GetObject.

### Free Operations

The list of free operations includes DeleteObject, DeleteBucket and DeleteMulitpartUpload.

## R2 billing examples

#### Example 1

If a user writes 1000 1GB objects in R2 for 1 month and each object is requested 1000 times per month, the 
estimated cost in a month would be:

Total = $14.85

- (1,000,000 Class B Operations - included 10,000,000 Class B Operations) = $0.00
- (1,000 Class A Operations - included 1,000,000 Class A Operations) = $0.00
- (1000 GB-months - 10 included GB-months) = $14.85

#### Example 2

If a user writes the same 1GB object 1,000,000 times a day and the object is read 10,000,000 times a day, 
the stimated cost in a month would be: 

Total = $234.50

- (300,000,000 Class B Operations - included 10,000,000 Class B Operations) = $104.00
- (30,000,000 Class A Operations - included 1,000,000 Class A Operations) = $130.50
- (1 GB-months - 10 included GB-months) = $0.00