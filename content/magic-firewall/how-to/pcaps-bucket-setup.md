---
weight: 4
title: PCAPs bucket setup
pcx_content_type: how-to
---

# Set up a bucket for full packet captures

Before you can begin a full packet capture, you must first configure a bucket that Cloudflare can use to upload your files.

You can configure an Amazon S3 or Google Cloud Platform bucket to use as a target.

## Set up a bucket

Learn how to set up a bucket for use with full packet captures.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select you account.
2. Select **Magic Transit** or **Magic WAN**.
3. In **Packet captures**, select **Start a capture**.
4. From the **Packet captures** page, select the **Buckets** tab.
5. Select **Add a bucket**.
6. Under **Bucket configuration**, select a bucket service and select **Next**.
7. Enter the information related to your bucket for your service provider.
8. When you are done, select **Next**.

The **Prove ownership** step of the **Bucket configuration** displays.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Before you can begin using a bucket, you must first enable destinations.

Refer to the [Amazon S3](/logs/get-started/enable-destinations/aws-s3/#create-and-get-access-to-an-s3-bucket) or [Google Cloud Storage](/logs/get-started/enable-destinations/google-cloud-storage/#create-and-get-access-to-a-gcs-bucket) documentation and follow the steps for those specific services.

{{</tab>}}
{{</tabs>}}

Next, validate the bucket and confirm ownership.

## Validate a bucket

After the initial bucket set up, you need to confirm you own the bucket via an ownership challenge. After you validate your bucket, you can begin using it to collect full packet captures.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. From the **Prove ownership** step of the **Bucket configuration**, locate the **Ownership token** field.
2. In the **Ownership token** field, enter the ownership token for your service provider.
3. When you are done, select **Create**. The **Packet captures** page displays.

The **Buckets** tab displays a list of the buckets associated with your account. Refer to the **Status** column to see the status of your bucket configuration.

{{</tab>}}
{{<tab label="api" no-code="true">}}

The `bucket` field should be the URI of the bucket. For Amazon S3, the `bucket` field is in the form `s3://<bucket-name>/<directory>?region=<bucket-region>`, and for Google Cloud Storage the form is `gs://<bucket-name>/<directory>`.

```bash
---
header: Ownership challenge request example
---
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps/ownership \
--header 'Content-Type: application/json' \
--header "X-Auth-Email: <YOUR_EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--data '{
       "destination_conf": "'${bucket}'"
}'
```

The response shows the filename of the ownership-challenge text file placed within the bucket. Find the file in your bucket and copy the contents of the file.

```json
---
header: Ownership challenge response example
---
{
  "result": {
    "id": "cc20c2d6c62e11ecbe646b173af3b6b9",
    "status": "pending",
    "submitted": "2022-04-22T18:54:13.397413Z",
    "validated": "",
    "destination_conf": "gs://bucket-test",
    "filename": "ownership-challenge-1234.txt"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Validate the bucket by inserting the copied text in the `ownership_text` below:

```bash
---
header: Bucket validation example
---
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps/ownership/validate \
--header 'Content-Type: application/json' \
--header "X-Auth-Email: <YOUR_EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--data '{
  "destination_conf": "'${bucket}'",
  "ownership_challenge": "'${ownership_text}'"
}'
```

```json
---
header: Bucket validation response
---
{
  "result": {
    "id": "cc20c2d6c62e11ecbe646b173af3b6b9",
    "status": "success",
    "submitted": "2022-04-22T18:54:13.397413Z",
    "validated": "2022-04-27T14:54:46.440548Z",
    "destination_conf": "gs://bucket-test",
    "filename": "ownership-challenge-1234.txt"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

If the `status` shows `success`, the bucket is configured and ready to use.

{{</tab>}}
{{</tabs>}}

The bucket status displays one of the following options:

- **Success:** The bucket is fully verified and ready to use.
- **Pending:** The challenge response was initiated but is pending verification. Bucket verification can take five to ten minutes to finish processing.
- **Failed:** The bucket could not be validated. If this occurs, verify your ownership information.

## List configured buckets

View a list of all buckets configured on your account.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select you account.
2. Select **Magic Transit** or **Magic WAN**.
3. In **Packet captures**, select **Start a capture**.
4. Select the **Buckets** tab.

The list of buckets associated with your account displays.

{{</tab>}}
{{<tab label="api" no-code="true">}}

```bash
---
header: Bucket list request example
---
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps/ownership \
-H 'Content-Type: application/json' \
--header "X-Auth-Email: <YOUR_EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

```json
---
header: Bucket list response example
---
{
  "result": [
    {
      "id": "9a993aa6c58711ec89d3037647342e63",
      "status": "success",
      "submitted": "2022-04-26T16:58:24.550762Z",
      "validated": "2022-04-26T17:01:18.426458Z",
      "destination_conf": "s3://test-bucket?region=us-east-1",
      "filename": "ownership-challenge-1234.txt"
    },
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```
{{</tab>}}
{{</tabs>}}

To learn how to collect packet captures, refer to [Collect packet captures](/magic-firewall/how-to/collect-pcaps).
