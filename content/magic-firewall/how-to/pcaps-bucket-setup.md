---
title: PCAPs bucket setup
pcx-content-type: how-to
meta:
    title: PCAPs bucket setup
---


# Set up a bucket

AWS and GCP buckets can be configured as targets when using the PCAP API.

In order to use a bucket you will need to first Enable Destinations via API. Choose either [Amazon S3](/logs/get-started/enable-destinations/aws-s3/#manage-via-api) or [Google Cloud Storage](/logs/get-started/enable-destinations/google-cloud-storage/#manage-via-api) and follow the steps for those specific services.

At this time you cannot manage this via the Cloudflare dashboard.

Next you will need to validate the bucket with the PCAPs API.

## Validate a bucket

The first step is to send an ownership challenge to a bucket to confirm you own the bucket.
The `bucket` field should be the URI of the bucket. For Amazon S3 it should be in the form `s3://<bucket-name>/<directory>?region=<bucket-region>` and for Google Cloud Storage in the form `gs://<bucket-name>/<directory>`.

```
curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps/ownership \
-H 'Content-Type: application/json' \
-H "X-Auth-Email: ${email}" \
-H "X-Auth-Key: ${auth_key}" \
-d '{
       "destination_conf": "'${bucket}'"
}'
```

The response will look like:
```
{
  "result": {
    "id": "cc20c2d6c62e11ecbe646b173af3b6b9",
    "status": "pending",
    "submitted": "2022-04-22T18:54:13.397413Z",
    "validated": "",
    "destinaton_conf": "gs://bucket-test",
    "filename": "ownership-challenge-1234.txt"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

The response will show the filename of the ownership-challenge text file placed within the bucket. Find the file in your bucket and copy the contents of the file.

Next, validate the bucket by inserting the copied text in the `ownership_text` below:

```
curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps/ownership/validate \
-H 'Content-Type: application/json' \
-H "X-Auth-Email: ${email}" \
-H "X-Auth-Key: ${auth_key}" \
-d '{
       "destination_conf": "'${bucket}'",
       "ownership_challenge": "'${ownership_text}'"
}'
```

This will show the following response:
```
{
  "result": {
    "id": "cc20c2d6c62e11ecbe646b173af3b6b9",
    "status": "success",
    "submitted": "2022-04-22T18:54:13.397413Z",
    "validated": "2022-04-27T14:54:46.440548Z",
    "destinaton_conf": "gs://bucket-test",
    "filename": "ownership-challenge-1234.txt"
  },
  "success": true,
  "errors": [],
  "messages": []
}

```

If status shows `success`, the bucket is configured and ready to use.

## List configured buckets

To list which buckets are available for PCAPs, send a request as shown below:
```
curl -X GET https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps/ownership \
-H 'Content-Type: application/json' \
-H "X-Auth-Email: ${email}" \
-H "X-Auth-Key: ${auth_key}"
```

The response will look like:
```
{
  "result": [
    {
      "id": "9a993aa6c58711ec89d3037647342e63",
      "status": "success",
      "submitted": "2022-04-26T16:58:24.550762Z",
      "validated": "2022-04-26T17:01:18.426458Z",
      "destinaton_conf": "s3://test-bucket?region=us-east-1",
      "filename": "ownership-challenge-1234.txt"
    },
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

The `status` field will show one of the following states:
- `pending`: A challenge response has been initiated but needs verification.
- `failed`: The bucket failed validation and cannot be used.
- `success`: The bucket is fully verified and ready to be used.
